"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff, FlipHorizontal } from "lucide-react"

export function DemoCameraPractice() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isFrontCamera, setIsFrontCamera] = useState(true)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFrontCamera ? "user" : "environment",
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
    }
  }

  const toggleCamera = () => {
    if (isStreaming) {
      stopCamera()
      setIsFrontCamera(!isFrontCamera)
      setTimeout(startCamera, 300)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => isStreaming ? stopCamera() : startCamera()}
          >
            {isStreaming ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          </Button>
          {isStreaming && (
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleCamera}
            >
              <FlipHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {!isStreaming && (
        <p className="text-center text-sm text-muted-foreground">
          Click the camera icon to start practicing
        </p>
      )}
    </div>
  )
} 