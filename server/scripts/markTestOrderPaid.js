import crypto from "node:crypto"
import prisma from "../src/lib/prisma.js"

const orderNumber = process.argv[2]

if (!orderNumber) {
  console.error("Bir sipariş numarası girmelisiniz.")
  console.error("Örnek: node scripts/markTestOrderPaid.js SIPARIS_NUMARASI")
  process.exit(1)
}

try {
  const order = await prisma.order.findUnique({
    where: {
      orderNumber,
    },
  })

  if (!order) {
    console.error("Sipariş bulunamadı.")
    process.exitCode = 1
  } else if (order.status !== "PENDING") {
    console.error(`Bu siparişin mevcut durumu: ${order.status}`)
    process.exitCode = 1
  } else {
    const assessmentToken = crypto.randomBytes(32).toString("hex")

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "PAID",
        paidAt: new Date(),
        assessmentToken,
        paymentReference: `TEST-${crypto.randomUUID()}`,
      },
    })

    console.log("Test siparişi PAID olarak güncellendi.")
    console.log(`Form bağlantısı: http://localhost:5173/assessment/${assessmentToken}`)
  }
} catch (error) {
  console.error("Test siparişi güncellenemedi:", error)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}