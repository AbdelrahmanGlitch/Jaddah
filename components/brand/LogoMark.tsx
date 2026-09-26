import Image from "next/image";
import { company } from "@/data/company";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Full lockup with the "LAVIE TOURS" wordmark — off at small sizes (navbar), where only the mark reads */
  withText?: boolean;
  title?: string;
  preload?: boolean;
};

/** The LAVIE TOURS logo (from the company's Facebook profile picture) in a white round badge. */
export function LogoMark({ className, withText = false, title = `${company.name} — ${company.displayName.ar}`, preload }: Props) {
  return (
    <span className={cn("relative block overflow-hidden rounded-full bg-white", className)}>
      <Image
        src={withText ? company.logo.full : company.logo.mark}
        alt={title}
        fill
        sizes="(max-width: 640px) 96px, 160px"
        preload={preload}
        className={cn("object-contain", withText ? "scale-[1.02]" : "p-[9%]")}
      />
    </span>
  );
}
