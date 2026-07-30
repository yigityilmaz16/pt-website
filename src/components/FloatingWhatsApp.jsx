const whatsappUrl =
  'https://wa.me/905300954266?text=Merhaba%2C%20programlar%C4%B1n%C4%B1z%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.'

function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp üzerinden iletişime geç"
    >
      <span className="floating-whatsapp__label">Bana yazın</span>
      <svg className="floating-whatsapp__icon" aria-hidden="true">
        <use href="/icons.svg#whatsapp-icon" />
      </svg>
    </a>
  )
}

export default FloatingWhatsApp
