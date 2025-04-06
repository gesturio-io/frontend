"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Navigate to dashboard when completed
      window.location.href = "/dashboard"
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="size-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
              G
            </span>
            <span>Gesturio</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container max-w-3xl py-12">
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Why are you learning sign language?"}
                {step === 2 && "What's your preferred pace of learning?"}
                {step === 3 && "Do you have any prior experience with sign language?"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "This helps us personalize your learning experience."}
                {step === 2 && "We'll adjust the lesson frequency based on your preference."}
                {step === 3 && "We'll tailor the difficulty level based on your experience."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <RadioGroup defaultValue="personal">
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal" className="flex-1">
                      <div className="font-medium">Personal interest</div>
                      <div className="text-sm text-muted-foreground">I want to learn for my own knowledge</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="communicate" id="communicate" />
                    <Label htmlFor="communicate" className="flex-1">
                      <div className="font-medium">To communicate with someone</div>
                      <div className="text-sm text-muted-foreground">I know someone who uses sign language</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional" className="flex-1">
                      <div className="font-medium">Professional development</div>
                      <div className="text-sm text-muted-foreground">I need it for my job or career</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex-1">
                      <div className="font-medium">Other reason</div>
                      <div className="text-sm text-muted-foreground">I have a different motivation</div>
                    </Label>
                  </div>
                </RadioGroup>
              )}

              {step === 2 && (
                <RadioGroup defaultValue="moderate">
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="casual" id="casual" />
                    <Label htmlFor="casual" className="flex-1">
                      <div className="font-medium">Casual</div>
                      <div className="text-sm text-muted-foreground">1-2 lessons per week</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="flex-1">
                      <div className="font-medium">Moderate</div>
                      <div className="text-sm text-muted-foreground">3-4 lessons per week</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="intensive" id="intensive" />
                    <Label htmlFor="intensive" className="flex-1">
                      <div className="font-medium">Intensive</div>
                      <div className="text-sm text-muted-foreground">Daily lessons</div>
                    </Label>
                  </div>
                </RadioGroup>
              )}

              {step === 3 && (
                <RadioGroup defaultValue="none">
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="flex-1">
                      <div className="font-medium">None</div>
                      <div className="text-sm text-muted-foreground">I'm a complete beginner</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic" className="flex-1">
                      <div className="font-medium">Basic</div>
                      <div className="text-sm text-muted-foreground">I know a few signs</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="flex-1">
                      <div className="font-medium">Intermediate</div>
                      <div className="text-sm text-muted-foreground">I can have basic conversations</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="flex-1">
                      <div className="font-medium">Advanced</div>
                      <div className="text-sm text-muted-foreground">I'm fluent but want to improve</div>
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                Back
              </Button>
              <Button onClick={handleNext}>{step === totalSteps ? "Complete" : "Next"}</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

