import { Home, Search, PlusCircle, LayoutDashboard, Shield, LogIn } from "lucide-react";

export const navigation = [
  { label: "Home", to: "/", icon: Home },
  { label: "Listings", to: "/listings", icon: Search },
  { label: "Post Property", to: "/post-property", icon: PlusCircle },
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Admin", to: "/admin", icon: Shield },
  { label: "Login", to: "/auth", icon: LogIn },
];
