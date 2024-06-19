"use server"
import { revalidatePath } from "next/cache"
import { Db } from "./db"
import { adaptProduct } from "./productsAdapters"
import { createProductsQuery } from "./queryBuilder"

const perPage = 10

type GetProductsParameters = {
  description?: string
  family?: string
  page?: string
}

export async function getProducts({
  description,
  family,
  page,
}: GetProductsParameters) {
  const db = new Db()
  const conn = await db.connect()

  try {
    const { query: createdQuery, values } = createProductsQuery({
      perPage,
      description,
      family,
      page: page ? +page - 1 : undefined,
    })
    const { rows, rowCount } = await conn.query(createdQuery, values)
    return {
      rows: adaptProduct(rows),
      totalPages: rowCount,
    }
  } catch (error) {
    console.log(error)
  } finally {
    conn.release()
  }
}

export async function productAddition(quantity: number, id: string) {
  const db = new Db()
  const conn = await db.connect()
  try {
    await conn.query("BEGIN")
    const result = await conn.query(
      "SELECT TOTAL FROM PRODUCTS WHERE ID = $1 FOR UPDATE",
      [id]
    )
    const { total } = result.rows[0]
    await conn.query("UPDATE PRODUCTS SET TOTAL = $1 WHERE ID = $2", [
      total + quantity,
      id,
    ])
    await conn.query("COMMIT")
  } catch (error) {
    await conn.query("ROLLBACK")
    throw error
  } finally {
    conn.release()
  }

  revalidatePath("/")
}

type User = {
  username: string
  role: "admin" | "user"
}

export async function login(
  user: string
): Promise<[User | null, string | null]> {
  const db = new Db()
  const conn = await db.connect()
  try {
    const result = await conn.query("SELECT * FROM USERS WHERE USERNAME=$1", [
      user,
    ])
    if (!result.rowCount) return [null, "usuario no encontrado"]
    return [result.rows[0], null]
  } catch (error) {
    throw error
  } finally {
    conn.release()
  }
}
