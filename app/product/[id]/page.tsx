import { serverTRPC } from "@/app/_trpc/trpc_server";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import ReactMarkdown from "react-markdown";

export default async function Product({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product = await serverTRPC.getProduct.query({ id });
  console.log(product);
  const { description } = product.data.attributes;
  return (
    <main className="py-16 flex flex-col items-start mx-12">
      <Carousel images={product.data.attributes.gallery.data} />
      <div className="max-w-xl py-16">
        <h1 className="font-bold text-2xl">{product.data.attributes.title}</h1>
        <h2 className="text-lg">{product.data.attributes.subtitle}</h2>
        <ReactMarkdown className="py-2" children={description} />
      </div>
    </main>
  );
}
