import { Card, CardBody } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";

export function PropertyCardSkeleton({ view = "grid" }) {
  return (
    <Card className="overflow-hidden">
      <div className={view === "list" ? "md:flex" : ""}>
        <Skeleton className={view === "list" ? "aspect-[4/3] md:w-[320px]" : "aspect-[4/3]"} />
        <CardBody className={view === "list" ? "flex-1" : ""}>
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-4 h-7 w-2/3" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-11/12" />
          <div className="mt-5 flex gap-3">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </CardBody>
      </div>
    </Card>
  );
}
