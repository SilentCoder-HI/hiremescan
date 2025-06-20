"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <header
            className={`w-full z-50 transition-all duration-300 ${isScrolled
                    ? "fixed top-0 left-0 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-md"
                    : "relative bg-transparent"
                }`}
            style={{ willChange: "transform" }}
        >
            <div className="relative container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between">
                {/* Logo and Title */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur opacity-50 animate-pulse" />
                        <div className="relative" />
                    </div>
                    <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none">
                        HireMeScan
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="mt-4 md:mt-0 space-x-6 text-gray-300 text-lg font-medium">
                    <Link href="#features" className="hover:text-white transition-colors">
                        Features
                    </Link>
                    <Link href="#upload" className="hover:text-white transition-colors">
                        Upload Resume
                    </Link>
                    <Link href="#jobdesc" className="hover:text-white transition-colors">
                        Job Description
                    </Link>
                    <Link href="#contact" className="hover:text-white transition-colors">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    )
}
