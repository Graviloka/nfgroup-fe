function HeroStepBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/15 text-white">
        <svg
          aria-hidden="true"
          className="h-4.5 w-4.5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16.75 8.75c0 2.623-2.127 4.75-4.75 4.75S7.25 11.373 7.25 8.75 9.377 4 12 4s4.75 2.127 4.75 4.75Z"
            stroke="currentColor"
            strokeWidth={1.6}
          />
          <path
            d="M5 20.5c.642-2.864 3.059-4.75 7-4.75 3.941 0 6.358 1.886 7 4.75"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-sm font-medium tracking-tight text-white/90">
        {label}
      </span>
    </div>
  );
}

export { HeroStepBadge };
