import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-brand-500 text-white hover:bg-brand-400 shadow-[0_20px_50px_rgba(51,126,240,0.24)]",
  secondary: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
  ghost: "text-slate-200 hover:bg-white/5",
  accent: "bg-accent-500 text-slate-950 hover:bg-accent-400 shadow-[0_20px_50px_rgba(255,157,26,0.22)]",
  danger: "bg-rose-500 text-white hover:bg-rose-400",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-sm",
};

export function Button({ as: Component = "button", variant = "primary", size = "md", className, ...props }) {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400/40 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
