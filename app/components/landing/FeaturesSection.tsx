import { BookOpen, Camera, BarChart } from "lucide-react"

interface Feature {
    icon: React.ReactNode
    title: string
    description: string
}

const features: Feature[] = [
    {
        icon: <BookOpen className="h-6 w-6" />,
        title: "Interactive Lessons",
        description: "Learn through visual content and interactive exercises designed by experts.",
    },
    {
        icon: <Camera className="h-6 w-6" />,
        title: "Real-time Practice",
        description: "Practice with your webcam and get instant feedback on your signing technique.",
    },
    {
        icon: <BarChart className="h-6 w-6" />,
        title: "Progress Tracking",
        description: "Track your learning journey with detailed progress metrics and achievements.",
    },
]

export const FeaturesSection = () => {
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                            Features
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Everything you need to master sign language
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform provides interactive lessons, real-time practice with feedback, and progress tracking to
                            help you learn effectively.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                {feature.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 