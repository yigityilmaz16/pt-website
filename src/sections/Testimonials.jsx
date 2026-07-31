import { useState, useEffect } from "react";

function Testimonials(){
    const [name,setName] =useState("");
    const [comment,setComment] = useState("");
    const [duration,setDuration] = useState("");
    const [rating,setRating] = useState(0);
    const [comments,setComments] = useState([]);
    
   useEffect(() => {
  async function getComments() {
    const response = await fetch(
      "http://localhost:5000/api/testimonials"
    )
    const data = await response.json()
    setComments(data)
  }

  getComments()
}, [])
    
    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/testimonials", {
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
                console.error(data.message)
                return
            }

            setComments((currentComments) => [...currentComments, data])
            setName("")
            setComment("")
            setDuration("")
            setRating(0)
        } catch (error) {
            console.error("Yorum gönderilemedi:", error)
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
                 <button type="submit">Mesajı İlet</button>
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
