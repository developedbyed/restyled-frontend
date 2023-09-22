"use client";
import { trpc } from "../Provider";

export default function Dashboard() {
  const { data, error, isLoading } = trpc.woo.useQuery();
  if (error) return <h1>{error.message}</h1>;
  if (isLoading) console.log(isLoading);
  console.log(data);
  return (
    <div>
      <h1>Hellooo</h1>
    </div>
  );
}
