export interface PlaceholderMediaProps {
  label: string;
  sublabel?: string;
  variant?: "studio" | "blush" | "canvas" | "cover" | "cover-alt";
  motif?: "portrait" | "botanical" | "none";
  className?: string;
}

const SURFACE_CLASS_BY_VARIANT: Record<
  NonNullable<PlaceholderMediaProps["variant"]>,
  string
> = {
  studio: "bg-bg-surface",
  blush: "bg-bg-blush-hero",
  canvas: "bg-bg-canvas",
  cover:
    "bg-[linear-gradient(158deg,#d8b4c0_0%,#9e7483_77%)]",
  "cover-alt":
    "bg-[linear-gradient(158deg,#cfafb9_0%,#8e6a78_77%)]",
};

function EditorialMotif({ motif }: { motif: "portrait" | "botanical" }) {
  if (motif === "botanical") {
    return (
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-border-strong"
      >
        <path d="M22 36V14" />
        <path d="M22 23C16.8 21.8 13.4 17.6 14 11.4C19 12.2 22 16 22 21" />
        <path d="M22 21.5C27.2 20.3 30.6 16.1 30 9.9C25 10.7 22 14.5 22 19.5" />
        <path d="M16.5 31C18.8 29.8 20.8 29.8 22 31C23.2 29.8 25.2 29.8 27.5 31" />
      </svg>
    );
  }

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-border-strong"
    >
      <path d="M12 34V21C12 15.4772 16.4772 11 22 11C27.5228 11 32 15.4772 32 21V34" />
      <line x1="9" y1="34" x2="35" y2="34" />
    </svg>
  );
}

/**
 * Dignified editorial placeholder plate used when CMS imagery is not yet uploaded.
 * Preserves sharp 0px gallery geometry and subtle architectural hairline framing.
 */
export function PlaceholderMedia({
  label,
  sublabel,
  variant = "studio",
  motif = "portrait",
  className = "",
}: PlaceholderMediaProps) {
  const isCover = variant === "cover" || variant === "cover-alt";

  if (isCover) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden ${SURFACE_CLASS_BY_VARIANT[variant]} ${className}`}
        role="img"
        aria-label={label}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 border border-[#fdfbfa]/30 sm:inset-5"
        />
        <span className="absolute top-7 left-7 type-micro font-medium tracking-[0.02em] text-ink-primary sm:top-9 sm:left-9">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-8 text-center ${SURFACE_CLASS_BY_VARIANT[variant]} ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-border-hairline sm:inset-5"
      />
      <div className="relative z-10 flex flex-col items-center gap-3 px-4">
        {motif !== "none" ? <EditorialMotif motif={motif} /> : null}
        <p className="type-meta text-ink-secondary">{label}</p>
        {sublabel ? (
          <p className="text-xs leading-relaxed text-ink-secondary">
            {sublabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}
