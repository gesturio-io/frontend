'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface Category {
  id: string
  title: string
  description: string
  progress: number
  image: string
}

export default function LearnPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/learn/category?id=all`, {
          credentials: 'include',
        })

        if (!res.ok) {
          throw new Error('Failed to fetch categories')
        }

        const data = await res.json()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

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
        {categories.map((category: Category) => (
          <Card key={category.id} className="overflow-hidden relative">
            {category.progress === 100 && (
              <div className="absolute top-2 right-2 z-10">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            )}
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

