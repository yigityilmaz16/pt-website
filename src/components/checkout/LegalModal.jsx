import { useEffect, useRef, useState } from "react"
import BrandLogo from "../BrandLogo"

function LegalModal({ title, children, onClose, onAccept }) {
  const contentRef = useRef(null)
  const [reachedBottom, setReachedBottom] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)

    const content = contentRef.current

    if (
      content &&
      content.scrollHeight <= content.clientHeight + 2
    ) {
      setReachedBottom(true)
    }

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  function handleScroll(e) {
    const element = e.currentTarget
    const remaining =
      element.scrollHeight -
      element.scrollTop -
      element.clientHeight

    if (remaining <= 12) {
      setReachedBottom(true)
    }
  }

  function handleAccept() {
    onAccept()
    onClose()
  }

  return (
    <div
      className="legal-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="legal-modal__panel">
        <header>
          <div>
            <BrandLogo className="legal-modal__logo" />
            <h2 id="legal-modal-title">{title}</h2>
          </div>

          <button
            type="button"
            aria-label="Pencereyi kapat"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div
          ref={contentRef}
          className="legal-modal__content"
          onScroll={handleScroll}
        >
          {children}
        </div>

        <footer>
          <p>
            {reachedBottom
              ? "Metnin sonuna ulaştınız."
              : "Devam etmek için metni sonuna kadar kaydırın."}
          </p>

          <button
            type="button"
            disabled={!reachedBottom}
            onClick={handleAccept}
          >
            Okudum ve Devam Et
          </button>
        </footer>
      </div>
    </div>
  )
}

export default LegalModal
