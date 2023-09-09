import { Product } from "@/types/strapi/product"
import { Payload } from "@/types/strapi/Payload"

export const fetchProducts = async () => {
  const getProducts = await fetch(
    "https://strapi-producti-dc3c.up.railway.app/api/products?populate=gallery",
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_KEY}` },
    }
  )

  const products: Payload<Product[]> = await getProducts.json()

  return products
}
