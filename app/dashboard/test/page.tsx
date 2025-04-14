"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, HandMetal } from "lucide-react"
import { VideoWebSocket } from "@/lib/websocket"

export default function TestPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const processedImageRef = useRef<HTMLImageElement>(null)
  const currentObjectUrl = useRef<string | null>(null)
  const currentBlob = useRef<Blob | null>(null)
  const wsRef = useRef<VideoWebSocket | null>(null)
  const streamIntervalRef = useRef<number | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isFrontCamera, setIsFrontCamera] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [recording, setRecording] = useState(false)
  const [feedback, setFeedback] = useState<null | { success: boolean; score: number }>(null)
  const [currentSign, setCurrentSign] = useState({
    name: "Hello",
    description: "Wave your hand with palm facing outward",
    image: "/placeholder.svg?height=300&width=300",
  })
  const [testProgress, setTestProgress] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)

  const cleanupCurrentFrame = () => {
    if (currentObjectUrl.current) {
      URL.revokeObjectURL(currentObjectUrl.current);
      currentObjectUrl.current = null;
    }
    if (currentBlob.current) {
      currentBlob.current = null;
    }
  };

  const updateProcessedFrame = (blob: Blob) => {
    if (!processedImageRef.current) return;
    
    cleanupCurrentFrame();

    currentBlob.current = blob;
    const url = URL.createObjectURL(blob);
    currentObjectUrl.current = url;
    
    processedImageRef.current.onload = () => {
      if (currentObjectUrl.current === url) {
        URL.revokeObjectURL(url);
        currentObjectUrl.current = null;
        currentBlob.current = null;
      }
    };

    processedImageRef.current.src = url;
  };

  const initializeWebSocket = async () => {
    try {
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }

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
    if (isConnecting) return;
    
    try {
      setIsConnecting(true);
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFrontCamera ? "user" : "environment",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        const wsConnected = await initializeWebSocket();
        if (!wsConnected) {
          stopCamera();
          return;
        }

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
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.disconnect();
      wsRef.current = null;
    }

    setIsStreaming(false);

    if (processedImageRef.current) {
      processedImageRef.current.onload = null;
      processedImageRef.current.src = '';
    }
    cleanupCurrentFrame();
  };

  const switchCameraDirection = () => {
    if (isStreaming) {
      stopCamera();
      setIsFrontCamera(!isFrontCamera);
      setTimeout(startCamera, 300);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      // Simulate processing the recording
      setTimeout(() => {
        const success = Math.random() > 0.3;
        const score = success ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 50;
        setFeedback({ success, score });
        setTestProgress(prev => Math.min(prev + 25, 100));
        if (testProgress + 25 >= 100) {
          setTestCompleted(true);
        }
      }, 1000);
    } else {
      setRecording(true);
      setFeedback(null);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Test Your Skills</CardTitle>
          <CardDescription>Record yourself performing the sign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium">Sign to Perform</h3>
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                <img
                  src={currentSign.image}
                  alt={currentSign.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{currentSign.name}</h4>
                <p className="text-sm text-muted-foreground">{currentSign.description}</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Your Recording</h3>
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
                      cleanupCurrentFrame();
                    }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="hidden"
                  />
                </div>
                {recording && (
                  <div className="absolute top-2 right-2 flex items-center gap-2 rounded-md bg-red-500 px-2 py-1 text-white">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
                    <span className="text-xs font-medium">Recording</span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => isStreaming ? stopCamera() : startCamera()}
                    disabled={isConnecting}
                  >
                    {isStreaming ? <HandMetal className="h-4 w-4" /> : <HandMetal className="h-4 w-4" />}
                  </Button>
                  {isStreaming && (
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={toggleRecording}
                      disabled={!isStreaming}
                    >
                      {recording ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Test Progress</span>
              <span className="font-medium">{testProgress}%</span>
            </div>
            <Progress value={testProgress} className="h-2" />
          </div>
        </CardFooter>
      </Card>

      {feedback && (
        <Card>
          <CardContent className="pt-6">
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}

