import Image from "next/image"
import Link from "next/link"
import { db } from "@/server/db"
import { getProducts } from "@/app/actions"

export default async function ProductGallery() {
  const products = await getProducts()

  if (products.error) return <h2>{products.error}</h2>

  if (products.data)
    return (
      <div className="flex flex-wrap justify-center gap-12">
        {products.data.map((product) => (
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
