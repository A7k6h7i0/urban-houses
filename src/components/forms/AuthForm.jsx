import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { validateAuth } from "../../utils/validators";

export function AuthForm({ mode, onSubmit }) {
  const [form, setForm] = useState(mode === "signup" ? { name: "", email: "", password: "", role: "owner" } : { email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validateAuth(form, mode);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <label className="field-label">Full Name</label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
          {errors.name && <p className="mt-2 text-xs text-rose-300">{errors.name}</p>}
        </div>
      )}
      <div>
        <label className="field-label">Email</label>
        <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@company.com" />
        {errors.email && <p className="mt-2 text-xs text-rose-300">{errors.email}</p>}
      </div>
      <div>
        <label className="field-label">Password</label>
        <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter password" />
        {errors.password && <p className="mt-2 text-xs text-rose-300">{errors.password}</p>}
      </div>
      {mode === "signup" && (
        <div>
          <label className="field-label">Role</label>
          <select className="field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="owner">Property Owner</option>
            <option value="agent">Agent</option>
          </select>
        </div>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Login"}
      </Button>
    </form>
  );
}
