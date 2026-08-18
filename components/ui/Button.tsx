import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CtaLink } from "@/lib/content/types";

const styles: Record<CtaLink["variant"], string> = {
  primary:
    "bg-teal-accent text-[#02191B] hover:bg-[#17959c] shadow-sm hover:shadow-md",
  secondary:
    "border border-current/25 text-current hover:border-teal-accent hover:text-teal-accent",
  ghost:
    "border border-border-subtle text-headline-dark hover:border-teal-accent hover:text-headline-teal",
};

export function Button({
  cta,
  withArrow = true,
  className = "",
}: {
  cta: CtaLink;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={cta.href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${styles[cta.variant]} ${className}`}
    >
      {cta.label}
      {withArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
