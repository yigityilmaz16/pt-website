import { useState } from "react"
function Contact(){
    const [message,setMessage] = useState("");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [subject, setSubject] = useState("")
    const [formMessage, setFormMessage] = useState("")
    const [formMessageType, setFormMessageType] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        setIsSubmitting(true)
        setFormMessage("")
        setFormMessageType("")

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setFormMessage(data.message || "Mesaj gönderilemedi.")
                setFormMessageType("error")
                return
            }

            setFormMessage("Mesajınız başarıyla gönderildi.")
            setFormMessageType("success")
            setName("")
            setEmail("")
            setPhone("")
            setSubject("")
            setMessage("")
        } catch (error) {
            console.error("Mesaj gönderilemedi:", error)
            setFormMessage("Server bağlantısı kurulamadı. Lütfen tekrar deneyin.")
            setFormMessageType("error")
        } finally {
            setIsSubmitting(false)
        }
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
                        <input id="contact-name" name="name" type="text" placeholder="Adınız" autoComplete="name" minLength="2" maxLength="80" required value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="contact-field">
                        <label htmlFor="contact-email">E-posta <span>*</span></label>
                        <input id="contact-email" name="email" type="email" placeholder="E-posta adresiniz" autoComplete="email" maxLength="254" required value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="contact-field">
                        <label htmlFor="contact-phone">Telefon <span>*</span></label>
                        <input id="contact-phone" name="phone" type="tel" placeholder="Telefon numaranız" autoComplete="tel" maxLength="24" required value={phone} onChange={(e)=>setPhone(e.target.value)} />
                    </div>
                    <div className="contact-field">
                        <label htmlFor="contact-subject">Konu <span>*</span></label>
                        <input id="contact-subject" name="subject" type="text" placeholder="Mesajınızın konusu" minLength="3" maxLength="120" required value={subject} onChange={(e)=>setSubject(e.target.value)} />
                    </div>
                    <div className="contact-field contact-field--message">
                        <label htmlFor="feedback">Mesaj <span>*</span></label>
                        <textarea id="feedback" name="feedback" rows="5" placeholder="Mesajınız" minLength="10" maxLength="1000" value={message} onChange={(e)=>setMessage(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                    </button>
                    {formMessage && (
                        <p
                            className={`contact-form-message contact-form-message--${formMessageType}`}
                            role="status"
                        >
                            {formMessage}
                        </p>
                    )}
               </form>
            </div>
        </section>
    )

}

export default Contact;
