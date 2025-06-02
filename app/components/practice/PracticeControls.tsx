import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"

interface PracticeControlsProps {
  isStreaming: boolean;
  onSubmitPractice: () => void;
  onNextSign: () => void;
}

export function PracticeControls({ isStreaming, onSubmitPractice, onNextSign }: PracticeControlsProps) {
  return (
    <CardFooter className="flex justify-between">
      <Button onClick={onSubmitPractice} disabled={!isStreaming}>
        Submit Practice
      </Button>
      <Button variant="outline" onClick={onNextSign}>
        Next Sign
      </Button>
    </CardFooter>
  );
}