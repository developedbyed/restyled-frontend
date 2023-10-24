import ProductGallery from "@/components/ProductGallery"
import { Suspense } from "react"

export default async function Home() {
  return (
    <main className="p-12">
      <ProductGallery />
    </main>
  )
}
