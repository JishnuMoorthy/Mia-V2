import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { APP_NAME } from "@/lib/constants";
import {
  LayoutDashboard,
  PawPrint,
  Users,
  CalendarDays,
  Receipt,
  Package,
  UserCog,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, adminOnly: false },
  { to: "/pets", label: "Pets", icon: PawPrint, adminOnly: false },
  { to: "/owners", label: "Owners", icon: Users, adminOnly: false },
  { to: "/appointments", label: "Appointments", icon: CalendarDays, adminOnly: false },
  { to: "/billing", label: "Billing", icon: Receipt, adminOnly: true },
  { to: "/inventory", label: "Inventory", icon: Package, adminOnly: true },
  { to: "/staff", label: "Staff", icon: UserCog, adminOnly: true },
];

export function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const visibleItems = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-sidebar-accent text-primary"
        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
    }`;

  const sidebar = (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-accent px-5">
        <PawPrint className="h-7 w-7 text-primary" />
        <span className="font-display text-lg font-bold tracking-tight">{APP_NAME}</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={linkClasses}
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-accent p-4">
        <div className="mb-3 text-xs text-sidebar-foreground/60">
          <p className="font-medium text-sidebar-foreground">{user?.name}</p>
          <p className="capitalize">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">{sidebar}</div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 h-full w-64">{sidebar}</div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <div className="text-sm text-muted-foreground">
            Welcome, <span className="font-medium text-foreground">{user?.name}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
