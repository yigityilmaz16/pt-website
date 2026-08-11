import { Link, useParams } from "react-router-dom"
import programs from "../data/programs"
import CheckoutForm from "../components/checkout/CheckoutForm"

function Checkout() {
  const { slug } = useParams()
  const program = programs.find((item) => item.slug === slug)

  if (!program) {
    return (
      <main className="checkout-page">
        <h1>Program bulunamadı.</h1>
        <Link to="/#services">Programlara Dön</Link>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <Link to="/" className="checkout-logo">
          FITCOACH<span>.</span>
        </Link>

        <Link to={`/services/${program.slug}`}>
          ← Programa Dön
        </Link>
      </header>

      <section className="checkout-layout">
        <div className="checkout-intro">
          <span>GÜVENLİ SATIN ALMA</span>
          <h1>Siparişini Tamamla</h1>
          <p>
            Ödeme sonrasında hedeflerin, boy-kilo bilgilerin ve
            antrenman geçmişin için kısa bir değerlendirme formuna
            yönlendirileceksin.
          </p>

          <ol>
            <li>Bilgilerini gir</li>
            <li>Güvenli ödemeyi tamamla</li>
            <li>Değerlendirme formunu doldur</li>
            <li>Sana özel planın hazırlansın</li>
          </ol>
        </div>

        <aside className="checkout-summary">
          <span>SEÇİLEN PROGRAM</span>
          <h2>{program.name}</h2>
          <p>{program.description}</p>
          <strong>{program.price}</strong>
          <CheckoutForm program={program} />
        </aside>
      </section>
    </main>
  )
}

export default Checkout
