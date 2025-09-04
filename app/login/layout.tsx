import { AppSidebar } from "@/app/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <SessionProvider>
        <div className="flex flex-col flex-1">{children}</div>
      </SessionProvider>
  );
}