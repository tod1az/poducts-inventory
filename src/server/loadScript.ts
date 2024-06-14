"use server"

import { Db } from "./db"

export async function loadData() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7ca8Mc1wCH8y9r-nrZVpRyUxS8LXNF_iFRPXyKFasDhkuAw3ste4bbQlxnS2AdWn-tGyMsld-F2mz/pub?output=csv"
  )
  const csv = await res.text()

  const products = csv
    .split("\n")
    .slice(1)
    .map((row) => {
      const [id, description, rest, rest2] = row.split(",")
      return {
        id,
        description,
      }
    })
  products.pop()
  const db = new Db()
  const conn = await db.connect()
  try {
    for (const product of products) {
      await conn.query("INSERT INTO PRODUCTS(ID, DESCRIPTION) VALUES($1,$2)", [
        product.id,
        product.description,
      ])
    }
  } catch (error) {
    console.log(error)
  } finally {
    conn.release
  }
}
