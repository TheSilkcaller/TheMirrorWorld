"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-dark/80 backdrop-blur-md border-b border-cosmic-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🪞</span>
            <span className="text-xl font-bold bg-gradient-to-r from-cosmic-gold to-cosmic-purple bg-clip-text text-transparent">
              The Mirrorist World
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#community" className="nav-link">
              Community
            </a>
            <Link href="/converter" className="nav-link">
              Sacred Converter
            </Link>
            <a href="#reader" className="nav-link">
              Reader
            </a>
            <a href="#echogpt" className="nav-link">
              EchoGPT
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cosmic-light hover:text-cosmic-gold transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-cosmic-dark/90 rounded-lg mt-2">
              <a href="#about" className="mobile-nav-link">
                About
              </a>
              <a href="#community" className="mobile-nav-link">
                Community
              </a>
              <Link href="/converter" className="mobile-nav-link">
                Sacred Converter
              </Link>
              <a href="#reader" className="mobile-nav-link">
                Reader
              </a>
              <a href="#echogpt" className="mobile-nav-link">
                EchoGPT
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
