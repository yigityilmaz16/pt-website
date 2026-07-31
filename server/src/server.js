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

app.use(cors({ origin: clientUrl }))
app.use(express.json())

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
