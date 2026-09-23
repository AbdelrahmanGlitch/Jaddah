"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { steps } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorks() {
  const { t, l } = useLang();

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} align="center" />

        <ol className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-4 md:gap-8">
          {/* Horizontal line (desktop) */}
          <div className="absolute inset-x-[12.5%] top-8 hidden h-px bg-line md:block" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-linear-to-r from-ocean via-teal to-gold rtl:origin-right"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease }}
            />
          </div>
          {/* Vertical line (mobile) */}
          <div className="absolute inset-y-2 start-8 w-px bg-line md:hidden" aria-hidden="true">
            <motion.div
              className="w-full origin-top bg-linear-to-b from-ocean via-teal to-gold"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease }}
              className="relative flex gap-6 md:flex-col md:items-center md:text-center"
            >
              <span className="relative z-10 grid size-16 shrink-0 place-items-center rounded-full border border-line bg-white text-lg font-semibold text-navy-900 shadow-[0_10px_30px_-15px_rgba(11,31,51,0.3)] tabular-nums">
                0{i + 1}
                <span className="absolute -end-0.5 -top-0.5 size-3 rounded-full border-2 border-white bg-teal" />
              </span>
              <div className="pt-2 md:pt-6">
                <h3 className="text-xl font-semibold tracking-tight text-navy-900">{l(step.title)}</h3>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted md:mx-auto">{l(step.text)}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
