import { useState } from "react"
function Contact(){
    const [message,setMessage] = useState("");
    function handleSubmit(e){
        e.preventDefault();
        console.log("selams");
        setMessage("");
    }

    return(
        <section id="contact" className="contact">
            <div className="contact-header">
                <span>Eren Serbest ile</span>
                <h4>İletişime Geç</h4>
                <p>
                    Benimle iletişime geçmek için formu doldurabilir, e-posta
                    gönderebilir veya WhatsApp hattından hızlıca ulaşabilirsin.
                </p>
            </div>
            <div className="contact-card">
               <div className="contact-info">
                    <h4>Eren Serbest</h4>
                    <p><a href="tel:+905300954266">+90 530 095 42 66</a></p> 
                    <p><a href="mailto:serbesterenn@gmail.com">serbesterenn@gmail.com</a></p>
               </div>
               <form onSubmit={handleSubmit}>
                    <div className="contact-field">
                        <label htmlFor="contact-name">Ad <span>*</span></label>
                        <input id="contact-name" name="name" type="text" placeholder="Adınız" autoComplete="name" required />
                    </div>
                    <div className="contact-field">
                        <label htmlFor="contact-email">E-posta <span>*</span></label>
                        <input id="contact-email" name="email" type="email" placeholder="E-posta adresiniz" autoComplete="email" required />
                    </div>
                    <div className="contact-field">
                        <label htmlFor="contact-phone">Telefon <span>*</span></label>
                        <input id="contact-phone" name="phone" type="tel" placeholder="Telefon numaranız" autoComplete="tel" required />
                    </div>
                    <div className="contact-field">
                        <label htmlFor="contact-subject">Konu <span>*</span></label>
                        <input id="contact-subject" name="subject" type="text" placeholder="Mesajınızın konusu" required />
                    </div>
                    <div className="contact-field contact-field--message">
                        <label htmlFor="feedback">Mesaj <span>*</span></label>
                        <textarea id="feedback" name="feedback" rows="5" placeholder="Mesajınız" value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
                    </div>
                    <button type="submit">Mesaj Gönder</button>
               </form>
            </div>
        </section>
    )

}

export default Contact;
