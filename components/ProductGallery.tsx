import { fetchProducts } from "@/lib/fetchProducts"
import Image from "next/image"
import Link from "next/link"
import { serverTRPC } from "@/app/_trpc/trpc_server"

export default async function ProductGallery() {
  const { data } = await serverTRPC.getProducts.query()
  return (
    <div className="flex  flex-wrap justify-center gap-12">
      {data.map((product) => (
        <div className="text-center" key={product.id}>
          <Link href={`/product/${product.id}`}>
            <Image
              width={480}
              height={480}
              className="rounded-md"
              src={
                product.attributes.gallery.data[0].attributes.formats.medium.url
              }
              alt={
                product.attributes.gallery.data[0].attributes.alternativeText
              }
            />
          </Link>
          <h2 className="font-bold pt-2">{product.attributes.title}</h2>
          <p>{product.attributes.subtitle}</p>
        </div>
      ))}
    </div>
  )
}
