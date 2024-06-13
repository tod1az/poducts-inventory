"use server"
import { revalidatePath } from "next/cache"
import { Db } from "./db"
import { adaptProduct } from "./productsAdapters"

export async function getProducts() {
  const db = new Db()
  const conn = await db.connect()

  const result = await conn.query("SELECT * FROM PRODUCTS")

  conn.release()

  return adaptProduct(result.rows)
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
