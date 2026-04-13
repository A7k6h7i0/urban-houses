import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, ShieldCheck, Building2, TrendingUp, Users, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { propertyService } from "../services/propertyService";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { PropertyCard } from "../components/marketplace/PropertyCard";
import { FeaturedCarousel } from "../components/marketplace/FeaturedCarousel";
import { Skeleton } from "../components/ui/Skeleton";
import { StatCard } from "../components/ui/StatCard";
import { featuredCities } from "../constants/cities";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { queryKeys } from "../constants/queryKeys";
import { placeholderImage } from "../utils/placeholders";

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const featuredQuery = useQuery({ queryKey: queryKeys.featuredProperties, queryFn: () => propertyService.getFeatured({ limit: 6 }) });
  const latestQuery = useQuery({ queryKey: queryKeys.latestProperties, queryFn: () => propertyService.getLatest({ limit: 8 }) });

  const stats = useMemo(
    () => [
      { label: "Verified Cities", value: "08+", icon: Building2, tone: "brand" },
      { label: "Monthly Leads", value: "1.2k", icon: Users, tone: "emerald" },
      { label: "Featured Uplift", value: "3.8x", icon: TrendingUp, tone: "accent" },
      { label: "Trust Score", value: "98%", icon: ShieldCheck, tone: "cyan" },
    ],
    [],
  );

  const submit = (event) => {
    event.preventDefault();
    navigate(`/listings?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-5 py-10 shadow-soft sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div variants={heroVariants} initial="hidden" animate="show">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <Zap className="h-4 w-4 text-amber-300" />
              Dynamic property marketplace with manual featured upgrades
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Built to make property discovery feel premium, fast, and trustworthy.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Search, post, approve, and feature listings from one control-first marketplace. Designed for a city-by-city launch with strong conversion and admin visibility.
            </p>

            <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search 2BHK in Hyderabad, plots under 20 lakhs..." className="pl-11" />
              </div>
              <Button type="submit" size="lg" className="sm:w-auto">
                Search Properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredCities.slice(0, 6).map((city) => (
                <Link key={city} to={`/listings?city=${encodeURIComponent(city)}`} className="chip transition hover:bg-white/10">
                  {city}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="space-y-4"
          >
            <Card className="overflow-hidden">
              <img src={featuredQuery.data?.items?.[0]?.images?.[0] || placeholderImage("Featured property")} alt="Featured property" className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-brand-300">Featured hero listing</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{featuredQuery.data?.items?.[0]?.title || "Curated premium homes"}</h2>
                  </div>
                  <Badge variant="outline">{featuredQuery.data?.items?.[0]?.featured ? "Featured" : "Live"}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{featuredQuery.data?.items?.[0]?.description || "Handpicked listings with verified details and strong lead potential."}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Featured inventory"
          title="Listings the marketplace should spotlight first"
          description="Featured properties are visually stronger, top-ranked, and clearly labeled to drive better owner and buyer engagement."
          action={
            <Button as={Link} to="/listings" variant="secondary">
              View all listings
            </Button>
          }
        />
        <div className="mt-6">
          {featuredQuery.isLoading ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="aspect-[4/3] rounded-3xl" />)}
            </div>
          ) : (
            <FeaturedCarousel items={featuredQuery.data?.items || []} />
          )}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Fresh supply"
          title="Latest properties added to the platform"
          description="A live grid with clean hierarchy, quick actions, and visually consistent cards that work across cities."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {latestQuery.isLoading
            ? Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="aspect-[4/3] rounded-3xl" />)
            : latestQuery.data?.items?.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">Why this works</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">A product story built around trust and control</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FeatureLine title="Admin approval" text="All properties can be reviewed before going live." />
            <FeatureLine title="Lead capture" text="Every property becomes a direct lead-generation asset." />
            <FeatureLine title="Manual feature flow" text="UPI + screenshot upload keeps payment simple and controllable." />
            <FeatureLine title="Endpoint ready" text="Services are centralized so the backend can be swapped with minimal changes." />
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-300">Product promise</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Designed to shock users in the first 10 seconds</h3>
          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
            <p>Premium gradients, strong hierarchy, sticky actions, skeletons, and motion-driven affordances give the app a modern SaaS feel.</p>
            <p>The UI remains dynamic, data-driven, and scalable enough to expand from one city to a large marketplace later.</p>
          </div>
          <Button as={Link} to="/post-property" className="mt-6" variant="accent">
            Start posting
          </Button>
        </Card>
      </section>
    </div>
  );
}

function FeatureLine({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}
