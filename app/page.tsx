import ProductGallery from "@/components/ProductGallery"
import TodoList from "@/components/TodoList"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-12">
      <ProductGallery />
    </main>
  )
}
