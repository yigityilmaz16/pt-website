import authenticateAdmin from "./middleware/authenticateAdmin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "./lib/prisma.js"
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import programs from "./data/programs.js"

const app = express()
const port = process.env.PORT || 5000
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'



app.use(cors({ origin: clientUrl }))
app.use(express.json())


app.get("/api/admin/orders", authenticateAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        assessment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    res.json(orders)
  } catch (error) {
    console.error("Siparişler alınamadı:", error)

    res.status(500).json({
      message: "Siparişler alınamadı.",
    })
  }
})


app.post("/api/orders", async (req, res) => {
  const {
    customerName,
    customerEmail,
    customerPhone,
    programSlug,
    termsAccepted,
    privacyNoticeAccepted,
  } = req.body

  if (
    typeof customerName !== "string" ||
    typeof customerEmail !== "string" ||
    typeof customerPhone !== "string" ||
    typeof programSlug !== "string" ||
    termsAccepted !== true ||
    privacyNoticeAccepted !== true
  ) {
    return res.status(400).json({
      message: "Tüm alanlar ve onaylar zorunludur.",
    })
  }

  const cleanName = customerName.trim()
  const cleanEmail = customerEmail.trim().toLowerCase()
  const cleanPhone = customerPhone.trim()
  const phoneDigits = cleanPhone.replace(/\D/g, "")
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (cleanName.length < 2 || cleanName.length > 80) {
    return res.status(400).json({
      message: "Ad soyad 2 ile 80 karakter arasında olmalıdır.",
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

  const selectedProgram = programs.find(
    (program) => program.slug === programSlug,
  )

  if (!selectedProgram) {
    return res.status(404).json({
      message: "Program bulunamadı.",
    })
  }

  try {
    const acceptedAt = new Date()

    const order = await prisma.order.create({
      data: {
        customerName: cleanName,
        customerEmail: cleanEmail,
        customerPhone: cleanPhone,
        programSlug: selectedProgram.slug,
        programName: selectedProgram.name,
        amount: selectedProgram.amount,
        currency: selectedProgram.currency,
        termsAcceptedAt: acceptedAt,
        privacyNoticeAcceptedAt: acceptedAt,
      },
    })

    res.status(201).json({
      orderNumber: order.orderNumber,
      status: order.status,
      programName: order.programName,
      amount: order.amount,
      currency: order.currency,
      createdAt: order.createdAt,
    })
  } catch (error) {
    console.error("Sipariş oluşturulamadı:", error)

    res.status(500).json({
      message: "Sipariş oluşturulamadı.",
    })
  }
})

app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      message: "E-posta ve şifre zorunludur.",
    })
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    })

    if (!admin) {
      return res.status(401).json({
        message: "E-posta veya şifre hatalı.",
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash,
    )

    if (!passwordMatches) {
      return res.status(401).json({
        message: "E-posta veya şifre hatalı.",
      })
    }

    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    )

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    })
  } catch (error) {
    console.error("Admin girişi başarısız:", error)

    res.status(500).json({
      message: "Giriş işlemi tamamlanamadı.",
    })
  }
})

app.get("/api/admin/messages", authenticateAdmin, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    res.json(messages)
  } catch (error) {
    console.error("Mesajlar alınamadı:", error)

    res.status(500).json({
      message: "Mesajlar alınamadı.",
    })
  }
})

app.get(
  "/api/admin/testimonials",
  authenticateAdmin,
  async (req, res) => {
    try {
      const testimonials = await prisma.testimonial.findMany({
        orderBy: {
          createdAt: "desc",
        },
      })

      res.json(testimonials)
    } catch (error) {
      console.error("Admin yorumları alınamadı:", error)

      res.status(500).json({
        message: "Yorumlar alınamadı.",
      })
    }
  },
)

app.patch(
  "/api/admin/testimonials/:id/approve",
  authenticateAdmin,
  async (req, res) => {
    const testimonialId = Number(req.params.id)

    if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
      return res.status(400).json({
        message: "Geçersiz yorum ID değeri.",
      })
    }

    try {
      const testimonial = await prisma.testimonial.update({
        where: {
          id: testimonialId,
        },
        data: {
          approved: true,
        },
      })

      res.json(testimonial)
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Yorum bulunamadı.",
        })
      }

      console.error("Yorum onaylanamadı:", error)

      res.status(500).json({
        message: "Yorum onaylanamadı.",
      })
    }
  },
)


app.delete(
  "/api/admin/testimonials/:id",
  authenticateAdmin,
  async (req, res) => {
    const testimonialId = Number(req.params.id)

    if (!Number.isInteger(testimonialId) || testimonialId <= 0) {
      return res.status(400).json({
        message: "Geçersiz yorum ID değeri.",
      })
    }

    try {
      await prisma.testimonial.delete({
        where: {
          id: testimonialId,
        },
      })

      res.json({
        message: "Yorum silindi.",
      })
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Yorum bulunamadı.",
        })
      }

      console.error("Yorum silinemedi:", error)

      res.status(500).json({
        message: "Yorum silinemedi.",
      })
    }
  },
)

app.patch(
  "/api/admin/messages/:id/read",
  authenticateAdmin,
  async (req, res) => {
    const messageId = Number(req.params.id)

    if (!Number.isInteger(messageId) || messageId <= 0) {
      return res.status(400).json({
        message: "Geçersiz mesaj ID değeri.",
      })
    }

    try {
      const message = await prisma.contactMessage.update({
        where: {
          id: messageId,
        },
        data: {
          read: true,
        },
      })

      res.json(message)
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Mesaj bulunamadı.",
        })
      }

      console.error("Mesaj güncellenemedi:", error)

      res.status(500).json({
        message: "Mesaj güncellenemedi.",
      })
    }
  },
)

app.delete(
  "/api/admin/messages/:id",
  authenticateAdmin,
  async (req, res) => {
    const messageId = Number(req.params.id)

    if (!Number.isInteger(messageId) || messageId <= 0) {
      return res.status(400).json({
        message: "Geçersiz mesaj ID değeri.",
      })
    }

    try {
      await prisma.contactMessage.delete({
        where: {
          id: messageId,
        },
      })

      res.json({
        message: "Mesaj silindi.",
      })
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Mesaj bulunamadı.",
        })
      }

      console.error("Mesaj silinemedi:", error)

      res.status(500).json({
        message: "Mesaj silinemedi.",
      })
    }
  },
)


app.post('/api/contact' , async (req,res) =>{
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

  try {
  const savedMessage = await prisma.contactMessage.create({
    data: {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
    },
  })

  res.status(201).json(savedMessage)
} catch (error) {
  console.error("Mesaj kaydedilemedi:", error)

  res.status(500).json({
    message: "Mesaj kaydedilemedi. Lütfen tekrar deneyin.",
  })
}

})

app.get('/api/health', (req, res) => {
  res.json({ message: 'FITCOACH API çalışıyor.' })
})

app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
     where: {
    approved: true,
  },
  orderBy: {
    createdAt: "desc",
  },
    })

    res.json(testimonials)
  } catch (error) {
    console.error("Yorumlar alınamadı:", error)

    res.status(500).json({
      message: "Yorumlar alınamadı.",
    })
  }
})
app.post('/api/testimonials', async (req,res) =>{
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
 try {
  const newComment = await prisma.testimonial.create({
    data: {
      name: name.trim(),
      comment: comment.trim(),
      duration: durationNumber,
      rating: ratingNumber,
    },
  })

  res.status(201).json(newComment)
} catch (error) {
  console.error("Yorum kaydedilemedi:", error)

  res.status(500).json({
    message: "Yorum kaydedilemedi.",
  })
}
})

app.listen(port, () => {
  console.log(`Server http://localhost:${port} adresinde çalışıyor.`)
})
