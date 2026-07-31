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
    return <p>Yorumlar yükleniyor...</p>
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  return (
    <section>
      <h2>Danışan Yorumları</h2>

      {testimonials.length === 0 ? (
        <p>Henüz yorum bulunmuyor.</p>
      ) : (
        testimonials.map((testimonial) => (
          <article key={testimonial.id}>
            <h3>{testimonial.name}</h3>
            <p>{testimonial.comment}</p>
            <p>{testimonial.duration} ay çalıştı</p>
            <p>{testimonial.rating} / 5 yıldız</p>
            <p>{testimonial.approved ? "Yayında" : "Onay bekliyor"}</p>
            {!testimonial.approved && (
  <button
    type="button"
    onClick={() => handleApprove(testimonial.id)}
  >
    Yorumu Onayla
  </button>
)}
<button
  type="button"
  onClick={() => handleDelete(testimonial.id)}
>
  {testimonial.approved ? "Yorumu Sil" : "Yorumu Reddet"}
</button>
          </article>
        ))
      )}
    </section>
  )
}

export default AdminTestimonials