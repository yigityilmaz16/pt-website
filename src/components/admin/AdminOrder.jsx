import { useEffect, useState } from "react"
import getApiUrl from "../../config/api"

function AdminOrders({ token, onUnauthorized }) {
  const orderStatusLabels = {
  PENDING: "Ödeme Bekliyor",
  PAID: "Ödendi",
  CANCELLED: "İptal Edildi",
  FAILED: "Ödeme Başarısız",
}
const assessmentLabels = {
  female: "Kadın",
  male: "Erkek",
  unspecified: "Belirtilmedi",
  "weight-loss": "Kilo Vermek",
  "muscle-gain": "Kas Kazanmak",
  conditioning: "Kondisyon Geliştirmek",
  "healthy-lifestyle": "Sağlıklı Yaşam",
  beginner: "Başlangıç",
  intermediate: "Orta",
  advanced: "İleri",
  gym: "Spor Salonu",
  home: "Ev",
  both: "Ev ve Spor Salonu",
  low: "Düşük",
  moderate: "Orta",
  high: "Yüksek",
}
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await fetch(
          getApiUrl("/api/admin/orders"),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.status === 401) {
          onUnauthorized()
          return
        }

        const data = await response.json()

        if (!response.ok) {
          setErrorMessage(data.message || "Siparişler alınamadı.")
          return
        }

        setOrders(data)
      } catch (error) {
        console.error("Siparişler alınamadı:", error)
        setErrorMessage("Server bağlantısı kurulamadı.")
      } finally {
        setIsLoading(false)
      }
    }

    getOrders()
  }, [token, onUnauthorized])

  if (isLoading) {
    return <p className="admin-state">Siparişler yükleniyor...</p>
  }

  if (errorMessage) {
    return (
      <p className="admin-state admin-state--error">
        {errorMessage}
      </p>
    )
  }

  return (
    <section className="admin-section admin-orders">
      <header className="admin-section__header">
        <div>
          <span>SATIŞLAR</span>
          <h2>Siparişler</h2>
        </div>
        <strong>{orders.length}</strong>
      </header>

      {orders.length === 0 ? (
        <p className="admin-empty">Henüz sipariş bulunmuyor.</p>
      ) : (
        <div className="admin-list">
          {orders.map((order) => (
            <article className="admin-card" key={order.id}>
              <div className="admin-card__topline">
                <span
  className={`admin-status ${
    order.status === "PAID"
      ? "admin-status--live"
      : order.status === "CANCELLED" ||
          order.status === "FAILED"
        ? "admin-status--muted"
        : ""
  }`}
>
  {orderStatusLabels[order.status] || order.status}
</span>
                <small>
                  {new Date(order.createdAt).toLocaleString("tr-TR")}
                </small>
              </div>

              <h3>{order.programName}</h3>
              <p className="admin-card__name">
                {order.customerName}
              </p>

              <div className="admin-card__contact">
                <a href={`mailto:${order.customerEmail}`}>
                  {order.customerEmail}
                </a>
                <a href={`tel:${order.customerPhone}`}>
                  {order.customerPhone}
                </a>
              </div>

              <p className="admin-card__meta">
                Sipariş: {order.orderNumber}
              </p>

              <strong className="admin-order__price">
                {(order.amount / 100).toLocaleString("tr-TR")}{" "}
                {order.currency}
              </strong>
              {order.assessment ? (
  <div className="admin-assessment">
    <div className="admin-assessment__header">
      <span>DEĞERLENDİRME TAMAMLANDI</span>
      <small>
        {new Date(order.assessment.createdAt).toLocaleDateString("tr-TR")}
      </small>
    </div>

    <div className="admin-assessment__grid">
      <p>
        <span>Yaş</span>
        <strong>{order.assessment.age}</strong>
      </p>
      <p>
        <span>Boy</span>
        <strong>{order.assessment.heightCm} cm</strong>
      </p>
      <p>
        <span>Kilo</span>
        <strong>{order.assessment.weightKg} kg</strong>
      </p>
      <p>
        <span>Cinsiyet</span>
        <strong>
          {assessmentLabels[order.assessment.gender] ||
            order.assessment.gender}
        </strong>
      </p>
      <p>
        <span>Hedef</span>
        <strong>
          {assessmentLabels[order.assessment.goal] ||
            order.assessment.goal}
        </strong>
      </p>
      <p>
        <span>Seviye</span>
        <strong>
          {assessmentLabels[order.assessment.trainingLevel] ||
            order.assessment.trainingLevel}
        </strong>
      </p>
      <p>
        <span>Haftalık Antrenman</span>
        <strong>{order.assessment.weeklyTrainingDays} gün</strong>
      </p>
      <p>
        <span>Antrenman Ortamı</span>
        <strong>
          {assessmentLabels[order.assessment.trainingLocation] ||
            order.assessment.trainingLocation}
        </strong>
      </p>
      <p>
        <span>Günlük Hareket</span>
        <strong>
          {assessmentLabels[order.assessment.dailyActivityLevel] ||
            order.assessment.dailyActivityLevel}
        </strong>
      </p>
    </div>

    <details className="admin-assessment__notes">
      <summary>Beslenme ve sağlık notlarını görüntüle</summary>
      <div>
        <p>
          <span>Beslenme tercihleri / alerjiler</span>
          {order.assessment.dietaryPreferences || "Belirtilmedi"}
        </p>
        <p>
          <span>Sakatlık / rahatsızlık</span>
          {order.assessment.injuriesOrConditions || "Belirtilmedi"}
        </p>
        <p>
          <span>Düzenli kullanılan ilaçlar</span>
          {order.assessment.medications || "Belirtilmedi"}
        </p>
        <p>
          <span>Ek notlar</span>
          {order.assessment.additionalNotes || "Belirtilmedi"}
        </p>
      </div>
    </details>
  </div>
) : order.status === "PAID" ? (
  <p className="admin-assessment__pending">
    Müşteri değerlendirme formunu henüz doldurmadı.
  </p>
) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default AdminOrders
