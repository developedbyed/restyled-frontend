"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type ProductColumn = {
  title: string
  price: number
  image: string
  subtitle: string
  color: string
}

export const columns: ColumnDef<ProductColumn>[] = [
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
      const cellColor = row.getValue("color") as string
      return (
        <div
          style={{ backgroundColor: cellColor }}
          className={`w-4 h-4 rounded-full`}
        ></div>
      )
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
]
