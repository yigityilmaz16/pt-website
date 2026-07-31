import { useState } from "react"
import getApiUrl from "../../config/api"

function CheckoutForm({ program }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState("")
  const [order, setOrder] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setFormMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(getApiUrl("/api/orders"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.get("customerName"),
          customerEmail: formData.get("customerEmail"),
          customerPhone: formData.get("customerPhone"),
          programSlug: program.slug,
          termsAccepted: formData.has("termsAccepted"),
          privacyNoticeAccepted: formData.has(
            "privacyNoticeAccepted",
          ),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setFormMessage(data.message || "Sipariş oluşturulamadı.")
        return
      }

      setOrder(data)
      form.reset()
    } catch (error) {
      console.error("Sipariş oluşturulamadı:", error)
      setFormMessage("Server bağlantısı kurulamadı.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (order) {
    return (
      <div className="checkout-form checkout-form--success">
        <span>SİPARİŞ HAZIR</span>
        <h3>{order.programName}</h3>
        <p>
          Sipariş numaran:
          <strong>{order.orderNumber}</strong>
        </p>
        <p>
          Bir sonraki adımda güvenli ödeme ekranına
          yönlendirileceksin.
        </p>
      </div>
    )
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="checkout-form__field">
        <label htmlFor="checkout-name">Ad Soyad</label>
        <input
          id="checkout-name"
          name="customerName"
          type="text"
          minLength="2"
          maxLength="80"
          autoComplete="name"
          required
        />
      </div>

      <div className="checkout-form__field">
        <label htmlFor="checkout-email">E-posta</label>
        <input
          id="checkout-email"
          name="customerEmail"
          type="email"
          maxLength="254"
          autoComplete="email"
          required
        />
      </div>

      <div className="checkout-form__field">
        <label htmlFor="checkout-phone">Telefon</label>
        <input
          id="checkout-phone"
          name="customerPhone"
          type="tel"
          maxLength="24"
          autoComplete="tel"
          required
        />
      </div>

      <label className="checkout-form__check">
        <input name="termsAccepted" type="checkbox" required />
        <span>
          Ön bilgilendirme ve mesafeli satış koşullarını kabul
          ediyorum.
        </span>
      </label>

      <label className="checkout-form__check">
        <input
          name="privacyNoticeAccepted"
          type="checkbox"
          required
        />
        <span>
          Kişisel verilerimin işlenmesine ilişkin bilgilendirmeyi
          okudum.
        </span>
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Sipariş Hazırlanıyor..."
          : `${program.price} — Ödemeye Devam Et`}
      </button>

      {formMessage && (
        <p className="checkout-form__message">{formMessage}</p>
      )}

      <small>Kart bilgilerin FITCOACH tarafından saklanmaz.</small>
    </form>
  )
}

export default CheckoutForm