import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

interface RevalidatePayload {
  _type?: string;
  slug?: string | { current?: string };
}

const VALID_SLUG_REGEX = /^[a-z0-9-]+$/i;

function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

function extractDirectSecret(req: NextRequest): string | null {
  const headerSecret = req.headers.get("x-revalidate-secret")?.trim();
  if (headerSecret) {
    return headerSecret;
  }

  const authHeader = req.headers.get("authorization")?.trim();
  if (authHeader?.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token) {
      return token;
    }
  }

  return null;
}

function extractValidatedSlug(payload: RevalidatePayload | null): string | null {
  if (!payload?.slug) {
    return null;
  }

  const candidate =
    typeof payload.slug === "string"
      ? payload.slug.trim()
      : payload.slug.current?.trim() || "";

  if (!candidate || !VALID_SLUG_REGEX.test(candidate)) {
    return null;
  }

  return candidate;
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: "Unauthorized." },
      { status: 401 },
    );
  }

  let payload: RevalidatePayload | null = null;
  const hasSanitySignature = Boolean(
    req.headers.get("sanity-webhook-signature"),
  );

  if (hasSanitySignature) {
    try {
      const parsed = await parseBody<RevalidatePayload>(req, secret, true);
      if (!parsed.isValidSignature) {
        return NextResponse.json(
          { revalidated: false, message: "Invalid webhook signature." },
          { status: 401 },
        );
      }
      payload = parsed.body;
    } catch (error) {
      const isJsonSyntaxError = error instanceof SyntaxError;
      return NextResponse.json(
        {
          revalidated: false,
          message: isJsonSyntaxError
            ? "Invalid JSON payload."
            : "Invalid webhook signature.",
        },
        { status: isJsonSyntaxError ? 400 : 401 },
      );
    }
  } else {
    const providedSecret = extractDirectSecret(req);
    if (!providedSecret || !constantTimeEquals(providedSecret, secret)) {
      return NextResponse.json(
        { revalidated: false, message: "Invalid revalidation secret." },
        { status: 401 },
      );
    }

    try {
      const text = await req.text();
      payload = text ? (JSON.parse(text) as RevalidatePayload) : null;
    } catch {
      return NextResponse.json(
        { revalidated: false, message: "Invalid JSON payload." },
        { status: 400 },
      );
    }
  }

  const documentType = payload?._type;
  const slug = extractValidatedSlug(payload);
  const revalidatedTags: string[] = [];

  if (documentType === "siteSettings") {
    revalidateTag("siteSettings", { expire: 0 });
    revalidatedTags.push("siteSettings");
    revalidatePath("/", "layout");
  } else if (documentType === "venture") {
    revalidateTag("venture", { expire: 0 });
    revalidatedTags.push("venture");
    if (slug) {
      const slugTag = `venture:${slug}`;
      revalidateTag(slugTag, { expire: 0 });
      revalidatedTags.push(slugTag);
      revalidatePath(`/ventures/${slug}`);
    }
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  } else {
    revalidateTag("siteSettings", { expire: 0 });
    revalidateTag("venture", { expire: 0 });
    revalidatedTags.push("siteSettings", "venture");
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");
  }

  return NextResponse.json({
    revalidated: true,
    tags: revalidatedTags,
    now: Date.now(),
  });
}
