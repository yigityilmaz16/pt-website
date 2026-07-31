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
    return <p>Mesajlar yükleniyor...</p>
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  return (
    <section>
      <h2>İletişim Mesajları</h2>

      {messages.length === 0 ? (
        <p>Henüz mesaj bulunmuyor.</p>
      ) : (
        messages.map((message) => (
          <article key={message.id}>
            <h3>{message.subject}</h3>
            <p>{message.name}</p>
            <p>{message.email}</p>
            <p>{message.phone}</p>
            <p>{message.message}</p>
            <small>
              {new Date(message.createdAt).toLocaleString("tr-TR")}
            </small>
            <p>{message.read ? "Okundu" : "Yeni mesaj"}</p>

{!message.read && (
  <button
    type="button"
    onClick={() => handleMarkAsRead(message.id)}
  >
    Okundu İşaretle
  </button>
)}
<button
  type="button"
  onClick={() => handleDelete(message.id)}
>
  Mesajı Sil
</button>
          </article>
        ))
      )}
    </section>
  )
}

export default AdminMessages
