import { useState, useRef, useEffect } from "react"
import { VideoWebSocket } from "@/lib/websocket"

export function useCamera() {
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
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [wsConnected, setWsConnected] = useState(false)

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

  const initializeWebSocket = async (): Promise<boolean> => {
    try {
      setConnectionError(null);
      
      // Test connection first
      const isReachable = await VideoWebSocket.testConnection();
      if (!isReachable) {
        setConnectionError('WebSocket server is not reachable. Please ensure the server is running on port 8080.');
        return false;
      }

      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }

      wsRef.current = new VideoWebSocket();
      
      // Set up event handlers
      wsRef.current.onMessage = updateProcessedFrame;
      wsRef.current.onError = (error) => {
        console.error('WebSocket error in hook:', error);
        setConnectionError('WebSocket connection error occurred');
        setWsConnected(false);
      };
      wsRef.current.onConnectionChange = (connected) => {
        setWsConnected(connected);
        if (!connected) {
          setConnectionError('WebSocket connection lost');
        } else {
          setConnectionError(null);
        }
      };
      
      await wsRef.current.connect();
      setWsConnected(true);
      return true;
    } catch (err) {
      console.error("Error connecting to WebSocket:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown WebSocket error';
      setConnectionError(`Failed to connect to WebSocket: ${errorMessage}`);
      
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }
      setWsConnected(false);
      return false;
    }
  };

  const startCamera = async () => {
    if (isConnecting) return;
    
    try {
      setIsConnecting(true);
      setConnectionError(null);
      stopCamera();

      // First, try to initialize WebSocket
      const wsConnected = await initializeWebSocket();
      if (!wsConnected) {
        // Continue with camera even if WebSocket fails
        console.warn('WebSocket connection failed, but continuing with camera');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFrontCamera ? "user" : "environment",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        
        // Only start frame streaming if WebSocket is connected
        if (wsConnected) {
          startFrameStream();
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setConnectionError('Camera access denied. Please allow camera permissions.');
        } else if (err.name === 'NotFoundError') {
          setConnectionError('No camera found on this device.');
        } else {
          setConnectionError(`Camera error: ${err.message}`);
        }
      } else {
        setConnectionError('Unknown camera error occurred');
      }
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
          const sent = wsRef.current.sendFrame(blob);
          if (!sent) {
            console.warn('Failed to send frame to WebSocket');
          }
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
    setWsConnected(false);
    setConnectionError(null);

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

  const retryConnection = async () => {
    if (isStreaming && !wsConnected) {
      const success = await initializeWebSocket();
      if (success) {
        startFrameStream();
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    processedImageRef,
    isStreaming,
    isFrontCamera,
    isConnecting,
    wsConnected,
    connectionError,
    startCamera,
    stopCamera,
    switchCameraDirection,
    cleanupCurrentFrame,
    retryConnection
  };
}