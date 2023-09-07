import { fetchProducts } from "@/lib/fetchProducts"
import { Payload } from "@/types/strapi/Payload"
import { Product } from "@/types/strapi/product"
import Image from "next/image"

export default async function ProductGallery() {
  const products: Payload<Product[]> = await fetchProducts()
  return (
    <div>
      {products.data.map((product) => (
        <div key={product.id}>
          <h1>{product.attributes.title}</h1>
          <p>{product.attributes.description}</p>
          <Image
            width={800}
            height={800}
            src={
              product.attributes.gallery.data[0].attributes.formats.medium.url
            }
            alt="Patterned Journal"
          />
        </div>
      ))}
    </div>
  )
}
