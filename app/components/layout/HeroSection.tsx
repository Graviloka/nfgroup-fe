export function HeroSection() {
  return (
    <section id="hero-section" className="relative lg:min-h-[50vh] lg:h-screen w-full overflow-hidden bg-neutral-900 text-white lg:w-[50%]">
      <img
        src="/2253821.png"
        alt="Hero background"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-black/70" />
      <div className="relative flex h-full flex-col px-8 py-12 sm:px-12 lg:px-16 lg:py-[96px]">
        <header className="flex items-center gap-3 mb-10">
          <img src="/nfgroup_logo.svg" alt="NF Group Logo" className="h-10 w-auto brightness-0 invert" />
        </header>
        <div className="max-w-md space-y-2">
          <h1 className="lg:text-6xl font-black leading-tight text-5xl">List with Us</h1>
          <p className="text-xl text-white/85">
            Looking to <strong className="text-white">sell</strong> or <strong className="text-white">rent</strong> out your property?{" "}
            <strong className="text-white">List your property with us</strong> — we help
            owners reach verified <strong className="text-white">buyers</strong> and reliable <strong className="text-white">renters</strong> through our proven marketing and sales
            network.
          </p>
        </div>
        {/* <div className="mt-10 h-px w-16" /> */}
      </div>
    </section>
  );
}
