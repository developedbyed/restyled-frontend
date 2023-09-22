import { serverTRPC } from "@/server/trpc_server";
import Carousel from "@/components/Carousel";
import ReactMarkdown from "react-markdown";
import Delivery from "@/components/Delivery";
import AddToCart from "../AddToCart";

export default async function Product({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product = await serverTRPC.getProduct.query({ id });
  const { description } = product.data.attributes;
  return (
    <main className="py-16 mx-12">
      <section className="flex flex-col gap-16 lg:flex-row items-start justify-center content-center flex-wrap ">
        <Carousel images={product.data.attributes.gallery.data} />
        <div className="max-w-xl">
          <h1 className="font-bold text-2xl">
            {product.data.attributes.title}
          </h1>
          <p>{product.data.attributes.subtitle}</p>
          <p>
            This beautiful hardback journal is perfect for anyone who wants to
            keep track of their thoughts, ideas, and experiences. The 180gsm
            inner pages are smooth and luxurious to write on, and the 3mm thick
            cover provides a sturdy base for taking notes. Available in multiple
            colours.
          </p>
          <AddToCart />
        </div>
      </section>
      <section className="flex flex-col gap-16 lg:flex-row items-start justify-center py-12 content-center flex-wrap">
        <ReactMarkdown className="py-2 max-w-xl" children={description} />
        <Delivery />
      </section>
    </main>
  );
}
