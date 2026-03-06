"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hash links must be absolute when not on the home page
  function h(hash: string) {
    return isHome ? hash : `/${hash}`;
  }

  const navLinks = [
    { href: h("#home"), label: "Home" },
    { href: h("#crisis"), label: "Marriage Crisis" },
    { href: h("#program"), label: "Program" },
    { href: h("#founders"), label: "Founders" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/assessment", label: "Assessment" },
    { href: h("#admissions"), label: "Admissions" },
    { href: h("#contact"), label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href={isHome ? "#home" : "/"} className="flex items-center">
            <Image
              src="/logo.png"
              alt="SMCC"
              width={180}
              height={60}
              className="w-32 md:w-40 h-auto"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-gold ${
                  isScrolled ? "text-charcoal" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/payment?source=navbar"
              className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Cohort I — Apply Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? "text-charcoal" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 bg-white rounded-lg shadow-xl">
            <div className="flex flex-col space-y-2 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-charcoal hover:text-gold font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/payment?source=navbar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-6 py-3 rounded-lg text-center transition-colors mt-2"
              >
                Cohort I — Apply Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
