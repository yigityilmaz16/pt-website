import logo from "../assets/eren-logo.svg"

function BrandLogo({ className = "", alt = "Eren Serbest Personal Trainer" }) {
  return <img className={`brand-logo-image ${className}`.trim()} src={logo} alt={alt} />
}

export default BrandLogo
