import pg from "pg"

const { Pool } = pg

export class Db {
  constructor() {
    const pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) ?? 5432,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    })
    this.pool = pool
  }
  pool
  connect() {
    return this.pool.connect()
  }
}
