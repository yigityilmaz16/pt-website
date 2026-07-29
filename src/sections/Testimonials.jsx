import { useState } from "react";

function Testimonials(){
    const [name,setName] =useState("");
    const [comment,setComment] = useState("");
    const [duration,setDuration] = useState("");
    const comments=[
        {
            id:1,
            name:"Eda Şahin",
            comment:"3 aydır kendisiyle birlikte çalışıyorum, programını uygulayıp 8 kilo verdim, her konuda profesyonel ve her türlü sorumu anında cevaplıyor. İlgisi ve alakası için teşekkür ederim.",
            duration:"3",
            rating:"5"
        },
        {
            id:2,
            name:"Mehmet Şahin",
            comment:"1 ay sonunda 5 kilo verdim ve inanılmaz memnun kaldım, teşekkürler hocam.",
            duration:"1",
            rating:"5"
        }
        
    ];
     function handleSubmit(e){
        e.preventDefault();
        console.log("Selam");
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
