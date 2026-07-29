import beforeImage1 from '../assets/before1.png'
import afterImage1 from '../assets/after1.png'
import beforeImage2 from '../assets/before2.png'
import afterImage2 from '../assets/after2.png'
import beforeImage3 from '../assets/before3.png'
import afterImage3 from '../assets/after3.png'

function Transformations(){
const transformations=[
    {
        beforeImage:beforeImage1,
        afterImage:afterImage1,
        duration:"3 Ay",
        kiloChange:"-10 KG",
        name:"M.Ş"
    },
    {
        beforeImage:beforeImage2,
        afterImage:afterImage2,
        duration:"2 Ay",
        kiloChange:"-6 KG",
        name:"A.Y"
    },
    {
        beforeImage:beforeImage3,
        afterImage:afterImage3,
        duration:"6 Ay",
        kiloChange:"-15 KG",
        name:"B.K"
    }
]
    return(
        <section id="transformations" className="transformations">
            <div className="transformations-header">
                <h4>Öne Çıkan Dönüşümlerimiz</h4>
                <p>Değişime sen de hemen başla.</p>
            </div>
            <div className="transformations-grid">
            {transformations.map((transformation) =>
            <div className="transformation-card" key={transformation.name}>
             <img
                    src={transformation.beforeImage}
                    alt="Değişim Öncesi"
            /> 
          
           
            <p> {transformation.duration} </p>
            <p>{transformation.kiloChange}</p>
            
             
             <img
                    src={transformation.afterImage}
                    alt="Değişim Sonrası"
            /> 
       </div>
             )}
           </div>
        </section>
    )
}

export default Transformations;
