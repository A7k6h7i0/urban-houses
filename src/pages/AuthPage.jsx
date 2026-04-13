import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { AuthForm } from "../components/forms/AuthForm";
import { loginUser, signupUser } from "../services/authService";
import { Card } from "../components/ui/Card";

export function AuthPage() {
  const [mode, setMode] = useState("login");
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async (form) => {
    const user = mode === "signup" ? await signupUser(form) : await loginUser(form);
    login(user);
    toast.toast({ title: `${mode === "signup" ? "Account created" : "Welcome back"}`, description: `Signed in as ${user.name}`, type: "success" });
    navigate(user.role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="flex w-full items-center px-4 py-8 sm:px-6 lg:min-h-[calc(100vh-140px)] lg:px-10">
      <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-300">Authentication</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Clean login and signup screens that feel as premium as the marketplace itself.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
            This is UI-first authentication for the frontend. When you connect the real backend, keep the same flow and just swap the service functions.
          </p>
          <div className="mt-8 flex gap-3">
            <Button variant={mode === "login" ? "primary" : "secondary"} onClick={() => setMode("login")}>Login</Button>
            <Button variant={mode === "signup" ? "primary" : "secondary"} onClick={() => setMode("signup")}>Signup</Button>
          </div>
        </div>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-white">{mode === "signup" ? "Create your account" : "Login to continue"}</h2>
          <p className="mt-2 text-sm text-slate-300">{mode === "signup" ? "Owners and agents can post listings and manage leads." : "Use your marketplace account to access dashboard and admin areas."}</p>
          <div className="mt-6">
            <AuthForm key={mode} mode={mode} onSubmit={submit} />
          </div>
        </Card>
      </div>
    </div>
  );
}
