"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, CheckCircle, XCircle } from "lucide-react"

export default function PracticePage() {
  const [cameraActive, setCameraActive] = useState(false)
  const [feedback, setFeedback] = useState<null | { success: boolean; score: number }>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentSign, setCurrentSign] = useState({
    name: "Hello",
    description: "Wave your hand with palm facing outward",
    difficulty: "Beginner",
    image: "/placeholder.svg?height=300&width=300",
  })

  useEffect(() => {
    return () => {
      // Clean up camera when component unmounts
      if (cameraActive && videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraActive])

  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
      setCameraActive(false)
      setFeedback(null)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setCameraActive(true)
        setFeedback(null)
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }
  }

  const submitPractice = () => {
    // Simulate feedback - in a real app, this would analyze the video
    const success = Math.random() > 0.3
    const score = success ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 50
    setFeedback({ success, score })
  }

  const nextSign = () => {
    setFeedback(null)
    // In a real app, this would load the next sign from a database
    const signs = [
      {
        name: "Thank You",
        description: "Touch your chin with your fingertips and move your hand outward",
        difficulty: "Beginner",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Please",
        description: "Rub your chest in a circular motion with your open hand",
        difficulty: "Beginner",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Sorry",
        description: "Make a fist and rub it in a circular motion on your chest",
        difficulty: "Beginner",
        image: "/placeholder.svg?height=300&width=300",
      },
    ]
    setCurrentSign(signs[Math.floor(Math.random() * signs.length)])
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice</h1>
        <p className="text-muted-foreground">Practice sign language with real-time feedback</p>
      </div>

      <Tabs defaultValue="practice">
        <TabsList>
          <TabsTrigger value="practice">Practice Mode</TabsTrigger>
          <TabsTrigger value="challenge">Challenge Mode</TabsTrigger>
        </TabsList>
        <TabsContent value="practice" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sign to Practice: {currentSign.name}</CardTitle>
                <CardDescription>Difficulty: {currentSign.difficulty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square max-h-80 w-full overflow-hidden rounded-md bg-muted">
                  <img
                    src={currentSign.image || "/placeholder.svg"}
                    alt={currentSign.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Instructions:</h3>
                  <p className="text-sm text-muted-foreground">{currentSign.description}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={nextSign} variant="outline" className="w-full">
                  Next Sign
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Practice</CardTitle>
                <CardDescription>Use your webcam to practice the sign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square max-h-80 w-full overflow-hidden rounded-md bg-muted">
                  {cameraActive ? (
                    <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Camera className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {feedback && (
                  <div className="rounded-md bg-muted p-4">
                    <div className="mb-2 flex items-center gap-2">
                      {feedback.success ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Well done!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" />
                          <span className="font-medium">Try again</span>
                        </>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span className="font-medium">{feedback.score}%</span>
                      </div>
                      <Progress value={feedback.score} className="h-2" />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button onClick={toggleCamera} variant="outline" className="flex-1">
                  {cameraActive ? "Stop Camera" : "Start Camera"}
                </Button>
                {cameraActive && !feedback && (
                  <Button onClick={submitPractice} className="flex-1">
                    Submit
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="challenge" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Mode</CardTitle>
              <CardDescription>Test your skills with timed challenges and earn points</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold">Coming Soon!</h3>
                <p className="text-muted-foreground">
                  We're working on exciting challenges to help you improve your sign language skills.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled className="w-full">
                Start Challenge
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

