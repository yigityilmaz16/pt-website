async function seed() {
  console.log("Eklenecek örnek yorum bulunmuyor.")
}

seed().catch((error) => {
  console.error("Seed işlemi başarısız:", error)
  process.exitCode = 1
})
