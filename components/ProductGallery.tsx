import { fetchProducts } from "@/lib/fetchProducts"
import { Payload } from "@/types/strapi/Payload"
import { Product } from "@/types/strapi/product"
import Image from "next/image"

export default async function ProductGallery() {
  const products = await fetchProducts()
  return (
    <div>
      {products.data.map((product) => (
        <div className="text-center" key={product.id}>
          <Image
            width={800}
            height={800}
            src={
              product.attributes.gallery.data[0].attributes.formats.medium.url
            }
            alt="Patterned Journal"
          />
          <h2>{product.attributes.title}</h2>
          <p>{product.attributes.description}</p>
        </div>
      ))}
    </div>
  )
}
