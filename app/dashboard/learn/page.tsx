import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search } from "lucide-react"

export default function LearnPage() {
  const categories = [
    {
      id: "basic-greetings",
      title: "Basic Greetings",
      description: "Learn common greeting signs",
      progress: 60,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "numbers-counting",
      title: "Numbers & Counting",
      description: "Master numbers from 1-20",
      progress: 35,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "common-phrases",
      title: "Common Phrases",
      description: "Everyday useful expressions",
      progress: 15,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "family-relationships",
      title: "Family & Relationships",
      description: "Signs for family members and relationships",
      progress: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "colors-descriptions",
      title: "Colors & Descriptions",
      description: "Visual descriptors and colors",
      progress: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "time-calendar",
      title: "Time & Calendar",
      description: "Days, months, and time expressions",
      progress: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "food-dining",
      title: "Food & Dining",
      description: "Restaurant and food vocabulary",
      progress: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "travel-directions",
      title: "Travel & Directions",
      description: "Navigation and travel terminology",
      progress: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "emotions-feelings",
      title: "Emotions & Feelings",
      description: "Express emotions and feelings",
      progress: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learn</h1>
          <p className="text-muted-foreground">Explore sign language categories and lessons</p>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search categories..." className="w-full pl-8" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {category.progress > 0 ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} className="h-2" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Not started yet</p>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/dashboard/learn/${category.id}`}>
                  {category.progress > 0 ? "Continue" : "Start Learning"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

