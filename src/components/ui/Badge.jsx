import { cn } from "../../utils/cn";

const variants = {
  default: "border-white/10 bg-white/5 text-slate-200",
  featured: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  pending: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  rejected: "border-rose-400/20 bg-rose-400/10 text-rose-300",
  verified: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  outline: "border-white/15 bg-transparent text-slate-200",
};

export function Badge({ variant = "default", className, children }) {
  return <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em]", variants[variant], className)}>{children}</span>;
}
