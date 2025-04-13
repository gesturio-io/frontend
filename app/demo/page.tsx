import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function DemoPage() {
  const demoCategories = [
    {
      id: "basic-greetings",
      title: "Basic Greetings",
      description: "Try out common greeting signs",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "numbers-counting",
      title: "Numbers & Counting",
      description: "Practice numbers from 1-5",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "common-phrases",
      title: "Common Phrases",
      description: "Learn basic everyday expressions",
      image: "/placeholder.svg?height=200&width=300",
    }
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Try Gesturio</h1>
          <p className="text-muted-foreground">Experience a preview of our interactive sign language lessons</p>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search lessons..." className="w-full pl-8" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demoCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-4">
              <Button asChild className="w-full">
                <Link href={`/demo/${category.id}`}>
                  Try this Lesson
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center space-y-4">
        <h2 className="text-2xl font-bold">Ready to Learn More?</h2>
        <p className="text-muted-foreground">Sign up now to access our full library of lessons and track your progress!</p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/register">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href="/#pricing">View Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 