import { createContext, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "../utils/cn";

const ToastContext = createContext(null);

function ToastViewport({ toasts, dismiss }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-soft backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className={cn("mt-0.5 rounded-full p-2", toast.type === "success" && "bg-emerald-500/15 text-emerald-300", toast.type === "error" && "bg-rose-500/15 text-rose-300", toast.type === "info" && "bg-brand-500/15 text-brand-300")}>
              {toast.type === "success" && <CheckCircle2 className="h-4 w-4" />}
              {toast.type === "error" && <AlertTriangle className="h-4 w-4" />}
              {toast.type === "info" && <Info className="h-4 w-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">{toast.title}</p>
              {toast.description && <p className="mt-1 text-sm text-slate-300">{toast.description}</p>}
            </div>
            <button onClick={() => dismiss(toast.id)} className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = (id) => setToasts((current) => current.filter((toast) => toast.id !== id));

  const value = useMemo(() => ({
    toast({ title, description, type = "info", duration = 3200 }) {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, title, description, type }]);
      window.setTimeout(() => dismiss(id), duration);
    },
  }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
