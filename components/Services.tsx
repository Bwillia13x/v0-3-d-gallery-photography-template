"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Sparkles, Clock, Award } from "lucide-react"

const services = [
  {
    name: "Signature Cut",
    description: "Precision haircut tailored to your style, including consultation, wash, cut, and styling.",
    duration: "45 min",
    price: "$65",
    icon: Scissors,
  },
  {
    name: "Traditional Shave",
    description: "Hot towel treatment, straight razor shave, and premium aftercare for the ultimate experience.",
    duration: "30 min",
    price: "$55",
    icon: Sparkles,
  },
  {
    name: "Cut & Shave",
    description: "Our complete grooming package combining signature cut with traditional shave.",
    duration: "75 min",
    price: "$110",
    icon: Award,
  },
  {
    name: "Beard Sculpting",
    description: "Expert beard trimming and shaping with hot towel treatment and conditioning.",
    duration: "30 min",
    price: "$45",
    icon: Scissors,
  },
  {
    name: "Grey Blending",
    description: "Natural-looking color treatment to blend grey hair seamlessly with your natural tone.",
    duration: "60 min",
    price: "$85",
    icon: Sparkles,
  },
  {
    name: "Executive Package",
    description: "The ultimate grooming experience: cut, shave, beard sculpting, and scalp treatment.",
    duration: "120 min",
    price: "$195",
    icon: Award,
  },
]

export default function Services() {
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

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-accent/30" id="services">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mb-8 tracking-tight text-balance">
            Bespoke Services
          </h2>
          <div className="w-20 h-px bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg text-pretty">
            Each service is performed with meticulous attention to detail, ensuring you leave looking and feeling your
            absolute best.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className={`bg-background border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                tabIndex={0}
                role="article"
                aria-label={`${service.name} service`}
              >
                <CardContent className="p-8">
                  <div className="mb-4">
                    <Icon
                      className="w-8 h-8 text-primary/60 group-hover:text-primary transition-all duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-3 group-hover:text-primary/80 transition-colors text-balance">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-pretty">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-primary/20">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      <span aria-label={`Duration: ${service.duration}`}>{service.duration}</span>
                    </span>
                    <span className="text-primary font-semibold text-xl" aria-label={`Price: ${service.price}`}>
                      {service.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
