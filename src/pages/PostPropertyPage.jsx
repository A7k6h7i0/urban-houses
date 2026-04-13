import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { MultiStepPropertyForm } from "../components/forms/MultiStepPropertyForm";
import { SectionHeading } from "../components/ui/SectionHeading";
import { propertyService } from "../services/propertyService";
import { filesToDataUrls } from "../utils/files";

export function PostPropertyPage() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (form) => {
      const imageUrls = await filesToDataUrls(form.images || []);
      const property = await propertyService.create({
        title: form.title,
        description: form.description,
        purpose: form.purpose,
        type: form.type,
        city: form.city,
        locality: form.locality,
        price: Number(form.price),
        area: Number(form.area),
        bedrooms: Number(form.bedrooms || 0),
        bathrooms: Number(form.bathrooms || 0),
        ownerName: form.ownerName || user?.name || "Owner",
        ownerEmail: form.ownerEmail || user?.email || "",
        ownerPhone: form.ownerPhone,
        ownerId: user?.id || "usr_001",
        featured: false,
        status: "Pending",
        images: imageUrls.length ? imageUrls : [],
        amenities: [],
      });

      if (form.screenshot) {
        const screenshotUrl = await filesToDataUrls([form.screenshot]).then((files) => files[0]);
        await propertyService.submitPaymentProof(property.id, {
          screenshot: screenshotUrl,
          submittedBy: form.ownerName || user?.name || "Owner",
        });
      }

      return property;
    },
    onSuccess: async (property) => {
      await queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.toast({
        title: "Property submitted",
        description: "Listing saved as pending review. Admin can approve and feature it after payment verification.",
        type: "success",
      });
      navigate(`/property/${property.id}`);
    },
    onError: (error) => {
      toast.toast({ title: "Unable to submit listing", description: error.message, type: "error" });
    },
  });

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <SectionHeading
        eyebrow="Post Property"
        title="A polished multi-step posting flow built for conversion"
        description="This flow keeps the user moving, validates important fields, and supports manual featured listing payment in one place."
      />
      <div className="mt-8">
        <MultiStepPropertyForm onSubmit={(form) => createMutation.mutateAsync(form)} />
      </div>
    </div>
  );
}
