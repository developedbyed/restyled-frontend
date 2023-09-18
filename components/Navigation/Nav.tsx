"use client"
import Link from "next/link"
import User from "./User"
import { FaShoppingCart } from "react-icons/fa"

export default function Nav() {
  return (
    <header className="bg-black text-white p-6 px-48">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Link className="font-bold" href={"/"}>
              Restyled.
            </Link>
          </li>
          <li>
            <div className="flex gap-8 text-xl items-center ">
              <User />
              <FaShoppingCart className=" text-white" />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}
