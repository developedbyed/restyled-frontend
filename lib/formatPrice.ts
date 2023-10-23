export default function formatPrice(price: number) {
  const formatted = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(price)
  return formatted
}
