"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
//Actions
import { deleteProduct } from "@/server/actions";
import { toast } from "sonner";
import { useTransition } from "react";

//Delete Wrapper
async function deleteWrapper(id: number) {
  const data = await deleteProduct(id);
  if (data.error) {
    toast.error("Failed to delete product");
  } else {
    toast.success("Product deleted 👍");
  }
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type ProductColumn = {
  title: string;
  price: number;
  image: string;
  subtitle: string;
  color: string;
  id: number;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "subtitle",
    header: "Subtitle",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const cellColor = row.getValue("color") as string;
      return (
        <div
          style={{ backgroundColor: cellColor }}
          className={`w-4 h-4 rounded-full `}
        ></div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return (
        <div
          className="
       font-medium text-xs"
        >
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const cellImage = row.getValue("image") as string;
      return (
        <Image
          src={cellImage}
          width={50}
          height={50}
          alt="a mockup of the product"
          className="rounded-sm"
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const [isPending, startTransition] = useTransition();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/dashboard/add-product?id=${product.id}`}>
                Quick Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                startTransition(async () => {
                  toast.success("Product Deleted 👍");
                  await deleteProduct(product.id);
                })
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
