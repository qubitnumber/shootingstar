import { AppSidebar } from "@/components/shadcn/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"


export default function Page() {
  const [selectedMenu, setSelectedMenu] = useState('Getting Started/Installation')

  return (
    <SidebarProvider>
      <AppSidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <SidebarInset>
        <header className="flex flex-row sticky top-16 pt-1 pl-7 bg-background h-16 shrink-0 items-center gap-2 border-b">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {selectedMenu.split('/')[0]}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{selectedMenu.split('/')[1]}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-col sticky mt-20 mr-9 pt-1 pl-8">
          {Array.from({ length: 18 }).map((_, index) => (
            <Skeleton key={index} className="h-7 w-full mb-2"/>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
