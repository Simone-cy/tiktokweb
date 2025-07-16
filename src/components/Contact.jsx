import { useState } from 'react'
import { Mail, MessageCircle, Instagram, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Qui puoi aggiungere la logica per inviare il form
    console.log('Form submitted:', formData)
    alert('Messaggio inviato! Ti contatterò presto.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Lavoriamo Insieme</h2>
          <p className="section-description">
            Hai un progetto in mente? Contattami per discutere come posso 
            portare la tua visione creativa al livello successivo.
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Metodi di Contatto</h3>
            
            <div className="contact-methods">
              <div className="contact-method">
                <Mail className="contact-icon" />
                <div>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">editor@example.com</span>
                </div>
              </div>
              
              <div className="contact-method">
                <Instagram className="contact-icon" />
                <div>
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">@tiktok_editor</span>
                </div>
              </div>
              
              <div className="contact-method">
                <MessageCircle className="contact-icon" />
                <div>
                  <span className="contact-label">TikTok</span>
                  <span className="contact-value">@creative_editor</span>
                </div>
              </div>
            </div>
            
            <div className="response-time">
              <h4>Tempi di Risposta</h4>
              <p>Rispondo solitamente entro 24 ore. Per progetti urgenti, contattami direttamente sui social media.</p>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Il tuo nome"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="la-tua-email@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Messaggio</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Descrivi il tuo progetto..."
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              <Send size={20} />
              Invia Messaggio
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
