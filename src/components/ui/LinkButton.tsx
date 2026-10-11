"use client";

import Link from "next/link";
import { useMagnetic } from "@/lib/hooks";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  size?: "md" | "sm";
  magnetic?: boolean;
  className?: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** Anchor styled as a button. External URLs open in the same tab (signup/login are part of the journey). */
export function LinkButton({ href, children, variant = "primary", size = "md", magnetic, className = "", external, ...rest }: Props) {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic ? 0.2 : 0);
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a ref={ref} href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
