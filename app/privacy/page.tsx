'use client'

import { Header } from "@/app/components/Header"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"
import { images } from "@/app/Images/images"

export default function PrivacyPage() {
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
          <Link href="/terms">
            <Button variant="ghost" size="sm">
              Terms of Service
            </Button>
          </Link>
        </div>
      </div>
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {currentDate}
            </p>
          </div>

          <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">1. Introduction</h2>
              <p>
                At Gesturio, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
              <div className="mt-4 rounded-lg border bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">
                  This policy applies to all information collected through our website, mobile application, and any related services.
                </p>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">2. Information We Collect</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-muted/40 p-4">
                  <h3 className="text-xl font-medium">Personal Information</h3>
                  <p className="mt-2 text-sm text-muted-foreground">We may collect:</p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>Name and email address</li>
                    <li>Account credentials</li>
                    <li>Profile information</li>
                    <li>Payment information</li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-muted/40 p-4">
                  <h3 className="text-xl font-medium">Usage Information</h3>
                  <p className="mt-2 text-sm text-muted-foreground">We automatically collect:</p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>Device information</li>
                    <li>Log data</li>
                    <li>Usage patterns</li>
                    <li>Performance data</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">3. How We Use Your Information</h2>
              <p>We use the collected information for various purposes:</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Service Improvement</h3>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-sm">
                    <li>Providing and maintaining our Service</li>
                    <li>Personalizing your experience</li>
                    <li>Analyzing usage patterns</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Communication</h3>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-sm">
                    <li>Updates about our service</li>
                    <li>Responding to your requests</li>
                    <li>Marketing communications</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
              <div className="mt-4 rounded-lg border bg-muted/40 p-4">
                <h3 className="font-medium">Security Measures:</h3>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments</li>
                  <li>Secure data storage</li>
                  <li>Access controls</li>
                </ul>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">5. Third-Party Services</h2>
              <p>
                Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">6. Your Rights</h2>
              <div className="mt-4 rounded-lg border bg-muted/40 p-4">
                <h3 className="font-medium">You have the right to:</h3>
                <ul className="mt-2 list-disc pl-6 space-y-1">
                  <li>Access your data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@gesturio.com.
              </p>
              <div className="mt-6 rounded-lg border bg-primary/5 p-6 text-center">
                <h3 className="font-medium text-lg">Privacy Concerns?</h3>
                <p className="mt-2 text-muted-foreground">
                  Our privacy team is here to help you with any questions or concerns about your personal data.
                </p>
                <Button className="mt-4">Contact Privacy Team</Button>
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