import Form from "./Form"
import { getProducts } from "@/server/queries"

export default async function ProductsList({ query }: { query: string }) {
  const products = await getProducts(query)

  if (products?.length === 0 || !products) return <h1>Sin resultados</h1>

  return (
    <section className="grid gap-2">
      {products.map((product) => (
        <article className="bg-gray-700 p-4" key={product.id}>
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
