import isAdmin from "@/lib/isAdmin";
import AddProduct from "./AddProduct/AddPage";

export default async function Dashboard() {
  return (
    <div>
      <AddProduct />
    </div>
  );
}
