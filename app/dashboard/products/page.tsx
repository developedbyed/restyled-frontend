import { getProducts } from "@/app/actions"
import { DataTable } from "./DataTable"
import { columns } from "./columns"

export default async function Products() {
  const products = await getProducts()
  if (products.error) return <h2>{products.error}</h2>
  const dataTable = products.data?.map(
    ({ title, subtitle, price, productVariants }) => ({
      title,
      subtitle,
      price,
      image: productVariants[0].image,
      color: productVariants[0].color,
    })
  )
  if (!dataTable) return <h2>Can't load table 😓 </h2>
  if (dataTable)
    return (
      <div>
        <DataTable columns={columns} data={dataTable} />
      </div>
    )
}
