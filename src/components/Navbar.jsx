import { useState } from 'react'

const navigationItems = [
  { label: 'Hakkımda', href: '#about' },
  { label: 'Online Koçluk Paketleri', href: '#services' },
  { label: 'Yorumlar', href: '#testimonials' },
  { label: 'İletişim', href: '#contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__logo" href="#" aria-label="FITCOACH ana sayfa" onClick={closeMenu}>
          FIT<span>COACH</span>
        </a>

        <button
          className={`navbar__toggle ${isMenuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`navbar__menu ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Ana menü"
        >
          <div className="navbar__links">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </div>
          <a className="navbar__cta" href="#contact" onClick={closeMenu}>
            Hemen Başla
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
