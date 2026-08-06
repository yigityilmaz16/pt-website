import { useEffect, useRef } from "react"

function PaytrIframe({ iframeUrl }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    const iframe = iframeRef.current

    if (!iframe) return

    function resizeIframe() {
      if (window.iFrameResize) {
        window.iFrameResize({}, iframe)
      }
    }

    const existingScript = document.querySelector(
      "script[data-paytr-resizer]",
    )

    if (window.iFrameResize) {
      resizeIframe()
      return
    }

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        resizeIframe,
      )

      return () => {
        existingScript.removeEventListener(
          "load",
          resizeIframe,
        )
      }
    }

    const script = document.createElement("script")

    script.src =
      "https://www.paytr.com/js/iframeResizer.min.js"
    script.async = true
    script.dataset.paytrResizer = "true"
    script.addEventListener("load", resizeIframe)

    document.body.appendChild(script)

    return () => {
      script.removeEventListener(
        "load",
        resizeIframe,
      )
    }
  }, [iframeUrl])

  return (
    <iframe
      ref={iframeRef}
      className="paytr-iframe"
      src={iframeUrl}
      title="Güvenli PayTR ödeme ekranı"
      frameBorder="0"
      scrolling="no"
      allow="payment"
    />
  )
}

export default PaytrIframe