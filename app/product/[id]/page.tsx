import Carousel from "@/components/Carousel";
import Delivery from "@/components/Delivery";
import AddToCart from "../AddToCart";
import { getProduct } from "@/server/actions";
import formatPrice from "@/lib/formatPrice";

export default async function Product({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product = await getProduct(id);

  if (product.error) return <h2>Something went wrong!</h2>;

  if (product.data) {
    const formatted = formatPrice(product.data[0].price);

    return (
      <main className="  text-sm">
        <section className="flex gap-24 my-32 ">
          <Carousel images={product.data[0].productImages} />
          <div className="justify-start content-start">
            <h1 className="font-bold text-4xl my-2">{product.data[0].title}</h1>
            <p className="text-md font-muted font-medium">
              {product.data[0].subtitle}
            </p>
            <p className="text-2xl font-bold  my-2">{formatted}</p>
            {product.data[0].productVariants.map((variant) => (
              <div
                style={{ backgroundColor: variant.color }}
                className="w-10 h-10 rounded-full"
              ></div>
            ))}
            <AddToCart />
          </div>
        </section>
        <section className="flex justify-between gap-24 my-32">
          <div
            dangerouslySetInnerHTML={{ __html: product.data[0].description }}
          ></div>
          <Delivery />
        </section>
      </main>
    );
  }
}
