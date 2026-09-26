import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-navy-950 px-6 pt-24 text-center text-white">
      <div>
        <p className="text-sm font-semibold tracking-[0.3em] text-sun uppercase">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">الصفحة دي مش موجودة</h1>
        <p className="mt-4 text-white/60" dir="ltr">
          This page doesn&apos;t exist.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/trips" className="btn btn-primary">شوف العروض</Link>
          <Link href="/" className="btn btn-ghost-light">الرئيسية</Link>
        </div>
      </div>
    </section>
  );
}
