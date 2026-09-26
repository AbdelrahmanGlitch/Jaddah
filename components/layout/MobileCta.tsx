"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { chatLink, company } from "@/data/company";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Floating bottom bar on phones — WhatsApp booking and a call button one tap away. */
export function MobileCta() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full border border-white/10 bg-navy-900/90 p-1.5 shadow-2xl shadow-navy-950/40 backdrop-blur-xl md:hidden"
          style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
        >
          <a href={chatLink().href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp flex-1 py-3">
            <WhatsAppIcon className="size-5" />
            {t.hero.cta1}
          </a>
          <a href={`tel:${company.bookingLines[0]}`} aria-label={t.nav.call} className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 text-white">
            <Phone className="size-5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
