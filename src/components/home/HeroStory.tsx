"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, ChevronDown } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { StaticNetwork } from "@/components/three/StaticNetwork";
import { storyState } from "@/components/three/store";
import { smoothstep } from "@/components/three/formations";
import { OrganizeMock } from "@/components/mocks/OrganizeMock";
import { SelectMock } from "@/components/mocks/SelectMock";
import { InviteMock } from "@/components/mocks/InviteMock";
import { ConfirmMock } from "@/components/mocks/ConfirmMock";
import { EngageMock } from "@/components/mocks/EngageMock";
import { chapters, hero, problem, tagline, unified } from "@/content/home";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { href } from "@/content/i18n";
import { useLocale, useT } from "@/lib/locale-context";
import { hasWebGL, useMediaQuery, useReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NetworkScene = dynamic(() => import("@/components/three/NetworkScene"), { ssr: false });

const mocks = [OrganizeMock, SelectMock, InviteMock, ConfirmMock, EngageMock];

export function HeroStory() {
  const locale = useLocale();
  const t = useT();
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const wrap = useRef<HTMLElement>(null);
  const [webgl, setWebgl] = useState<"pending" | "yes" | "no">("pending");
  const [running, setRunning] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [quality, setQuality] = useState<"high" | "low">("high");

  // Capability + quality detection (client only)
  useEffect(() => {
    // Give the browser a beat to paint the hero text before compiling shaders.
    const id = window.setTimeout(() => {
      const ok = hasWebGL();
      const cores = navigator.hardwareConcurrency ?? 4;
      const small = window.innerWidth < 1024;
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      setWebgl(ok ? "yes" : "no");
      setQuality(small || cores < 6 || saveData ? "low" : "high");
      setSceneReady(true);
    }, 120);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    storyState.reduced = reduced;
  }, [reduced]);

  // Pause rendering when the story is off-screen
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pointer → scene
  useEffect(() => {
    const move = (e: PointerEvent) => {
      storyState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      storyState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Scroll → continuous stage + placement
  useGSAP(
    () => {
      const el = wrap.current!;
      const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
      const sign = locale === "ar" ? -1 : 1;
      let lastInt = -1;

      const compute = () => {
        const mid = window.innerHeight * 0.5;
        const centers = steps.map((s) => {
          const r = s.getBoundingClientRect();
          return r.top + r.height * 0.5 - mid;
        });
        let stage = 0;
        if (centers[0] >= 0) stage = 0;
        else if (centers[centers.length - 1] <= 0) stage = centers.length - 1;
        else {
          for (let i = 0; i < centers.length - 1; i++) {
            if (centers[i] <= 0 && centers[i + 1] > 0) {
              stage = i + -centers[i] / (centers[i + 1] - centers[i]);
              break;
            }
          }
        }
        storyState.stage = stage;

        // Placement: hero + unified sit to the end side; chapters centre the network between text and product UI.
        if (desktop) {
          const toCenter = smoothstep(0.1, 0.9, Math.min(stage, 1)) * (1 - smoothstep(6.1, 6.9, stage));
          storyState.offsetX = sign * 2.55 * (1 - toCenter);
          storyState.offsetY = 0;
          const chapterScale = smoothstep(1.2, 1.9, stage) * (1 - smoothstep(6.1, 6.9, stage));
          storyState.scale = 0.92 - 0.4 * chapterScale;
        } else {
          // Mobile: the network floats above the hero copy, then sits behind the chapters.
          const inHero = 1 - smoothstep(0.1, 0.8, stage);
          storyState.offsetX = 0;
          storyState.offsetY = 0.3 + 1.4 * inHero;
          storyState.scale = 0.52 + 0.06 * inHero;
        }

        const rounded = Math.round(stage);
        if (rounded !== lastInt) {
          lastInt = rounded;
          setActiveStage(rounded);
        }
      };

      ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom bottom", onUpdate: compute, onRefresh: compute });
      compute();

      if (!reduced) {
        // One orchestrated entrance: headline lines, then the four verbs light up in order.
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-line > span", { yPercent: 110, duration: 1.1, stagger: 0.12 })
          .from(".hero-fade", { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, "-=0.6")
          .to(".hero-verb", { color: "var(--brand-deep)", duration: 0.35, stagger: 0.28 }, "-=0.2");

        // Chapter copy eases in as each scene arrives (scrubbed, so it reverses on scroll up).
        gsap.utils.toArray<HTMLElement>(".chapter-copy").forEach((node) => {
          gsap.fromTo(
            node.children,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: { trigger: node, start: "top 85%", end: "top 45%", scrub: 0.6 },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".chapter-mock").forEach((node) => {
          gsap.fromTo(
            node,
            { opacity: 0, y: 60, rotateY: locale === "ar" ? 8 : -8, transformPerspective: 1200 },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              ease: "none",
              scrollTrigger: { trigger: node, start: "top 95%", end: "top 50%", scrub: 0.8 },
            },
          );
        });
      } else {
        gsap.set(".hero-verb", { color: "var(--brand-deep)" });
      }
    },
    { scope: wrap, dependencies: [locale, desktop, reduced], revertOnUpdate: true },
  );

  const labels = [
    { title: t({ en: "Address Book", ar: "دفتر العناوين" }), detail: t({ en: "Names stored in two languages", ar: "أسماء محفوظة بلغتين" }) },
    { title: t({ en: "Events", ar: "الفعاليات" }), detail: t({ en: "Up to 6 check-ins per event", ar: "حتى 6 تسجيلات حضور لكل فعالية" }) },
    { title: t({ en: "Campaigns", ar: "الحملات" }), detail: t({ en: "Resend to non-openers in one click", ar: "إعادة الإرسال لغير الفاتحين بنقرة" }) },
  ];

  const scrollToStep = (i: number) => {
    const el = wrap.current?.querySelector<HTMLElement>(`[data-step="${i}"]`);
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  };

  const showRail = activeStage >= 2 && activeStage <= 6;
  const titleLines = t(hero.title).split("\n");

  return (
    <section ref={wrap} id="platform" className="relative" aria-label={t({ en: "How iNVEETO works", ar: "كيف يعمل إنفيتو" })}>
      {/* Sticky visual layer */}
      <div className="pointer-events-none sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_40%,#f2edf9_0%,#ffffff_60%)] rtl:bg-[radial-gradient(70%_60%_at_30%_40%,#f2edf9_0%,#ffffff_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
        {(webgl !== "yes" || !sceneReady) && (
          <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pe-[6vw] rtl:lg:justify-start rtl:lg:ps-[6vw]">
            <StaticNetwork className="h-[78svh] max-h-[720px] w-auto opacity-90 max-lg:-translate-y-[18svh] max-lg:opacity-60" />
          </div>
        )}
        {webgl === "yes" && sceneReady && (
          <div className="absolute inset-0 max-lg:opacity-70">
            <NetworkScene count={quality === "high" ? 380 : 170} quality={quality} running={running} />
            {labels.map((l, i) => (
              <div
                key={i}
                ref={(el) => {
                  storyState.labelEls[i] = el;
                }}
                className="absolute left-0 top-0 hidden will-change-transform lg:block"
                style={{ visibility: "hidden" }}
              >
                <div className="hub-label">
                  <span className="hub-label-title">{l.title}</span>
                  <span className="hub-label-detail">{l.detail}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="absolute inset-y-0 start-0 hidden w-[46%] bg-gradient-to-r from-white via-white/70 to-transparent lg:block rtl:bg-gradient-to-l" />
        <div className={`absolute inset-0 transition-colors duration-700 lg:hidden ${activeStage === 0 ? "bg-white/10" : "bg-white/75"}`} />
      </div>

      {/* Scrolling content */}
      <div className="relative z-10">
        {/* 0 · Hero */}
        <div data-step="0" className="flex min-h-[100svh] items-end pb-14 pt-28 lg:items-center lg:pb-16">
          <div className="shell">
            <div className="max-w-[600px]">
              <p className="hero-fade mb-7 flex flex-wrap gap-x-3 text-[0.95rem] font-medium" aria-label={tagline[locale].join(" ")}>
                {tagline[locale].map((w, i) => (
                  <span key={i} className="hero-verb text-lilac" aria-hidden>
                    {w}
                  </span>
                ))}
              </p>
              <h1 className="t-display text-ink">
                {titleLines.map((line, i) => (
                  <span key={i} className="hero-line block overflow-hidden pb-[0.08em]">
                    <span className="block">{line}</span>
                  </span>
                ))}
              </h1>
              <p className="hero-fade t-lead mt-7 max-w-[34rem]">{t(hero.body)}</p>
              <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
                <LinkButton href={site.links.trial} magnetic>
                  {t(ui.cta.trial)}
                </LinkButton>
                <LinkButton href={href(locale, "/#modules")} variant="secondary">
                  {t(ui.cta.explore)}
                </LinkButton>
              </div>
              <p className="hero-fade mt-5 text-sm text-slate">{t(hero.trialNote)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => scrollToStep(1)}
            className="hero-fade absolute bottom-6 start-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-sm text-slate hover:text-brand-strong md:flex rtl:translate-x-1/2"
          >
            <ChevronDown size={16} aria-hidden className={reduced ? "" : "animate-bounce"} />
            {t({ en: "See how it works", ar: "شاهد كيف يعمل" })}
          </button>
        </div>

        {/* 1 · Problem */}
        <div data-step="1" className="flex min-h-[110svh] items-center py-24">
          <div className="shell">
            <div className="chapter-copy max-w-[44rem] rounded-3xl bg-white/70 p-6 backdrop-blur-sm sm:p-0 sm:bg-transparent sm:backdrop-blur-none">
              <h2 className="t-h1 text-ink">{t(problem.title)}</h2>
              <p className="t-lead mt-6 max-w-[36rem]">{t(problem.body)}</p>
            </div>
          </div>
        </div>

        {/* 2–6 · Chapters */}
        {chapters.map((c, i) => {
          const Mock = mocks[i];
          const idx = i + 2;
          return (
            <div key={c.id} id={`chapter-${c.id}`} data-step={idx} className="flex min-h-[125svh] items-center py-20">
              <div className="shell grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,400px)_1fr_minmax(0,460px)] lg:gap-6 xl:grid-cols-[minmax(0,420px)_1fr_minmax(0,480px)]">
                <div className="chapter-copy">
                  <p className="flex items-baseline gap-3">
                    <span className="text-sm tabular-nums text-slate" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="t-h1 text-brand-deep">{t(c.verb)}</span>
                  </p>
                  <h2 className="t-h3 mt-5 text-ink">{t(c.title)}</h2>
                  <p className="t-body mt-3">{t(c.body)}</p>
                  <ul className="mt-5 space-y-2.5">
                    {c.points.map((p, j) => (
                      <li key={j} className="flex gap-2.5 text-[0.95rem] text-ink">
                        <Check size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                        <span>{t(p)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden lg:block" aria-hidden />
                <div className="chapter-mock">
                  <Mock active={activeStage === idx || reduced} />
                </div>
              </div>
            </div>
          );
        })}

        {/* 7 · Unified */}
        <div data-step="7" className="flex min-h-[110svh] items-center py-24">
          <div className="shell">
            <div className="chapter-copy max-w-[40rem]">
              <h2 className="t-h1 text-ink">{t(unified.title)}</h2>
              <p className="t-lead mt-6">{t(unified.body)}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <LinkButton href={site.links.trial} magnetic>
                  {t(ui.cta.trial)}
                </LinkButton>
                <LinkButton href={href(locale, "/features")} variant="secondary">
                  {t(ui.cta.allFeatures)}
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter rail */}
      <nav
        aria-label={t({ en: "Story chapters", ar: "فصول القصة" })}
        className={`fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 transition-all duration-500 ${
          showRail ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <ol className="flex max-w-full gap-0.5 overflow-x-auto rounded-full bg-white/85 p-1 shadow-lift ring-1 ring-line backdrop-blur-xl">
          {chapters.map((c, i) => {
            const on = activeStage === i + 2;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  tabIndex={showRail ? 0 : -1}
                  onClick={() => scrollToStep(i + 2)}
                  aria-current={on ? "step" : undefined}
                  className={`h-9 rounded-full px-2.5 text-[0.82rem] transition-colors sm:px-4 sm:text-sm ${on ? "bg-brand text-white" : "text-slate hover:text-ink"}`}
                >
                  {t(c.verb)}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
}
