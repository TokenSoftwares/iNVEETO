/**
 * Official iNVEETO logo, used exactly as supplied (public/brand/inveeto-logo.png, 1024×413).
 * Never recolor, crop or redraw it; size it with height only so the proportions stay intact.
 */
import { site } from "@/content/site";

export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={site.logo.full}
      alt="iNVEETO"
      width={1024}
      height={413}
      className={`${className} w-auto select-none`}
      draggable={false}
      decoding="async"
    />
  );
}
