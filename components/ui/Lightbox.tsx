"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Props = {
  items: { src: string; alt: string; caption?: string }[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export function Lightbox({ items, index, onChange }: Props) {
  const { t, isRTL } = useLang();
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(isRTL ? -1 : 1);
      if (e.key === "ArrowLeft") go(isRTL ? 1 : -1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, onChange, isRTL]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white/70 sm:px-8">
            <span className="text-sm tabular-nums">
              {index! + 1} / {items.length}
            </span>
            <button type="button" aria-label={t.gallery.close} className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10">
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className="absolute inset-4 sm:inset-x-24 sm:inset-y-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label={t.gallery.prev} className="absolute start-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-navy-950/40 text-white backdrop-blur transition hover:bg-white/15 sm:start-6">
                  <ChevronLeft className="size-5 rtl:-scale-x-100" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={t.gallery.next} className="absolute end-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-navy-950/40 text-white backdrop-blur transition hover:bg-white/15 sm:end-6">
                  <ChevronRight className="size-5 rtl:-scale-x-100" />
                </button>
              </>
            )}
          </div>

          <p className="min-h-14 px-6 py-4 text-center text-sm text-white/70">{item.caption ?? item.alt}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
