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
        withText={lg}
        className={cn(
          "shrink-0 drop-shadow-[0_4px_14px_rgba(7,21,38,0.25)] transition-transform duration-500 ease-(--ease-premium) group-hover:scale-105",
          lg ? "size-24" : "size-12",
        )}
      />
      <span className={cn("flex flex-col leading-none transition-colors duration-500", light ? "text-white" : "text-navy-900")}>
        <span className="text-[15px] font-bold tracking-[0.32em]">{company.logo.top}</span>
        <span className={cn("mt-1 text-[10px] font-medium tracking-[0.52em]", light ? "text-white/70" : "text-ocean")}>{company.logo.bottom}</span>
      </span>
    </Link>
  );
}
