import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

interface VideoCaptureProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    processedImageRef: React.RefObject<HTMLImageElement | null>;
    isStreaming: boolean;
    isConnecting: boolean;
    onToggleCamera: () => void;
    onSwitchCamera: () => void;
    onImageError: () => void;
}

export function VideoCapture({
    videoRef,
    canvasRef,
    processedImageRef,
    isStreaming,
    isConnecting,
    onToggleCamera,
    onSwitchCamera,
    onImageError
}: VideoCaptureProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-medium">Practice</h3>
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
                        onError={onImageError}
                    />
                    <canvas
                        ref={canvasRef}
                        className="hidden"
                    />
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={onToggleCamera}
                        disabled={isConnecting}
                    >
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}