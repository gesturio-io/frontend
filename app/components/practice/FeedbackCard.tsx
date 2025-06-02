import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle } from "lucide-react"

interface FeedbackCardProps {
  feedback: {
    success: boolean;
    score: number;
  };
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
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
  );
}
