"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n";
import { chatLink, company, isConfigured } from "@/data/company";
import { trips } from "@/data/trips";
import { FacebookIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { ChatIcon } from "@/components/ui/ChatIcon";

export function Footer() {
  const { t, l } = useLang();

  const quickLinks = [
    { href: "/", label: t.nav.home },
    { href: "/trips", label: t.nav.trips },
    { href: "/#destinations", label: t.nav.destinations },
    { href: "/#about", label: t.nav.about },
    { href: "/#why-us", label: t.nav.whyUs },
    { href: "/#faq", label: t.nav.faq },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-white">
      {/* Oversized wordmark */}
      <div className="pointer-events-none absolute -bottom-[0.18em] inset-x-0 text-center text-[19vw] leading-none font-bold tracking-tighter text-white/[0.025] select-none" dir="ltr">
        JEDDAH
      </div>

      <div className="container-x relative pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" size="lg" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">{l(company.description)}</p>
            <div className="mt-8 flex gap-3">
              <a href={company.facebook.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:border-teal hover:bg-teal hover:text-navy-950">
                <FacebookIcon className="size-5" />
              </a>
              {isConfigured(company.instagram) && (
                <a href={company.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:border-teal hover:bg-teal hover:text-navy-950">
                  <InstagramIcon className="size-5" />
                </a>
              )}
              <a href={chatLink().href} target="_blank" rel="noopener noreferrer" aria-label={t.booking.chat} className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:border-teal hover:bg-teal hover:text-navy-950">
                <ChatIcon className="size-5" />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{t.footer.quickLinks}</h3>
              <ul className="mt-6 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[15px] text-white/65 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{t.footer.trips}</h3>
              <ul className="mt-6 space-y-3">
                {trips.slice(0, 6).map((trip) => (
                  <li key={trip.id}>
                    <Link href={`/trips/${trip.id}`} className="text-[15px] text-white/65 transition hover:text-white">
                      {l(trip.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{t.footer.contact}</h3>
              <ul className="mt-6 space-y-4 text-[15px] text-white/65">
                {company.phones.length > 0 && (
                  <li className="flex items-start gap-3">
                    <Phone className="mt-1 size-4 shrink-0 text-teal" strokeWidth={1.6} />
                    <span className="grid gap-1">
                      {company.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone}`} dir="ltr" className="text-start tabular-nums hover:text-white">
                          {phone}
                        </a>
                      ))}
                    </span>
                  </li>
                )}
                {isConfigured(company.email) && (
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 text-teal" strokeWidth={1.6} />
                    <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 size-4 shrink-0 text-teal" strokeWidth={1.6} />
                  <span>
                    <span className="block font-semibold text-white/85">{l(company.branch.name)}</span>
                    {l(company.branch.area)} — {l(company.branch.address)}
                  </span>
                </li>
                <li>
                  <a href={company.facebook.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 hover:text-white">
                    <FacebookIcon className="size-4 text-teal" />
                    <span dir="ltr">/{company.facebook.username}</span>
                    <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100 rtl:-scale-x-100" />
                  </a>
                </li>
                <li>
                  <a href={chatLink().href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                    <ChatIcon className="size-4 text-teal" />
                    {t.booking.chat}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {company.copyrightYear} {l(company.displayName)}. {t.footer.rights}
          </p>
          {company.demoMode && <p className="max-w-xl md:text-end">{t.footer.demo}</p>}
        </div>
      </div>
    </footer>
  );
}
