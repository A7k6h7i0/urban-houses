import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, MapPin, ShieldCheck, PhoneCall, MessageSquare, Star, Bath, BedDouble, Ruler, IndianRupee } from "lucide-react";
import { PropertyGallery } from "../components/marketplace/PropertyGallery";
import { LeadForm } from "../components/marketplace/LeadForm";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { propertyService } from "../services/propertyService";
import { formatCompact, formatDate } from "../utils/formatters";
import { useToast } from "../context/ToastContext";
import { EmptyState } from "../components/ui/EmptyState";

export function PropertyDetailsPage() {
  const { id } = useParams();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState("overview");

  const propertyQuery = useQuery({
    queryKey: ["property", id],
    queryFn: () => propertyService.getById(id),
  });

  const leadMutation = useMutation({
    mutationFn: (payload) => propertyService.createLead(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["property", id] });
      toast.toast({ title: "Lead sent successfully", description: "The owner can now review the contact request.", type: "success" });
    },
    onError: (error) => toast.toast({ title: "Unable to send lead", description: error.message, type: "error" }),
  });

  const property = propertyQuery.data;
  const tabs = useMemo(() => ["overview", "amenities", "contact"], []);

  if (propertyQuery.isLoading) {
    return <div className="w-full px-4 py-12 text-slate-300 sm:px-6 lg:px-10">Loading property...</div>;
  }

  if (!property) {
    return (
      <div className="w-full px-4 py-12 sm:px-6 lg:px-10">
        <EmptyState
          title="Property not found"
          description="The listing may have been removed or the ID is invalid."
          actionLabel="Back to listings"
          onAction={() => window.location.assign("/listings")}
        />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.75fr]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {property.featured && <Badge variant="featured">Featured</Badge>}
            <Badge variant="outline">{property.status}</Badge>
            <Badge variant="outline">{property.type}</Badge>
            <Badge variant="outline">{property.purpose}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-5xl">{property.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-300">
            <MapPin className="h-4 w-4" /> {property.locality}, {property.city}
            <span className="mx-2 h-1 w-1 rounded-full bg-slate-500" />
            <CalendarDays className="h-4 w-4" /> Posted {formatDate(property.postedAt)}
          </p>

          <div className="mt-6">
            <PropertyGallery images={property.images} title={property.title} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <InfoPill icon={BedDouble} label={`${property.bedrooms || 0} Beds`} />
            <InfoPill icon={Bath} label={`${property.bathrooms || 0} Baths`} />
            <InfoPill icon={Ruler} label={`${property.area} sq ft`} />
            <InfoPill icon={IndianRupee} label={formatCompact(property.price)} />
            <InfoPill icon={Star} label={property.featured ? "Priority placement" : "Standard placement"} />
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${selectedTab === tab ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/5"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {selectedTab === "overview" && (
              <Card className="p-6">
                <SectionHeading eyebrow="Overview" title="Property summary" />
                <p className="mt-4 text-sm leading-7 text-slate-300">{property.description}</p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <MetaRow label="Owner" value={property.ownerName} />
                  <MetaRow label="Contact" value={property.ownerPhone} />
                  <MetaRow label="Lead count" value={`${property.leadCount || 0} leads`} />
                  <MetaRow label="Payment status" value={property.paymentStatus || "Not Started"} />
                </div>
              </Card>
            )}
            {selectedTab === "amenities" && (
              <Card className="p-6">
                <SectionHeading eyebrow="Amenities" title="What comes with this property" />
                <div className="mt-5 flex flex-wrap gap-3">
                  {property.amenities?.map((item) => (
                    <Badge key={item} variant="outline" className="px-3 py-2 normal-case tracking-normal">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
            {selectedTab === "contact" && (
              <Card className="p-6">
                <SectionHeading eyebrow="Contact Owner" title="Capture a lead with minimal friction" />
                <div className="mt-5">
                  <LeadForm onSubmit={(payload) => leadMutation.mutateAsync(payload)} />
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-brand-500/18 to-accent-500/10 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-300">Ask Price</p>
              <p className="mt-2 text-4xl font-semibold text-white">{formatCompact(property.price)}</p>
              <p className="mt-3 text-sm text-slate-300">Premium property detail view with prominent CTA, trust markers, and manual payment upgrade flow.</p>
            </div>
            <div className="space-y-4 p-6">
              <Button className="w-full" onClick={() => setSelectedTab("contact")}>
                <MessageSquare className="h-4 w-4" />
                Contact Owner
              </Button>
              <Button as={Link} to="/post-property" variant="secondary" className="w-full">
                Upgrade to Featured
              </Button>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <div className="flex items-center gap-2 text-white"><ShieldCheck className="h-4 w-4 text-emerald-300" /> Verified workflow</div>
                <p className="mt-2 leading-6">Manual payment proof is uploaded in the post flow and verified by admin before the listing becomes featured.</p>
              </div>
              <Button as="a" href={`tel:${property.ownerPhone.replace(/\s+/g, "")}`} variant="secondary" className="w-full">
                <PhoneCall className="h-4 w-4" />
                Call owner
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoPill({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
      <Icon className="h-4 w-4 text-brand-300" />
      {label}
    </span>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
