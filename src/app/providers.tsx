"use client";

import { SidebarProvider } from "@/components/ui/sidebar";

export default function Providers({ children }: React.PropsWithChildren) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
