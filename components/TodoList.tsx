"use client"

import { trpc } from "../app/_trpc/Provider"

export default function TodoList() {
  const todos = trpc.getTodos.useQuery()
  return (
    <div>
      <div>{JSON.stringify(todos.data)}</div>
    </div>
  )
}
