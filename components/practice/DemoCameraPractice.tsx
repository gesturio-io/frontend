"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff, FlipHorizontal } from "lucide-react"
import { VideoWebSocket } from "@/lib/websocket"

export function DemoCameraPractice() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const processedImageRef = useRef<HTMLImageElement>(null)
  const currentObjectUrl = useRef<string | null>(null)
  const currentBlob = useRef<Blob | null>(null)
  const wsRef = useRef<VideoWebSocket | null>(null)
  const streamIntervalRef = useRef<number | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isFrontCamera, setIsFrontCamera] = useState(true)
  const [facesDetected, setFacesDetected] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)

  const cleanupCurrentFrame = () => {
    // Clean up previous object URL if it exists
    if (currentObjectUrl.current) {
      URL.revokeObjectURL(currentObjectUrl.current);
      currentObjectUrl.current = null;
    }
    // Clean up previous blob
    if (currentBlob.current) {
      currentBlob.current = null;
    }
  };

  const updateProcessedFrame = (blob: Blob) => {
    if (!processedImageRef.current) return;
    
    // Clean up previous resources
    cleanupCurrentFrame();

    // Store the new blob
    currentBlob.current = blob;

    // Create and store new object URL
    const url = URL.createObjectURL(blob);
    currentObjectUrl.current = url;
    
    // Set up onload handler before setting src
    processedImageRef.current.onload = () => {
      // Once the image is loaded, we can safely revoke the object URL and clear the blob
      if (currentObjectUrl.current === url) { // Only cleanup if this is still the current frame
        URL.revokeObjectURL(url);
        currentObjectUrl.current = null;
        currentBlob.current = null;
      }
    };

    // Set the image source
    processedImageRef.current.src = url;
  };

  const initializeWebSocket = async () => {
    try {
      // Clean up any existing WebSocket connection first
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }

      // Create a new WebSocket instance
      wsRef.current = new VideoWebSocket();
      wsRef.current.onMessage = updateProcessedFrame;
      
      await wsRef.current.connect();
      return true;
    } catch (err) {
      console.error("Error connecting to WebSocket:", err);
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }
      return false;
    }
  };

  const startCamera = async () => {
    // Prevent multiple simultaneous connection attempts
    if (isConnecting) return;
    
    try {
      setIsConnecting(true);
      
      // Ensure complete cleanup before starting new connection
      stopCamera();

      // First try to get camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFrontCamera ? "user" : "environment",
        },
      });

      // Only proceed with WebSocket connection if we have camera access
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Initialize WebSocket connection
        const wsConnected = await initializeWebSocket();
        if (!wsConnected) {
          // If WebSocket fails, cleanup camera
          stopCamera();
          return;
        }

        // If everything is successful, update state and start streaming
        setIsStreaming(true);
        startFrameStream();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      stopCamera();
    } finally {
      setIsConnecting(false);
    }
  };

  const startFrameStream = () => {
    if (!videoRef.current || !canvasRef.current || !wsRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas size to match video dimensions
    const setCanvasSize = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    // Wait for video metadata to load to get correct dimensions
    video.addEventListener('loadedmetadata', setCanvasSize);

    // Stream frames every 100ms
    streamIntervalRef.current = window.setInterval(() => {
      if (!video.videoWidth || !wsRef.current?.isConnectedAndReady()) {
        return;
      }

      // Ensure canvas dimensions match current video dimensions
      if (canvas.width !== video.videoWidth) {
        setCanvasSize();
      }

      // Draw the current frame
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to blob and send
      canvas.toBlob((blob) => {
        if (blob && wsRef.current?.isConnectedAndReady()) {
          wsRef.current.sendFrame(blob);
        }
      }, 'image/jpeg', 0.8);
    }, 100);
  };

  const stopCamera = () => {
    // First stop the video stream
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    // Clear streaming interval
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }

    // Disconnect WebSocket and ensure complete cleanup
    if (wsRef.current) {
      wsRef.current.disconnect();
      wsRef.current = null;
    }

    // Reset state
    setIsStreaming(false);
    setFacesDetected(0);

    // Clean up processed image and resources
    if (processedImageRef.current) {
      processedImageRef.current.onload = null;
      processedImageRef.current.src = '';
    }
    cleanupCurrentFrame();
  };

  const switchCameraDirection = () => {
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
      <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${isStreaming ? 'absolute' : ''}`}
          />
          <img
            ref={processedImageRef}
            alt="Processed video feed"
            className={`w-full h-full object-cover ${isStreaming ? 'absolute inset-0' : 'hidden'}`}
            onError={() => {
              // Clean up resources if image fails to load
              cleanupCurrentFrame();
            }}
          />
          <canvas
            ref={canvasRef}
            className="hidden"
          />
        </div>
        {isStreaming && facesDetected > 0 && (
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
            Faces detected: {facesDetected}
          </div>
        )}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => isStreaming ? stopCamera() : startCamera()}
            disabled={isConnecting}
          >
            {isStreaming ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          </Button>
          {isStreaming && (
            <Button
              variant="secondary"
              size="icon"
              onClick={switchCameraDirection}
              disabled={isConnecting}
            >
              <FlipHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {!isStreaming && (
        <p className="text-center text-sm text-muted-foreground">
          {isConnecting ? "Connecting..." : "Click the camera icon to start practicing"}
        </p>
      )}
    </div>
  )
} 