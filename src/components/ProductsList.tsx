import { Fragment } from "react"
import Form from "./Form"
import { getProducts } from "@/server/queries"
import Card from "./Card"

export default async function ProductsList({
  query,
  page,
  family,
}: {
  query: string
  page: string
  family: string
}) {
  const response = await getProducts({ description: query, page, family })
  if (response?.rows?.length === 0 || !response?.rows)
    return <h1>Sin resultados</h1>
  return (
    <section className="grid gap-2 items-center justify-center w-full">
      {response.rows.map((product) => (
        <Fragment key={product.id}>
          <Card product={product} />
        </Fragment>
      ))}
    </section>
  )
}
