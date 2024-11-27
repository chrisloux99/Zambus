"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Bus,
  LayoutDashboard,
  MapPin,
  Settings,
  Users,
  Calendar,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard/company",
    icon: LayoutDashboard,
  },
  {
    title: "Routes",
    href: "/dashboard/company/routes",
    icon: MapPin,
  },
  {
    title: "Buses",
    href: "/dashboard/company/buses",
    icon: Bus,
  },
  {
    title: "Schedules",
    href: "/dashboard/company/schedules",
    icon: Calendar,
  },
  {
    title: "Customers",
    href: "/dashboard/company/customers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/company/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-card border-r min-h-screen p-4">
      <div className="flex items-center space-x-2 mb-8">
        <Bus className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">ZamBus</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 w-52">
        <Link
          href="/logout"
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}