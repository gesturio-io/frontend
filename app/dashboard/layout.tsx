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
import { BarChart3, BookOpen, Camera, ClipboardCheck, Home, LogOut, Settings, User, Users } from "lucide-react"
import { authService } from "@/lib/api"
import { images } from "@/app/Images/images"
import { ProfileCompletionGuard } from "@/app/components/profile/ProfileCompletionGuard"
import { useEffect, useState } from "react"
import { trackPageVisit } from "@/app/utils/analytics"
import { requiresAuth } from "@/app/utils/auth"
import { useUser } from "@/lib/contexts/UserContext"
import { Search } from "../components/ui/search"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userProfile } = useUser();
  const pathname = usePathname();
  const router = useRouter();
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

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      await authService.logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  interface Friend {
    user_id: number;
    firstname: string;
    lastname: string;
    profile_picture?: string;
    username: string;
    email: string;
  }
  const handleFriendSelect = (friend: Friend) => {
    router.push(`/dashboard/profile/${friend.user_id}`);
  };

  function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    );
  }

  return (
    <ProfileCompletionGuard>
      <SidebarProvider>
        <div className="w-full flex min-h-screen">
          <Sidebar className="w-64 border-r">
            <SidebarHeader className="border-b px-6 py-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={images.mainLogo}
                  alt="Gesturio Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-xl font-bold">Gesturio</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="px-2 py-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3">
                      <Home className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/learn")}>
                    <Link href="/dashboard/learn" className="flex items-center gap-3 px-4 py-3">
                      <BookOpen className="h-5 w-5" />
                      <span>Learn</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/practice")}>
                    <Link href="/dashboard/practice" className="flex items-center gap-3 px-4 py-3">
                      <Camera className="h-5 w-5" />
                      <span>Practice</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/test")}>
                    <Link href="/dashboard/test" className="flex items-center gap-3 px-4 py-3">
                      <ClipboardCheck className="h-5 w-5" />
                      <span>Test</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/progress")}>
                    <Link href="/dashboard/progress" className="flex items-center gap-3 px-4 py-3">
                      <BarChart3 className="h-5 w-5" />
                      <span>Progress</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/friends")}>
                    <Link href="/dashboard/friends" className="flex items-center gap-3 px-4 py-3">
                      <Users className="h-5 w-5" />
                      <span>Friends</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/profile")}>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={userProfile?.profile_picture} />
                  <AvatarFallback>
                    {userProfile ? `${userProfile.firstname[0]}${userProfile.lastname[0]}` : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate font-medium">
                    {userProfile ? `${userProfile.firstname} ${userProfile.lastname}` : 'Loading...'}
                  </span>
                  <span className="truncate text-sm text-muted-foreground">
                    {userProfile?.email || 'Loading...'}
                  </span>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 min-w-0">
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
              <SidebarTrigger />
              <div className="flex items-center gap-4">
                <Search onSelect={handleFriendSelect} />
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Log out</span>
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-8 w-full">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProfileCompletionGuard>
  );
}