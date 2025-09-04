import { AppSidebar } from "@/app/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MyNavBar from "../ui/nav-bar";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center bg-sky-600">
            <SidebarTrigger className="hover:text-black hover:bg-[#1567da] text-white" />
            <div className="flex flex-col flex-1">
              <MyNavBar />
            </div>
          </div>
          {children}
        </div>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
