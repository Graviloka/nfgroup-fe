import { ReactNode } from "react";

type ToggleOption = {
  label: string;
  value: string;
};

type TogglePillGroupProps = {
  label: string;
  name: string;
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  legendClassName?: string;
  pillClassName?: string;
  layoutClassName?: string;
  helperText?: string;
  appearance?: "pill" | "segmented";
};

function TogglePillGroup({
  label,
  name,
  options,
  value,
  onChange,
  legendClassName,
  pillClassName,
  layoutClassName,
  helperText,
  appearance = "pill",
}: TogglePillGroupProps) {
  const legendId = `${name}-legend`;
  const helperId = helperText ? `${name}-helper` : undefined;

  const groupClasses =
    layoutClassName ??
    (appearance === "segmented"
      ? "grid grid-cols-2 gap-1"
      : "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2");

  return (
    <fieldset className="space-y-3">
      <legend
        id={legendId}
        className={`text-sm font-semibold text-neutral-800 ${legendClassName ?? ""}`}
      >
        {label}
      </legend>
      <div
        role="radiogroup"
        aria-labelledby={legendId}
        aria-describedby={helperId}
        className={groupClasses}
      >
        {options.map((option) => {
          const isActive = option.value === value;

          const baseClasses =
            appearance === "segmented"
              ? "rounded-md border px-3 py-2 text-sm font-medium transition-colors"
              : "rounded-lg border px-4 py-2.5 text-sm font-medium transition";

          const activeClasses =
            appearance === "segmented"
              ? "border-gray-200 bg-white text-neutral-900 shadow-sm"
              : "border-neutral-900/80 bg-white text-neutral-900 shadow-[0_6px_18px_rgba(15,23,42,0.08)]";

          const inactiveClasses =
            appearance === "segmented"
              ? "border-transparent bg-transparent text-neutral-600 hover:bg-white/60 hover:text-neutral-900"
              : "border-transparent bg-[#f3f4f6] text-neutral-600 hover:text-neutral-800";

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(option.value)}
              className={`${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 ${
                pillClassName ?? ""
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {helperText ? (
        <p id={helperId} className="text-xs font-medium text-neutral-500">
          {helperText}
        </p>
      ) : null}
    </fieldset>
  );
}

export { TogglePillGroup, type ToggleOption, type TogglePillGroupProps };
