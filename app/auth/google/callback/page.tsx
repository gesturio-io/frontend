'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function GoogleCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams?.get('error')
    if (error) {
      // Redirect to error page with the error message
      router.push(`/auth/error?error=${encodeURIComponent(error)}`)
      return
    }

    // If no error, check for auth token and redirect accordingly
    const token = searchParams?.get('token')
    if (token) {
      // Store the token if needed
      // Redirect to dashboard or profile completion
      router.push('/dashboard')
    } else {
      // If no token, redirect to error page
      router.push('/auth/error?error=Authentication failed')
    }
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse text-lg">
        Processing authentication...
      </div>
    </div>
  )
} 