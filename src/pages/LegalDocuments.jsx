import LegalPage from "./LegalPage"

const updatedAt = "31 Temmuz 2026"

function DraftWarning() {
  return (
    <div className="legal-draft-warning">
      Bu sayfadaki satıcı bilgileri, hizmet koşulları ve saklama süreleri
      site sahibi tarafından doğrulanmadan yayınlanmamalıdır.
    </div>
  )
}

export function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="GİZLİLİK"
      title="Gizlilik Politikası"
      updatedAt={updatedAt}
    >
      <DraftWarning />

      <h2>Toplanan Bilgiler</h2>
      <p>
        İletişim, sipariş ve koçluk süreçlerinde kullanıcı tarafından
        paylaşılan bilgilerin kapsamı bu bölümde açıklanacaktır.
      </p>

      <h2>Bilgilerin Kullanım Amaçları</h2>
      <p>
        Verilerin hangi amaçlarla işlendiği ve ne kadar süre saklandığı,
        site sahibinden alınacak bilgilerle tamamlanacaktır.
      </p>

      <h2>İletişim</h2>
      <p>[Ticari e-posta adresi ve iletişim bilgileri eklenecek.]</p>
    </LegalPage>
  )
}

export function KvkkNotice() {
  return (
    <LegalPage
      eyebrow="KİŞİSEL VERİLER"
      title="KVKK Aydınlatma Metni"
      updatedAt={updatedAt}
    >
      <DraftWarning />

      <h2>Veri Sorumlusu</h2>
      <p>[Ad-soyad veya şirket unvanı ve adres bilgileri eklenecek.]</p>

      <h2>İşlenen Kişisel Veriler</h2>
      <p>
        Kimlik, iletişim, sipariş, fiziksel ölçüm ve kullanıcının paylaştığı
        sağlık bilgilerinin kapsamı burada açıklanacaktır.
      </p>

      <h2>İşleme Amaçları ve Hukuki Sebepler</h2>
      <p>
        Verilerin işlenme amaçları ve hukuki sebepleri, hizmet sahibinin
        süreçleri doğrulandıktan sonra tamamlanacaktır.
      </p>

      <h2>Başvuru Yöntemi</h2>
      <p>[KVKK başvuruları için iletişim adresi eklenecek.]</p>
    </LegalPage>
  )
}

export function DistanceSalesAgreement() {
  return (
    <LegalPage
      eyebrow="SATIŞ KOŞULLARI"
      title="Mesafeli Satış Sözleşmesi"
      updatedAt={updatedAt}
    >
      <DraftWarning />

      <h2>Taraflar</h2>
      <p>[Satıcı ve alıcı bilgileri eklenecek.]</p>

      <h2>Sözleşmenin Konusu</h2>
      <p>
        Satın alınan online koçluk paketinin kapsamı, süresi ve teslim
        biçimi bu bölümde açıklanacaktır.
      </p>

      <h2>Ücret ve Ödeme</h2>
      <p>
        Paket bedeli, ödeme yöntemi ve ödeme sağlayıcısına ilişkin bilgiler
        iyzico hesabı tamamlandıktan sonra eklenecektir.
      </p>

      <h2>Hizmetin Başlangıcı</h2>
      <p>[Koçluk hizmetinin başlama süresi ve koşulları eklenecek.]</p>
    </LegalPage>
  )
}

export function CancellationRefundPolicy() {
  return (
    <LegalPage
      eyebrow="İPTAL VE İADE"
      title="İptal ve İade Koşulları"
      updatedAt={updatedAt}
    >
      <DraftWarning />

      <h2>İptal Talebi</h2>
      <p>[İptal taleplerinin nasıl iletileceği eklenecek.]</p>

      <h2>İade Koşulları</h2>
      <p>
        Hizmet başlamadan ve başladıktan sonra uygulanacak iade koşulları
        site sahibi tarafından belirlenecektir.
      </p>

      <h2>İade Süreci</h2>
      <p>[İade yöntemi ve tahmini işlem süresi eklenecek.]</p>
    </LegalPage>
  )
}