export interface SanityImageCrop {
  _type?: "sanity.imageCrop";
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImageHotspot {
  _type?: "sanity.imageHotspot";
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityImageReference {
  _type: "reference";
  _ref: string;
}

export interface SanityImage {
  _type?: "image";
  asset?: SanityImageReference | null;
  crop?: SanityImageCrop | null;
  hotspot?: SanityImageHotspot | null;
  alt?: string | null;
}

export interface SocialLink {
  _key?: string;
  platform: string;
  label: string;
  url: string;
}

export interface SiteSettings {
  _id?: string;
  brandName: string;
  brandLogo?: SanityImage | null;
  fallbackLogoPath?: string | null;
  tagline: string;
  founderName: string;
  founderBio: string;
  founderPhoto?: SanityImage | null;
  defaultWhatsappNumber: string;
  defaultWhatsappMessage: string;
  socialLinks: SocialLink[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: SanityImage | null;
}

export interface VentureHighlight {
  _key?: string;
  title: string;
  priceHint?: string | null;
  note?: string | null;
}

export interface VentureGalleryItem {
  _key?: string;
  image: SanityImage;
  caption?: string | null;
  tag?: string | null;
}

export interface Venture {
  _id: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
  logo?: SanityImage | null;
  fallbackLogoPath?: string | null;
  category: string;
  shortDescription: string;
  fullDescription?: string | null;
  serviceArea?: string | null;
  whatsappNumberOverride?: string | null;
  whatsappMessageTemplate: string;
  instagramUrl?: string | null;
  coverImage?: SanityImage | null;
  highlights: VentureHighlight[];
  gallery: VentureGalleryItem[];
  externalActionLabel?: string | null;
  externalActionUrl?: string | null;
}

export interface SiteData {
  settings: SiteSettings;
  ventures: Venture[];
  isFallback: boolean;
}
