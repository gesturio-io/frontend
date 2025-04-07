'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { images } from "../Images/images"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
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

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
                        Features
                    </Link>
                    <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
                        Testimonials
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
                        Pricing
                    </Link>
                    {/* <Link href="/dashboard">
                        <Button variant="ghost" size="sm">
                            Dashboard
                        </Button>
                    </Link> */}
                </nav>
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="outline" size="sm">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="default" size="sm">
                            Sign up
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="container py-4 space-y-6">
                        <nav className="flex flex-col gap-6">
                            <Link
                                href="#features"
                                className="text-sm font-medium hover:underline underline-offset-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#testimonials"
                                className="text-sm font-medium hover:underline underline-offset-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Testimonials
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-sm font-medium hover:underline underline-offset-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            {/* <Link href="/dashboard">
                                <Button variant="ghost" className="w-full justify-start">
                                    Dashboard
                                </Button>
                            </Link> */}
                        </nav>
                        <div className="flex flex-col gap-4 pt-6 border-t">
                            <Link href="/login">
                                <Button variant="outline" className="w-full">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="default" className="w-full">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
} 