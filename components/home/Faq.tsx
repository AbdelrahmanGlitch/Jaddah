"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { faqs } from "@/data/faqs";
import { chatLink } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const { t } = useLang();

  return (
    <section id="faq" className="bg-white py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} text={t.faq.text} />
            <Reveal delay={0.1}>
              <a href={chatLink().href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-8">
                <WhatsAppIcon className="size-4" />
                {t.faq.ask}
                <ArrowUpRight className="size-4 rtl:-scale-x-100" />
              </a>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1} className="lg:col-span-8">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
