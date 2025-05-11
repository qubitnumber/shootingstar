import * as React from "react"
import { ChevronRight } from "lucide-react"
import { MdFiberNew } from "react-icons/md";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

import { getSideNavList } from '@/lib/nav-list'

export function AppSidebar({
  selectedMenu, setSelectedMenu
}: {
  selectedMenu: string, setSelectedMenu: Function
}) {
  const menuList = getSideNavList();

  return (
    <Sidebar className='mt-16 hidden md:block'>
      <SidebarContent className="gap-0 mt-3 ml-2">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {menuList.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  <item.icon />
                  <span className="ml-2">{item.title}{" "}</span>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <Link href={subItem.url} onNavigate={() => setSelectedMenu(item.title + '/' + subItem.title)}>
                            <span className={`ml-6 ${selectedMenu.split('/')[1] === subItem.title && 'font-bold border-b border-black'}`}>
                              {subItem.title}
                            </span>
                            {subItem.isNew && (
                              <span className="text-2xl"><MdFiberNew /></span>)}
                          </Link>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>{subItem.badge}</SidebarMenuBadge>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
