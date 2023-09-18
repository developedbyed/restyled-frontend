import { serverTRPC } from "@/app/_trpc/trpc_server"
import Image from "next/image"
import Carousel from "@/components/Carousel"

export default async function Product({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const product = await serverTRPC.getProduct.query({ id })
  console.log(product.data.attributes.description)
  return (
    <main className="py-12 flex gap-12 mx-64">
      <div className="">
        <Carousel>
          {product.data.attributes.gallery.data.map((image) => {
            return (
              <Image
                className="embla__slide"
                height={1280}
                alt={image.attributes.alternativeText}
                width={1280}
                src={image.attributes.formats.medium.url}
              />
            )
          })}
        </Carousel>
      </div>
      <div>
        <h1 className="font-bold text-2xl">{product.data.attributes.title}</h1>
        <h2 className="text-lg">{product.data.attributes.subtitle}</h2>
        <p className="py-2">{product.data.attributes.description}</p>
      </div>
    </main>
  )
}
