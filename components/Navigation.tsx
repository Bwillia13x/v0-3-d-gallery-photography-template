"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ["about", "services", "gallery", "testimonials", "booking"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
              aria-label="Return to top of page"
            >
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="opacity-90 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
              <span className="font-serif text-xl text-primary group-hover:text-primary/80 transition-colors">
                The Bridge
              </span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm transition-all tracking-wide relative group ${
                    activeSection === link.href.slice(1) ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                  aria-label={`Navigate to ${link.name} section`}
                  aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-primary transition-all ${
                      activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-black font-semibold transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg hover:shadow-primary/20 min-h-[44px]"
                onClick={() => scrollToSection("#booking")}
                aria-label="Book an appointment"
              >
                Book Now
              </Button>
            </div>

            <button
              className="md:hidden text-primary transition-transform hover:scale-110 active:scale-95 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg md:hidden animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-2xl font-serif text-primary hover:text-primary/80 transition-all hover:scale-110 animate-in slide-in-from-bottom duration-500 min-h-[44px]"
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`Navigate to ${link.name} section`}
              >
                {link.name}
              </button>
            ))}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-semibold mt-4 animate-in slide-in-from-bottom duration-500 min-h-[44px]"
              style={{ animationDelay: "400ms" }}
              onClick={() => scrollToSection("#booking")}
              aria-label="Book an appointment"
            >
              Reserve Your Experience
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
