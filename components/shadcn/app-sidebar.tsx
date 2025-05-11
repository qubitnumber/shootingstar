import * as React from "react"
import { ChevronRight, Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import { SearchForm } from "@/components/shadcn/search-form"
import { VersionSwitcher } from "@/components/shadcn/version-switcher"
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

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      icon: Home,
      items: [
        {
          title: "Installation",
          url: "#",
          badge: 5,
        },
        {
          title: "Project Structure",
          url: "#",
          badge: 10,
        },
      ],
    },
    {
      title: "Building Application",
      url: "#",
      icon: Inbox,
      items: [
        {
          title: "Routing",
          url: "#",
          badge: 50,
        },
        {
          title: "Data Fetching",
          url: "#",
          badge: 23,
          isActive: true,
        },
        {
          title: "Styling",
          url: "#",
          badge: 25,
        },
        {
          title: "Testing",
          url: "#",
          badge: 2,
        },
        {
          title: "Deploying",
          url: "#",
          badge: 15,
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Components",
          url: "#",
          badge: 10,
        },
        {
          title: "Functions",
          url: "#",
          badge: 18,
        },
        {
          title: "next.config.js Options",
          url: "#",
          badge: 7,
        },
        {
          title: "CLI",
          url: "#",
          badge: 30,
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      icon: Search,
      items: [
        {
          title: "Accessibility",
          url: "#",
          badge: 5,
        },
        {
          title: "Fast Refresh",
          url: "#",
          badge: 7,
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Contribution Guide",
          url: "#",
          badge: 3,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sidebar className='mt-16 hidden md:block' {...props}>
      <SidebarContent className="gap-0 mt-3 ml-2">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
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
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <a href={item.url}>
                            <span className="ml-6">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
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
