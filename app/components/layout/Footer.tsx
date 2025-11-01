import { footerSections } from '../../constants/footer';

export function Footer() {
  return (
    <footer className="bg-[#7a1c1c] text-white z-10 relative">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-12 sm:px-10 lg:px-0">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center justify-center">
          <div className="flex items-center gap-3">
            <img src="/nfgroup_logo.svg" alt="NF Group Logo" className="h-10 w-auto brightness-0 invert" />
          </div>
        </div>
        <div className="grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-6">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
                {section.title}
              </p>
              {section.title === "Certified By" ? (
                <div className="flex gap-4 items-center">
                  <img src="/cert-lsp-property.png" alt="LSP Certification" className="h-20 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
                  <img src="/cert-arebi.png" alt="AREBI Certification" className="h-20 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
                </div>
              ) : section.title === "Socials" ? (
                <ul className="space-y-2 text-white/90">
                  {section.items.map((item) => (
                    <li key={typeof item === 'string' ? item : item.label}>
                      {typeof item === 'string' ? item : <a href={item.href} className="hover:underline">{item.label}</a>}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2 text-white/90">
                  {section.items.map((item) => (
                    <li key={typeof item === 'string' ? item : item.label}>
                      {typeof item === 'string' ? <a href="#" className="hover:underline">{item}</a> : <a href={item.href} className="hover:underline">{item.label}</a>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="hover:underline">The functional currency of trade in Indonesia is the Indonesian Rupiah (IDR).</a>
          <a href="#" className="hover:underline">©2025 NF Group | All Rights Reserved</a>
        </div>
      </div>
    </footer>
  );
}
