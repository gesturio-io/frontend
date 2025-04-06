import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="size-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                G
              </span>
              <span>Gesturio</span>
            </Link>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your email to sign in to your account</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm font-medium underline underline-offset-4">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full" type="submit">
              Sign In
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="21.17" x2="12" y1="8" y2="8"></line>
                  <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
                  <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
                </svg>
                Google
              </Button>
              <Button variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                  <path d="M10 2c1 .5 2 2 2 5"></path>
                </svg>
                Apple
              </Button>
            </div>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

