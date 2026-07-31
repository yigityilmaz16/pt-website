import { useEffect, useState } from "react"
import getApiUrl from "../../config/api"

function AdminMessages({ token, onUnauthorized }) {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function getMessages() {
      try {
        const response = await fetch(getApiUrl("/api/admin/messages"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 401) {
          onUnauthorized()
          return
        }

        const data = await response.json()

        if (!response.ok) {
          setErrorMessage(data.message || "Mesajlar alınamadı.")
          return
        }

        setMessages(data)
      } catch (error) {
        console.error("Mesajlar alınamadı:", error)
        setErrorMessage("Server bağlantısı kurulamadı.")
      } finally {
        setIsLoading(false)
      }
    }

    getMessages()
  }, [token, onUnauthorized])

  async function handleMarkAsRead(messageId) {
  try {
    const response = await fetch(
      getApiUrl(`/api/admin/messages/${messageId}/read`),
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 401) {
      onUnauthorized()
      return
    }

    const updatedMessage = await response.json()

    if (!response.ok) {
      setErrorMessage(updatedMessage.message || "Mesaj güncellenemedi.")
      return
    }

    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId ? updatedMessage : message,
      ),
    )
  } catch (error) {
    console.error("Mesaj güncellenemedi:", error)
    setErrorMessage("Server bağlantısı kurulamadı.")
  }
}

async function handleDelete(messageId) {
  const shouldDelete = window.confirm(
    "Bu mesajı kalıcı olarak silmek istiyor musun?",
  )

  if (!shouldDelete) {
    return
  }

  try {
    const response = await fetch(
      getApiUrl(`/api/admin/messages/${messageId}`),
      {
        method: "DELETE",
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
      setErrorMessage(data.message || "Mesaj silinemedi.")
      return
    }

    setMessages((currentMessages) =>
      currentMessages.filter((message) => message.id !== messageId),
    )
  } catch (error) {
    console.error("Mesaj silinemedi:", error)
    setErrorMessage("Server bağlantısı kurulamadı.")
  }
}

  if (isLoading) {
    return <p className="admin-state">Mesajlar yükleniyor...</p>
  }

  if (errorMessage) {
    return <p className="admin-state admin-state--error">{errorMessage}</p>
  }

  return (
    <section className="admin-section">
      <header className="admin-section__header">
        <div>
          <span>GELEN KUTUSU</span>
          <h2>İletişim Mesajları</h2>
        </div>
        <strong>{messages.length}</strong>
      </header>

      {messages.length === 0 ? (
        <p className="admin-empty">Henüz mesaj bulunmuyor.</p>
      ) : (
        <div className="admin-list">
          {messages.map((message) => (
            <article
              className={`admin-card ${message.read ? "" : "admin-card--new"}`}
              key={message.id}
            >
              <div className="admin-card__topline">
                <span className={`admin-status ${message.read ? "admin-status--muted" : ""}`}>
                  {message.read ? "Okundu" : "Yeni mesaj"}
                </span>
                <small>{new Date(message.createdAt).toLocaleString("tr-TR")}</small>
              </div>
              <h3>{message.subject}</h3>
              <p className="admin-card__name">{message.name}</p>
              <div className="admin-card__contact">
                <a href={`mailto:${message.email}`}>{message.email}</a>
                <a href={`tel:${message.phone}`}>{message.phone}</a>
              </div>
              <p className="admin-card__body">{message.message}</p>

              <div className="admin-card__actions">
                {!message.read && (
                  <button type="button" onClick={() => handleMarkAsRead(message.id)}>
                    Okundu İşaretle
                  </button>
                )}
                <button className="admin-button--danger" type="button" onClick={() => handleDelete(message.id)}>
                  Mesajı Sil
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default AdminMessages
