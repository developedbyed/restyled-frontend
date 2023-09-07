import ProductGallery from "@/components/ProductGallery"
import TodoList from "@/components/TodoList"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <ProductGallery /> */}
      <TodoList />
    </main>
  )
}
