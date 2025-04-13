import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { images } from "@/app/Images/images"

export const HeroSection = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Learn Sign Language Interactively
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Master sign language through visual and interactive content. Practice with real-time feedback and
                                track your progress.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href="/demo">
                                <Button size="lg" className="w-full min-[400px]:w-auto">
                                    Try Demo
                                </Button>
                            </Link>
                            <Link href="#pricing">
                                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                                    Explore Premium
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:order-last">
                        <Image
                            src={images.learnSvg}
                            alt="Person demonstrating sign language"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
} 