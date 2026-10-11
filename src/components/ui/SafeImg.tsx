"use client";

import { useEffect, useRef, useState } from "react";

/** <img> that swaps to a soft lavender placeholder if the remote file can't load. */
export function SafeImg({ src, alt, className = "", eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // Catch errors that fired before hydration attached onError.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) return <span role="img" aria-label={alt} className={`block bg-gradient-to-br from-lavender to-mist ${className}`} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={imgRef} src={src} alt={alt} className={className} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />
  );
}
