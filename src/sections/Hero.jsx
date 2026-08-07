import heroImage from '../assets/hero-pt.jpg'

const stats = [
  { value: '100+', label: 'Danışan' },
  { value: '5+', label: 'Yıl Deneyim' },
  { value: 'Kişiye Özel', label: 'Plan' },
]

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__layout">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span aria-hidden="true" />
            Online Koçluk ve Kişisel Antrenman
          </p>

          <h1 id="hero-title">
            Hedeflerine Ulaş,{' '}
            <span>Potansiyelini Gerçeğe Dönüştür.</span>
          </h1>

          <p className="hero__description">
            Kişiye özel antrenman ve beslenme programlarıyla sadece fiziksel değil,
            yaşam tarzını da dönüştür. Değişim tesadüf değil, doğru planın sonucudur.
            İstediğin fiziğe giden yolu birlikte planlıyor, sürdürülebilir ve kalıcı
            sonuçlarla daha güçlü, daha fit ve daha özgüvenli bir sen oluşturuyoruz.
            Hayalindeki fiziğe ulaşmak sandığından daha yakın. Kendinin en iyi
            versiyonu olmaya bugün başla. Sınır yok. Bahane yok. Sonuç var.
            <span>
              Aşağıdaki paketlerden sana en uygun olanı seç ve değişimine bugün başla.
            </span>
          </p>

          <div className="hero__actions">
            <a className="button button--primary" href="#services">
              Programları İncele
            </a>
            <a className="button button--secondary" href="#contact">
              İletişime Geç
            </a>
          </div>

          <div className="hero__stats" aria-label="Başarı istatistikleri">
            {stats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-frame">
            <img
              src={heroImage}
              alt="Kişisel antrenör spor salonunda antrenman yapıyor"
            />
            <div className="hero__image-shade" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
