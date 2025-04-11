'use client'

import { Header } from "@/app/components/Header"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"
import { images } from "@/app/Images/images"

export default function TermsPage() {
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString())
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header showNavLinks={false} />
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex-1" />
          <Link href="/privacy">
            <Button variant="ghost" size="sm">
              Privacy Policy
            </Button>
          </Link>
        </div>
      </div>
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: {currentDate}
            </p>
          </div>

          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Gesturio ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">2. Description of Service</h2>
              <p>
                Gesturio is an interactive platform for learning sign language. We provide visual and interactive content, practice exercises, and progress tracking tools.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">3. User Accounts</h2>
              <p>
                To access certain features of the Service, you must register for an account. You agree to provide accurate information and maintain the security of your account credentials.
              </p>
              <div className="mt-4 rounded-lg border bg-muted/40 p-4">
                <h3 className="font-medium">Account Requirements:</h3>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Valid email address</li>
                  <li>Secure password</li>
                  <li>Accurate profile information</li>
                  <li>Age requirement: 13 years or older</li>
                </ul>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">4. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">5. Content and Conduct</h2>
              <p>
                You are responsible for your use of the Service and any content you provide. You agree not to misuse the Service or help anyone else do so.
              </p>
              <div className="mt-4 rounded-lg border bg-muted/40 p-4">
                <h3 className="font-medium">Prohibited Activities:</h3>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Harassing or intimidating other users</li>
                  <li>Sharing inappropriate or offensive content</li>
                  <li>Attempting to breach security measures</li>
                </ul>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by Gesturio and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">8. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at support@gesturio.com.
              </p>
              <div className="mt-4 rounded-lg border bg-primary/5 p-6 text-center">
                <h3 className="font-medium text-lg">Need Help?</h3>
                <p className="mt-2 text-muted-foreground">
                  Our support team is available 24/7 to assist you with any questions or concerns.
                </p>
                <Button className="mt-4">Contact Support</Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={images.mainLogo}
                alt="Gesturio Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>Gesturio</span>
            </Link>
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