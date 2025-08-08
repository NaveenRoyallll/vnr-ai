import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Bot, LayoutGrid, MessageCircle, Video, GitBranch, ShoppingCart, Activity, MonitorSmartphone, Settings, PlugZap, HelpCircle } from "lucide-react";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutGrid },
  { title: "Chat", url: "/chat", icon: MessageCircle },
  { title: "Calls", url: "/calls", icon: Video },
  { title: "Workflows", url: "/workflows", icon: GitBranch },
  { title: "Shopping", url: "/shopping", icon: ShoppingCart },
  { title: "Health", url: "/health", icon: Activity },
  { title: "Website Builder", url: "/builder", icon: MonitorSmartphone },
  { title: "Integrations", url: "/integrations", icon: PlugZap },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));

  return (
    <Sidebar className="w-60" collapsible="offcanvas">
      <div className="px-4 py-3 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full ai-ring" />
        <div className="text-sm font-medium">Jarvis UI</div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="inline-flex items-center gap-2"><Bot className="h-4 w-4" /> Main</div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-muted text-primary font-medium"
                          : "hover:bg-muted/50"
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
