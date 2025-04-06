"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, HandMetal } from "lucide-react"

export default function TestPage() {
  const [cameraActive, setCameraActive] = useState(false)
  const [recording, setRecording] = useState(false)
  const [feedback, setFeedback] = useState<null | { success: boolean; score: number }>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentSign, setCurrentSign] = useState({
    name: "Hello",
    description: "Wave your hand with palm facing outward",
    image: "/placeholder.svg?height=300&width=300",
  })
  const [testProgress, setTestProgress] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)

  // Ensure camera permissions are properly requested
  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      return true
    } catch (err) {
      console.error("Error requesting camera permission:", err)
      return false
    }
  }

  // Add a helper function to handle camera errors
  const handleCameraError = (error: any) => {
    console.error("Camera error:", error)
    alert("Unable to access camera. Please ensure you've granted camera permissions and try again.")
  }

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
        const hasPermission = await requestCameraPermission()
        if (!hasPermission) {
          handleCameraError("Permission denied")
          return
        }

        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setCameraActive(true)
        setFeedback(null)
      } catch (err) {
        handleCameraError(err)
      }
    }
  }

  const toggleRecording = () => {
    if (recording) {
      setRecording(false)
      // Simulate processing the recording
      setTimeout(() => {
        const success = Math.random() > 0.3
        const score = success ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 50
        setFeedback({ success, score })
      }, 1000)
    } else {
      setRecording(true)
      setFeedback(null)
    }
  }

  const nextSign = () => {
    setFeedback(null)
    // In a real app, this would load the next sign from a database
    const signs = [
      {
        name: "Thank You",
        description: "Touch your chin with your fingertips and move your hand outward",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Please",
        description: "Rub your chest in a circular motion with your open hand",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        name: "Sorry",
        description: "Make a fist and rub it in a circular motion on your chest",
        image: "/placeholder.svg?height=300&width=300",
      },
    ]

    // Update test progress
    const newProgress = testProgress + 25
    setTestProgress(newProgress)
    if (newProgress >= 100) {
      setTestCompleted(true)
    } else {
      setCurrentSign(signs[Math.floor(Math.random() * signs.length)])
    }
  }

  const retakeTest = () => {
    setFeedback(null)
    setTestProgress(0)
    setTestCompleted(false)
    setCurrentSign({
      name: "Hello",
      description: "Wave your hand with palm facing outward",
      image: "/placeholder.svg?height=300&width=300",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Test</h1>
        <p className="text-muted-foreground">Test your sign language skills and get evaluated</p>
      </div>

      {/* Welcome message for first-time users */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <HandMetal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Welcome to the Sign Language Test</h3>
              <p className="text-sm text-muted-foreground">
                This interactive test will evaluate your sign language skills. You'll be asked to perform specific signs
                while your webcam records your movements. Enable your camera to get started!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {testCompleted ? (
        <Card>
          <CardHeader>
            <CardTitle>Test Completed!</CardTitle>
            <CardDescription>You've completed the sign language evaluation test</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Great job!</h2>
              <p className="text-center text-muted-foreground">
                You've successfully completed the sign language test. Your results have been recorded.
              </p>
            </div>
            <div className="space-y-2 rounded-md bg-muted p-4">
              <h3 className="font-medium">Test Results</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-md bg-background p-3">
                  <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                  <div className="text-xl font-bold">82%</div>
                </div>
                <div className="rounded-md bg-background p-3">
                  <div className="text-sm text-muted-foreground">Signs Mastered</div>
                  <div className="text-xl font-bold">3/4</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={retakeTest}>
              Retake Test
            </Button>
            <Button className="flex-1">View Detailed Results</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sign to Perform: {currentSign.name}</CardTitle>
              <CardDescription>Follow the instructions and perform this sign</CardDescription>
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
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Test Progress</span>
                  <span className="font-medium">{testProgress}%</span>
                </div>
                <Progress value={testProgress} className="h-2" />
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
              <CardTitle>Your Performance</CardTitle>
              <CardDescription>Record yourself performing the sign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square max-h-80 w-full overflow-hidden rounded-md bg-muted">
                {cameraActive ? (
                  <div className="relative h-full w-full">
                    <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                    {recording && (
                      <div className="absolute top-2 right-2 flex items-center gap-2 rounded-md bg-red-500 px-2 py-1 text-white">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
                        <span className="text-xs font-medium">Recording</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-16 w-16 text-muted-foreground"
                    >
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                      <circle cx="12" cy="13" r="3"></circle>
                    </svg>
                    <p className="text-center text-sm text-muted-foreground">Enable your camera to record your sign</p>
                  </div>
                )}
              </div>
              {feedback && (
                <div className="rounded-md bg-muted p-4">
                  <div className="mb-2 flex items-center gap-2">
                    {feedback.success ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Needs improvement</span>
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
              {cameraActive && (
                <Button
                  onClick={toggleRecording}
                  variant={recording ? "destructive" : "default"}
                  className="flex-1"
                  disabled={feedback !== null}
                >
                  {recording ? "Stop Recording" : "Start Recording"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

