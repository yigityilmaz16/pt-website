import { Link, useParams } from "react-router-dom"
import programImage from "../assets/hero-pt.jpg"
import programs from "../data/programs"

function ProgramDetail(){
    const { slug } = useParams()

    const program = programs.find((item) => item.slug === slug)

    if (!program) {
        return(
            <main className="program-detail program-detail--not-found">
                <h1>Program Bulunamadı</h1>
                <p>Aradığın program kaldırılmış veya bağlantı hatalı olabilir.</p>
                <Link to="/#services">Programlara Dön</Link>
            </main>
        )
    }

    return(
        <main className="program-detail">
            <div className="program-detail__top">
                <Link className="program-detail__logo" to="/">FITCOACH</Link>
                <Link className="program-detail__back" to="/#services">← Programlara Dön</Link>
            </div>

            <section className="program-detail__card">
                <div className="program-detail__info">
                    <div className="program-detail__content">
                        <span className="program-detail__label">ONLINE KOÇLUK PROGRAMI</span>
                        <h1>{program.duration} Program</h1>
                        <p>{program.description}</p>

                        <div className="program-detail__price">
                            <del>{program.oldPrice}</del>
                            <span>{program.discount}</span>
                            <strong>{program.price}</strong>
                        </div>
                    </div>

                    <div className="program-detail__visual">
                        <img src={programImage} alt="Online koçluk programı" />
                    </div>

                    <div className="program-detail__features">
                        <h2>Programa Dahil Olanlar</h2>
                        <ul>
                            {program.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>

                      <Link
                            className="program-detail__button"
                            to={`/checkout/${program.slug}`}
         >
                         Satın Al
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ProgramDetail
