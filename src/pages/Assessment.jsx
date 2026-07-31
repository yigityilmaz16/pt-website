import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import getApiUrl from "../config/api"

function Assessment() {
  const { token } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [linkError, setLinkError] = useState("")
  const [assessmentInfo, setAssessmentInfo] = useState(null)
  useEffect(() => {
  const controller = new AbortController()

  async function checkAssessmentLink() {
    try {
      const response = await fetch(
        getApiUrl(`/api/assessments/${token}`),
        { signal: controller.signal },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Bağlantı doğrulanamadı.")
      }

      setAssessmentInfo(data)
    } catch (error) {
      if (error.name !== "AbortError") {
        setLinkError(error.message)
      }
    } finally {
      setIsChecking(false)
    }
  }

  checkAssessmentLink()

  return () => controller.abort()
}, [token])


  async function handleSubmit(e) {
  e.preventDefault()
  const formElement = e.currentTarget
  setIsSubmitting(true)
  setFeedback("")

  const formData = new FormData(formElement)

  const assessmentData = {
    age: Number(formData.get("age")),
    gender: formData.get("gender"),
    heightCm: Number(formData.get("heightCm")),
    weightKg: Number(formData.get("weightKg")),
    goal: formData.get("goal"),
    trainingLevel: formData.get("trainingLevel"),
    weeklyTrainingDays: Number(formData.get("weeklyTrainingDays")),
    trainingLocation: formData.get("trainingLocation"),
    dailyActivityLevel: formData.get("dailyActivityLevel"),
    dietaryPreferences: formData.get("dietaryPreferences"),
    injuriesOrConditions: formData.get("injuriesOrConditions"),
    medications: formData.get("medications"),
    additionalNotes: formData.get("additionalNotes"),
    healthConsent: formData.get("healthConsent") === "on",
  }

  try {
    const response = await fetch(getApiUrl(`/api/assessments/${token}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assessmentData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Form gönderilemedi.")
    }

    setIsSuccess(true)
    setFeedback(data.message)
    formElement.reset()
  } catch (error) {
    setFeedback(error.message)
  } finally {
    setIsSubmitting(false)
  }
}

if (isChecking) {
  return (
    <main className="assessment-page assessment-status-page">
      <div className="assessment-status-card">
        <span>FITCOACH.</span>
        <h1>Bağlantı Kontrol Ediliyor</h1>
        <p>Lütfen kısa bir süre bekleyin.</p>
      </div>
    </main>
  )
}

if (linkError) {
  return (
    <main className="assessment-page assessment-status-page">
      <div className="assessment-status-card">
        <span>FITCOACH.</span>
        <h1>Bağlantı Kullanılamıyor</h1>
        <p>{linkError}</p>
        <Link to="/">Ana Sayfaya Dön</Link>
      </div>
    </main>
  )
}

if (assessmentInfo?.completed) {
  return (
    <main className="assessment-page assessment-status-page">
      <div className="assessment-status-card">
        <span>FITCOACH.</span>
        <h1>Değerlendirme Tamamlandı</h1>
        <p>Bu sipariş için değerlendirme formu daha önce gönderilmiş.</p>
        <Link to="/">Ana Sayfaya Dön</Link>
      </div>
    </main>
  )
}
  return (
    <main className="assessment-page">
      <header className="assessment-header">
        <Link className="assessment-logo" to="/">
          FITCOACH<span>.</span>
        </Link>
        <span>Başlangıç Değerlendirmesi</span>
      </header>

      <div className="assessment-shell">
        <section className="assessment-intro">
          <span>KİŞİYE ÖZEL PLANLAMA</span>
          <h1>Seni Biraz Daha Yakından Tanıyalım</h1>
          <p>
            Vereceğin bilgiler antrenman ve beslenme planının hedeflerine,
            yaşam tarzına ve ihtiyaçlarına göre hazırlanması için kullanılacak.
          </p>
          <div className="assessment-note">
            <strong>Yaklaşık 3–5 dakika</strong>
            <p>Bilgilerin yalnızca koçluk sürecin için kullanılacaktır.</p>
          </div>
        </section>

        <form className="assessment-form" onSubmit={handleSubmit}>
          <input name="assessmentToken" type="hidden" value={token || ""} readOnly />

          <div className="assessment-form__section">
            <span>01</span>
            <div>
              <h2>Temel Bilgiler</h2>
              <p>Mevcut fiziksel durumunu anlamamıza yardımcı olur.</p>
            </div>
          </div>

          <div className="assessment-form__grid">
            <label>
              Yaş
              <input name="age" type="number" min="16" max="100" required />
            </label>
            <label>
              Cinsiyet
              <select name="gender" required defaultValue="">
                <option value="" disabled>Seçiniz</option>
                <option value="female">Kadın</option>
                <option value="male">Erkek</option>
                <option value="unspecified">Belirtmek istemiyorum</option>
              </select>
            </label>
            <label>
              Boy (cm)
              <input name="heightCm" type="number" min="120" max="230" required />
            </label>
            <label>
              Kilo (kg)
              <input name="weightKg" type="number" min="35" max="300" step="0.1" required />
            </label>
          </div>

          <div className="assessment-form__section">
            <span>02</span>
            <div>
              <h2>Hedef ve Antrenman</h2>
              <p>Programın yapısını ve yoğunluğunu birlikte belirleyelim.</p>
            </div>
          </div>

          <div className="assessment-form__grid">
            <label className="assessment-form__wide">
              Ana Hedefin
              <select name="goal" required defaultValue="">
                <option value="" disabled>Seçiniz</option>
                <option value="weight-loss">Kilo vermek</option>
                <option value="muscle-gain">Kas kazanmak</option>
                <option value="conditioning">Kondisyon geliştirmek</option>
                <option value="healthy-lifestyle">Daha sağlıklı yaşamak</option>
              </select>
            </label>
            <label>
              Antrenman Seviyesi
              <select name="trainingLevel" required defaultValue="">
                <option value="" disabled>Seçiniz</option>
                <option value="beginner">Başlangıç</option>
                <option value="intermediate">Orta</option>
                <option value="advanced">İleri</option>
              </select>
            </label>
            <label>
              Haftada Kaç Gün?
              <input name="weeklyTrainingDays" type="number" min="1" max="7" required />
            </label>
            <label>
              Antrenman Ortamı
              <select name="trainingLocation" required defaultValue="">
                <option value="" disabled>Seçiniz</option>
                <option value="gym">Spor salonu</option>
                <option value="home">Ev</option>
                <option value="both">Her ikisi</option>
              </select>
            </label>
            <label>
              Günlük Hareket Seviyesi
              <select name="dailyActivityLevel" required defaultValue="">
                <option value="" disabled>Seçiniz</option>
                <option value="low">Düşük</option>
                <option value="moderate">Orta</option>
                <option value="high">Yüksek</option>
              </select>
            </label>
          </div>

          <div className="assessment-form__section">
            <span>03</span>
            <div>
              <h2>Beslenme ve Sağlık</h2>
              <p>Güvenli ve uygulanabilir bir plan hazırlamamız için önemlidir.</p>
            </div>
          </div>

          <div className="assessment-form__stack">
            <label>
              Beslenme tercihleri, alerjiler veya kaçındığın besinler
              <textarea name="dietaryPreferences" rows="3" maxLength="600" />
            </label>
            <label>
              Sakatlık, kronik rahatsızlık veya hareket kısıtlılığı
              <textarea name="injuriesOrConditions" rows="3" maxLength="600" />
            </label>
            <label>
              Düzenli kullandığın ilaçlar
              <textarea name="medications" rows="3" maxLength="400" />
            </label>
            <label>
              Eklemek istediğin diğer notlar
              <textarea name="additionalNotes" rows="4" maxLength="1000" />
            </label>
          </div>

          <label className="assessment-form__consent">
            <input name="healthConsent" type="checkbox" required />
            <span>
              Paylaştığım sağlık bilgilerinin kişiye özel koçluk planımın
              hazırlanması amacıyla işlenmesine açık rıza veriyorum.
            </span>
          </label>
          {feedback && (
  <p className={`assessment-feedback ${isSuccess ? "success" : "error"}`}>
    {feedback}
  </p>
    )}

         <button type="submit" disabled={isSubmitting || isSuccess}>
              {isSubmitting
                               ? "Gönderiliyor..."
                               : isSuccess
                                ? "Değerlendirme Tamamlandı"
                               : "Değerlendirmeyi Tamamla"}
            </button>
          <small>Bu form tıbbi teşhis veya tedavi hizmeti değildir.</small>
        </form>
      </div>
    </main>
  )
}

export default Assessment
