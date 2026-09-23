"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CalendarDays, Compass, MapPin, Search } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { trips } from "@/data/trips";
import { destinations } from "@/data/destinations";
import { formatMonthName } from "@/lib/format";
import { availableCategories, departureMonths } from "@/lib/trip-filters";
import { Reveal } from "@/components/ui/Reveal";

/** Quick search bar straddling the hero — routes to the filtered /trips page. */
export function TripFinder() {
  const { t, l, lang } = useLang();
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");
  const [month, setMonth] = useState("");

  const destinationOptions = useMemo(() => destinations.filter((d) => trips.some((tr) => tr.destinationId === d.id)), []);
  const months = useMemo(() => departureMonths(), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (type) params.set("type", type);
    if (month) params.set("month", month);
    const qs = params.toString();
    router.push(`/trips${qs ? `?${qs}` : ""}`);
  };

  const fields = [
    { icon: MapPin, label: t.finder.destination, value: destination, set: setDestination, any: t.finder.anyDestination, options: destinationOptions.map((d) => ({ value: d.id, label: l(d.name) })) },
    { icon: Compass, label: t.finder.type, value: type, set: setType, any: t.finder.anyType, options: availableCategories().map((c) => ({ value: c, label: t.categories[c] })) },
    { icon: CalendarDays, label: t.finder.month, value: month, set: setMonth, any: t.finder.anyMonth, options: months.map((m) => ({ value: m, label: formatMonthName(m, lang) })) },
  ];

  return (
    <section id="finder" className="relative z-10 -mt-16 sm:-mt-14">
      <div className="container-x">
        <Reveal y={40}>
          <form
            onSubmit={submit}
            className="grid gap-px overflow-hidden rounded-lg bg-line shadow-[0_40px_80px_-40px_rgba(11,31,51,0.45)] ring-1 ring-navy-900/5 md:grid-cols-[1fr_1fr_1fr_auto]"
            aria-label={t.finder.title}
          >
            {fields.map(({ icon: Icon, label, value, set, any, options }) => (
              <label key={label} className="group flex items-center gap-4 bg-white px-5 py-4 transition-colors focus-within:bg-mist sm:px-6 sm:py-5">
                <Icon className="size-5 shrink-0 text-ocean" strokeWidth={1.6} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[10.5px] font-semibold tracking-[0.18em] text-muted uppercase">{label}</span>
                  <select
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="select-chevron -ms-0.5 mt-1 w-full cursor-pointer bg-transparent bg-[position:right_0_center] text-[15px] font-semibold text-navy-900 outline-none rtl:bg-[position:left_0_center]"
                  >
                    <option value="">{any}</option>
                    {options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            ))}
            <div className="bg-white p-3">
              <button type="submit" className="btn btn-dark h-full w-full rounded-md px-8 py-4 hover:bg-ocean">
                <Search className="size-4" />
                {t.finder.search}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
