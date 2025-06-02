"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignDisplay } from "../../components/practice/SignDisplay"
import { VideoCapture } from "../../components/practice/VideoCapture"
import { FeedbackCard } from "../../components/practice/FeedbackCard"
import { PracticeControls } from "../../components/practice/PracticeControls"
import { useCamera } from "../../../hooks/useCamera"
import { usePractice } from "../../../hooks/usePractice"

export default function PracticePage() {
  const camera = useCamera();
  const practice = usePractice();

  const handleToggleCamera = () => {
    if (camera.isStreaming) {
      camera.stopCamera();
    } else {
      camera.startCamera();
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Current Sign</CardTitle>
          <CardDescription>{practice.currentSign.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <SignDisplay sign={practice.currentSign} />
            <VideoCapture
              videoRef={camera.videoRef}
              canvasRef={camera.canvasRef}
              processedImageRef={camera.processedImageRef}
              isStreaming={camera.isStreaming}
              isConnecting={camera.isConnecting}
              onToggleCamera={handleToggleCamera}
              onSwitchCamera={camera.switchCameraDirection}
              onImageError={camera.cleanupCurrentFrame}
            />
          </div>
        </CardContent>
        <PracticeControls
          isStreaming={camera.isStreaming}
          onSubmitPractice={practice.submitPractice}
          onNextSign={practice.nextSign}
        />
      </Card>

      {practice.feedback && (
        <FeedbackCard feedback={practice.feedback} />
      )}
    </div>
  );
}