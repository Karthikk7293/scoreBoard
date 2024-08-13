import pg from 'pg'
const { Pool } = pg
export const db =   new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: "postgres",
  password: "1234",
  database: process.env.DATABASE_NAME
  })

export const databasePool = db
