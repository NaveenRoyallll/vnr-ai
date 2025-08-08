import { PropsWithChildren } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/common/ThemeToggle";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
            <div className="container mx-auto flex items-center justify-between h-14 px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="ml-0" />
                <div className="hidden md:flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search across everything..." className="w-[280px]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="container mx-auto p-4">
            {children ?? <Outlet />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
