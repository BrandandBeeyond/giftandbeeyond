"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import {
  Home,
  Box,
  ShoppingCart,
  Users,
  Gift,
  WorkflowIcon,
  Sidebar,
  GiftIcon,
  LogOut,
  Settings,
} from "lucide-react";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminLayout({ children }) {
  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: WorkflowIcon, label: "Categories", href: "/admin/categories" },
    { icon: Box, label: "Products", href: "/admin/products" },
    { icon: Gift, label: "Kits", href: "/admin/kits" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Users", href: "/admin/users" },
  ];
  const pathname = usePathname();

  if (pathname === "/admin/auth/login") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div>
                <h1 className="text-lg font-semibold">SalonPro</h1>
                <p className="text-sm text-muted-foreground">
                  Booking Management
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.id}>
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

        <main className="flex-1 overflow-auto">
          {/* Header with user info */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="container mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold capitalize"></h2>
                  <p className="text-sm text-muted-foreground">Welcome back,</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar>
                        <AvatarFallback>
                          {/* {currentUser ? getInitials(currentUser.name) : "U"} */}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {/* {currentUser?.name} */}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {/* {currentUser?.email} */}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {/* {currentUser?.role} */}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setActiveView("settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
