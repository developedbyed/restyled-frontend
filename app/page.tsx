import Image from "next/image"

const fetchProducts = async () => {
  const getProducts = await fetch(
    "https://strapi-production-dc3c.up.railway.app/api/products?populate=gallery",
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_KEY}` },
    }
  )
  const products = await getProducts.json()

  return products
}

export default async function Home() {
  const products = await fetchProducts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Strapi</h1>
      {products.data.map((product: any) => {
        return (
          <div key={product.id}>
            <h1>{product.attributes.title}</h1>

            <p>{product.attributes.description}</p>
            {product.attributes.gallery.data.map((image: any) => (
              <div key={image.id}>
                <Image
                  width={500}
                  height={500}
                  src={image.attributes.formats.medium.url}
                  alt=""
                />
              </div>
            ))}
          </div>
        )
      })}
    </main>
  )
}
