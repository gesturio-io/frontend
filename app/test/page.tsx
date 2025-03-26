"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Play, SkipForward, Camera, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const testPrompts = [
  { id: 1, text: "Hello", completed: false },
  { id: 2, text: "Thank You", completed: false },
  { id: 3, text: "Please", completed: false },
]

export default function TestPage() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [feedback, setFeedback] = useState<null | "correct" | "incorrect">(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      // Clean up camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      streamRef.current = stream
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  useEffect(() => {
    startCamera()
  }, [])

  const handleStartRecording = () => {
    setIsRecording(true)
    setFeedback(null)

    // Simulate recognition after 3 seconds
    setTimeout(() => {
      // Randomly determine if sign was correct (in a real app, this would use ML)
      const isCorrect = Math.random() > 0.5
      setFeedback(isCorrect ? "correct" : "incorrect")
      setIsRecording(false)

      if (isCorrect) {
        // Move to next prompt after 1.5 seconds if correct
        setTimeout(() => {
          if (currentPromptIndex < testPrompts.length - 1) {
            setCurrentPromptIndex((prev) => prev + 1)
            setFeedback(null)
          }
        }, 1500)
      }
    }, 3000)
  }

  const handleSkip = () => {
    if (currentPromptIndex < testPrompts.length - 1) {
      setCurrentPromptIndex((prev) => prev + 1)
      setFeedback(null)
      setIsRecording(false)
    }
  }

  return (
    <div className="flex h-screen-safe flex-col overflow-hidden">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="ml-4 text-xl font-bold">Test Your ASL Skills</h1>
          <div className="ml-auto h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Left panel - Prompt */}
          <div className="flex h-1/2 lg:h-auto w-full lg:w-1/2 p-4 lg:p-6">
            <div className="w-full rounded-lg bg-gray-50 p-4 lg:p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Sign this:</h2>
                <p className="mt-2 text-2xl lg:text-3xl font-bold text-gray-800">
                  {testPrompts[currentPromptIndex].text}
                </p>
              </div>

              <div className="mt-4 lg:mt-0">
                <h3 className="text-xs font-medium text-gray-500">Example:</h3>
                <div className="mt-1 h-16 w-16 lg:h-24 lg:w-24 rounded-lg bg-gray-200 p-1 lg:p-2">
                  {/* This would be a GIF/video of the correct sign */}
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <Camera className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel - Video feed */}
          <div className="flex h-1/2 lg:h-auto w-full lg:w-1/2 bg-gray-100 p-4 lg:p-6">
            <div className="w-full flex flex-col">
              <div
                className={cn(
                  "relative flex flex-1 w-full items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300",
                  feedback === "correct" && "border-green-500",
                  feedback === "incorrect" && "border-red-500",
                  isRecording && "border-blue-500 border-solid",
                )}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={cn(
                    "h-full w-full object-cover",
                    feedback === "correct" && "animate-pulse-success",
                    feedback === "incorrect" && "animate-shake",
                  )}
                />

                {feedback === "correct" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-500 bg-opacity-20">
                    <CheckCircle className="h-12 w-12 lg:h-16 lg:w-16 text-green-500" />
                    <p className="mt-2 text-lg lg:text-xl font-bold text-green-700">Great job!</p>
                  </div>
                )}

                {feedback === "incorrect" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500 bg-opacity-20">
                    <XCircle className="h-12 w-12 lg:h-16 lg:w-16 text-red-500" />
                    <p className="mt-2 text-lg lg:text-xl font-bold text-red-700">Try again</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2 lg:gap-4 justify-center">
                <Button
                  size="sm"
                  disabled={isRecording}
                  onClick={handleStartRecording}
                  className="flex items-center gap-1"
                >
                  <Play className="h-3 w-3 lg:h-4 lg:w-4" />
                  {isRecording ? "Recording..." : <span className="hidden sm:inline">Start Recording</span>}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={isRecording}
                  onClick={handleSkip}
                  className="flex items-center gap-1"
                >
                  <SkipForward className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="hidden sm:inline">Skip</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

