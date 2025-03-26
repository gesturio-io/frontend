"use client"
import Link from "next/link"
import {
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  Clock,
  Edit,
  ExternalLink,
  Flame,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Settings,
  Share2,
  Star,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data
const userData = {
  name: "Jane Doe",
  username: "janedoe",
  bio: "ASL enthusiast | Software Engineer | Learning to communicate in new ways",
  location: "San Francisco, CA",
  email: "jane@example.com",
  joined: "January 2023",
  github: "janedoe",
  twitter: "janedoe",
  website: "janedoe.com",
  stats: {
    daysActive: 124,
    currentStreak: 7,
    longestStreak: 21,
    signsLearned: 128,
    lessonsCompleted: 42,
    accuracy: 87,
    rank: "Gold",
  },
  achievements: [
    { id: 1, title: "7-Day Streak", icon: "Flame", date: "May 15, 2023" },
    { id: 2, title: "100 Signs Learned", icon: "GraduationCap", date: "April 28, 2023" },
    { id: 3, title: "First Perfect Score", icon: "Star", date: "March 12, 2023" },
    { id: 4, title: "Completed Beginner Course", icon: "Award", date: "February 20, 2023" },
  ],
  recentActivity: [
    { id: 1, type: "lesson", title: "Completed 'Basic Greetings'", date: "2 days ago" },
    { id: 2, type: "practice", title: "Practiced 25 signs", date: "3 days ago" },
    { id: 3, type: "achievement", title: "Earned '7-Day Streak' badge", date: "1 week ago" },
    { id: 4, type: "lesson", title: "Completed 'Common Phrases'", date: "1 week ago" },
    { id: 5, type: "practice", title: "Practiced 30 signs", date: "2 weeks ago" },
  ],
  heatmap: Array.from({ length: 120 }, () => Math.floor(Math.random() * 4)),
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3 md:px-6">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="ml-4 text-xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
                    <AvatarFallback>
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">@{userData.username}</p>

                  <div className="mt-2 flex items-center gap-1">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {userData.stats.rank} Rank
                    </Badge>
                  </div>

                  <p className="mt-4 text-sm">{userData.bio}</p>

                  <div className="mt-6 grid w-full grid-cols-2 gap-4">
                    <Button>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                <div className="mt-6 space-y-2 border-t pt-4">
                  {userData.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.email}</span>
                    </div>
                  )}
                  {userData.joined && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {userData.joined}</span>
                    </div>
                  )}
                  {userData.github && (
                    <div className="flex items-center gap-2 text-sm">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <a href={`https://github.com/${userData.github}`} className="hover:underline">
                        {userData.github}
                      </a>
                    </div>
                  )}
                  {userData.twitter && (
                    <div className="flex items-center gap-2 text-sm">
                      <Twitter className="h-4 w-4 text-muted-foreground" />
                      <a href={`https://twitter.com/${userData.twitter}`} className="hover:underline">
                        {userData.twitter}
                      </a>
                    </div>
                  )}
                  {userData.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <a href={`https://${userData.website}`} className="hover:underline">
                        {userData.website}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-center">
                  <span className="text-2xl font-bold">{userData.stats.daysActive}</span>
                  <p className="text-xs text-muted-foreground">Days Active</p>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-2xl font-bold">{userData.stats.currentStreak}</span>
                  <p className="text-xs text-muted-foreground">Current Streak</p>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-2xl font-bold">{userData.stats.signsLearned}</span>
                  <p className="text-xs text-muted-foreground">Signs Learned</p>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-2xl font-bold">{userData.stats.lessonsCompleted}</span>
                  <p className="text-xs text-muted-foreground">Lessons Completed</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Accuracy</span>
                    <span className="text-sm font-medium">{userData.stats.accuracy}%</span>
                  </div>
                  <Progress value={userData.stats.accuracy} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {achievement.icon === "Flame" && <Flame className="h-4 w-4" />}
                        {achievement.icon === "GraduationCap" && <GraduationCap className="h-4 w-4" />}
                        {achievement.icon === "Star" && <Star className="h-4 w-4" />}
                        {achievement.icon === "Award" && <Award className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
                <CardDescription>Your ASL learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Contribution heatmap (similar to GitHub) */}
                  <div>
                    <h3 className="mb-4 text-sm font-medium">Learning Activity</h3>
                    <div className="grid grid-cols-12 gap-1">
                      {userData.heatmap.map((value, i) => (
                        <div
                          key={i}
                          className={`h-3 w-full rounded-sm ${
                            value === 0
                              ? "bg-muted"
                              : value === 1
                                ? "bg-primary/30"
                                : value === 2
                                  ? "bg-primary/60"
                                  : "bg-primary"
                          }`}
                          title={`${value} activities on day ${i + 1}`}
                        ></div>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center justify-end gap-2">
                      <span className="text-xs text-muted-foreground">Less</span>
                      <div className="h-3 w-3 rounded-sm bg-muted"></div>
                      <div className="h-3 w-3 rounded-sm bg-primary/30"></div>
                      <div className="h-3 w-3 rounded-sm bg-primary/60"></div>
                      <div className="h-3 w-3 rounded-sm bg-primary"></div>
                      <span className="text-xs text-muted-foreground">More</span>
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div>
                    <h3 className="mb-4 text-sm font-medium">Recent Activity</h3>
                    <div className="space-y-4">
                      {userData.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            {activity.type === "lesson" && <BookOpen className="h-4 w-4" />}
                            {activity.type === "practice" && <Clock className="h-4 w-4" />}
                            {activity.type === "achievement" && <Award className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{activity.title}</p>
                              <span className="text-xs text-muted-foreground">{activity.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Track your course completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">ASL Basics</h3>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>17/20 lessons completed</span>
                      <Button variant="link" className="h-auto p-0 text-xs">
                        Resume
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Conversational ASL</h3>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>10/24 lessons completed</span>
                      <Button variant="link" className="h-auto p-0 text-xs">
                        Resume
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">ASL for Travel</h3>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>2/20 lessons completed</span>
                      <Button variant="link" className="h-auto p-0 text-xs">
                        Resume
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Your earned and in-progress certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Award className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">ASL Basics Certification</h3>
                        <p className="text-sm text-muted-foreground">Completed on March 15, 2023</p>
                      </div>
                      <Badge className="ml-auto bg-green-100 text-green-800">Completed</Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">Conversational ASL Certification</h3>
                        <p className="text-sm text-muted-foreground">In progress - 42% complete</p>
                        <Progress value={42} className="mt-2 h-2 w-full max-w-[200px]" />
                      </div>
                      <Badge className="ml-auto bg-amber-100 text-amber-800">In Progress</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

