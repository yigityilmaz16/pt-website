import { useEffect, useState } from "react"
import {
  Link,
  useSearchParams,
} from "react-router-dom"
import getApiUrl from "../config/api"

export function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const orderNumber = searchParams.get("order")
  const [payment, setPayment] = useState({
    state: "checking",
    data: null,
    message: "",
  })

  useEffect(() => {
    let timeoutId
    let isCancelled = false
    let attempt = 0

    async function checkPayment() {
      if (
        !orderNumber ||
        !/^[a-zA-Z0-9]+$/.test(orderNumber)
      ) {
        setPayment({
          state: "error",
          data: null,
          message: "Geçersiz sipariş bağlantısı.",
        })
        return
      }

      try {
        const response = await fetch(
          getApiUrl(
            `/api/orders/${orderNumber}/status`,
          ),
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Sipariş durumu alınamadı.",
          )
        }

        if (isCancelled) return

        if (data.status === "PAID") {
          setPayment({
            state: "paid",
            data,
            message: "",
          })
          return
        }

        if (
          data.status === "FAILED" ||
          data.status === "CANCELLED"
        ) {
          setPayment({
            state: "failed",
            data,
            message: "",
          })
          return
        }

        attempt += 1

        if (attempt < 10) {
          timeoutId = window.setTimeout(
            checkPayment,
            2000,
          )
          return
        }

        setPayment({
          state: "waiting",
          data,
          message:
            "Ödeme bildirimi henüz ulaşmadı. Birkaç dakika sonra bu sayfayı yenileyebilirsin.",
        })
      } catch (error) {
        if (isCancelled) return

        setPayment({
          state: "error",
          data: null,
          message:
            error.message ||
            "Sipariş durumu kontrol edilemedi.",
        })
      }
    }

    checkPayment()

    return () => {
      isCancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [orderNumber])

  return (
    <main className="payment-result-page">
      <section className="payment-result-card">
        {payment.state === "paid" ? (
          <>
            <span>ÖDEME BAŞARILI</span>
            <h1>Koçluk sürecin başlıyor!</h1>
            <p>
              Ödemen doğrulandı. Sana özel programın
              hazırlanabilmesi için değerlendirme formunu
              doldurabilirsin.
            </p>
            <Link to={payment.data.assessmentUrl}>
              Değerlendirme Formuna Geç
            </Link>
          </>
        ) : payment.state === "failed" ? (
          <>
            <span>ÖDEME TAMAMLANAMADI</span>
            <h1>İşlem başarısız oldu</h1>
            <p>
              Kartından başarılı bir ödeme alınmadı.
              Paketlere dönerek yeniden deneyebilirsin.
            </p>
            <Link to="/#services">Paketlere Dön</Link>
          </>
        ) : (
          <>
            <span>ÖDEME KONTROLÜ</span>
            <h1>
              {payment.state === "checking"
                ? "Ödemen doğrulanıyor..."
                : "İşlemini kontrol ediyoruz"}
            </h1>
            <p>
              {payment.message ||
                "Bu işlem birkaç saniye sürebilir. Lütfen sayfayı kapatma."}
            </p>
            {payment.state !== "checking" && (
              <Link to="/">Ana Sayfaya Dön</Link>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export function PaymentFailure() {
  return (
    <main className="payment-result-page">
      <section className="payment-result-card">
        <span>ÖDEME TAMAMLANAMADI</span>
        <h1>İşlem tamamlanmadı</h1>
        <p>
          Ödeme sırasında işlem iptal edilmiş veya bir hata
          oluşmuş olabilir. Kartından başarılı bir ödeme
          alınmadı.
        </p>
        <Link to="/#services">Paketlere Dön</Link>
      </section>
    </main>
  )
}