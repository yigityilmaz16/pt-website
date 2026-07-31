import jwt from "jsonwebtoken"

function authenticateAdmin(req, res, next) {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Yetkilendirme gerekli.",
    })
  }

  const token = authorizationHeader.split(" ")[1]

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    req.admin = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({
      message: "Geçersiz veya süresi dolmuş oturum.",
    })
  }
}

export default authenticateAdmin