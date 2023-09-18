import { Product } from "@/types/strapi/product"
import { Payload } from "@/types/strapi/Payload"

export const fetchProduct = async (id: number) => {
  const getProduct = await fetch(
    `https://strapi-production-dc3c.up.railway.app/api/products/${id}?populate=gallery`,
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_KEY}` },
    }
  )

  const product: Payload<Product> = await getProduct.json()

  return product
}
