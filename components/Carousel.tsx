"use client";

import Image from "next/image";
import { type Media } from "@/types/strapi/Media";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";

export default function Carousel({ images }: { images: Media[] }) {
  const [emblaRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    axis: "y",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );
  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex">
      <div className="" ref={emblaThumbsRef}>
        <div>
          {images.map((image, index) => (
            <Image
              onClick={() => onThumbClick(index)}
              width={640}
              height={640}
              className={`${
                selectedIndex !== index ? "opacity-25" : "opacity-100"
              } transition-opacity duration-500  `}
              key={image.id}
              src={image.attributes.formats.small.url}
              alt={image.attributes.alternativeText}
            />
          ))}
        </div>
      </div>
      <div className="flex embla  bg-red-200 relative ">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container ">
            {images.map((image, index) => (
              <div key={image.id} className="embla__slide">
                <Image
                  width={960}
                  height={960}
                  alt={image.attributes.alternativeText}
                  src={image.attributes.formats.medium.url}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
