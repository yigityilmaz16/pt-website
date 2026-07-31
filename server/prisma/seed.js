import prisma from "../src/lib/prisma.js"

async function seed() {
  const testimonialCount = await prisma.testimonial.count()

  if (testimonialCount > 0) {
    console.log("Yorumlar zaten mevcut, seed işlemi atlandı.")
    return
  }

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Eda Şahin",
        comment:
          "3 aydır kendisiyle birlikte çalışıyorum, programını uygulayıp 8 kilo verdim, her konuda profesyonel ve her türlü sorumu anında cevaplıyor. İlgisi ve alakası için teşekkür ederim.",
        duration: 3,
        rating: 5,
        approved: true,
      },
      {
        name: "Mehmet Şahin",
        comment:
          "1 ay sonunda 5 kilo verdim ve inanılmaz memnun kaldım, teşekkürler hocam.",
        duration: 1,
        rating: 5,
        approved: true,
      },
    ],
  })

  console.log("Örnek yorumlar veritabanına eklendi.")
}

seed()
  .catch((error) => {
    console.error("Seed işlemi başarısız:", error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })