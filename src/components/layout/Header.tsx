"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Languages } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/LinkButton";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { href, type Locale } from "@/content/i18n";
import { useLocale, useT } from "@/lib/locale-context";

export function Header() {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname() ?? `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const other: Locale = locale === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);

  const nav = [
    { label: t(ui.nav.features), to: href(locale, "/features") },
    { label: t(ui.nav.usecases), to: href(locale, "/use-cases") },
    { label: t(ui.nav.stories), to: href(locale, "/customer-stories") },
    { label: t(ui.nav.pricing), to: href(locale, "/pricing") },
    { label: t(ui.nav.faqs), to: href(locale, "/#faqs") },
    { label: t(ui.nav.contact), to: href(locale, "/contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (derived during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Mobile menu: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>("a,button");
        const a = items[0];
        const b = items[items.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (to: string) => !to.includes("#") && pathname.startsWith(to);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] btn btn-secondary btn-sm">
        {t(ui.nav.skip)}
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className={`mx-auto flex h-16 max-w-[1240px] items-center gap-3 rounded-2xl px-3 ps-4 transition-all duration-500 sm:px-4 sm:ps-5 ${
            scrolled || open
              ? "bg-white/80 shadow-[0_1px_0_rgb(47_22_119/0.06),0_18px_40px_-24px_rgb(47_22_119/0.35)] ring-1 ring-line backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <Link href={href(locale)} className="shrink-0 rounded-lg" aria-label={t(ui.nav.home)}>
            <Logo className="h-7 sm:h-8" />
          </Link>

          <nav aria-label={t(ui.nav.primary)} className="ms-4 hidden flex-1 items-center gap-0.5 xl:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                aria-current={isActive(n.to) ? "page" : undefined}
                className="whitespace-nowrap rounded-full px-3 py-2 text-[0.92rem] text-slate transition-colors hover:bg-mist hover:text-ink aria-[current=page]:bg-mist aria-[current=page]:text-brand-strong"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1.5">
            <Link
              href={switchHref}
              hrefLang={other}
              lang={other}
              className="btn btn-quiet btn-sm gap-1.5 whitespace-nowrap text-[0.9rem]"
            >
              <Languages size={16} aria-hidden className="text-brand" />
              <span className="sr-only">{t(ui.nav.switchLabel)}: </span>
              {t(ui.nav.switchTo)}
            </Link>
            <a href={site.links.login} className="btn btn-quiet btn-sm hidden whitespace-nowrap text-[0.9rem] sm:inline-flex">
              {t(ui.nav.login)}
            </a>
            <LinkButton href={site.links.trial} size="sm" magnetic className="hidden md:inline-flex">
              {t(ui.cta.trial)}
            </LinkButton>
            <button
              ref={menuBtn}
              type="button"
              className="btn btn-quiet btn-sm !px-2.5 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t(ui.nav.close) : t(ui.nav.menu)}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-label={t(ui.nav.menu)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[1240px] overflow-y-auto rounded-2xl bg-white p-3 shadow-lift ring-1 ring-line xl:hidden"
            >
              <nav aria-label={t(ui.nav.menu)} className="flex flex-col sm:grid sm:grid-cols-2">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    href={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3.5 text-lg text-ink hover:bg-mist"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
                <a href={site.links.login} className="btn btn-secondary">
                  {t(ui.nav.login)}
                </a>
                <a href={site.links.trial} className="btn btn-primary">
                  {t(ui.cta.trial)}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
