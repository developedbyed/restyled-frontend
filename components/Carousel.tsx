"use client"

import useEmblaCarousel from "embla-carousel-react"

export default function Carousel({ children }: { children: React.ReactNode }) {
  const [emblaRef] = useEmblaCarousel({ loop: true })
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">{children}</div>
    </div>
  )
}
