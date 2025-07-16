import { Play, TrendingUp, Star } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Creative TikTok
            <span className="hero-highlight"> Editor</span>
          </h1>
          
          <p className="hero-description">
            Trasformo contenuti ordinari in edit straordinari. 
            Specializzato in transizioni fluide, color grading professionale 
            e sincronia perfetta con la musica.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <TrendingUp className="stat-icon" />
              <span className="stat-number">500K+</span>
              <span className="stat-label">Visualizzazioni</span>
            </div>
            <div className="stat">
              <Star className="stat-icon" />
              <span className="stat-number">50+</span>
              <span className="stat-label">Edit Creati</span>
            </div>
            <div className="stat">
              <Play className="stat-icon" />
              <span className="stat-number">25K+</span>
              <span className="stat-label">Follower</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button className="btn btn-primary">
              <Play size={20} />
              Vedi Portfolio
            </button>
            <button className="btn btn-secondary">
              Contattami
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
