"use client"

import Image from "next/image"
import Link from "next/link"
import { getProducts } from "@/app/actions"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function ProductGallery() {
  const { data, error } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
    refetchInterval: 5000,
  })

  if (data.data)
    return (
      <div className="flex flex-wrap justify-center gap-12">
        {data.data.map((product) => (
          <div className="text-center basis-64 flex-1" key={product.id}>
            <Link className="" href={`/product/${product.id}`}>
              <Image
                width={480}
                height={480}
                className="rounded-md w-full object-cover"
                src={product.productImages[0].image}
                alt={product.title}
                priority
              />
            </Link>
            <h2 className="font-bold pt-2">{product.title}</h2>
            <p>{product.subtitle}</p>
          </div>
        ))}
      </div>
    )
}
