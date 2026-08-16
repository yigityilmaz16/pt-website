import { Link } from "react-router-dom";
import programs from "../data/programs";
import programImage from "../assets/program-trainer.jpg";
import twelveWeekProgramImage from "../assets/program-trainer-12-weeks.webp";
import twentyFourWeekProgramImage from "../assets/program-trainer-24-weeks.webp";

const programImages = {
    "3-aylik-paket": twelveWeekProgramImage,
    "6-aylik-paket": twentyFourWeekProgramImage,
};

function Services(){
    return(
        <section id="services" className="services">
        <div className="services-header">
            <h2>Paketler</h2>
            <p>Hedefine uygun olan paketi seç ve hemen başla.</p>
        </div>
        <div className="services-grid">
        {programs.map((program) => (
            <article className={`service-card ${program.popular ? "service-card--popular" : ""}`} key={program.id}>
                {program.popular && <span className="service-card__badge">En Popüler</span>}
                <div className="service-card__visual" aria-hidden="true">
                    <img
                        className={programImages[program.slug] ? `service-card__image--${program.slug}` : ""}
                        src={programImages[program.slug] || programImage}
                        alt=""
                    />
                </div>
                <div className="service-card__body">
                    <h3>{program.name}</h3>
                    <del>{program.oldPrice}</del>
                    <span className="service-card__discount">{program.discount}</span>
                    <h4>{program.price}</h4>
                    <p className="service-card__tagline">
                        Kişinin form durumuna ve hedefine yönelik;
                    </p>
                    <ul>
                        {program.features.map((feature,index) =>(
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    <Link to={`/services/${program.slug}`}>Paketi İncele</Link>
                </div>
            </article>
        ))}
        </div>
        </section>
    )
}

export default Services;
