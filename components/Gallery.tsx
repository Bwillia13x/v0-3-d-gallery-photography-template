"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const galleryImages = [
  {
    src: "/luxury-barbershop-interior-with-leather-chairs-and.jpg",
    alt: "Luxury barbershop interior with leather chairs",
  },
  {
    src: "/professional-barber-giving-classic-haircut.jpg",
    alt: "Professional barber giving classic haircut",
  },
  {
    src: "/traditional-straight-razor-shave-hot-towel.jpg",
    alt: "Traditional straight razor shave with hot towel",
  },
  {
    src: "/premium-grooming-products-shelf-display.jpg",
    alt: "Premium grooming products display",
  },
  {
    src: "/vintage-barber-station-mirror-tools.jpg",
    alt: "Vintage barber station with mirror and tools",
  },
  {
    src: "/beard-trim-styling-close-up.jpg",
    alt: "Beard trim and styling close-up",
  },
]

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollSpeed = 0.3

    const scroll = () => {
      if (!isPaused) {
        scrollAmount += scrollSpeed
        if (scrollContainer) {
          scrollContainer.scrollLeft = scrollAmount
          if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollAmount = 0
          }
        }
      }
    }

    const interval = setInterval(scroll, 30)
    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-background" id="gallery">
      <div
        className={`mb-20 px-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mb-8 tracking-tight text-balance">
            The Experience
          </h2>
          <div className="w-20 h-px bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg text-pretty">
            Step into a world where tradition meets modern luxury. Every detail has been crafted to provide an
            exceptional experience.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6"
        style={{ scrollBehavior: "smooth" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Gallery of barbershop images"
      >
        {[...galleryImages, ...galleryImages].map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-80 h-[28rem] rounded-sm relative overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-500 group ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: `${(index % galleryImages.length) * 100}ms` }}
            role="img"
            aria-label={image.alt}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="320px"
              loading={index < 3 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-sm font-light tracking-wide">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 px-6">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Hover to pause • Scroll to explore</p>
      </div>
    </section>
  )
}
