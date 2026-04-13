import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-mesh">
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
