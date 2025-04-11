"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, BookOpen, Camera, ClipboardCheck, Home, LogOut, Settings, User } from "lucide-react"
import { authService } from "@/lib/api"
import { images } from "@/app/Images/images"
import { ProfileCompletionGuard } from "@/app/components/profile/ProfileCompletionGuard"
import { useEffect, useState } from "react"
import { trackPageVisit } from "@/app/utils/analytics"
import { requiresAuth } from "@/app/utils/auth"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track page visit when the component mounts or pathname changes
  useEffect(() => {
    if (isClient && pathname) {
      // Add a small delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        trackPageVisit(pathname);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isClient]);

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <ProfileCompletionGuard>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar className="w-64 border-r">
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-3 px-4 py-4">
                <Image
                  src={images.mainLogo}
                  alt="Gesturio Logo"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="text-lg font-bold">Gesturio</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="px-2 py-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard")} className="flex items-center gap-3 px-4 py-3 text-base">
                    <Link href="/dashboard">
                      <Home className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/learn")} className="flex items-center gap-3 px-4 py-3 text-base">
                    <Link href="/dashboard/learn">
                      <BookOpen className="h-5 w-5" />
                      <span>Learn</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/practice")} className="flex items-center gap-3 px-4 py-3 text-base">
                    <Link href="/dashboard/practice">
                      <Camera className="h-5 w-5" />
                      <span>Practice</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/test")} className="flex items-center gap-3 px-4 py-3 text-base">
                    <Link href="/dashboard/test">
                      <ClipboardCheck className="h-5 w-5" />
                      <span>Test</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/progress")} className="flex items-center gap-3 px-4 py-3 text-base">
                    <Link href="/dashboard/progress">
                      <BarChart3 className="h-5 w-5" />
                      <span>Progress</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/profile")} className="flex items-center gap-3 px-4 py-3 text-base">
                    <Link href="/dashboard/profile">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")} className="flex items-center gap-3 px-4 py-3 text-base">
                    <Link href="/dashboard/settings">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <div className="border-t p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium">John Doe</div>
                    <div className="text-muted-foreground">john@example.com</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1">
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
              <SidebarTrigger />
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Log out</span>
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-8">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProfileCompletionGuard>
  )
}

