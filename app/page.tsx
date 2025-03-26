import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen-safe flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-primary">ASL Learning</h1>
          <nav className="ml-auto flex gap-4">
            <Link href="/learn" className="text-sm font-medium hover:underline">
              Learn
            </Link>
            <Link href="/test" className="text-sm font-medium hover:underline">
              Test
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/auth" className="text-sm font-medium hover:underline">
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Learn American Sign Language
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Interactive lessons and real-time feedback to help you master ASL
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/learn">Start Learning</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/auth">Sign Up Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

