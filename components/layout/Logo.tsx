import Link from "next/link";
import { company } from "@/data/company";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/brand/LogoMark";

type Props = { tone?: "light" | "dark"; size?: "md" | "lg"; className?: string };

export function Logo({ tone = "light", size = "md", className }: Props) {
  const light = tone === "light";
  const lg = size === "lg";
  return (
    <Link href="/" aria-label={company.name} className={cn("group flex items-center gap-3", className)} dir="ltr">
      <LogoMark
        preload={!lg}
        className={cn(
          "shrink-0 shadow-[0_4px_14px_rgba(12,33,48,0.18)] ring-1 ring-navy-900/5 transition-transform duration-500 ease-(--ease-premium) group-hover:scale-105",
          lg ? "size-20" : "size-12",
        )}
      />
      <span className={cn("flex items-baseline gap-1.5 font-display leading-none transition-colors duration-500", light ? "text-white" : "text-slate-brand")}>
        <span className={cn("font-bold tracking-[0.08em]", lg ? "text-3xl" : "text-[22px]")}>LAVIE</span>
        <span className={cn("font-medium tracking-[0.2em]", lg ? "text-base" : "text-[12px]", light ? "text-white/75" : "text-slate-brand/80")}>TOURS</span>
      </span>
    </Link>
  );
}
