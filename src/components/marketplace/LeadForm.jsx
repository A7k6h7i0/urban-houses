import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { validateLead } from "../../utils/validators";

export function LeadForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validateLead(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    try {
      await onSubmit(form);
      setForm({ name: "", phone: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="field-label">Full Name</label>
        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
        {errors.name && <p className="mt-2 text-xs text-rose-300">{errors.name}</p>}
      </div>
      <div>
        <label className="field-label">Phone</label>
        <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit phone number" />
        {errors.phone && <p className="mt-2 text-xs text-rose-300">{errors.phone}</p>}
      </div>
      <div>
        <label className="field-label">Message</label>
        <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Share your requirement" />
        {errors.message && <p className="mt-2 text-xs text-rose-300">{errors.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Contact Owner"}
      </Button>
    </form>
  );
}
