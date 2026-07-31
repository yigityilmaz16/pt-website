import { useEffect, useState } from "react"
import getApiUrl from "../../config/api"

function AdminOrders({ token, onUnauthorized }) {
  const orderStatusLabels = {
  PENDING: "Ödeme Bekliyor",
  PAID: "Ödendi",
  CANCELLED: "İptal Edildi",
  FAILED: "Ödeme Başarısız",
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
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default AdminOrders