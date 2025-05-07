'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/api';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Lock, User, CheckCircle2, RefreshCw } from 'lucide-react';
import { images } from '@/app/Images/images';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordsMatch = password === confirmPassword;
  const canSubmit = username && email && password && confirmPassword && passwordsMatch && !loading;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const userData = {
      username,
      email,
      password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await authService.register(userData);
      setEmail(userData.email);
      setShowOTP(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
      toast.success('Registration successful! Please login to continue.');
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setVerifying(false);
    }
  }

  async function handleGoogleAuth() {
    setError('');
    setGoogleLoading(true);

    try {
      // Direct browser redirect to backend's Google OAuth URL
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/google/login/`;
    } catch (err) {
      setError('Failed to redirect to Google login');
      setGoogleLoading(false);
    }
  }

  async function handleResendOTP() {
    if (countdown > 0) return;

    setError('');
    try {
      await authService.resendOTP(email);
      setCountdown(60); // Start 60-second countdown
      setError('New verification code sent to your email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification code');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center">
            <Image
              src={images.mainLogo}
              alt="Gesturio Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {!showOTP ? 'Create an account' : 'Verify your email'}
          </h1>
          <p className="text-muted-foreground">
            {!showOTP
              ? 'Enter your details to get started'
              : 'We sent a verification code to your email'}
          </p>
        </div>

        {!showOTP ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  required
                  className="transition-all duration-200 focus:ring-2"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="transition-all duration-200 focus:ring-2"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                  placeholder="Create a password"
                  required
                  className="transition-all duration-200 focus:ring-2"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm_password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="transition-all duration-200 focus:ring-2"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              {!passwordsMatch && confirmPassword && (
                <div className="text-sm text-destructive">Passwords do not match</div>
              )}
            </div>

            {error && (
              <div className={`rounded-md p-3 text-sm ${error.includes('New verification code sent')
                ? 'bg-primary/10 text-primary'
                : 'bg-destructive/10 text-destructive'
                }`}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              disabled={!canSubmit}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              onClick={handleGoogleAuth}
              disabled={googleLoading}
            >
              <Mail className="mr-2 h-5 w-5 text-[#4285F4]" />
              {googleLoading ? 'Redirecting...' : 'Continue with Google'}
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
            </div>

            {error && (
              <div className={`rounded-md p-3 text-sm ${error.includes('New verification code sent')
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

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={handleResendOTP}
                disabled={countdown > 0}
              >
                <RefreshCw className={`h-4 w-4 ${countdown > 0 ? '' : 'animate-spin'}`} />
                {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
              </Button>
            </div>
          </form>
        )}

        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

