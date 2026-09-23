"use client";

import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
  children?: React.ReactNode;
};

export function SectionHeading({ eyebrow, title, text, tone = "light", align = "start", className, children }: Props) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <span className={cn("eyebrow", dark ? "text-sand/80" : "text-ocean", align === "center" && "justify-center")}>{eyebrow}</span>
      <h2 className={cn("heading-lg rtl-leading mt-5 text-balance", dark ? "text-white" : "text-navy-900")}>{title}</h2>
      {text && <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-white/65" : "text-muted")}>{text}</p>}
      {children}
    </Reveal>
  );
}
