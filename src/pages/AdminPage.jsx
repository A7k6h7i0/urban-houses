import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, Star, Clock3, FileImage } from "lucide-react";
import { adminService } from "../services/adminService";
import { Card } from "../components/ui/Card";
import { Tabs } from "../components/ui/Tabs";
import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { formatCompact, formatDate } from "../utils/formatters";
import { useToast } from "../context/ToastContext";
import { EmptyState } from "../components/ui/EmptyState";

export function AdminPage() {
  const [tab, setTab] = useState("approvals");
  const queryClient = useQueryClient();
  const toast = useToast();

  const query = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => adminService.getDashboard(),
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, status }) => adminService.approveProperty(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      await queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.toast({ title: "Listing updated", description: "Approval status has been saved.", type: "success" });
    },
  });

  const featureMutation = useMutation({
    mutationFn: ({ id, featured }) => adminService.markFeatured(id, featured),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      await queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.toast({ title: "Featured flag updated", description: "The listing ranking has been adjusted.", type: "success" });
    },
  });

  const verifyMutation = useMutation({
    mutationFn: ({ id, status }) => adminService.verifyPayment(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      await queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.toast({ title: "Payment verified", description: "Property is now eligible for featured placement.", type: "success" });
    },
  });

  const tabs = useMemo(
    () => [
      { label: "Approvals", value: "approvals" },
      { label: "Payments", value: "payments" },
      { label: "Users", value: "users" },
    ],
    [],
  );

  const data = query.data;

  return (
    <div className="w-full space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Listings" value={data?.stats.totalListings ?? 0} icon={ShieldCheck} />
        <StatCard label="Pending" value={data?.stats.pendingListings ?? 0} icon={Clock3} tone="accent" />
        <StatCard label="Featured" value={data?.stats.featuredListings ?? 0} icon={Star} tone="emerald" />
        <StatCard label="Payments" value={data?.stats.pendingPayments ?? 0} icon={FileImage} tone="cyan" />
      </div>

      <Card className="p-4">
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
      </Card>

      {tab === "approvals" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Approve or reject listings</h2>
          <div className="mt-5 space-y-4">
            {data?.listings?.length ? data.listings.map((listing) => (
              <div key={listing.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-white">{listing.title}</p>
                      <Badge variant={listing.featured ? "featured" : listing.status === "Approved" ? "approved" : listing.status === "Rejected" ? "rejected" : "pending"}>{listing.status}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{listing.locality}, {listing.city} - {formatCompact(listing.price)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => approveMutation.mutate({ id: listing.id, status: "Approved" })}>Approve</Button>
                    <Button variant="danger" onClick={() => approveMutation.mutate({ id: listing.id, status: "Rejected" })}>Reject</Button>
                    <Button variant="accent" onClick={() => featureMutation.mutate({ id: listing.id, featured: true })}>Feature</Button>
                  </div>
                </div>
              </div>
            )) : <EmptyState title="No listing data" description="Listings will appear here when they are submitted." />}
          </div>
        </Card>
      )}

      {tab === "payments" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Verify payment screenshots</h2>
          <div className="mt-5 space-y-4">
            {data?.payments?.length ? data.payments.map((payment) => (
              <div key={payment.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="grid gap-4 md:grid-cols-[220px_1fr_auto] md:items-center">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
                    {payment.screenshot ? (
                      <img src={payment.screenshot} alt={payment.propertyTitle} className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-white/5 text-xs uppercase tracking-[0.24em] text-slate-500">No screenshot</div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{payment.propertyTitle}</p>
                    <p className="mt-2 text-sm text-slate-400">Submitted by {payment.submittedBy} on {formatDate(payment.submittedAt)}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">Status: {payment.status}</p>
                  </div>
                  <div className="flex gap-2 md:justify-end">
                    <Button variant="secondary" onClick={() => verifyMutation.mutate({ id: payment.id, status: "Pending" })}>Keep pending</Button>
                    <Button variant="accent" onClick={() => verifyMutation.mutate({ id: payment.id, status: "Verified" })}>Verify</Button>
                  </div>
                </div>
              </div>
            )) : <EmptyState title="No payment screenshots" description="Manual payment verification requests will appear here." />}
          </div>
        </Card>
      )}

      {tab === "users" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Manage users</h2>
          <div className="mt-5 space-y-4">
            {data?.users?.map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{user.email}</p>
                </div>
                <Badge variant="outline">{user.role}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
