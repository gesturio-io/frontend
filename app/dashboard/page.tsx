import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Clock, Flame, HandMetal, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  // Dummy data for dashboard
  const learningStreak = {
    days: 7,
    change: "+2 days compared to last week",
  }

  const signsLearned = {
    count: 42,
    change: "+8 signs this week",
  }

  const accuracy = {
    percentage: 78,
    change: "+5% from last week",
  }

  const learningTime = {
    time: "12h 30m",
    change: "+2h 15m this week",
  }

  const currentLessons = [
    {
      id: "basic-greetings",
      title: "Basic Greetings",
      description: "Learn common greeting signs",
      progress: 60,
      image: "/placeholder.svg?height=160&width=320",
    },
    {
      id: "numbers-counting",
      title: "Numbers & Counting",
      description: "Master numbers from 1-20",
      progress: 35,
      image: "/placeholder.svg?height=160&width=320",
    },
    {
      id: "common-phrases",
      title: "Common Phrases",
      description: "Everyday useful expressions",
      progress: 15,
      image: "/placeholder.svg?height=160&width=320",
    },
  ]

  const areasToImprove = [
    {
      id: "question-signs",
      title: "Question Signs",
      description: "Practice forming questions",
      accuracy: 45,
    },
    {
      id: "time-expressions",
      title: "Time Expressions",
      description: "Signs for time and duration",
      accuracy: 52,
    },
    {
      id: "directional-verbs",
      title: "Directional Verbs",
      description: "Movement-based verb signs",
      accuracy: 48,
    },
  ]

  const trendingLessons = [
    {
      id: "travel-vocabulary",
      title: "Travel Vocabulary",
      description: "Essential signs for travelers",
      isNew: true,
    },
    {
      id: "emergency-signs",
      title: "Emergency Signs",
      description: "Critical communication signs",
      isPopular: true,
    },
    {
      id: "food-dining",
      title: "Food & Dining",
      description: "Restaurant and food vocabulary",
      isPopular: true,
    },
  ]

  // Weekly practice schedule
  const weeklySchedule = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: true },
    { day: "Thu", completed: false, isToday: true },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Continue your learning journey.</p>
        </div>
        <Button size="lg">Continue Learning</Button>
      </div>

      {/* Weekly Practice Schedule */}
      <Card className="bg-background">
        <CardHeader className="pb-3">
          <CardTitle>Weekly Practice</CardTitle>
          <CardDescription>Keep your streak going by practicing daily</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-4">
            {weeklySchedule.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`text-sm font-medium ${day.isToday ? "text-primary" : ""}`}>{day.day}</div>
                <div
                  className={`mt-2 flex h-12 w-12 items-center justify-center rounded-full ${
                    day.completed
                      ? "bg-primary text-primary-foreground"
                      : day.isToday
                        ? "border-2 border-primary"
                        : "bg-muted"
                  }`}
                >
                  {day.completed && <Flame className="h-5 w-5" />}
                  {day.isToday && !day.completed && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningStreak.days} Days</div>
            <p className="text-xs text-muted-foreground">{learningStreak.change}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signs Learned</CardTitle>
            <HandMetal className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{signsLearned.count}</div>
            <p className="text-xs text-muted-foreground">{signsLearned.change}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accuracy.percentage}%</div>
            <p className="text-xs text-muted-foreground">{accuracy.change}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learningTime.time}</div>
            <p className="text-xs text-muted-foreground">{learningTime.change}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Pick up where you left off</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentLessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                  <img
                    src={lesson.image || "/placeholder.svg"}
                    alt={lesson.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{lesson.progress}%</span>
                  </div>
                  <Progress value={lesson.progress} className="h-2" />
                </div>
                <Button className="w-full">Continue</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Tabs defaultValue="improve">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="improve">Areas to Improve</TabsTrigger>
            <TabsTrigger value="trending">Trending Lessons</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <TabsContent value="improve" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {areasToImprove.map((area) => (
              <Card key={area.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                  <CardDescription>{area.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      <span className="text-sm font-medium">Accuracy: {area.accuracy}%</span>
                    </div>
                    <Button size="sm">Practice</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="trending" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trendingLessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {lesson.isNew ? (
                        <Calendar className="h-5 w-5 text-primary" />
                      ) : (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      )}
                      <span className="text-sm font-medium">{lesson.isNew ? "New lesson" : "Popular"}</span>
                    </div>
                    <Button size="sm">Start</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Recommended Practice */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Recommended Practice</CardTitle>
          <CardDescription>Based on your learning patterns and areas to improve</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 rounded-md border p-4">
            <div className="rounded-full bg-primary/10 p-3">
              <HandMetal className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Question Signs Practice</h3>
              <p className="text-sm text-muted-foreground">10-minute focused practice on forming questions</p>
            </div>
            <Button>Start</Button>
          </div>
          <div className="flex items-center gap-4 rounded-md border p-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Review Basic Greetings</h3>
              <p className="text-sm text-muted-foreground">Quick 5-minute review of your learned greetings</p>
            </div>
            <Button>Start</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

