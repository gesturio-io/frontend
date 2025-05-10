import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, CheckCircle, Play, Clock } from "lucide-react"

export default function CommonPhrasesPage() {
  const lessons = [
    {
      id: 1,
      title: "Basic Questions",
      description: "Learn to ask common questions",
      duration: "5 min",
      completed: true,
      image: "/common_phrases.jpeg",
    },
    {
      id: 2,
      title: "Daily Expressions",
      description: "Everyday phrases and expressions",
      duration: "8 min",
      completed: true,
      image: "/common_phrases.jpeg",
    },
    {
      id: 3,
      title: "Emergency Phrases",
      description: "Important phrases for emergencies",
      duration: "10 min",
      completed: false,
      image: "/common_phrases.jpeg",
    },
    {
      id: 4,
      title: "Social Interactions",
      description: "Phrases for social situations",
      duration: "12 min",
      completed: false,
      image: "/common_phrases.jpeg",
    },
    {
      id: 5,
      title: "Practical Conversations",
      description: "Put it all together in conversations",
      duration: "15 min",
      completed: false,
      image: "/common_phrases.jpeg",
    },
  ]

  // Calculate overall progress
  const completedLessons = lessons.filter((lesson) => lesson.completed).length
  const totalLessons = lessons.length
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/learn">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Common Phrases</h1>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Track your progress through this category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm">
            <span>
              {completedLessons} of {totalLessons} lessons completed
            </span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-lg border p-4">
              <div className="text-3xl font-bold">{totalLessons}</div>
              <div className="text-sm text-muted-foreground">Total Lessons</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4">
              <div className="text-3xl font-bold">50 min</div>
              <div className="text-sm text-muted-foreground">Total Duration</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4">
              <div className="text-3xl font-bold">Beginner</div>
              <div className="text-sm text-muted-foreground">Difficulty</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lessons">
        <TabsList>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="mt-4">
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={lesson.completed ? "border-green-200 bg-green-50/30 dark:bg-green-900/10" : ""}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="aspect-video w-full md:w-1/3 overflow-hidden">
                    <img
                      src={lesson.image}
                      alt={lesson.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <CardHeader className="p-0">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {lesson.title}
                          {lesson.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {lesson.duration}
                        </div>
                      </div>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto p-0 pt-4">
                      <Button className="gap-2">
                        {lesson.completed ? "Review" : "Start"}
                        <Play className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>Supplementary materials to enhance your learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-md border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Common Phrases Guide</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive reference of all common phrases</p>
                </div>
                <Button variant="outline">Download</Button>
              </div>
              <div className="flex items-center gap-4 rounded-md border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Play className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Practice Videos</h3>
                  <p className="text-sm text-muted-foreground">Slow-motion demonstrations of each phrase</p>
                </div>
                <Button variant="outline">View</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 