import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { PropertyCard } from "./PropertyCard";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { formatCompact } from "../../utils/formatters";
import { placeholderImage } from "../../utils/placeholders";

export function FeaturedCarousel({ items = [] }) {
  const ref = useRef(null);
  const leadItem = items[0];
  const collage = [
    leadItem?.images?.[0] || placeholderImage(leadItem?.title || "Featured listing"),
    leadItem?.images?.[1] || placeholderImage("Urban inventory"),
    leadItem?.images?.[2] || placeholderImage("City spotlight"),
  ];

  const scroll = (direction) => {
    const container = ref.current;
    if (!container) return;
    const amount = direction === "left" ? -420 : 420;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-stretch">
      <div className="space-y-4">
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={() => scroll("left")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm" onClick={() => scroll("right")}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div ref={ref} className="flex gap-5 overflow-x-auto pb-2 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
          {items.map((property) => (
            <div key={property.id} className="min-w-[320px] max-w-[320px] snap-start lg:min-w-[420px] lg:max-w-[420px]">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-28">
        <Card className="relative h-full overflow-hidden p-5">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-transparent to-accent-500/20" />
          <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">Market pulse</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Featured now</h3>
              </div>
              <Badge variant="featured">{items.length} live</Badge>
            </div>

            <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
              <div className="grid grid-cols-2 gap-2 p-2">
                <img src={collage[0]} alt="Featured collage 1" className="aspect-[4/5] rounded-2xl object-cover" />
                <div className="grid gap-2">
                  <img src={collage[1]} alt="Featured collage 2" className="aspect-[4/5] rounded-2xl object-cover" />
                  <img src={collage[2]} alt="Featured collage 3" className="aspect-[16/10] rounded-2xl object-cover" />
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric label="Top price" value={leadItem ? formatCompact(leadItem.price) : "—"} />
              <Metric label="Leads" value={leadItem?.leadCount ?? 0} />
              <Metric label="City" value={leadItem?.city || "—"} />
              <Metric label="Type" value={leadItem?.type || "—"} />
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Why featured?</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Highlighted listings get priority placement, stronger visual weight, and more trust from buyers exploring the marketplace.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}
