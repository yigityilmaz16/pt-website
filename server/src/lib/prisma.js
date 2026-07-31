import { config } from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../generated/prisma/client.ts"

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

config({
  path: path.resolve(currentDirectory, "../../.env"),
})

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

export default prisma
