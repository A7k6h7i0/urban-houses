import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import { navigation } from "../../constants/navigation";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

export function AppHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-400 text-white shadow-soft">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-brand-300">Urban Houses</p>
            <p className="text-sm text-slate-300">Real estate marketplace</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {navigation.slice(0, 4).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/5 hover:text-white",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button as={Link} to="/post-property" variant="accent" className="hidden sm:inline-flex">
            Post Property
          </Button>
          <Button as={Link} to={user ? "/dashboard" : "/auth"} variant="secondary" className="hidden sm:inline-flex">
            {user ? user.name : "Login"}
          </Button>
          <button type="button" onClick={() => setOpen((current) => !current)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex w-full flex-col gap-2 px-4 sm:px-6 lg:px-10">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/5 hover:text-white",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
