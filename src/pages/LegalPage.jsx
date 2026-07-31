import { Link } from "react-router-dom"

function LegalPage({ eyebrow, title, updatedAt, children }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link className="legal-logo" to="/">
          FITCOACH<span>.</span>
        </Link>

        <Link className="legal-back" to="/">
          ← Ana Sayfaya Dön
        </Link>
      </header>

      <div className="legal-shell">
        <section className="legal-intro">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>Son güncelleme: {updatedAt}</p>
        </section>

        <article className="legal-content">
          {children}
        </article>
      </div>
    </main>
  )
}

export default LegalPage