"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";

export default function Carousel({ images }) {
  console.log(images.length);
  const [emblaRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
  });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    dragFree: true,
    align: "start",
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
    <div className="max-w-lg">
      <div className="flex embla ">
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
      {images.length >= 1 && (
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex">
            {images.map((image, index) => (
              <Image
                onClick={() => onThumbClick(index)}
                width={160}
                height={160}
                className={`${
                  selectedIndex !== index ? "opacity-25" : "opacity-100"
                } transition-opacity duration-500 flex-1`}
                key={image.id}
                src={image.attributes.formats.small.url}
                alt={image.attributes.alternativeText}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
