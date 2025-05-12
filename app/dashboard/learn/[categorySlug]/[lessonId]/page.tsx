'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { use } from "react";

interface LessonStep {
  id: string;
  step_number: number;
  sign_name: string;
  image: string;
  video: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  image: string;
  steps: LessonStep[];
}

interface LessonPageProps {
  params: Promise<{
    categorySlug: string;
    lessonId: string;
  }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { categorySlug, lessonId } = use(params);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/learn/category?id=${categorySlug}&lessons=${lessonId}`,
          {
            credentials: 'include',
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch lesson data');
        }

        const data = await res.json();
        setLesson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [categorySlug, lessonId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  if (!lesson.steps || lesson.steps.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/learn/${categorySlug}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              No steps available for this lesson.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinishLesson();
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleFinishLesson = () => {
    // TODO: Implement lesson completion logic
    alert(`Congratulations! You've completed the lesson: ${lesson.title}. Progress saved (simulated).`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/learn/${categorySlug}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="text-muted-foreground">{lesson.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Video/Image */}
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              {currentStep.video ? (
                <video
                  src={currentStep.video}
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                  aria-label={`Video of ${currentStep.sign_name}`}
                >
                  Your browser does not support the video tag.
                </video>
              ) : currentStep.image ? (
                <img
                  src={currentStep.image}
                  alt={currentStep.sign_name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No media available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right side - Sign Name and Navigation */}
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Step {currentStep.step_number + 1}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {lesson.duration}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">{currentStep.sign_name}</h2>
              <p className="text-muted-foreground">
                {currentStepIndex + 1} of {lesson.steps.length} steps
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStepIndex === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNextStep}>
              {isLastStep ? "Finish Lesson" : "Next Step"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 