'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardHeader,
  CardTitle, CardDescription, CardFooter
} from "@/components/ui/card";
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
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
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
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Failed to fetch lesson data');
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

  if (isLoading) return <div className="text-center text-lg mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">Error: {error}</div>;
  if (!lesson) return <div className="text-center mt-20">Lesson not found</div>;

  if (!lesson.steps || lesson.steps.length === 0) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto mt-8 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/dashboard/learn/${categorySlug}`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-semibold">{lesson.title}</h1>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No steps available for this lesson.
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;
  lesson.difficulty = 'Beginner';

  const handleNextStep = () => {
    if (!isLastStep) setCurrentStepIndex((prev) => prev + 1);
    else handleFinishLesson();
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1);
  };

  const handleFinishLesson = () => {
    alert(`🎉 You've completed the lesson: ${lesson.title}! Progress saved (simulated).`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 mt-10">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/learn/${categorySlug}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold leading-tight">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground">{lesson.description}</p>
        </div>
      </div>

      {/* Progress + Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-semibold">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-secondary rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / lesson.steps.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round(((currentStepIndex + 1) / lesson.steps.length) * 100)}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="w-full h-2 rounded-full bg-secondary relative">
                <div
                  className={`h-2 rounded-full absolute transition-all ${
                    lesson.difficulty === 'Beginner' ? 'bg-green-400 w-1/3' :
                    lesson.difficulty === 'Intermediate' ? 'bg-yellow-400 w-2/3' :
                    'bg-red-500 w-full'
                  }`}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {
                  lesson.difficulty === 'Beginner'
                    ? 'Great for newcomers learning foundational signs.'
                    : lesson.difficulty === 'Intermediate'
                    ? 'For learners comfortable with basics.'
                    : 'Challenging content for advanced signers.'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Video/Image - 2/3 */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video w-full overflow-hidden rounded-xl border bg-muted">
                {currentStep.video ? (
                  <video
                    src={currentStep.video}
                    controls
                    className="h-full w-full object-contain rounded-lg"
                  />
                ) : currentStep.image ? (
                  <img
                    src={currentStep.image}
                    alt={currentStep.sign_name}
                    className="h-full w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    No media available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Info Panel - 1/3 */}
        <div className="md:col-span-1">
        <Card className="h-full flex flex-col justify-between bg-muted/30 border border-muted-foreground/10 shadow-md">
            <CardHeader>
            <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-semibold text-base">Step {currentStep.step_number + 1}</span>
                <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4" />
                {lesson.duration}
                </div>
            </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
            <h2 className="text-6xl font-bold tracking-tight text-white">{currentStep.sign_name}</h2>
            <p className="text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {lesson.steps.length}
            </p>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 px-6 pb-6">
            <Button
                variant="ghost"
                className="w-full"
                onClick={handlePreviousStep}
                disabled={currentStepIndex === 0}
            >
                Previous
            </Button>
            <Button className="w-full" onClick={handleNextStep}>
                {isLastStep ? 'Finish Lesson' : 'Next Step'}
            </Button>
            </CardFooter>
        </Card>
        </div>

        
      </div>

      {/* Resources */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Additional Resources</CardTitle>
          <CardDescription className="text-sm">Boost your learning with these materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Practice Exercises',
                desc: 'Interactive exercises to reinforce your learning',
                action: 'Start Practice'
              },
              {
                title: 'Related Signs',
                desc: 'Learn related signs to expand your vocabulary',
                action: 'View Related'
              },
              {
                title: 'Download Resources',
                desc: 'Printable materials and reference guides',
                action: 'Download'
              }
            ].map((resource, idx) => (
              <div key={idx} className="flex flex-col p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="font-semibold text-sm">{resource.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-4">{resource.desc}</p>
                <Button variant="outline" size="sm" className="mt-auto">{resource.action}</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}