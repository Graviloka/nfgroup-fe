import { ReactNode } from "react";

type SectionCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
};

function SectionCard({ icon, title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-lg border border-[#e2e4ea] bg-white px-5 py-4 shadow-[0_10px_28px_-20px_rgba(15,23,42,0.3)]">
      <header className="flex items-start gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-neutral-600 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
          {icon}
        </span>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
      </header>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export { SectionCard, type SectionCardProps };
