import { useState, useEffect } from 'react'
import { Play, Eye, Heart, ExternalLink, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import useTikTokData from '../hooks/useTikTokData'

const VideoCard = ({ edit }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="video-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="video-thumbnail">
        <img src={edit.thumbnail} alt={edit.title} />
        <div className={`video-overlay ${isHovered ? 'overlay-visible' : ''}`}>
          <button className="play-button" onClick={() => window.open(edit.videoUrl, '_blank')}>
            <Play size={32} />
          </button>
        </div>
        <div className="video-stats">
          <span className="stat">
            <Eye size={16} />
            {edit.views}
          </span>
          <span className="stat">
            <Heart size={16} />
            {edit.likes}
          </span>
        </div>
        {edit.hashtags && edit.hashtags.length > 0 && (
          <div className="video-hashtags">
            {edit.hashtags.slice(0, 2).map(tag => (
              <span key={tag} className="hashtag">#{tag}</span>
            ))}
          </div>
        )}
      </div>
      
      <div className="video-info">
        <h3 className="video-title">{edit.title}</h3>
        <p className="video-description">{edit.description}</p>
        <button className="watch-button" onClick={() => window.open(edit.videoUrl, '_blank')}>
          <ExternalLink size={16} />
          Guarda su TikTok
        </button>
      </div>
    </div>
  )
}

const VideoGallery = ({ username = null }) => {
  const [filter, setFilter] = useState('all')
  const [isLiveData, setIsLiveData] = useState(false)
  
  // Hook per dati TikTok reali
  const { videos, loading, error, refreshData } = useTikTokData(username)
  
  // Dati di fallback se non c'è username o errore API
  const fallbackEdits = [
    {
      id: 1,
      title: "Epic Transition Edit",
      description: "Smooth transitions with beat sync",
      thumbnail: "https://via.placeholder.com/300x400/1f1f1f/ff0050?text=Edit+1",
      videoUrl: "#",
      views: "125K",
      likes: "8.2K",
      hashtags: ["edit", "transition"]
    },
    {
      id: 2,
      title: "Color Grading Master",
      description: "Professional color correction showcase",
      thumbnail: "https://via.placeholder.com/300x400/1f1f1f/00d4ff?text=Edit+2",
      videoUrl: "#",
      views: "89K",
      likes: "5.7K",
      hashtags: ["colorgrading", "cinematic"]
    },
    {
      id: 3,
      title: "Motion Graphics",
      description: "Dynamic text and effects",
      thumbnail: "https://via.placeholder.com/300x400/1f1f1f/ffd700?text=Edit+3",
      videoUrl: "#",
      views: "203K",
      likes: "12.1K",
      hashtags: ["motiongraphics", "design"]
    },
    {
      id: 4,
      title: "Cinematic Style",
      description: "Film-style grading and pacing",
      thumbnail: "https://via.placeholder.com/300x400/1f1f1f/9d4edd?text=Edit+4",
      videoUrl: "#",
      views: "156K",
      likes: "9.8K",
      hashtags: ["cinematic", "film"]
    },
    {
      id: 5,
      title: "Beat Sync Perfection",
      description: "Perfectly timed to music",
      thumbnail: "https://via.placeholder.com/300x400/1f1f1f/06ffa5?text=Edit+5",
      videoUrl: "#",
      views: "267K",
      likes: "18.3K",
      hashtags: ["beatsync", "music"]
    },
    {
      id: 6,
      title: "Creative Transitions",
      description: "Unique transition techniques",
      thumbnail: "https://via.placeholder.com/300x400/1f1f1f/ff6b35?text=Edit+6",
      videoUrl: "#",
      views: "98K",
      likes: "6.4K",
      hashtags: ["transitions", "creative"]
    }
  ]

  // Usa dati reali se disponibili, altrimenti fallback
  const displayEdits = videos.length > 0 ? videos : fallbackEdits
  
  useEffect(() => {
    setIsLiveData(videos.length > 0 && username && !error)
  }, [videos, username, error])

  const filters = [
    { id: 'all', label: 'Tutti' },
    { id: 'trending', label: 'Trending' },
    { id: 'recent', label: 'Recenti' },
    { id: 'popular', label: 'Popolari' }
  ]

  // Filtra video (per ora solo filtro "all" implementato)
  const filteredEdits = displayEdits.filter(edit => {
    if (filter === 'all') return true
    // Aggiungi logica per altri filtri se necessario
    return true
  })

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <div className="gallery-title-wrapper">
            <h2 className="section-title">Portfolio Edit</h2>
            <div className="data-status">
              {isLiveData ? (
                <span className="live-indicator">
                  <Wifi size={16} />
                  Dati Live da TikTok
                </span>
              ) : (
                <span className="demo-indicator">
                  <WifiOff size={16} />
                  Dati Demo
                </span>
              )}
              {username && (
                <button 
                  className="refresh-button" 
                  onClick={refreshData}
                  disabled={loading}
                >
                  <RefreshCw size={16} className={loading ? 'spinning' : ''} />
                  Aggiorna
                </button>
              )}
            </div>
          </div>
          <p className="section-description">
            {isLiveData 
              ? `Una selezione dei video TikTok di @${username}`
              : "Una selezione dei miei migliori lavori di editing per TikTok"
            }
          </p>
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
        </div>
        
        <div className="filter-tabs">
          {filters.map(filterItem => (
            <button
              key={filterItem.id}
              className={`filter-tab ${filter === filterItem.id ? 'active' : ''}`}
              onClick={() => setFilter(filterItem.id)}
            >
              {filterItem.label}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Caricamento video da TikTok...</p>
          </div>
        ) : (
          <div className="video-grid">
            {filteredEdits.map(edit => (
              <VideoCard key={edit.id} edit={edit} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default VideoGallery
