'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { use } from "react"

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  progress: number
  image?: string
}

interface CategoryLessonsPageProps {
  params: Promise<{
    categorySlug: string
  }>
}

export default function CategoryLessonsPage({ params }: CategoryLessonsPageProps) {
  const { categorySlug } = use(params)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [category, setCategory] = useState<{ title: string; description: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategoryAndLessons = async () => {
      try {
        // Fetch category details
        const categoryRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/learn/category?id=${categorySlug}`,
          {
            credentials: 'include',
          }
        )

        if (!categoryRes.ok) {
          throw new Error('Failed to fetch category details')
        }

        const categoryData = await categoryRes.json()
        setCategory(categoryData)

        // Fetch lessons for this category
        const lessonsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/learn/category?id=${categorySlug}&lessons=all`,
          {
            credentials: 'include',
          }
        )

        if (!lessonsRes.ok) {
          throw new Error('Failed to fetch lessons')
        }

        const lessonsData = await lessonsRes.json()
        setLessons(lessonsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryAndLessons()
  }, [categorySlug])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/learn">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category.title}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="overflow-hidden relative">
            {lesson.progress === 100 && (
              <div className="absolute top-2 right-2 z-10">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            )}
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={lesson.image || "/placeholder.svg"}
                alt={lesson.title}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {lesson.progress > 0 ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{lesson.progress}%</span>
                  </div>
                  <Progress value={lesson.progress} className="h-2" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Not started yet</p>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/dashboard/learn/${categorySlug}/${lesson.id}`}>
                  {lesson.progress > 0 ? "Continue" : "Start Lesson"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 