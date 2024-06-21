interface CreateProductsQueryParameters {
  description?: string
  family?: string
  page?: number
  perPage: number
}

export function createProductsQuery({
  description,
  family,
  page,
  perPage,
}: CreateProductsQueryParameters) {
  const conditions: string[] = []
  const values: (string | number)[] = []
  const countValues: (string | number)[] = []

  let query = `SELECT * FROM PRODUCTS`
  let countQuery = `SELECT COUNT(*) FROM PRODUCTS`

  if (description) {
    conditions.push(`DESCRIPTION ILIKE $${values.length + 1}`)
    values.push(`%${description}%`)
    countValues.push(`%${description}%`)
  }
  if (family) {
    conditions.push(`CODE = $${values.length + 1}`)
    values.push(family)
    countValues.push(family)
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`
    countQuery += ` WHERE ${conditions.join(" AND ")}`
  }

  query += ` ORDER BY DESCRIPTION ASC`

  query += ` LIMIT $${values.length + 1}`
  values.push(perPage)

  if (page) {
    query += ` OFFSET $${values.length + 1}`
    values.push(page * perPage)
  }
  return { query, values, countQuery, countValues }
}
