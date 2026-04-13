import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, MessageSquare, Clock3, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { dashboardService } from "../services/dashboardService";
import { StatCard } from "../components/ui/StatCard";
import { Tabs } from "../components/ui/Tabs";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { formatCompact, formatDate } from "../utils/formatters";
import { EmptyState } from "../components/ui/EmptyState";

export function DashboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("listings");
  const query = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: () => dashboardService.getDashboard(user?.id || "usr_001"),
  });

  const tabs = useMemo(
    () => [
      { label: "My Listings", value: "listings" },
      { label: "Leads Received", value: "leads" },
      { label: "Payments", value: "payments" },
    ],
    [],
  );

  const data = query.data;
  const myListings = data?.listings || [];
  const myLeads = data?.leads || [];
  const paymentListings = myListings.filter((item) => item.paymentStatus && item.paymentStatus !== "Not Started");

  return (
    <div className="w-full space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Listings" value={data?.stats.totalListings ?? 0} icon={LayoutGrid} />
        <StatCard label="Approved" value={data?.stats.approved ?? 0} icon={Sparkles} tone="emerald" />
        <StatCard label="Pending" value={data?.stats.pending ?? 0} icon={Clock3} tone="accent" />
        <StatCard label="Leads" value={data?.stats.leads ?? 0} icon={MessageSquare} tone="cyan" />
      </div>

      <Card className="p-4">
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
      </Card>

      {tab === "listings" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">My Listings</h2>
          <div className="mt-5 space-y-4">
            {myListings.length ? myListings.map((listing) => (
              <div key={listing.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">{listing.title}</h3>
                    <Badge variant={listing.featured ? "featured" : listing.status === "Approved" ? "approved" : "pending"}>{listing.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{listing.locality}, {listing.city} - Posted {formatDate(listing.postedAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">{formatCompact(listing.price)}</p>
                  <p className="text-sm text-slate-400">{listing.leadCount || 0} leads</p>
                </div>
              </div>
            )) : <EmptyState title="No listings yet" description="Post your first property to start collecting leads." />}
          </div>
        </Card>
      )}

      {tab === "leads" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Lead Inbox</h2>
          <div className="mt-5 space-y-4">
            {myLeads.length ? myLeads.map((lead) => (
              <div key={lead.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{lead.name}</p>
                  <span className="text-xs text-slate-400">{formatDate(lead.createdAt)}</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{lead.message}</p>
                <p className="mt-3 text-sm text-slate-400">{lead.phone}</p>
              </div>
            )) : <EmptyState title="No leads yet" description="Once users contact your properties, the leads will appear here." />}
          </div>
        </Card>
      )}

      {tab === "payments" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Payment Requests</h2>
          <div className="mt-5 space-y-4">
            {paymentListings.length ? paymentListings.map((listing) => (
              <div key={listing.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{listing.title}</p>
                <p className="mt-2 text-sm text-slate-400">Payment status: {listing.paymentStatus}</p>
              </div>
            )) : <EmptyState title="No payment records" description="Payment proofs will appear after a user uploads a screenshot." />}
          </div>
        </Card>
      )}
    </div>
  );
}
