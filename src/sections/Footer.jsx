function Footer(){
    return(
        <section id="footer" className="footer">
            <div className="footer-left">
              <p>FITCOACH</p>
              <p>“Gücünü keşfet, sürdürülebilir sonuçlar elde et.”</p>
            </div>
            <div className="footer-center">
                <nav className="footer-between" aria-label="Footer menüsü">
                    <a href="#about">Hakkımda</a>
                    <a href="#services">Programlar</a>
                    <a href="#transformations">Dönüşümler</a>
                    <a href="#testimonials">Yorumlar</a>
                    <a href="#contact">İletişim</a>
                </nav>
            </div>
            <div className="footer-right">
                <a href="https://www.instagram.com/pt.erenserbest/" target="_blank" rel="noreferrer" aria-label="FITCOACH Instagram">
                    <svg className="footer-social-icon" aria-hidden="true"><use href="/icons.svg#instagram-icon" /></svg>
                </a>
                <a href="https://wa.me/905300954266" target="_blank" rel="noreferrer" aria-label="FITCOACH WhatsApp">
                    <svg className="footer-social-icon" aria-hidden="true"><use href="/icons.svg#whatsapp-icon" /></svg>
                </a>
            </div>
            <div className="footer-behind">
                <p>© 2026 FITCOACH. Tüm hakları saklıdır.</p>
                <a className="footer-signature" href="https://github.com/yigityilmaz16" target="_blank" rel="noreferrer">
                    <svg className="footer-signature-icon" aria-hidden="true"><use href="/icons.svg#github-icon" /></svg>
                    Designed &amp; Developed by <strong>Yiğit</strong>
                </a>
            </div>
        </section>
    )
}

export default Footer;
