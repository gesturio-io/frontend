'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/api';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Lock, User, CheckCircle2, RefreshCw } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  // Add effect to send OTP when verification UI is shown
  useEffect(() => {
    if (showOTP && email) {
      handleResendOTP();
    }
  }, [showOTP, email]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const credentials = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.token);
      router.push('/dashboard');
    } catch (err: any) {
      // Check if the error is due to unverified email
      if (err.message?.includes('Please verify your email')) {
        setEmail(credentials.username); // Assuming username is email
        setShowOTP(true);
      } else {
        setError(err instanceof Error ? err.message : 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOTP(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setVerifying(true);

    try {
      await authService.verifyEmail(email, otp);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setVerifying(false);
    }
  }

  async function handleResendOTP() {
    setError('');
    setResending(true);

    try {
      await authService.resendOTP(email);
      setError('New verification code sent to your email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification code');
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {!showOTP ? 'Welcome back' : 'Verify your email'}
          </h1>
          <p className="text-muted-foreground">
            {!showOTP
              ? 'Enter your credentials to sign in'
              : 'We sent a verification code to your email'}
          </p>
        </div>

        {!showOTP ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full transition-all duration-200 hover:scale-[1.02]"
              >
                <Mail className="mr-2 h-5 w-5 text-[#4285F4]" />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  className="transition-all duration-200 focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="transition-all duration-200 focus:ring-2"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Please enter the 6-digit verification code sent to
                  <span className="font-medium text-foreground"> {email}</span>
                </p>
              </div>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="h-12 w-12 text-lg font-semibold"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleResendOTP}
                  disabled={resending}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${resending ? 'animate-spin' : ''}`} />
                  {resending ? 'Sending...' : 'Resend verification code'}
                </Button>
              </div>
            </div>

            {error && (
              <div className={`rounded-md p-3 text-sm ${error.includes('New verification code')
                ? 'bg-primary/10 text-primary'
                : 'bg-destructive/10 text-destructive'
                }`}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              disabled={verifying}
            >
              {verifying ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
        )}

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

