import { cn } from "../../utils/cn";

export function SectionHeading({ eyebrow, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-brand-300">{eyebrow}</p>}
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">{description}</p>}
      </div>
      {action}
    </div>
  );
}
