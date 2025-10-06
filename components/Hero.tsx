"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-black via-black/98 to-background will-change-transform"
        style={{ transform: `translate3d(0, ${scrollY * 0.5}px, 0)` }}
      >
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02] will-change-transform"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, var(--primary) 2px, var(--primary) 3px)`,
            transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className={`absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-primary/40 to-transparent transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1200ms" }}
        />
        <div
          className={`absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-primary/40 to-transparent transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1200ms" }}
        />
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1400ms" }}
        />
        <div
          className={`absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/20 transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          style={{ transitionDelay: "1600ms" }}
        />
        <div
          className={`absolute top-8 right-8 w-16 h-16 border-r border-t border-primary/20 transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          style={{ transitionDelay: "1600ms" }}
        />
        <div
          className={`absolute bottom-8 left-8 w-16 h-16 border-l border-b border-primary/20 transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          style={{ transitionDelay: "1800ms" }}
        />
        <div
          className={`absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/20 transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          style={{ transitionDelay: "1800ms" }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div
          className={`mb-12 flex justify-center transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="relative">
            <Image
              src="/logo.png"
              alt="The Bridge - Premium Barbershop in Bridgeland, Calgary"
              width={240}
              height={240}
              className="opacity-90 drop-shadow-2xl w-[180px] h-[180px] md:w-[240px] md:h-[240px]"
              priority
            />
            <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10" />
          </div>
        </div>

        <h1
          className={`font-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-primary mb-8 tracking-tight leading-none transition-all duration-1000 text-balance ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          The Bridge
        </h1>

        <div
          className={`space-y-4 mb-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 font-light tracking-wide text-balance">
            Artisan Grooming in Bridgeland
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-primary/50" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Calgary</span>
            <div className="w-12 h-px bg-primary/50" />
          </div>
          <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-light text-pretty">
            Where craftsmanship meets luxury. Experience the art of traditional barbering elevated to new heights.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-black font-semibold tracking-wide px-8 py-6 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 min-h-[44px]"
            onClick={() => scrollToSection("booking")}
            aria-label="Book an appointment at The Bridge"
          >
            Reserve Your Experience
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent backdrop-blur-sm px-8 py-6 text-base hover:border-primary transition-all hover:scale-[1.02] active:scale-95 min-h-[44px]"
            onClick={() => scrollToSection("services")}
            aria-label="View our services"
          >
            Explore Services
          </Button>
        </div>
      </div>

      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground/60 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1000ms" }}
        role="presentation"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Discover</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-primary/60" />
      </div>
    </section>
  )
}
