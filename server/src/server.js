import cors from 'cors'
import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 5000
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
 const comments=[
        {
            id:1,
            name:"Eda Şahin",
            comment:"3 aydır kendisiyle birlikte çalışıyorum, programını uygulayıp 8 kilo verdim, her konuda profesyonel ve her türlü sorumu anında cevaplıyor. İlgisi ve alakası için teşekkür ederim.",
            duration:"3",
            rating:"5"
        },
        {
            id:2,
            name:"Mehmet Şahin",
            comment:"1 ay sonunda 5 kilo verdim ve inanılmaz memnun kaldım, teşekkürler hocam.",
            duration:"1",
            rating:"5"
        }
        
    ];
  const messages= []

app.use(cors({ origin: clientUrl }))
app.use(express.json())


app.post('/api/contact' , (req,res) =>{
  const { name, email, phone, subject, message } = req.body

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({
      message: "Tüm alanlar zorunludur.",
    })
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string"
  ) {
    return res.status(400).json({
      message: "Form alanları metin olmalıdır.",
    })
  }

  const cleanName = name.trim()
  const cleanEmail = email.trim().toLowerCase()
  const cleanPhone = phone.trim()
  const cleanSubject = subject.trim()
  const cleanMessage = message.trim()
  const phoneDigits = cleanPhone.replace(/\D/g, "")
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (cleanName.length < 2 || cleanName.length > 80) {
    return res.status(400).json({
      message: "İsim 2 ile 80 karakter arasında olmalıdır.",
    })
  }

  if (cleanEmail.length > 254 || !emailPattern.test(cleanEmail)) {
    return res.status(400).json({
      message: "Geçerli bir e-posta adresi giriniz.",
    })
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return res.status(400).json({
      message: "Geçerli bir telefon numarası giriniz.",
    })
  }

  if (cleanSubject.length < 3 || cleanSubject.length > 120) {
    return res.status(400).json({
      message: "Konu 3 ile 120 karakter arasında olmalıdır.",
    })
  }

  if (cleanMessage.length < 10 || cleanMessage.length > 1000) {
    return res.status(400).json({
      message: "Mesaj 10 ile 1000 karakter arasında olmalıdır.",
    })
  }

  const newMessage = {
    id: Date.now(),
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    subject: cleanSubject,
    message: cleanMessage,
  }

  messages.push(newMessage)
  res.status(201).json(newMessage)

})

app.get('/api/health', (req, res) => {
  res.json({ message: 'FITCOACH API çalışıyor.' })
})

app.get('/api/testimonials', (req,res) =>{
    res.json(comments);
})
app.post('/api/testimonials',(req,res) =>{
  const { name, comment, duration, rating } = req.body
  if (!name || !comment || !duration || !rating) {
  return res.status(400).json({
    message: "Tüm alanlar zorunludur.",
  })
}
if (typeof name !== "string" || typeof comment !== "string") {
  return res.status(400).json({
    message: "İsim ve yorum metin olmalıdır."
  })
}
  if (name.trim().length < 2) {
  return res.status(400).json({
    message: "İsim en az 2 karakter olmalıdır.",
  })
}

if (comment.trim().length < 10) {
  return res.status(400).json({
    message: "Yorum en az 10 karakter olmalıdır.",
  })
}

const durationNumber = Number(duration)
const ratingNumber = Number(rating)

if (!Number.isInteger(durationNumber) || durationNumber <= 0) {
  return res.status(400).json({
    message: "Çalışma süresi pozitif bir tam sayı olmalıdır.",
  })
}

if (
  !Number.isInteger(ratingNumber) ||
  ratingNumber < 1 ||
  ratingNumber > 5
) {
  return res.status(400).json({
    message: "Puan 1 ile 5 arasında bir tam sayı olmalıdır.",
  })
}
 const newComment = {
  id: Date.now(),
  name: name.trim(),
  comment: comment.trim(),
  duration: durationNumber,
  rating: ratingNumber,
 }
  comments.push(newComment);
  res.status(201).json(newComment);
})

app.listen(port, () => {
  console.log(`Server http://localhost:${port} adresinde çalışıyor.`)
})
