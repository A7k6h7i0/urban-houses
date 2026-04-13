import { cn } from "../../utils/cn";

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "rounded-xl px-4 py-2 text-sm font-semibold transition",
            value === tab.value ? "bg-white text-slate-950 shadow-soft" : "text-slate-300 hover:bg-white/8",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
