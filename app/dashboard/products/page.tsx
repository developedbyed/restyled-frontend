import { getProducts } from "@/server/actions";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

export default async function Products() {
  const products = await getProducts();
  if (products.error) return <h2>{products.error}</h2>;
  console.log(products);
  const dataTable = products.data?.map(
    ({ id, title, subtitle, price, productImages, color }) => ({
      id,
      title,
      subtitle,
      price,
      color,
      image: productImages[0].url,
    })
  );
  if (!dataTable)
    return (
      <>
        <h2>Can't load table 😓 </h2>
      </>
    );
  if (dataTable)
    return (
      <div>
        <DataTable columns={columns} data={dataTable} />
      </div>
    );
}
