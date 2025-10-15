import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  UtensilsCrossed,
  BarChart3,
  Users,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: LayoutDashboard,
    color: "text-corporate-blue"
  },
  { 
    title: "Supply & Demand", 
    url: "/supply-demand", 
    icon: TrendingUp,
    color: "text-corporate-green"
  },
  { 
    title: "Daily Food Items", 
    url: "/daily-food", 
    icon: UtensilsCrossed,
    color: "text-corporate-orange"
  },
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: BarChart3,
    color: "text-corporate-purple"
  },
  { 
    title: "People Lists", 
    url: "/people", 
    icon: Users,
    color: "text-accent"
  },
];

export function MessSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar
      className={cn(
        "transition-all duration-300 border-r border-border bg-card/50 backdrop-blur-sm",
        collapsed ? "w-14" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarContent className="p-2">
        {/* Header */}
        <div className={cn(
          "flex items-center gap-3 p-4 mb-4 rounded-lg bg-gradient-primary text-primary-foreground",
          collapsed && "justify-center p-2"
        )}>
          <UtensilsCrossed className="h-8 w-8 animate-pulse-glow" />
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">Settlo Mess </h2>
              <p className="text-xs text-primary-foreground/80">Corporate Canteen</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
            collapsed && "sr-only"
          )}>
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={cn(
                      "transition-all duration-200 rounded-lg",
                      isActive(item.url) 
                        ? "bg-primary/10 text-primary font-medium shadow-soft border border-primary/20" 
                        : "hover:bg-muted/50 text-foreground/80 hover:text-foreground"
                    )}
                  >
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 px-3 py-2"
                    >
                      <item.icon className={cn(
                        "h-5 w-5 transition-colors",
                        isActive(item.url) ? "text-primary" : item.color
                      )} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto p-4 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">Mess Automation v1.0</p>
              <p>© 2024 Corporate Canteen</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}