import aboutImage from '../assets/about-trainer.jpg'

const highlights = [
  { value: '5+', label: 'Yıl Deneyim' },
  { value: '100+', label: 'Danışan' },
  { value: 'Kişiye Özel', label: 'Planlama' },
  { value: 'Sürekli', label: 'Takip' },
]

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <p className="about__eyebrow">
        <span aria-hidden="true" />
        Beni Tanı
      </p>

      <div className="about__container">
        <div className="about__visual">
          <div className="about__image-wrap">
            <img
              src={aboutImage}
              alt="Personal trainer antrenman alanında"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
            <span className="about__image-label" aria-hidden="true">
              Fitcoach
            </span>
          </div>
        </div>

        <div className="about__content">
          <h2 id="about-title">
            <span className="about__title-line">Sadece Bir Antrenör Değil,</span>
            <span className="about__title-line">
              Sürecindeki <em>Yol Arkadaşın</em>
            </span>
          </h2>

          <div className="about__copy">
            <p>
              Her bireyin hedefi, yaşam tarzı ve ihtiyaçları farklıdır. Bu nedenle
              antrenman ve beslenme planlarını tamamen kişiye özel hazırlıyor,
              sürecin her aşamasında düzenli takip ve destek sağlıyorum.
            </p>
            <p>
              Amacım yalnızca kısa vadeli değişim değil; sürdürülebilir alışkanlıklar
              kazandırarak daha güçlü, sağlıklı ve özgüvenli bir yaşam oluşturmanı
              sağlamak.
            </p>
          </div>

          <div className="about__highlights">
            {highlights.map((item) => (
              <div className="about__highlight" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <a className="about__cta" href="#contact">
            Benimle Çalış
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
