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
                <h4>İletişime Geç</h4>
            </div>
            <div className="contact-card">
               <h4>Eren Serbest</h4>
               <p><a href="tel:+905300954266">+90 530 095 42 66</a></p> 
               <p><a href="mailto:serbesterenn@gmail.com">serbesterenn@gmail.com</a></p>
               <form onSubmit={handleSubmit}>
              <textarea id="feedback" name="feedback" rows="4" cols="50" placeholder="Sorularınız" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
              <button type="submit">Soru Sor</button>
               </form>
            </div>
        </section>
    )

}

export default Contact;
