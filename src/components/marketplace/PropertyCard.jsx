import { Link } from "react-router-dom";
import { BedDouble, Bath, Ruler, MapPin, Heart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { formatCompact } from "../../utils/formatters";
import { cn } from "../../utils/cn";
import { placeholderImage } from "../../utils/placeholders";

export function PropertyCard({ property, view = "grid", className }) {
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 240, damping: 20 }}>
      <Card className={cn("overflow-hidden", className)}>
        <Link to={`/property/${property.id}`} className={cn("group block", view === "list" ? "md:flex" : "")}>
          <div className={cn("relative overflow-hidden", view === "list" ? "md:w-[320px] md:shrink-0" : "aspect-[4/3]")}>
            <img
              src={property.images?.[0] || placeholderImage(property.title)}
              alt={property.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {property.featured && <Badge variant="featured">Featured</Badge>}
              <Badge variant="outline">{property.purpose}</Badge>
            </div>
            <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-slate-950/50 p-2 text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white">
              <Heart className="h-4 w-4" />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-2xl font-semibold text-white">{formatCompact(property.price)}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-200">
                <MapPin className="h-4 w-4" />
                {property.locality}, {property.city}
              </p>
            </div>
          </div>

          <div className={cn("p-5", view === "list" ? "flex-1" : "")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-300">{property.type}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{property.title}</h3>
              </div>
              <ArrowUpRight className="mt-1 h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </div>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{property.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="chip"><BedDouble className="h-3.5 w-3.5" />{property.bedrooms || "N/A"} Beds</span>
              <span className="chip"><Bath className="h-3.5 w-3.5" />{property.bathrooms || "N/A"} Baths</span>
              <span className="chip"><Ruler className="h-3.5 w-3.5" />{property.area} sq ft</span>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
              <span>{property.ownerName}</span>
              <span>{property.leadCount || 0} leads</span>
            </div>
          </div>
        </Link>
      </Card>
    </motion.article>
  );
}
