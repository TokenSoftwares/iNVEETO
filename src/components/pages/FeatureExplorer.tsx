"use client";

import { useMemo, useState } from "react";
import { SearchField } from "@heroui/react";
import { AnimatePresence, motion } from "motion/react";
import { BookUser, CalendarCheck2, Megaphone, Sparkles } from "lucide-react";
import { modules, type ModuleId } from "@/content/features";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { useT } from "@/lib/locale-context";
import { LinkButton } from "@/components/ui/LinkButton";

const icons = { addressBook: BookUser, events: CalendarCheck2, campaigns: Megaphone };

/** Normalise Arabic + Latin for forgiving search (strip diacritics, unify alef/ya/ta marbuta). */
function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[ً-ٰٟ̀-ͯ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

export function FeatureExplorer() {
  const t = useT();
  const [query, setQuery] = useState("");
  const [mod, setMod] = useState<ModuleId | "all">("all");
  const [onlyNew, setOnlyNew] = useState(false);

  const q = norm(query.trim());
  const filtered = useMemo(
    () =>
      modules
        .filter((m) => mod === "all" || m.id === mod)
        .map((m) => ({
          ...m,
          groups: m.groups
            .map((g) => ({
              ...g,
              items: g.items.filter((f) => {
                if (onlyNew && !f.isNew) return false;
                if (!q) return true;
                const hay = norm(`${f.title.en} ${f.desc.en} ${f.title.ar} ${f.desc.ar} ${g.title.en} ${g.title.ar}`);
                return q.split(/\s+/).every((w) => hay.includes(w));
              }),
            }))
            .filter((g) => g.items.length > 0),
        }))
        .filter((m) => m.groups.length > 0),
    [q, mod, onlyNew],
  );
  const count = filtered.reduce((a, m) => a + m.groups.reduce((b, g) => b + g.items.length, 0), 0);
  const clear = () => {
    setQuery("");
    setMod("all");
    setOnlyNew(false);
  };

  const pill = (on: boolean) =>
    `chip h-10 px-4 text-[0.9rem] ring-1 transition-colors ${on ? "bg-brand text-white ring-brand" : "bg-white text-slate ring-line hover:text-ink"}`;

  return (
    <div>
      <div className="sticky top-[84px] z-30 -mx-4 bg-white/85 px-4 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:px-4 sm:ring-1 sm:ring-line">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchField aria-label={t(ui.features.searchLabel)} value={query} onChange={setQuery} className="w-full lg:max-w-sm">
            <SearchField.Group className="rounded-full">
              <SearchField.SearchIcon />
              <SearchField.Input placeholder={t(ui.features.searchPlaceholder)} />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t({ en: "Filter by module", ar: "تصفية حسب الوحدة" })}>
            <button type="button" aria-pressed={mod === "all"} onClick={() => setMod("all")} className={pill(mod === "all")}>
              {t(ui.features.all)}
            </button>
            {modules.map((m) => {
              const Icon = icons[m.id];
              return (
                <button key={m.id} type="button" aria-pressed={mod === m.id} onClick={() => setMod(m.id)} className={pill(mod === m.id)}>
                  <Icon size={15} aria-hidden /> {t(m.name)}
                </button>
              );
            })}
            <button type="button" aria-pressed={onlyNew} onClick={() => setOnlyNew((v) => !v)} className={pill(onlyNew)}>
              <Sparkles size={15} aria-hidden /> {t(ui.features.newOnly)}
            </button>
          </div>
          <p className="text-sm text-slate lg:ms-auto" aria-live="polite">
            <span className="font-medium tabular-nums text-ink">{count}</span> {t(ui.features.results)}
          </p>
        </div>
      </div>

      {count === 0 && (
        <div className="mt-16 rounded-3xl bg-mist p-10 text-center ring-1 ring-line">
          <p className="text-ink">{t(ui.features.empty)}</p>
          <button type="button" onClick={clear} className="btn btn-secondary btn-sm mt-5">
            {t(ui.features.clear)}
          </button>
        </div>
      )}

      <div className="mt-10 space-y-24">
        <AnimatePresence initial={false}>
          {filtered.map((m) => {
            const Icon = icons[m.id];
            return (
              <motion.section
                key={m.id}
                id={m.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-labelledby={`${m.id}-title`}
              >
                <div className="grid gap-8 lg:grid-cols-[0.7fr_1.8fr]">
                  <div className="lg:sticky lg:top-56 lg:self-start">
                    <span className="grid size-12 place-items-center rounded-2xl bg-lavender text-brand-deep">
                      <Icon size={22} aria-hidden />
                    </span>
                    <h2 id={`${m.id}-title`} className="t-h2 mt-5 text-ink">
                      {t(m.name)}
                    </h2>
                    <p className="mt-1 text-lg text-brand-strong">{t(m.verbs)}</p>
                    <p className="t-body mt-4">{t(m.intro)}</p>
                  </div>
                  <div className="space-y-12">
                    {m.groups.map((g) => (
                      <div key={g.id}>
                        <h3 className="border-b border-line pb-3 text-sm font-medium text-slate">{t(g.title)}</h3>
                        <ul className="grid gap-x-8 sm:grid-cols-2">
                          {g.items.map((f) => (
                            <motion.li layout key={f.id} className="border-b border-line py-5">
                              <h4 className="flex flex-wrap items-center gap-2 text-[1.02rem] font-medium text-ink">
                                {t(f.title)}
                                {f.isNew && <span className="chip h-5 bg-lavender px-2 text-[0.68rem] text-brand-deep">{t(ui.features.newBadge)}</span>}
                              </h4>
                              <p className="t-body mt-1.5 text-[0.95rem]">{t(f.desc)}</p>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-mist p-5 ring-1 ring-line">
                      <p className="max-w-[36rem] text-[0.95rem] text-ink">{t(m.outro)}</p>
                      <LinkButton href={site.links.selectPackage} size="sm">
                        {t({ en: "Try it free", ar: "جرّبه مجانًا" })}
                      </LinkButton>
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
