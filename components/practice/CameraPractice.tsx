"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff, FlipHorizontal } from "lucide-react"
import { VideoWebSocket } from "@/lib/websocket"

export function CameraPractice() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wsRef = useRef<VideoWebSocket | null>(null)
  const streamIntervalRef = useRef<number | null>(null)
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
        
        // Initialize WebSocket connection
        wsRef.current = new VideoWebSocket()
        await wsRef.current.connect()
        startFrameStream()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const startFrameStream = () => {
    if (!videoRef.current || !canvasRef.current || !wsRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const setCanvasSize = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    video.addEventListener('loadedmetadata', setCanvasSize);

    streamIntervalRef.current = window.setInterval(() => {
      if (!video.videoWidth || !wsRef.current?.isConnectedAndReady()) {
        return;
      }

      if (canvas.width !== video.videoWidth) {
        setCanvasSize();
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob && wsRef.current?.isConnectedAndReady()) {
          wsRef.current.sendFrame(blob);
        }
      }, 'image/jpeg', 0.8);
    }, 100);
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
      
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
      }

      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }
    }
  }

  const toggleCamera = () => {
    if (isStreaming) {
      stopCamera()
      setIsFrontCamera(!isFrontCamera)
      setTimeout(startCamera, 300) // Small delay to ensure camera switches properly
    }
  }

  useEffect(() => {
    return () => {
      stopCamera() // Cleanup on unmount
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden group">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <canvas
          ref={canvasRef}
          className="hidden"
        />
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => isStreaming ? stopCamera() : startCamera()}
            className="hover:bg-primary/10 transition-colors duration-200"
          >
            {isStreaming ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          </Button>
          {isStreaming && (
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleCamera}
              className="hover:bg-primary/10 transition-colors duration-200"
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