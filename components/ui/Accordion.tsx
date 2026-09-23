"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import type { FaqItem } from "@/lib/types";

export function Accordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const { l } = useLang();
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-start"
            >
              <span className={cn("text-lg font-semibold tracking-tight transition-colors", isOpen ? "text-ocean" : "text-navy-900 group-hover:text-ocean")}>{l(item.question)}</span>
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500",
                  isOpen ? "rotate-45 border-ocean bg-ocean text-white" : "border-line text-navy-900 group-hover:border-navy-900",
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pe-12 pb-6 text-[15px] leading-relaxed text-muted">{l(item.answer)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
