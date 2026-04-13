import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-300">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">This page does not exist</h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">The route may have changed or the listing has been removed. Head back to the homepage and continue browsing.</p>
      <Button as={Link} to="/" className="mt-8">
        Go home
      </Button>
    </div>
  );
}
