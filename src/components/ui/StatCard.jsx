import { Card, CardBody } from "./Card";

export function StatCard({ label, value, hint, icon: Icon, tone = "brand" }) {
  const toneStyles = {
    brand: "text-brand-300",
    accent: "text-amber-300",
    emerald: "text-emerald-300",
    cyan: "text-cyan-300",
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
            {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
          </div>
          {Icon && (
            <div className={`rounded-2xl border border-white/10 bg-white/5 p-3 ${toneStyles[tone]}`}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
