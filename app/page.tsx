import { Header } from "./components/Header"
import { HeroSection } from "./components/landing/HeroSection"
import { FeaturesSection } from "./components/landing/FeaturesSection"
import { TestimonialsSection } from "./components/landing/TestimonialsSection"
import { PricingSection } from "./components/landing/PricingSection"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <span className="size-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
              G
            </span>
            <span>Gesturio</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Gesturio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

