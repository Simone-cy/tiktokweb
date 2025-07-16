import { Play, Instagram, Youtube, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Play className="logo-icon" />
              <span className="logo-text">TikTok Editor</span>
            </div>
            <p className="footer-description">
              Creatività e professionalità al servizio dei tuoi contenuti TikTok. 
              Trasformo le tue idee in edit virali.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Link Rapidi</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#gallery">Portfolio</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contatti</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Servizi</h4>
            <ul className="footer-links">
              <li>Edit TikTok</li>
              <li>Color Grading</li>
              <li>Motion Graphics</li>
              <li>Consulenze Creative</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Social Media</h4>
            <div className="social-links">
              <a href="#" className="social-link">
                <Instagram size={24} />
              </a>
              <a href="#" className="social-link">
                <Youtube size={24} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 TikTok Editor. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
