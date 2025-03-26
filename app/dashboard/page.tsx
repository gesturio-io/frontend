"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Clock,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  Star,
  Trophy,
  User,
  Users,
  CheckCircle,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data
const recentLessons = [
  { id: 1, title: "Basic Greetings", progress: 80, lastAccessed: "2 days ago" },
  { id: 2, title: "Common Phrases", progress: 45, lastAccessed: "1 week ago" },
  { id: 3, title: "Numbers & Counting", progress: 20, lastAccessed: "2 weeks ago" },
]

const improvementAreas = [
  { id: 1, title: "Hand Positioning", description: "Work on precise finger placement" },
  { id: 2, title: "Fluid Transitions", description: "Practice smoother movements between signs" },
  { id: 3, title: "Facial Expressions", description: "Incorporate appropriate expressions with signs" },
]

const trendingLessons = [
  { id: 1, title: "Emergency ASL", popularity: 98, users: 1243 },
  { id: 2, title: "Travel Phrases", popularity: 85, users: 876 },
  { id: 3, title: "Medical Terms", popularity: 72, users: 654 },
]

const certifications = [
  {
    id: 1,
    title: "ASL Basics",
    description: "Foundational knowledge of ASL",
    price: "$29.99",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Conversational ASL",
    description: "Everyday communication skills",
    price: "$49.99",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Professional ASL",
    description: "Advanced vocabulary for workplace",
    price: "$79.99",
    level: "Advanced",
  },
]

const friends = [
  { id: 1, name: "Alex Johnson", progress: 75, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Sam Taylor", progress: 92, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Jordan Smith", progress: 63, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Casey Williams", progress: 45, avatar: "/placeholder.svg?height=40&width=40" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 p-4 md:flex">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="rounded-md bg-primary p-1">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold">ASL Learning</h2>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-md bg-primary/10 px-3 py-2 text-primary">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/learn"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <BookOpen className="h-5 w-5" />
            <span>Learn</span>
          </Link>
          <Link
            href="/test"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Practice</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="mt-auto border-t pt-4">
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Jane Doe</span>
              <span className="text-xs text-muted-foreground">jane@example.com</span>
            </div>
          </div>
          <Button variant="ghost" className="mt-2 w-full justify-start text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild className="hidden md:flex">
                <Link href="/learn">
                  Continue Learning
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Avatar className="h-8 w-8 md:hidden">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4 md:p-6">
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Stats overview */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24h 35m</div>
                    <p className="text-xs text-muted-foreground">+2h 15m from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                    <Flame className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7 days</div>
                    <p className="text-xs text-muted-foreground">Keep it going!</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Signs Learned</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-muted-foreground">+12 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-xs text-muted-foreground">+3% from last week</p>
                  </CardContent>
                </Card>
              </div>

              {/* Continue learning */}
              <Card>
                <CardHeader>
                  <CardTitle>Pick up where you left off</CardTitle>
                  <CardDescription>Continue your recent lessons</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentLessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{lesson.title}</h3>
                            <span className="text-xs text-muted-foreground">{lesson.lastAccessed}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <Progress value={lesson.progress} className="h-2 w-full" />
                            <span className="text-xs font-medium">{lesson.progress}%</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="ml-auto">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Lessons
                  </Button>
                </CardFooter>
              </Card>

              {/* Areas to improve */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas to improve</CardTitle>
                    <CardDescription>Focus on these skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {improvementAreas.map((area) => (
                        <div key={area.id} className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                            <Sparkles className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{area.title}</h3>
                            <p className="text-sm text-muted-foreground">{area.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Detailed Feedback
                    </Button>
                  </CardFooter>
                </Card>

                {/* Trending */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trending Lessons</CardTitle>
                    <CardDescription>Popular among learners</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trendingLessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                            <Flame className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{lesson.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{lesson.users} learners</span>
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {lesson.popularity}% popular
                              </Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Learning Progress</CardTitle>
                  <CardDescription>Track your ASL journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Overall Progress</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Beginner Course</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Intermediate Course</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Advanced Course</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Weekly Activity</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }).map((_, i) => {
                        const intensity = Math.floor(Math.random() * 4)
                        return (
                          <div key={i} className="flex flex-col items-center">
                            <div
                              className={`h-10 w-10 rounded-md ${
                                intensity === 0
                                  ? "bg-muted"
                                  : intensity === 1
                                    ? "bg-primary/30"
                                    : intensity === 2
                                      ? "bg-primary/60"
                                      : "bg-primary"
                              }`}
                            ></div>
                            <span className="mt-1 text-xs">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Achievements</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {Array.from({ length: 8 }).map((_, i) => {
                        const unlocked = i < 5
                        return (
                          <div
                            key={i}
                            className={`flex flex-col items-center rounded-lg p-3 ${
                              unlocked ? "bg-primary/10" : "bg-muted opacity-50"
                            }`}
                          >
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {unlocked ? <Trophy className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                            </div>
                            <span className="mt-2 text-center text-xs font-medium">
                              {unlocked ? `Achievement ${i + 1}` : "Locked"}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available Certifications</CardTitle>
                  <CardDescription>Validate your ASL skills with official certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{cert.title}</h3>
                            <p className="text-sm text-muted-foreground">{cert.description}</p>
                            <Badge variant="outline" className="mt-2">
                              {cert.level}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{cert.price}</div>
                            <Button size="sm" className="mt-2">
                              Enroll
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium">What you'll learn:</h4>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Core vocabulary and grammar</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Proper hand positioning and movement</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Real-world conversation practice</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <p className="text-sm text-muted-foreground">
                    All certifications include a proctored exam and digital certificate upon completion.
                  </p>
                  <Button variant="link" className="mt-2 p-0">
                    Learn more about our certification process
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="friends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Friends' Progress</CardTitle>
                  <CardDescription>See how your friends are doing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {friends.map((friend) => (
                      <div key={friend.id} className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>
                            {friend.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{friend.name}</h3>
                            <span className="text-sm font-medium">{friend.progress}%</span>
                          </div>
                          <Progress value={friend.progress} className="mt-1 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <Users className="h-4 w-4" />
                    Find Friends
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Trophy className="h-4 w-4" />
                    Leaderboard
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Groups</CardTitle>
                  <CardDescription>Learn together with others</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Beginner ASL Group</h3>
                        <Badge>8 members</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Practice basic signs and phrases together</p>
                      <Button size="sm" className="mt-3">
                        Join Group
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">ASL for Healthcare</h3>
                        <Badge>12 members</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Focus on medical terminology and healthcare settings
                      </p>
                      <Button size="sm" className="mt-3">
                        Join Group
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

