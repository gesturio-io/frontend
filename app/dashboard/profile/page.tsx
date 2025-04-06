import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Flame,
  Github,
  Globe,
  Mail,
  MapPin,
  Twitter,
  Users,
} from "lucide-react"

export default function ProfilePage() {
  // Generate more realistic heatmap data with patterns
  const generateHeatmapData = () => {
    const today = new Date()
    const data = []

    // Create a pattern of activity (more active on weekdays, less on weekends)
    for (let i = 0; i < 120; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)

      // Day of week (0 = Sunday, 6 = Saturday)
      const dayOfWeek = date.getDay()

      // More likely to be active on weekdays
      const isWeekday = dayOfWeek > 0 && dayOfWeek < 6

      // Recent days more likely to have activity
      const recencyFactor = Math.min(1, (120 - i) / 60)

      // Calculate probability of activity
      let activityProbability = isWeekday ? 0.7 : 0.4
      activityProbability *= recencyFactor

      // Determine activity level (0-4)
      let value = 0
      if (Math.random() < activityProbability) {
        // More recent days tend to have higher activity
        const maxValue = Math.ceil(4 * recencyFactor)
        value = Math.floor(Math.random() * maxValue) + 1
      }

      data.push({ date: date.toISOString().split("T")[0], value })
    }

    return data
  }

  const heatmapData = generateHeatmapData()

  const achievements = [
    {
      id: 1,
      name: "7-Day Streak",
      description: "Practiced for 7 consecutive days",
      icon: Flame,
      color: "amber",
      completed: true,
    },
    {
      id: 2,
      name: "First Lesson",
      description: "Completed your first lesson",
      icon: CheckCircle,
      color: "green",
      completed: true,
    },
    {
      id: 3,
      name: "Perfect Score",
      description: "Achieved 100% on a test",
      icon: Award,
      color: "blue",
      completed: true,
    },
    {
      id: 4,
      name: "10 Hour Club",
      description: "Practiced for 10+ hours",
      icon: Clock,
      color: "purple",
      completed: false,
      progress: "8/10",
    },
    {
      id: 5,
      name: "Social Butterfly",
      description: "Connected with 5 other learners",
      icon: Users,
      color: "pink",
      completed: false,
      progress: "2/5",
    },
    {
      id: 6,
      name: "Vocabulary Master",
      description: "Learn 100 different signs",
      icon: BookOpen,
      color: "orange",
      completed: false,
      progress: "42/100",
    },
  ]

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: "lesson",
      title: "Completed Basic Greetings",
      date: "2 hours ago",
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "practice",
      title: "Practiced Numbers & Counting",
      date: "Yesterday",
      icon: Clock,
    },
    {
      id: 3,
      type: "achievement",
      title: "Earned 7-Day Streak Badge",
      date: "2 days ago",
      icon: Award,
    },
    {
      id: 4,
      type: "test",
      title: "Passed Common Phrases Test",
      date: "3 days ago",
      icon: CheckCircle,
    },
    {
      id: 5,
      type: "practice",
      title: "Practiced Family Signs",
      date: "4 days ago",
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">View and manage your profile information</p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Welcome message for demo */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Demo Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is a demo profile showing how user progress and achievements are tracked in Gesturio. In a real
                application, this would display your personal learning journey.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">John Doe</h2>
              <p className="text-sm text-muted-foreground">Joined April 2023</p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-500" />
                  <span>7 Day Streak</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-amber-500" />
                  <span>Gold Rank</span>
                </Badge>
              </div>

              <div className="mt-6 w-full space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>johndoe.com</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Learning Stats</CardTitle>
              <CardDescription>Your progress overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Signs Learned</span>
                </div>
                <span className="font-bold">42</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Learning Time</span>
                </div>
                <span className="font-bold">12h 30m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Days Active</span>
                </div>
                <span className="font-bold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Achievements</span>
                </div>
                <span className="font-bold">7</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Your daily learning activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 rounded-md bg-muted p-4">
                <div className="grid h-full grid-cols-[repeat(17,1fr)] gap-1">
                  {Array.from({ length: 17 }).map((_, weekIndex) => (
                    <div key={weekIndex} className="grid grid-rows-7 gap-1">
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const dataIndex = weekIndex * 7 + dayIndex
                        const data = heatmapData[dataIndex]
                        let bgColor = "bg-muted-foreground/20"

                        if (data && data.value > 0) {
                          if (data.value === 1) bgColor = "bg-primary/30"
                          else if (data.value === 2) bgColor = "bg-primary/50"
                          else if (data.value === 3) bgColor = "bg-primary/70"
                          else bgColor = "bg-primary"
                        }

                        return (
                          <div
                            key={dayIndex}
                            className={`h-3 w-3 rounded-sm ${bgColor}`}
                            title={data ? `${data.date}: ${data.value} activities` : "No activity"}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex items-center justify-end gap-2 text-xs">
                <span className="text-muted-foreground">Less</span>
                <div className="h-3 w-3 rounded-sm bg-muted-foreground/20"></div>
                <div className="h-3 w-3 rounded-sm bg-primary/30"></div>
                <div className="h-3 w-3 rounded-sm bg-primary/50"></div>
                <div className="h-3 w-3 rounded-sm bg-primary/70"></div>
                <div className="h-3 w-3 rounded-sm bg-primary"></div>
                <span className="text-muted-foreground">More</span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className="rounded-full bg-muted p-2">
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Badges and rewards you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex items-center gap-4 rounded-md border p-4 ${!achievement.completed ? "opacity-60" : ""}`}
                      >
                        <div
                          className={`rounded-full bg-${achievement.color}-100 p-2 text-${achievement.color}-600 dark:bg-${achievement.color}-900 dark:text-${achievement.color}-300`}
                        >
                          <achievement.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                            {!achievement.completed && achievement.progress && ` (${achievement.progress})`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

