export function HeroSection() {
  return (
    <section id="hero-section" className="relative min-h-[50vh] lg:h-screen w-full overflow-hidden bg-neutral-900 text-white lg:w-[50%]">
      <img
        src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1800&q=80"
        alt="Coastal view"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-black/70" />
      <div className="relative flex h-full flex-col justify-between px-8 py-12 sm:px-12 lg:px-16 lg:py-[96px]">
        <header className="flex items-center gap-3">
          <img src="/nfgroup_logo.svg" alt="NF Group Logo" className="h-10 w-auto brightness-0 invert" />
        </header>
        <div className="max-w-md space-y-5">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">List with Us</h1>
          <p className="text-base text-white/85">
            Looking to sell or rent out your property?{" "}
            <span className="font-semibold text-white">List your property with us</span> — we help
            owners reach verified buyers and reliable renters through our proven marketing and sales
            network.
          </p>
        </div>
        <div className="mt-10 h-px w-16 bg-white/50" />
      </div>
    </section>
  );
}
