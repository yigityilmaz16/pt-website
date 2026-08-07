import LegalPage from "./LegalPage"

const updatedAt = "1 Ağustos 2026"
const providerName = "Eren Serbest"
const providerAddress =
  "İstiklal Mahallesi Hürriyet 20. Gül Sokak No: 17A4, Osmangazi/Bursa, Türkiye"
const providerEmail = "serbesterenn@gmail.com"
const providerPhone = "+90 530 095 42 66"

export function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="GİZLİLİK"
      title="Gizlilik Politikası"
      updatedAt={updatedAt}
    >
      <h2>Politikanın Kapsamı</h2>
      <p>
        Bu politika, FITCOACH internet sitesi üzerinden sunulan online kişisel
        antrenörlük ve koçluk hizmetleri kapsamında elde edilen bilgilerin nasıl
        kullanıldığını ve korunduğunu açıklar.
      </p>

      <h2>Toplanan Bilgiler</h2>
      <p>
        İletişim ve sipariş formlarında ad-soyad, e-posta, telefon, seçilen
        paket ve işlem bilgileri alınabilir. Koçluk hizmeti başladıktan sonra
        kullanıcı tarafından yaş, boy, kilo, hedef, antrenman geçmişi,
        beslenme tercihleri ve sağlık notları paylaşılabilir.
      </p>

      <h2>Kullanım Amaçları</h2>
      <p>
        Bilgiler; kullanıcıyla iletişim kurmak, siparişi yürütmek, kişiye özel
        antrenman ve beslenme planı hazırlamak, haftalık takibi gerçekleştirmek,
        güvenliği sağlamak ve yasal yükümlülükleri yerine getirmek amacıyla
        kullanılır.
      </p>

      <h2>Hizmet Sağlayıcılarla Paylaşım</h2>
      <p>
        Veriler, hizmetin yürütülmesi için zorunlu olduğu ölçüde barındırma,
        veritabanı, iletişim ve ödeme altyapısı sağlayıcılarıyla paylaşılabilir.
        Yetkili kamu kurumlarının usulüne uygun talepleri saklıdır. Sağlık
        bilgileri reklam amacıyla kullanılmaz veya satılmaz.
      </p>

      <h2>Saklama ve Güvenlik</h2>
      <p>
        Boy, kilo, hedef ve sağlık bilgileri koçluk hizmetinin sona ermesinden
        itibaren 15 iş günü içinde silinir veya anonimleştirilir. Sipariş ve
        ödeme kayıtları, uygulanabilir yasal saklama yükümlülükleri boyunca
        korunur. Verilere yalnızca hizmeti yürüten yetkili kişi erişebilir.
      </p>

      <h2>İletişim</h2>
      <p>
        Gizlilikle ilgili talepler {providerEmail} adresine veya {providerPhone}
        numarasına iletilebilir. Hizmet sağlayıcı: {providerName}. Adres: {providerAddress}.
      </p>
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
      <h2>Veri Sorumlusu</h2>
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri
        sorumlusu {providerName}'tir. Adres: {providerAddress}. E-posta:
        {" "}{providerEmail}. Telefon: {providerPhone}.
      </p>

      <h2>İşlenen Kişisel Veriler</h2>
      <p>
        Kimlik ve iletişim bilgileri, sipariş ve ödeme kayıtları, seçilen paket,
        kullanıcı mesajları ile kullanıcının açık rızasıyla paylaştığı boy,
        kilo, hedef, beslenme, sakatlık, ilaç ve sağlık bilgileri işlenebilir.
      </p>

      <h2>İşleme Amaçları</h2>
      <p>
        Veriler; sözleşmenin kurulması ve yürütülmesi, online koçluk hizmetinin
        sunulması, kişiye özel plan hazırlanması, takip ve destek sağlanması,
        ödeme ve güvenlik işlemlerinin yürütülmesi, taleplerin yanıtlanması ve
        yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.
      </p>

      <h2>Toplama Yöntemi ve Hukuki Sebep</h2>
      <p>
        Veriler internet sitesi formları, ödeme işlemleri ve kullanıcının
        WhatsApp veya Instagram üzerinden yaptığı paylaşımlar aracılığıyla
        elektronik ortamda toplanır. İşleme; sözleşmenin kurulması ve ifası,
        hukuki yükümlülük, meşru menfaat ve gerekli durumlarda açık rıza hukuki
        sebeplerine dayanır. Sağlık verileri yalnızca açık rıza kapsamında
        işlenir.
      </p>

      <h2>Aktarım</h2>
      <p>
        Veriler, hizmet için gerekli olduğu ölçüde ödeme, barındırma, veritabanı
        ve iletişim hizmeti sağlayıcılarına; hukuki zorunluluk hâlinde yetkili
        kamu kurumlarına aktarılabilir. Kişisel veriler ticari amaçla satılmaz.
      </p>

      <h2>Saklama Süresi</h2>
      <p>
        Koçluk kapsamında paylaşılan fiziksel ölçüm ve sağlık bilgileri hizmetin
        bitiminden itibaren 15 iş günü içinde silinir veya anonimleştirilir.
        Sipariş ve ödeme kayıtları ilgili yasal yükümlülükler boyunca saklanır.
      </p>

      <h2>İlgili Kişinin Hakları ve Başvuru</h2>
      <p>
        Kullanıcı; verilerinin işlenip işlenmediğini öğrenme, bilgi talep etme,
        düzeltme, silme veya yok edilmesini isteme ve kanunda belirtilen diğer
        haklarını kullanma talebini kimliğini doğrulayacak bilgilerle birlikte
        {" "}{providerEmail} adresine iletebilir.
      </p>
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
      <h2>Taraflar</h2>
      <p>
        Hizmet sağlayıcı: {providerName}. Adres: {providerAddress}. E-posta:
        {" "}{providerEmail}. Telefon: {providerPhone}. Alıcı, sipariş sırasında
        verdiği bilgilerin sahibi olan kişidir.
      </p>

      <h2>Sözleşmenin Konusu</h2>
      <p>
        Sözleşmenin konusu, alıcının seçtiği 1, 3 veya 6 aylık online kişisel
        antrenörlük ve koçluk paketinin uzaktan sunulmasına ilişkin tarafların
        hak ve yükümlülüklerinin belirlenmesidir.
      </p>

      <h2>Hizmetin Kapsamı ve Teslimi</h2>
      <p>
        Paket kapsamı, program sayfasında belirtilen kişiye özel antrenman,
        beslenme yönlendirmesi, haftalık takip ve iletişim desteğinden oluşur.
        Hizmet, başarılı ödemenin ardından en geç 1 iş günü içinde başlar.
        Program dosyaları ve takip süreci WhatsApp üzerinden yürütülür.
      </p>

      <h2>Ücret ve Ödeme</h2>
      <p>
        Güncel paket bedeli sipariş öncesinde kullanıcıya gösterilir. Ödeme,
        sitede belirtilen güvenli ödeme kuruluşu aracılığıyla gerçekleştirilir.
        Kart bilgileri FITCOACH tarafından saklanmaz.
      </p>

      <h2>Cayma, İptal ve İade</h2>
      <p>
        Cayma, iptal ve iade talepleri yürürlükteki tüketici mevzuatı ile
        hizmetin başlamış ve kişiye özel programın hazırlanmış olup olmadığı
        dikkate alınarak değerlendirilir. Tüketicinin mevzuattan doğan hakları
        saklıdır. Talepler {providerEmail} adresine iletilir.
      </p>

      <h2>Sağlık ve Kullanıcı Sorumluluğu</h2>
      <p>
        Kullanıcı, paylaştığı sağlık ve fiziksel durum bilgilerinin doğru
        olduğunu kabul eder. Sağlık problemi oluşması hâlinde koçluk süreci
        durdurulur ve devam edebilmek için sağlık uzmanının uygun görüşü istenir.
        Sunulan hizmet tıbbi teşhis veya tedavi değildir.
      </p>

      <h2>Uyuşmazlıklar</h2>
      <p>
        Uyuşmazlıklarda tüketici, yürürlükteki parasal sınırlar dâhilinde yetkili
        Tüketici Hakem Heyetine veya Tüketici Mahkemesine başvurabilir.
      </p>
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
      <h2>Talep Yöntemi</h2>
      <p>
        İptal ve iade talepleri, sipariş bilgileriyle birlikte {providerEmail}
        adresine veya {providerPhone} numarasına iletilir.
      </p>

      <h2>Değerlendirme</h2>
      <p>
        Talepler yürürlükteki tüketici mevzuatı, hizmetin başlayıp başlamadığı,
        kişiye özel programın hazırlanma durumu ve sunulmuş hizmetler dikkate
        alınarak değerlendirilir. Tüketicinin kanuni hakları saklıdır.
      </p>

      <h2>Onaylanan İadeler</h2>
      <p>
        İade onaylandığında işlem, mümkün olduğu ölçüde ödemenin yapıldığı yöntem
        üzerinden ve uygulanabilir yasal süre içinde gerçekleştirilir. Banka
        veya ödeme kuruluşundan kaynaklanan yansıma süreleri değişebilir.
      </p>

      <h2>Sağlık Problemleri</h2>
      <p>
        Kullanıcının sağlık problemi bildirmesi hâlinde koçluk süreci durdurulur.
        Programa devam edilebilmesi için sağlık uzmanının uygun görüşü istenir;
        iptal ve iade talebi somut durum ve mevzuat kapsamında değerlendirilir.
      </p>

      <h2>İletişim</h2>
      <p>
        Hizmet sağlayıcı: {providerName}. Adres: {providerAddress}. E-posta:
        {" "}{providerEmail}. Telefon: {providerPhone}.
      </p>
    </LegalPage>
  )
}
