"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Repeat, HelpCircle, ChevronRight, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ASLAvatar from "@/components/asl-avatar"

const lessonWords = [
  { id: 1, text: "Hello", completed: false },
  { id: 2, text: "Thank You", completed: false },
  { id: 3, text: "Please", completed: false },
  { id: 4, text: "Yes", completed: false },
  { id: 5, text: "No", completed: false },
]

export default function LearnPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [cameraAngle, setCameraAngle] = useState("front")

  useEffect(() => {
    // Calculate progress percentage
    const completedCount = lessonWords.filter((word) => word.completed).length
    setProgress((completedCount / lessonWords.length) * 100)
  }, [currentWordIndex])

  const handleNext = () => {
    const updatedWords = [...lessonWords]
    updatedWords[currentWordIndex].completed = true

    if (currentWordIndex < lessonWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    }

    // Recalculate progress
    const completedCount = updatedWords.filter((word) => word.completed).length
    setProgress((completedCount / updatedWords.length) * 100)
  }

  const handleRepeat = () => {
    // Trigger animation repeat
    const avatarElement = document.getElementById("asl-avatar")
    if (avatarElement) {
      avatarElement.classList.remove("animate-bounce-subtle")
      void avatarElement.offsetWidth // Force reflow
      avatarElement.classList.add("animate-bounce-subtle")
    }
  }

  const handleTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(lessonWords[currentWordIndex].text)
      window.speechSynthesis.speak(utterance)
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
          <h1 className="ml-4 text-xl font-bold">ASL Basics Lesson</h1>
          <div className="ml-auto h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-1 bg-emerald-500 transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Main content - always fits on one screen */}
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Left panel - Text display */}
          <div className="flex h-1/2 lg:h-auto w-full lg:w-3/5 p-4 lg:p-6">
            <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-50 p-4 lg:p-6">
              <h2
                className="text-center text-3xl lg:text-4xl font-bold text-gray-800 transition-all duration-300"
                key={currentWordIndex}
                id="current-word"
              >
                {lessonWords[currentWordIndex].text}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="mt-2 text-gray-500 hover:text-gray-700"
                onClick={handleTextToSpeech}
              >
                <Volume2 className="h-5 w-5" />
                <span className="sr-only">Text to speech</span>
              </Button>

              <div className="mt-4 flex gap-2 lg:gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleRepeat}>
                  <Repeat className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="hidden sm:inline">Repeat</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <HelpCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="hidden sm:inline">Hint</span>
                </Button>
                <Button size="sm" className="flex items-center gap-1" onClick={handleNext}>
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right panel - ASL Avatar */}
          <div className="flex h-1/2 lg:h-auto w-full lg:w-2/5 bg-gray-100 p-4 lg:p-6">
            <div className="relative h-full w-full">
              <ASLAvatar word={lessonWords[currentWordIndex].text} cameraAngle={cameraAngle} />

              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-2 bg-white text-xs"
                onClick={() => setCameraAngle(cameraAngle === "front" ? "pov" : "front")}
              >
                {cameraAngle === "front" ? "POV" : "Front"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

