"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useCallback } from "react"
import { ProductImages } from "@/server/db/schema"

export default function Carousel({ images }: { images: ProductImages[] }) {
  const [emblaRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
  })
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    dragFree: true,
    align: "start",
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )
  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on("select", onSelect)
    emblaMainApi.on("reInit", onSelect)
  }, [emblaMainApi, onSelect])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on("select", onSelect)
    emblaMainApi.on("reInit", onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="max-w-lg flex flex-col gap-4 ">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container ">
            {images.map((image, index) => (
              <div key={image.id} className="embla__slide bg-secondary">
                <Image
                  width={960}
                  height={960}
                  className="rounded-md"
                  alt="replace"
                  src={image.image}
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {images.length >= 1 && (
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex gap-4">
            {images.map((image, index) => (
              <Image
                onClick={() => onThumbClick(index)}
                width={100}
                height={100}
                className={`${
                  selectedIndex !== index ? "opacity-25" : "opacity-100"
                } transition-opacity duration-500 flex-1  cursor-pointer`}
                key={image.id}
                src={image.image}
                alt="replace"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
