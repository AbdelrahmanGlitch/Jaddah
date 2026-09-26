"use client";

import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { allPhones, chatLink, company, isConfigured, toWhatsAppDigits } from "@/data/company";
import { images } from "@/data/images";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";

type Channel = {
  key: string;
  label: string;
  icon: LucideIcon | typeof FacebookIcon;
  /** One or more lines; each line may have its own link */
  lines: { text: string; href?: string; ltr?: boolean }[];
  /** Whole-card link (single-line channels) */
  href?: string;
  ready: boolean;
  wide?: boolean;
};

export function Contact() {
  const { t, l } = useLang();

  // Only channels published by LAVIE TOURS are shown (see data/company.ts).
  const all: Channel[] = [
    {
      key: "whatsapp",
      label: t.contact.whatsappLabel,
      icon: WhatsAppIcon,
      lines: company.bookingLines.map((n) => ({ text: n, href: chatLink(undefined, toWhatsAppDigits(n)).href, ltr: true })),
      ready: company.bookingLines.length > 0,
    },
    {
      key: "phone",
      label: t.contact.phone,
      icon: Phone,
      lines: allPhones.map((p) => ({ text: p, href: `tel:${p}`, ltr: true })),
      ready: allPhones.length > 0,
    },
    { key: "email", label: t.contact.email, icon: Mail, lines: [{ text: company.email, ltr: true }], href: `mailto:${company.email}`, ready: isConfigured(company.email) },
    ...company.offices.map((o) => ({
      key: `office-${o.city.en}`,
      label: `${t.contact.location} — ${l(o.city)}`,
      icon: MapPin,
      lines: [{ text: l(o.address) }],
      ready: true,
    })),
    {
      key: "facebook",
      label: t.contact.facebook,
      icon: FacebookIcon,
      lines: [{ text: `facebook.com/${company.facebook.username}`, ltr: true }],
      href: company.facebook.url,
      ready: true,
      wide: true,
    },
  ];
  const cards = all.filter((c) => c.ready);

  return (
    <section id="contact" className="relative bg-mist py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} text={t.contact.text} />
            <ImageReveal className="relative mt-12 hidden aspect-[5/4] overflow-hidden rounded-2xl lg:block">
              <Image src={images.dayzCourtyardNight} alt="" fill sizes="40vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-navy-950/75 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6">
                <p className="text-lg font-semibold text-white">{t.booking.preferWhatsapp}</p>
                <a href={chatLink().href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp py-3">
                  <WhatsAppIcon className="size-4" />
                  {t.contact.messageUs}
                </a>
              </div>
            </ImageReveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2">
              {cards.map((c, i) => {
                const Icon = c.icon;
                const body = (
                  <>
                    <span className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-full bg-mist text-ocean ring-1 ring-line transition-all duration-500 group-hover:bg-ocean group-hover:text-white group-hover:ring-ocean">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                      {c.href && <ArrowUpRight className="size-5 text-muted/50 transition group-hover:text-ocean rtl:-scale-x-100" />}
                    </span>
                    <span className="mt-8 block text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">{c.label}</span>
                    {c.lines.length === 1 && !c.lines[0].href ? (
                      <span className="mt-1.5 block text-lg leading-snug font-semibold text-navy-900" dir={c.lines[0].ltr ? "ltr" : undefined}>
                        {c.lines[0].text}
                      </span>
                    ) : (
                      <span className="mt-1.5 grid gap-1">
                        {c.lines.map((line) =>
                          line.href ? (
                            <a
                              key={line.text}
                              href={line.href}
                              target={line.href.startsWith("http") ? "_blank" : undefined}
                              rel="noopener noreferrer"
                              dir={line.ltr ? "ltr" : undefined}
                              className="text-start text-lg font-semibold text-navy-900 tabular-nums rtl:text-right transition-colors hover:text-ocean"
                            >
                              {line.text}
                            </a>
                          ) : (
                            <span key={line.text} className="text-[15px] leading-relaxed font-medium text-navy-900">
                              {line.text}
                            </span>
                          ),
                        )}
                      </span>
                    )}
                  </>
                );
                return (
                  <Reveal key={c.key} delay={(i % 2) * 0.08} className={c.wide ? "bg-white sm:col-span-2" : "bg-white"}>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="group block h-full p-7 transition-colors hover:bg-sand-50 sm:p-8"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="group h-full p-7 sm:p-8">{body}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
