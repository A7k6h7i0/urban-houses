import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { PropertyFilters } from "../components/marketplace/PropertyFilters";
import { PropertyCard } from "../components/marketplace/PropertyCard";
import { PropertyCardSkeleton } from "../components/marketplace/PropertyCardSkeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { SectionHeading } from "../components/ui/SectionHeading";
import { propertyService } from "../services/propertyService";
import { useDebounce } from "../hooks/useDebounce";
import { queryKeys } from "../constants/queryKeys";

export function ListingsPage() {
  const [params, setParams] = useSearchParams();
  const [view, setView] = useState("grid");
  const [filters, setFilters] = useState({
    q: params.get("q") || "",
    city: params.get("city") || "",
    type: "All",
    purpose: "All",
    minPrice: "",
    maxPrice: "",
    sort: "recommended",
  });
  const debouncedQuery = useDebounce(filters.q, 300);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const next = new URLSearchParams();
    if (filters.city) next.set("city", filters.city);
    if (filters.q) next.set("q", filters.q);
    setParams(next, { replace: true });
  }, [filters.city, filters.q, setParams]);

  const query = useInfiniteQuery({
    queryKey: [...queryKeys.properties, "search", { ...filters, q: debouncedQuery }],
    queryFn: ({ pageParam = 0 }) =>
      propertyService.search({
        ...filters,
        q: debouncedQuery,
        offset: pageParam,
        limit: 8,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.hasMore ? pages.length * 8 : undefined),
  });

  const items = useMemo(() => query.data?.pages.flatMap((page) => page.items) || [], [query.data]);
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  useEffect(() => {
    const element = sentinelRef.current;
    if (!element || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const reset = () => setFilters({ q: "", city: "", type: "All", purpose: "All", minPrice: "", maxPrice: "", sort: "recommended" });

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <SectionHeading
        eyebrow="Marketplace"
        title="Search, filter, and compare properties with precision"
        description="Built for buyers, renters, owners, and admins with a search experience that feels responsive and premium."
      />

      <div className="mt-8">
        <PropertyFilters
          value={filters}
          onChange={setFilters}
          onReset={reset}
          onViewToggle={() => setView((current) => (current === "grid" ? "list" : "grid"))}
          view={view}
        />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <span>{query.isLoading ? "Loading properties..." : `${items.length} results`}</span>
        <span className="inline-flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Infinite scroll enabled</span>
      </div>

      {query.isLoading ? (
        <div className={view === "grid" ? "mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "mt-6 grid gap-5"}>
          {Array.from({ length: 6 }).map((_, index) => <PropertyCardSkeleton key={index} view={view} />)}
        </div>
      ) : items.length ? (
        <motion.div layout className={view === "grid" ? "mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "mt-6 space-y-5"}>
          {items.map((property) => (
            <PropertyCard key={property.id} property={property} view={view} />
          ))}
        </motion.div>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon={Filter}
            title="No properties matched your filters"
            description="Try a broader locality, different type, or a larger budget range to uncover more inventory."
            actionLabel="Reset filters"
            onAction={reset}
          />
        </div>
      )}

      <div ref={sentinelRef} className="py-8 text-center text-sm text-slate-500">
        {isFetchingNextPage ? "Loading more properties..." : hasNextPage ? "Scroll for more" : "End of results"}
      </div>
    </div>
  );
}
