import { useState } from "react"
import LegalModal from "./LegalModal"
import getApiUrl from "../../config/api"

function CheckoutForm({ program }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState("")
  const [order, setOrder] = useState(null)
  const [activeLegalDocument, setActiveLegalDocument] = useState(null)
  const [termsRead, setTermsRead] = useState(false)
  const [privacyRead, setPrivacyRead] = useState(false)

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
          customerAddress: formData.get("customerAddress"),
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

      <div className="checkout-form__field">
         <label htmlFor="checkout-address">Fatura Adresi</label>
         <textarea
              id="checkout-address"
              name="customerAddress"
              minLength="10"
              maxLength="400"
             rows="3"
             autoComplete="street-address"
             required
       />
      </div>

     <div className="checkout-form__check">
  <input
    name="termsAccepted"
    type="checkbox"
    aria-label="Satış ve iade koşullarını kabul ediyorum"
    disabled={!termsRead}
    required
  />

  <span>
    <button
      className="checkout-form__legal-trigger"
      type="button"
      onClick={() => setActiveLegalDocument("terms")}
    >
      Mesafeli Satış ve İade Koşulları
    </button>
    'nı okudum ve kabul ediyorum.
    {termsRead && <small> Okundu ✓</small>}
  </span>
</div>

     <div className="checkout-form__check">
  <input
    name="privacyNoticeAccepted"
    type="checkbox"
    aria-label="KVKK ve gizlilik bilgilendirmesini kabul ediyorum"
    disabled={!privacyRead}
    required
  />

  <span>
    <button
      className="checkout-form__legal-trigger"
      type="button"
      onClick={() => setActiveLegalDocument("privacy")}
    >
      KVKK ve Gizlilik Bilgilendirmesi
    </button>
    'ni okudum.
    {privacyRead && <small> Okundu ✓</small>}
  </span>
</div>

      <button
        type="submit"
        disabled={isSubmitting || !termsRead || !privacyRead}
      >
        {isSubmitting
          ? "Sipariş Hazırlanıyor..."
          : `${program.price} — Ödemeye Devam Et`}
      </button>

      {formMessage && (
        <p className="checkout-form__message">{formMessage}</p>
      )}

      <small>Kart bilgilerin FITCOACH tarafından saklanmaz.</small>
      {activeLegalDocument === "terms" && (
  <LegalModal
    title="Mesafeli Satış ve İade Koşulları"
    onClose={() => setActiveLegalDocument(null)}
    onAccept={() => setTermsRead(true)}
  >
    <h3>Taraflar</h3>
    <p>
      Bu bölümde hizmet sağlayıcı ile online koçluk hizmetini satın
      alan kullanıcı arasındaki koşullar açıklanacaktır.
    </p>

    <h3>Hizmetin Konusu</h3>
    <p>
      Satın alınan paket; seçilen süre boyunca online koçluk,
      antrenman planlaması, beslenme yönlendirmesi ve takip
      hizmetlerini kapsar.
    </p>

    <h3>Ücret ve Ödeme</h3>
    <p>
      Paket ücreti ödeme ekranında gösterilir. Gerçek ödeme,
      iyzico entegrasyonu tamamlandıktan sonra güvenli ödeme
      altyapısı üzerinden alınacaktır.
    </p>

    <h3>Hizmetin Başlangıcı</h3>
    <p>
      Hizmetin başlangıç zamanı ve program teslim süresi site
      sahibi tarafından doğrulanarak nihai metne eklenecektir.
    </p>

    <h3>İptal ve İade</h3>
    <p>
      Hizmet başlamadan ve başladıktan sonra uygulanacak iptal
      ve iade şartları site sahibi tarafından belirlenecektir.
    </p>

    <h3>Taslak Uyarısı</h3>
    <p>
      Bu metin gerçek satıcı ve hizmet bilgileri eklenmeden
      yayına alınmamalıdır.
    </p>
  </LegalModal>
)}
{activeLegalDocument === "privacy" && (
  <LegalModal
    title="KVKK ve Gizlilik Bilgilendirmesi"
    onClose={() => setActiveLegalDocument(null)}
    onAccept={() => setPrivacyRead(true)}
  >
    <h3>Veri Sorumlusu</h3>
    <p>
      Veri sorumlusunun ad-soyad veya şirket unvanı ve iletişim
      bilgileri, site sahibi tarafından nihai metne eklenecektir.
    </p>

    <h3>Toplanan Bilgiler</h3>
    <p>
      Sipariş sırasında ad-soyad, e-posta, telefon, seçilen paket
      ve ödeme sürecine ilişkin bilgiler işlenebilir.
    </p>

    <h3>Koçluk Bilgileri</h3>
    <p>
      Ödeme sonrasında kullanıcının kendi isteğiyle paylaştığı yaş,
      boy, kilo, hedef, antrenman geçmişi ve sağlık notları kişiye
      özel program hazırlanması amacıyla kullanılabilir.
    </p>

    <h3>Kullanım Amaçları</h3>
    <p>
      Bilgiler siparişin yürütülmesi, kullanıcıyla iletişim
      kurulması, kişiye özel plan hazırlanması ve hizmetin takip
      edilmesi amaçlarıyla işlenebilir.
    </p>

    <h3>Saklama ve Güvenlik</h3>
    <p>
      Saklama süreleri, erişim yetkileri ve silme süreçleri site
      sahibinin gerçek çalışma biçimine göre nihai metinde
      açıklanacaktır.
    </p>

    <h3>Başvuru ve İletişim</h3>
    <p>
      Kullanıcının kişisel verileriyle ilgili başvuru yapabileceği
      iletişim adresi site sahibi tarafından eklenecektir.
    </p>

    <h3>Taslak Uyarısı</h3>
    <p>
      Bu metin gerçek veri sorumlusu ve saklama bilgileri
      eklenmeden yayına alınmamalıdır.
    </p>
  </LegalModal>
)}
    </form>
  )
}

export default CheckoutForm
