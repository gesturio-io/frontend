'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { images } from "@/app/Images/images"

export default function AuthErrorPage() {
  const [error, setError] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const errorMsg = searchParams?.get("error") || "Authentication failed"
    setError(errorMsg)
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="mx-auto mb-6">
            <Image
              src={images.mainLogo}
              alt="Gesturio Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Authentication Error</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>

        <div className="grid gap-4">
          <Link href="/login">
            <Button className="w-full">
              Return to Login
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 