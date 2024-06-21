import { createProductsQuery } from "../server/queryBuilder"
import { expect, it, describe } from "vitest"

describe("createProductsQuery", () => {
  it("when there are no filters provided, should return a query without filters", () => {
    expect(createProductsQuery({ perPage: 4 })).toStrictEqual({
      query: "SELECT * FROM PRODUCTS LIMIT $1",
      values: [4],
      countQuery: "SELECT COUNT(*) FROM PRODUCTS",
      countValues: [],
    })
  })
  it("when ther are filters provided, should return a query with filters", () => {
    expect(createProductsQuery({ perPage: 4, family: "je" })).toStrictEqual({
      query: "SELECT * FROM PRODUCTS WHERE CODE = $1 LIMIT $2",
      values: ["je", 4],
      countQuery: "SELECT COUNT(*) FROM PRODUCTS WHERE CODE = $1",
      countValues: ["je"],
    })
    expect(
      createProductsQuery({
        perPage: 4,
        family: "je",
        description: "description",
      })
    ).toStrictEqual({
      query:
        "SELECT * FROM PRODUCTS WHERE DESCRIPTION ILIKE $1 AND CODE = $2 LIMIT $3",
      values: ["%description%", "je", 4],
      countQuery:
        "SELECT COUNT(*) FROM PRODUCTS WHERE DESCRIPTION ILIKE $1 AND CODE = $2",
      countValues: ["%description%", "je"],
    })
    expect(
      createProductsQuery({
        perPage: 4,
        family: "je",
        description: "description",
        page: 2,
      })
    ).toStrictEqual({
      query:
        "SELECT * FROM PRODUCTS WHERE DESCRIPTION ILIKE $1 AND CODE = $2 LIMIT $3 OFFSET $4",
      values: ["%description%", "je", 4, 8],
      countQuery:
        "SELECT COUNT(*) FROM PRODUCTS WHERE DESCRIPTION ILIKE $1 AND CODE = $2",
      countValues: ["%description%", "je"],
    })
  })
})
