interface WhatsAppButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "compact";
  fullWidth?: boolean;
  className?: string;
}

const VARIANT_STYLES = {
  primary:
    "bg-ink-primary text-ink-on-dark hover:bg-accent-rose active:bg-accent-rose-hover px-6",
  secondary:
    "border border-border-strong bg-transparent text-ink-primary hover:bg-bg-surface hover:text-accent-rose active:bg-bg-surface-strong px-6",
  compact:
    "bg-ink-primary text-ink-on-dark hover:bg-accent-rose active:bg-accent-rose-hover px-5",
} as const;

export function WhatsAppButton({
  href,
  label,
  variant = "primary",
  fullWidth = false,
  className = "",
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-[2px] type-micro uppercase transition-colors duration-[180ms] ease-out ${
        VARIANT_STYLES[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
