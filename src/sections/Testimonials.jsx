import { useState, useEffect } from "react";
import getApiUrl from "../config/api";

function Testimonials(){
    const [name,setName] =useState("");
    const [comment,setComment] = useState("");
    const [duration,setDuration] = useState("");
    const [rating,setRating] = useState(0);
    const [comments,setComments] = useState([]);
    const [formMessage,setFormMessage] = useState("");
    const [formMessageType,setFormMessageType] = useState("");
    const [isSubmitting,setIsSubmitting] = useState(false);
    
   useEffect(() => {
  async function getComments() {
    const response = await fetch(getApiUrl("/api/testimonials"))
    const data = await response.json()
    setComments(data)
  }

  getComments()
}, [])
    
    async function handleSubmit(e){
        e.preventDefault();
        setIsSubmitting(true)
        setFormMessage("")
        setFormMessageType("")

        try {
            const response = await fetch(getApiUrl("/api/testimonials"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    comment,
                    duration,
                    rating,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setFormMessage(data.message || "Yorum gönderilemedi.")
                setFormMessageType("error")
                return
            }

            setComments((currentComments) => [...currentComments, data])
            setFormMessage("Yorumunuz başarıyla eklendi.")
            setFormMessageType("success")
            setName("")
            setComment("")
            setDuration("")
            setRating(0)
        } catch (error) {
            console.error("Yorum gönderilemedi:", error)
            setFormMessage("Server bağlantısı kurulamadı. Lütfen tekrar deneyin.")
            setFormMessageType("error")
        } finally {
            setIsSubmitting(false)
        }
     }
    return(
        <section id="testimonials" className="testimonials">
            <div className="testimonials-header">
                <h4>Yorumlar</h4>
            </div>
            <form className="testimonials-submit" onSubmit={handleSubmit}>
                 <input className="testimonials-field" type="text" placeholder="İsim" required value={name} onChange={(e)=>setName(e.target.value)}></input>
                 <input className="testimonials-field" type="text" placeholder="Mesajınız" required value={comment} onChange={(e)=>setComment(e.target.value)}></input>
                 <input className="testimonials-field" type="number" placeholder="Kaç Ay Çalıştınız?" required value={duration} onChange={(e)=>setDuration(e.target.value)}></input>
                 <fieldset className="testimonials-rating-picker">
                    <legend>Puanınız</legend>
                    <div>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <label
                                key={value}
                                className={value <= rating ? "is-active" : ""}
                                aria-label={`${value} yıldız`}
                            >
                                <input
                                    type="radio"
                                    name="rating"
                                    value={value}
                                    checked={rating === value}
                                    onChange={() => setRating(value)}
                                    required
                                />
                                <span aria-hidden="true">★</span>
                            </label>
                        ))}
                    </div>
                 </fieldset>
                 <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Gönderiliyor..." : "Mesajı İlet"}
                 </button>
                 {formMessage && (
                    <p
                        className={`testimonials-form-message testimonials-form-message--${formMessageType}`}
                        role="status"
                    >
                        {formMessage}
                    </p>
                 )}
            </form>

            <div className="testimonials-grid">
                {comments.map((comment) =>
                <div className="testimonial-card" key={comment.id}>
                    <span className="testimonial-avatar" aria-hidden="true">{comment.name.charAt(0)}</span>
                    <h4>{comment.name}</h4>
                    <div className="testimonial-rating" aria-label={`${comment.rating} üzerinden 5 yıldız`}>
                        {Array.from({length: Number(comment.rating)}, (_, index) =>
                            <span key={index} aria-hidden="true">★</span>
                        )}
                    </div>
                    <p>{comment.comment}</p>
                    <p className="testimonial-duration">{comment.duration} Ay Birlikte Çalıştık</p>
                </div>

                )}
            </div>

        </section>
    )
}

export default Testimonials;
