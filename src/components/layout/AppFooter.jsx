import { Link } from "react-router-dom";
import { Sparkles, Instagram, Linkedin, Youtube } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/50">
      <div className="grid w-full gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-400 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Urban Houses</p>
              <p className="text-xs text-slate-400">Premium property discovery</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            A polished, control-first real estate marketplace for city launches, verified listings, and manual feature upgrades.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Explore</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <Link className="block transition hover:text-white" to="/listings">Listings</Link>
            <Link className="block transition hover:text-white" to="/post-property">Post Property</Link>
            <Link className="block transition hover:text-white" to="/dashboard">Dashboard</Link>
            <Link className="block transition hover:text-white" to="/admin">Admin</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Connect</p>
          <div className="mt-4 flex gap-3 text-slate-300">
            <Instagram className="h-5 w-5" />
            <Linkedin className="h-5 w-5" />
            <Youtube className="h-5 w-5" />
          </div>
          <p className="mt-4 text-sm text-slate-400">Built to scale from one city to many with a clean operational flow.</p>
        </div>
      </div>
    </footer>
  );
}
