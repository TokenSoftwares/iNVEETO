import { StaticNetwork } from "@/components/three/StaticNetwork";

/** Shared hero for inner pages: quiet, left-aligned, with a faint echo of the homepage network. */
export function PageHero({
  title,
  body,
  children,
  aside,
  kicker,
}: {
  kicker?: React.ReactNode;
  title: string;
  body?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_85%_10%,#f0eaf8_0%,#ffffff_65%)] rtl:bg-[radial-gradient(60%_70%_at_15%_10%,#f0eaf8_0%,#ffffff_65%)]" aria-hidden />
      {!aside && (
        <StaticNetwork className="pointer-events-none absolute -end-40 -top-10 -z-10 hidden h-[560px] w-auto opacity-35 lg:block" />
      )}
      <div className={`shell ${aside ? "grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]" : ""}`}>
        <div className="max-w-[46rem]">
          {kicker && <div className="mb-6">{kicker}</div>}
          <h1 className="t-h1 text-ink">{title}</h1>
          {body && <p className="t-lead mt-6 max-w-[38rem]">{body}</p>}
          {children && <div className="mt-9">{children}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className={`mt-12 grid max-w-[46rem] gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line ${items.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
      {items.map((s) => (
        <div key={s.label} className="bg-white px-5 py-4">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block text-2xl font-semibold tabular-nums text-brand-deep" dir="ltr">
              {s.value}
            </span>
            <span className="mt-0.5 block text-sm text-slate">{s.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
