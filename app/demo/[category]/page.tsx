"use client"

import Link from "next/link"
import { use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Lock } from "lucide-react"
import { DemoCameraPractice } from "../../../components/practice/DemoCameraPractice"

const demoContent = {
  "basic-greetings": {
    title: "Basic Greetings",
    description: "Learn common greeting signs",
    freeSign: {
      title: "Hello",
      description: "The most common way to say hello in sign language",
      videoUrl: "/videos/hello-sign.mp4", // This would be your actual video URL
    },
    lockedSigns: [
      { title: "Goodbye", description: "Wave goodbye in sign language" },
      { title: "Thank You", description: "Express gratitude in sign language" },
      { title: "Please", description: "How to say please politely" },
    ]
  },
  "numbers-counting": {
    title: "Numbers & Counting",
    description: "Master numbers from 1-5",
    freeSign: {
      title: "Number One",
      description: "Learn to sign the number one",
      videoUrl: "/videos/number-one.mp4",
    },
    lockedSigns: [
      { title: "Number Two", description: "Sign for number two" },
      { title: "Number Three", description: "Sign for number three" },
      { title: "Number Four", description: "Sign for number four" },
    ]
  },
  "common-phrases": {
    title: "Common Phrases",
    description: "Everyday useful expressions",
    freeSign: {
      title: "How are you?",
      description: "Learn to ask how someone is doing",
      videoUrl: "/videos/how-are-you.mp4",
    },
    lockedSigns: [
      { title: "Nice to meet you", description: "Greeting someone for the first time" },
      { title: "Good morning", description: "Morning greeting in sign language" },
      { title: "Good night", description: "Evening farewell in sign language" },
    ]
  }
}

export default function DemoLessonPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params)
  const content = demoContent[resolvedParams.category as keyof typeof demoContent]

  if (!content) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <Button asChild className="mt-4">
          <Link href="/demo">Back to Demo</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/demo">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
      </div>

      {/* Free Sign Section */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>{content.freeSign.title}</CardTitle>
          <CardDescription>{content.freeSign.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium">Watch and Learn</h3>
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                <video 
                  src={content.freeSign.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster="/placeholder.svg"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Practice</h3>
              <DemoCameraPractice />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Locked Content Section */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Want to Learn More?</h2>
          <p className="text-muted-foreground">Sign up to access all lessons and track your progress!</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.lockedSigns.map((sign, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardHeader>
                <CardTitle>{sign.title}</CardTitle>
                <CardDescription>{sign.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full bg-muted rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4 pt-8">
          <Button asChild variant="outline">
            <Link href="/auth/register">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href="/#pricing">View Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 