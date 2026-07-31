import { useEffect, useState } from "react"
import getApiUrl from "../../config/api"

function AdminTestimonials({ token, onUnauthorized }) {
  const [testimonials, setTestimonials] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function getTestimonials() {
      try {
        const response = await fetch(
          getApiUrl("/api/admin/testimonials"),
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
          setErrorMessage(data.message || "Yorumlar alınamadı.")
          return
        }

        setTestimonials(data)
      } catch (error) {
        console.error("Yorumlar alınamadı:", error)
        setErrorMessage("Server bağlantısı kurulamadı.")
      } finally {
        setIsLoading(false)
      }
    }

    getTestimonials()
  }, [token, onUnauthorized])

  async function handleApprove(testimonialId) {
  try {
    const response = await fetch(
      getApiUrl(`/api/admin/testimonials/${testimonialId}/approve`),
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

    const updatedTestimonial = await response.json()

    if (!response.ok) {
      setErrorMessage(
        updatedTestimonial.message || "Yorum onaylanamadı.",
      )
      return
    }

    setTestimonials((currentTestimonials) =>
      currentTestimonials.map((testimonial) =>
        testimonial.id === testimonialId
          ? updatedTestimonial
          : testimonial,
      ),
    )
  } catch (error) {
    console.error("Yorum onaylanamadı:", error)
    setErrorMessage("Server bağlantısı kurulamadı.")
  }
}

async function handleDelete(testimonialId) {
  const shouldDelete = window.confirm(
    "Bu yorumu kalıcı olarak silmek istiyor musun?",
  )

  if (!shouldDelete) {
    return
  }

  try {
    const response = await fetch(
      getApiUrl(`/api/admin/testimonials/${testimonialId}`),
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
      setErrorMessage(data.message || "Yorum silinemedi.")
      return
    }

    setTestimonials((currentTestimonials) =>
      currentTestimonials.filter(
        (testimonial) => testimonial.id !== testimonialId,
      ),
    )
  } catch (error) {
    console.error("Yorum silinemedi:", error)
    setErrorMessage("Server bağlantısı kurulamadı.")
  }
}

  if (isLoading) {
    return <p className="admin-state">Yorumlar yükleniyor...</p>
  }

  if (errorMessage) {
    return <p className="admin-state admin-state--error">{errorMessage}</p>
  }

  return (
    <section className="admin-section">
      <header className="admin-section__header">
        <div>
          <span>TOPLULUK</span>
          <h2>Danışan Yorumları</h2>
        </div>
        <strong>{testimonials.length}</strong>
      </header>

      {testimonials.length === 0 ? (
        <p className="admin-empty">Henüz yorum bulunmuyor.</p>
      ) : (
        <div className="admin-list">
          {testimonials.map((testimonial) => (
            <article className="admin-card" key={testimonial.id}>
              <div className="admin-card__topline">
                <span className={`admin-status ${testimonial.approved ? "admin-status--live" : ""}`}>
                  {testimonial.approved ? "Yayında" : "Onay bekliyor"}
                </span>
                <span className="admin-rating">{"★".repeat(testimonial.rating)}</span>
              </div>
              <h3>{testimonial.name}</h3>
              <p className="admin-card__body">{testimonial.comment}</p>
              <p className="admin-card__meta">{testimonial.duration} ay birlikte çalışıldı</p>

              <div className="admin-card__actions">
                {!testimonial.approved && (
                  <button type="button" onClick={() => handleApprove(testimonial.id)}>
                    Yorumu Onayla
                  </button>
                )}
                <button className="admin-button--danger" type="button" onClick={() => handleDelete(testimonial.id)}>
                  {testimonial.approved ? "Yorumu Sil" : "Yorumu Reddet"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default AdminTestimonials
