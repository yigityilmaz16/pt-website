import "dotenv/config"
import bcrypt from "bcryptjs"
import prisma from "../src/lib/prisma.js"

async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL ve ADMIN_PASSWORD tanımlanmalıdır.")
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12)

  await prisma.admin.upsert({
    where: {
      email: ADMIN_EMAIL.toLowerCase(),
    },
    update: {
      passwordHash,
    },
    create: {
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash,
    },
  })

  console.log("Admin hesabı hazır.")
}

seedAdmin()
  .catch((error) => {
    console.error("Admin oluşturulamadı:", error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })