"use client";
import Link from "next/link";
import {
  Home,
  Box,
  ShoppingCart,
  Users,
  Gift,
  WorkflowIcon,
  Sidebar,
  GiftIcon,
} from "lucide-react";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: WorkflowIcon, label: "Categories", href: "/admin/categories" },
    { icon: Box, label: "Products", href: "/admin/products" },
    { icon: Gift, label: "Kits", href: "/admin/kits" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Users", href: "/admin/users" },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <GiftIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-lg font-semibold">Gift & Beeyond</h1>
            <p className="text-sm text-muted-foreground">Admin Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
