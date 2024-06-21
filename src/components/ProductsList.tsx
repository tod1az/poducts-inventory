import Form from "./Form"
import { getProducts } from "@/server/queries"

export default async function ProductsList({
  query,
  page,
}: {
  query: string
  page: string
}) {
  const response = await getProducts({ description: query, page })
  if (response?.rows?.length === 0 || !response?.rows)
    return <h1>Sin resultados</h1>
  return (
    <section className="grid gap-2">
      {response.rows.map((product) => (
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
