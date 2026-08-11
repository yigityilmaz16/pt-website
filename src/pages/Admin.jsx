import { useState } from "react"
import BrandLogo from "../components/BrandLogo"
import getApiUrl from "../config/api"
import AdminMessages from "../components/admin/AdminMessages"
import AdminTestimonials from "../components/admin/AdminTestimonials"
import AdminOrders from "../components/admin/AdminOrder"


function Admin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState(
  () => sessionStorage.getItem("adminToken") || "",
)
  const [formMessage, setFormMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
  e.preventDefault()
  setIsSubmitting(true)
  setFormMessage("")

  try {
    const response = await fetch(getApiUrl("/api/admin/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      setFormMessage(data.message || "Giriş yapılamadı.")
      return
    }

    sessionStorage.setItem("adminToken", data.token)
    setToken(data.token)
    setPassword("")
  } catch (error) {
    console.error("Admin girişi başarısız:", error)
    setFormMessage("Server bağlantısı kurulamadı.")
  } finally {
    setIsSubmitting(false)
  }
}

function handleLogout() {
  sessionStorage.removeItem("adminToken")
  setToken("")
  setEmail("")
  setPassword("")
  setFormMessage("")
}

if (token) {
  return (
    <main className="admin-page admin-dashboard">
      <div className="admin-shell">
        <header className="admin-dashboard__header">
          <div>
            <BrandLogo className="admin-brand" />
            <p className="admin-dashboard__eyebrow">YÖNETİM MERKEZİ</p>
            <h1>Admin Paneli</h1>
            <p>Mesajları ve danışan yorumlarını tek yerden yönet.</p>
          </div>

          <button className="admin-logout" type="button" onClick={handleLogout}>
            Çıkış Yap
          </button>
        </header>
        <AdminOrders token={token} onUnauthorized={handleLogout} />
        <div className="admin-dashboard__grid">
          <AdminMessages token={token} onUnauthorized={handleLogout} />
          <AdminTestimonials token={token} onUnauthorized={handleLogout} />
        </div>
      </div>
    </main>
  )
}

  return (
    <main className="admin-page admin-page--login">
      <section className="admin-login">
        <BrandLogo className="admin-brand" />
        <span className="admin-login__eyebrow">GÜVENLİ YÖNETİM ALANI</span>
        <h1>Admin Girişi</h1>
        <p>Yönetim paneline erişmek için bilgilerini gir.</p>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">E-posta</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="admin-password">Şifre</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
        {formMessage && <p className="admin-login__message">{formMessage}</p>}
      </section>
    </main>
  )
}

export default Admin
