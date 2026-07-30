import { Link } from "react-router-dom";

function Services(){
    const programs=[
        {
            id:1,
            duration:"1 Aylık",
            slug:"1-aylik-paket",
            oldPrice:"5.000 TL",
            discount:"%10 İndirim",
            price:"4.500 TL",
            features:[
                "Kişiye özel antrenman programı",
                "Beslenme planı",
                "Haftalık form kontrolü",
                "WhatsApp desteği"
            ],
            popular:false
        },
        {
            id:2,
            duration:"3 Aylık",
            slug:"3-aylik-paket",
            oldPrice:"15.000 TL",
            discount:"%20 İndirim",
            price:"12.000 TL",
            features:[
                "Kişiye özel antrenman programı",
                "Beslenme planı",
                "Haftalık form kontrolü",
                "WhatsApp desteği",
                "Aylık gelişim formu"
            ],
            popular:true       
        },
        {
            id:3,
            duration:"6 Aylık",
            slug:"6-aylik-paket",
            oldPrice:"30.000 TL",
            discount:"%25 İndirim",
            price:"22.500 TL",
            features:[
                "Kişiye özel antrenman programı",
                "Beslenme planı",
                "Haftalık form kontrolü",
                "WhatsApp desteği",
                "Öncelikli destek"
            ],
            popular:false
        }
    ]
    return(
        <section id="services" className="services">
        <div className="services-header">
            <h2>Programlar</h2>
            <p>Hedefine uygun olan paketi seç ve hemen başla.</p>
        </div>
        <div className="services-grid">
        {programs.map((program) => (
            <article className={`service-card ${program.popular ? "service-card--popular" : ""}`} key={program.id}>
                {program.popular && <span className="service-card__badge">En Popüler</span>}
                <h3>{program.duration}</h3>
                <del>{program.oldPrice}</del>
                <span className="service-card__discount">{program.discount}</span>
                <h4>{program.price}</h4>
                <ul>
                    {program.features.map((feature,index) =>(
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                 <Link to={`/services/${program.slug}`}>Programı İncele</Link>
            </article>
        ))}
        </div>
        </section>
    )
}

export default Services;
