import { ComponentType, useState } from "react"

import { AppSidebar } from "@/components/shadcn/app-sidebar"
import PostCard from '@/components/shadcn/post-card'
import { navMapPostcard } from '@/components/shadcn/registry/nav-map-postcard'

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
import {
  Card,
  CardContent,
} from "@/components/ui/card"


export default function Page() {
  const [selectedMenu, setSelectedMenu] = useState('UI Components/Accordions')

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
        <div className="grid grid-cols-2 gap-x-6 mt-16 mr-9 pt-2 pl-8 pr-8">
        {navMapPostcard[selectedMenu]
          ?
          navMapPostcard[selectedMenu].map((card: { compoentTitle: string, accordionDemo: ComponentType; codeComponent: ComponentType }) => {
              return (
                <Card key={card.compoentTitle} className="m-3 w-full">
                  <CardContent>
                    <PostCard
                      compoentTitle={card.compoentTitle}
                      ComponentDemo={card.accordionDemo}
                      CodeComponent={card.codeComponent}
                    />
                  </CardContent>
                </Card>
              )
            })
          :
            null
        }
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
