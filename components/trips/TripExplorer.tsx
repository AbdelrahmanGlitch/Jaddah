"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Info, RotateCcw, SearchX, SlidersHorizontal, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { lowestAdultPrice, trips } from "@/data/trips";
import { destinations } from "@/data/destinations";
import { company } from "@/data/company";
import { formatMonthName } from "@/lib/format";
import { activeFilterCount, applyFilters, availableCategories, departureMonths, emptyFilters, type TripFilters } from "@/lib/trip-filters";
import { TripCard } from "./TripCard";

export function TripExplorer({ initial }: { initial: Partial<TripFilters> }) {
  const { t, l, lang } = useLang();
  const [filters, setFilters] = useState<TripFilters>({ ...emptyFilters, ...initial });
  const [sheetOpen, setSheetOpen] = useState(false);

  const categories = useMemo(() => availableCategories(), []);
  const destinationOptions = useMemo(() => destinations.filter((d) => trips.some((tr) => tr.destinationId === d.id)), []);
  const months = useMemo(() => departureMonths(), []);
  // Only offer filters the data can answer (Lavie's posts have no prices, durations or dates yet).
  const hasDurations = useMemo(() => trips.some((tr) => tr.durationDays !== undefined), []);
  const hasPrices = useMemo(() => trips.some((tr) => lowestAdultPrice(tr) !== undefined), []);
  const canSort = hasPrices || months.length > 0;
  const results = useMemo(() => applyFilters([...trips], filters), [filters]);
  const activeCount = activeFilterCount(filters);

  const update = <K extends keyof TripFilters>(key: K, value: TripFilters[K]) => setFilters((f) => ({ ...f, [key]: value }));
  const reset = () => setFilters(emptyFilters);

  // Keep the URL shareable (?destination=…&type=…) without triggering navigation.
  useEffect(() => {
    const params = new URLSearchParams();
    (["destination", "type", "duration", "price", "month"] as const).forEach((k) => filters[k] && params.set(k, filters[k]));
    if (filters.sort !== "soonest") params.set("sort", filters.sort);
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, [filters]);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const selects = (
    <>
      <FilterSelect label={t.listing.destination} value={filters.destination} onChange={(v) => update("destination", v)} any={t.listing.any}
        options={destinationOptions.map((d) => ({ value: d.id, label: l(d.name) }))} />
      {hasDurations && (
        <FilterSelect label={t.listing.duration} value={filters.duration} onChange={(v) => update("duration", v as TripFilters["duration"])} any={t.listing.any}
          options={(["short", "medium", "long"] as const).map((d) => ({ value: d, label: t.listing.durations[d] }))} />
      )}
      {hasPrices && (
        <FilterSelect label={`${t.listing.price} (EGP)`} value={filters.price} onChange={(v) => update("price", v as TripFilters["price"])} any={t.listing.any}
          options={(["budget", "mid", "premium"] as const).map((p) => ({ value: p, label: t.listing.prices[p] }))} />
      )}
      {months.length > 0 && (
        <FilterSelect label={t.listing.month} value={filters.month} onChange={(v) => update("month", v)} any={t.listing.any}
          options={months.map((m) => ({ value: m, label: formatMonthName(m, lang) }))} />
      )}
      {canSort && (
        <FilterSelect label={t.listing.sort} value={filters.sort} onChange={(v) => update("sort", v as TripFilters["sort"])}
          options={[
            { value: "soonest", label: t.listing.sortSoonest },
            ...(hasPrices
              ? [
                  { value: "priceLow", label: t.listing.sortPriceLow },
                  { value: "priceHigh", label: t.listing.sortPriceHigh },
                ]
              : []),
          ]} />
      )}
    </>
  );

  return (
    <div className="container-x pb-28">
      {/* Filter bar */}
      <div className="sticky top-[68px] z-30 -mx-5 border-b border-line bg-mist/90 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        <div className="flex items-center gap-3">
          <LayoutGroup id="type-chips">
            <div className="no-scrollbar -my-1 flex flex-1 gap-2 overflow-x-auto py-1">
              {(["", ...categories] as const).map((c) => {
                const selected = filters.type === c;
                return (
                  <button
                    key={c || "all"}
                    type="button"
                    onClick={() => update("type", c)}
                    className={cn(
                      "relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                      selected ? "text-white" : "bg-white text-ink/70 ring-1 ring-line hover:text-navy-900",
                    )}
                  >
                    {selected && <motion.span layoutId="type-pill" className="absolute inset-0 rounded-full bg-navy-900" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className="relative">{c ? t.categories[c] : t.trips.all}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="relative flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-navy-900 ring-1 ring-line lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            {t.listing.filters}
            {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-sun text-[11px] text-navy-950">{activeCount}</span>}
          </button>
        </div>

        <div className="mt-4 hidden grid-cols-4 items-end gap-3 lg:grid">{selects}</div>
      </div>

      {/* Results header */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          <motion.span key={results.length} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-semibold text-navy-900">
            {t.listing.results(results.length)}
          </motion.span>
        </p>
        <div className="flex items-center gap-4">
          {company.demoMode && (
            <p className="hidden items-center gap-2 text-xs text-muted sm:flex">
              <Info className="size-3.5 text-sun-deep" />
              {t.trips.demoNote}
            </p>
          )}
          {activeCount > 0 && (
            <button type="button" onClick={reset} className="flex items-center gap-1.5 text-sm font-semibold text-ocean hover:underline">
              <RotateCcw className="size-3.5" />
              {t.listing.reset}
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((trip, i) => (
            <motion.div
              key={trip.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <TripCard trip={trip} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {results.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-white text-ocean ring-1 ring-line">
              <SearchX className="size-7" strokeWidth={1.4} />
            </span>
            <h3 className="mt-6 text-2xl font-semibold text-navy-900">{t.listing.emptyTitle}</h3>
            <p className="mt-3 text-muted">{t.listing.emptyText}</p>
            <button type="button" onClick={reset} className="btn btn-dark mt-8">
              <RotateCcw className="size-4" />
              {t.listing.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <motion.div className="fixed inset-0 z-[60] flex items-end bg-navy-950/60 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheetOpen(false)}>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88svh] w-full overflow-y-auto rounded-t-2xl bg-white px-5 pt-3 pb-6"
              role="dialog"
              aria-modal="true"
              aria-label={t.listing.filters}
            >
              <div className="mx-auto h-1 w-10 rounded-full bg-line" />
              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-navy-900">{t.listing.filters}</h2>
                <button type="button" onClick={() => setSheetOpen(false)} className="grid size-10 place-items-center rounded-full ring-1 ring-line" aria-label={t.nav.close}>
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-6 grid gap-4">{selects}</div>
              <div className="mt-8 grid grid-cols-[auto_1fr] gap-3" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
                <button type="button" onClick={reset} className="btn btn-outline">
                  <RotateCcw className="size-4" />
                </button>
                <button type="button" onClick={() => setSheetOpen(false)} className="btn btn-dark">
                  {t.listing.showResults} ({results.length})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  any,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  any?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10.5px] font-semibold tracking-[0.16em] text-muted uppercase">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("field select-chevron cursor-pointer py-3 text-sm font-medium", value && any !== undefined && "border-ocean/50 bg-ocean/[0.03]")}
      >
        {any !== undefined && <option value="">{any}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
