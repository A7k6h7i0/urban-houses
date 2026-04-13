import { Button } from "./Button";

export function EmptyState({ title, description, actionLabel, onAction, icon: Icon }) {
  return (
    <div className="panel flex flex-col items-center justify-center px-6 py-16 text-center">
      {Icon && (
        <div className="mb-5 rounded-3xl border border-white/10 bg-white/5 p-4 text-brand-300">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
