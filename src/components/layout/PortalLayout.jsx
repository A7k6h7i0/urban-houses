import { Outlet, NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Shield, Users, BarChart3, ArrowLeft, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

const navItems = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "Admin", to: "/admin", icon: Shield },
  { label: "Users", to: "/admin", icon: Users },
  { label: "Analytics", to: "/dashboard", icon: BarChart3 },
];

export function PortalLayout({ title }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-mesh">
      <div className="border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-300">Urban Houses</p>
            <h1 className="mt-1 text-lg font-semibold text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="h-4 w-4 text-slate-300" />
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">{user?.name || "Guest"}</div>
            <Button as={Link} to="/" variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Button>
          </div>
        </div>
      </div>
      <div className="grid w-full gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-10">
        <aside className="panel h-fit p-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/15 to-accent-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-brand-300">Workspace</p>
            <p className="mt-2 text-lg font-semibold text-white">Control center</p>
            <p className="mt-2 text-sm text-slate-300">Approve listings, verify payments, and manage marketplace trust.</p>
          </div>
          <nav className="mt-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) => cn("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition", isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/5")}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
