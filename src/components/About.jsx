import { Zap, Palette, Music, Award } from 'lucide-react'

const About = () => {
  const skills = [
    {
      icon: <Zap />,
      title: "Transizioni Fluide",
      description: "Creo transizioni seamless che mantengono il viewer incollato allo schermo"
    },
    {
      icon: <Palette />,
      title: "Color Grading",
      description: "Correzione colore professionale per un look cinematografico unico"
    },
    {
      icon: <Music />,
      title: "Beat Sync",
      description: "Sincronia perfetta tra video e musica per massimo impatto"
    },
    {
      icon: <Award />,
      title: "Qualità Premium",
      description: "Ogni edit è curato nei minimi dettagli per risultati eccezionali"
    }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">Chi Sono</h2>
            <p className="about-description">
              Sono un editor specializzato in contenuti TikTok con oltre 2 anni di esperienza 
              nella creazione di contenuti virali. La mia passione è trasformare clip ordinarie 
              in edit straordinari che catturano l'attenzione e generano engagement.
            </p>
            <p className="about-description">
              Utilizzo tecniche avanzate di editing, color grading e motion graphics per 
              creare contenuti che si distinguono nel feed. Ogni progetto è un'opportunità 
              per spingere i limiti della creatività.
            </p>
            
            <div className="experience-stats">
              <div className="experience-item">
                <span className="experience-number">2+</span>
                <span className="experience-label">Anni di Esperienza</span>
              </div>
              <div className="experience-item">
                <span className="experience-number">100+</span>
                <span className="experience-label">Progetti Completati</span>
              </div>
              <div className="experience-item">
                <span className="experience-number">50+</span>
                <span className="experience-label">Clienti Soddisfatti</span>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder">
              <span>Foto Profilo</span>
            </div>
          </div>
        </div>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">
                {skill.icon}
              </div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
