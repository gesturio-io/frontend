'use client'; // Ensures this component can use React Hooks like useState

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Clock } from "lucide-react";
import { useState } from "react";

interface LessonStep {
  id: string;
  title: string;
  image?: string;
  staticSignImage?: string;
  content: string;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  categorySlug: string;
  steps: LessonStep[];
}

interface LessonPageProps {
  params: {
    lessonId: string;
    categorySlug: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  // Fetch lesson data from the backend API
  const res = await fetch(`/api/learn/basic-greetings/${params.lessonId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch lesson data");
  const lesson: Lesson = await res.json();

  // Client state for multi-step navigation
  // (useState must be in a client component, so we split rendering)
  return <LessonClient lesson={lesson} />;
}

function LessonClient({ lesson }: { lesson: Lesson }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isMultiStep = lesson.steps && lesson.steps.length > 0;
  const currentDisplayableContent = isMultiStep ? lesson.steps[currentStepIndex] : null;

  const handleNextStep = () => {
    if (isMultiStep && currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else if (isMultiStep && currentStepIndex === lesson.steps.length - 1) {
      handleFinishLesson();
    }
  };

  const handlePreviousStep = () => {
    if (isMultiStep && currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleFinishLesson = () => {
    // TODO: Implement backend progress submission
    alert(`Congratulations! You've completed the lesson: ${lesson.title}. Progress saved (simulated).`);
  };

  const stepTitle = isMultiStep ? currentDisplayableContent?.title : lesson.title;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/learn/${lesson.categorySlug || "basic-greetings"}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{stepTitle}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {lesson.duration}
            </div>
          </div>
          <CardDescription>{lesson.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isMultiStep && currentDisplayableContent && (
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
              {currentDisplayableContent.image && (
                <div className="md:w-1/2 lg:w-3/5 flex-shrink-0">
                  <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    {currentDisplayableContent.image.endsWith(".mp4") ? (
                      <video
                        src={currentDisplayableContent.image}
                        controls
                        playsInline
                        className="h-full w-full object-contain"
                        aria-label={`Video of ${stepTitle}`}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={currentDisplayableContent.image}
                        alt={stepTitle}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                </div>
              )}
              <div className={currentDisplayableContent.image ? "md:w-1/2 lg:w-2/5" : "w-full"}>
                {currentDisplayableContent.id === 'completion' ? (
                  <div className="text-center md:text-left py-4">
                    <h2 className="text-2xl font-semibold mb-4">{currentDisplayableContent.title}</h2>
                    <div className="prose prose-lg max-w-none">
                      <p>{currentDisplayableContent.content}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">{currentDisplayableContent.title}</h2>
                    <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground">
                      <p>{currentDisplayableContent.content || "Detailed content for this lesson will appear here."}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {isMultiStep && currentDisplayableContent?.staticSignImage && currentDisplayableContent.id !== 'completion' && (
            <div className="mt-8 pt-6 border-t flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-3">Key Pose</h3>
              <img
                src={currentDisplayableContent.staticSignImage}
                alt={`Static representation of the sign for ${stepTitle}`}
                className="max-w-xs md:max-w-sm h-auto rounded border p-2 bg-card"
              />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Static image for "{stepTitle}"
              </p>
            </div>
          )}
        </CardContent>
        {isMultiStep && lesson.steps && (
          <CardFooter className="border-t pt-6 flex justify-between items-center">
            <Button onClick={handlePreviousStep} disabled={currentStepIndex === 0} variant="outline">
              Previous
            </Button>
            <Button onClick={handleNextStep}>
              {currentStepIndex === lesson.steps.length - 1 ? "Finish Lesson" : "Next Step"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
} 