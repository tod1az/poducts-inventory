import Form from "./Form"
import { getProducts } from "@/server/queries"

export default async function ProductsList() {
  const products = await getProducts()
  return (
    <section className="grid gap-2">
      {products.map((product) => (
        <article className="bg-gray-700 p-4" key={product.code}>
          <p>{product.code}</p>
          <p>{product.description}</p>
          <p>{product.family}</p>
          <p>{product.quantity}</p>
          <Form product={product} />
        </article>
      ))}
    </section>
  )
}
