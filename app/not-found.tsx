import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center bg-navy-950 px-6 pt-24 text-center text-white">
      <div>
        <p className="text-sm font-semibold tracking-[0.3em] text-gold uppercase">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">This journey doesn&apos;t exist — yet.</h1>
        <p className="mt-4 text-white/60">The page you&apos;re looking for may have moved.</p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/trips" className="btn btn-primary">Explore Trips</Link>
          <Link href="/" className="btn btn-ghost-light">Home</Link>
        </div>
      </div>
    </section>
  );
}
