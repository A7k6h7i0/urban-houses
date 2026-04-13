import { useMemo, useState } from "react";
import { UploadCloud, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { upiDetails } from "../../constants/payment";
import { propertyGoals, propertyTypes } from "../../constants/propertyTypes";
import { validatePropertyForm } from "../../utils/validators";

const initial = {
  title: "",
  description: "",
  purpose: "Sell",
  type: "Apartment",
  city: "Hyderabad",
  locality: "",
  price: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  ownerName: "",
  ownerEmail: "",
  ownerPhone: "",
  paymentNote: "",
  images: [],
  screenshot: null,
};

export function MultiStepPropertyForm({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const progress = useMemo(() => Math.round((step / 4) * 100), [step]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleImages = (files) => {
    const list = Array.from(files || []);
    setForm((current) => ({ ...current, images: list }));
    setPreviewImages(list.map((file) => URL.createObjectURL(file)));
  };

  const next = () => {
    const nextErrors = validatePropertyForm(form, step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep((current) => Math.min(4, current + 1));
  };

  const prev = () => setStep((current) => Math.max(1, current - 1));

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validatePropertyForm(form, step, true);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    await onSubmit(form);
    setForm(initial);
    setPreviewImages([]);
    setStep(1);
  };

  return (
    <form onSubmit={submit} className="panel space-y-6 p-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Step {step} of 4</span>
          <span>{progress}% complete</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/8">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step === 1 && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="field-label">Property Title</label>
            <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Skyline Residences" />
            {errors.title && <p className="mt-2 text-xs text-rose-300">{errors.title}</p>}
          </div>
          <div>
            <label className="field-label">Purpose</label>
            <Select value={form.purpose} onChange={(e) => update("purpose", e.target.value)}>
              {propertyGoals.map((goal) => <option key={goal} value={goal}>{goal}</option>)}
            </Select>
          </div>
          <div>
            <label className="field-label">Type</label>
            <Select value={form.type} onChange={(e) => update("type", e.target.value)}>
              {propertyTypes.filter((item) => item !== "All").map((type) => <option key={type} value={type}>{type}</option>)}
            </Select>
          </div>
          <div>
            <label className="field-label">City</label>
            <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
          </div>
          <div>
            <label className="field-label">Locality</label>
            <Input value={form.locality} onChange={(e) => update("locality", e.target.value)} placeholder="Area / locality" />
            {errors.locality && <p className="mt-2 text-xs text-rose-300">{errors.locality}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="field-label">Description</label>
            <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Highlight location, connectivity, amenities, and differentiators" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="field-label">Price</label>
            <Input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="Price in INR" />
            {errors.price && <p className="mt-2 text-xs text-rose-300">{errors.price}</p>}
          </div>
          <div>
            <label className="field-label">Area (sq ft)</label>
            <Input type="number" value={form.area} onChange={(e) => update("area", e.target.value)} />
            {errors.area && <p className="mt-2 text-xs text-rose-300">{errors.area}</p>}
          </div>
          <div>
            <label className="field-label">Bedrooms</label>
            <Input type="number" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} />
            {errors.bedrooms && <p className="mt-2 text-xs text-rose-300">{errors.bedrooms}</p>}
          </div>
          <div>
            <label className="field-label">Bathrooms</label>
            <Input type="number" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} />
            {errors.bathrooms && <p className="mt-2 text-xs text-rose-300">{errors.bathrooms}</p>}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
            <UploadCloud className="mx-auto h-8 w-8 text-brand-300" />
            <p className="mt-3 text-sm font-semibold text-white">Upload listing images</p>
            <p className="mt-1 text-sm text-slate-300">Choose multiple images. They will be previewed instantly for a polished posting flow.</p>
            <input type="file" multiple accept="image/*" onChange={(e) => handleImages(e.target.files)} className="mt-5 block w-full text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-brand-500 file:px-4 file:py-2 file:text-white hover:file:bg-brand-400" />
          </div>
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {previewImages.map((src) => (
                <img key={src} src={src} alt="Preview" className="aspect-square rounded-2xl object-cover" />
              ))}
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="field-label">Owner Name</label>
                <Input value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} />
                {errors.ownerName && <p className="mt-2 text-xs text-rose-300">{errors.ownerName}</p>}
              </div>
              <div>
                <label className="field-label">Owner Email</label>
                <Input type="email" value={form.ownerEmail} onChange={(e) => update("ownerEmail", e.target.value)} />
                {errors.ownerEmail && <p className="mt-2 text-xs text-rose-300">{errors.ownerEmail}</p>}
              </div>
              <div>
                <label className="field-label">Owner Phone</label>
                <Input type="tel" value={form.ownerPhone} onChange={(e) => update("ownerPhone", e.target.value)} />
                {errors.ownerPhone && <p className="mt-2 text-xs text-rose-300">{errors.ownerPhone}</p>}
              </div>
              <div>
                <label className="field-label">Payment Note</label>
                <Input value={form.paymentNote} onChange={(e) => update("paymentNote", e.target.value)} placeholder="Property ID / reference note" />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Payment screenshot</p>
              <input type="file" accept="image/*" onChange={(e) => update("screenshot", e.target.files?.[0] || null)} className="mt-4 block w-full text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-brand-500 file:px-4 file:py-2 file:text-white hover:file:bg-brand-400" />
            </div>
          </div>

          <div className="panel-strong p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">Manual Payment</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div><span className="text-slate-500">Payee:</span> {upiDetails.payeeName}</div>
              <div><span className="text-slate-500">UPI ID:</span> {upiDetails.upiId}</div>
              <div><span className="text-slate-500">Bank:</span> {upiDetails.bankName}</div>
              <div><span className="text-slate-500">Account:</span> {upiDetails.accountNumber}</div>
              <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-slate-300">{upiDetails.note}</p>
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
              <CheckCircle2 className="mb-2 h-5 w-5" />
              Admin verifies the screenshot and toggles the property into Featured after confirmation.
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
        <Button type="button" variant="secondary" onClick={prev} disabled={step === 1}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {step < 4 ? (
          <Button type="button" onClick={next}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit">
            Publish Listing
            <CheckCircle2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
