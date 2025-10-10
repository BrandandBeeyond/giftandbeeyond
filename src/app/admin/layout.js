"use client";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
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
import { SidebarProvider } from "@/components/ui/sidebar";
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
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: WorkflowIcon, label: "Categories", href: "/admin/category" },
    { icon: Box, label: "Products", href: "/admin/products" },
    { icon: Gift, label: "Kits", href: "/admin/kits" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Users", href: "/admin/users" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      router.push("/admin/auth/login");
    }
  }, [router]);

  if (pathname === "/admin/auth/login") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <aside className="w-64 h-full bg-white shadow-md p-5">
          <nav className="space-y-4">
            {navigationItems.map((item,index) => {
              return (
                <Link
                  key={item.href || index}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-700 hover:text-black"
                >
                  {<item.icon className="h-5 w-5" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

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
                          {currentUser?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {currentUser?.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {currentUser?.role}
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
