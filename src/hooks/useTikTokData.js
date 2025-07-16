import { useState, useEffect } from 'react'
import TikTokScrapingAPI from '../services/tiktokScraping'

// Hook personalizzato per gestire i dati TikTok
const useTikTokData = (username) => {
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const tiktokAPI = new TikTokScrapingAPI()

  // Carica dati del profilo
  const loadProfile = async () => {
    if (!username) return

    setLoading(true)
    setError(null)

    try {
      const profileData = await tiktokAPI.getUserProfile(username)
      setProfile(profileData)
    } catch (err) {
      setError('Errore nel caricamento del profilo: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Carica video del profilo
  const loadVideos = async (count = 20) => {
    if (!username) return

    setLoading(true)
    setError(null)

    try {
      const videosData = await tiktokAPI.getUserVideos(username, count)
      setVideos(videosData)
    } catch (err) {
      setError('Errore nel caricamento dei video: ' + err.message)
      console.error(err)
      
      // Fallback ai dati di esempio se l'API fallisce
      setVideos(getFallbackVideos())
    } finally {
      setLoading(false)
    }
  }

  // Refresh completo dei dati
  const refreshData = async () => {
    await Promise.all([loadProfile(), loadVideos()])
  }

  // Carica dati al mount o quando cambia l'username
  useEffect(() => {
    if (username) {
      refreshData()
    }
  }, [username])

  return {
    profile,
    videos,
    loading,
    error,
    refreshData,
    loadProfile,
    loadVideos
  }
}

// Dati di fallback se l'API non funziona
const getFallbackVideos = () => [
  {
    id: 'fallback1',
    title: "Epic Transition Edit",
    description: "Smooth transitions with beat sync #edit #transition",
    thumbnail: "https://via.placeholder.com/300x400/1f1f1f/ff0050?text=Edit+1",
    videoUrl: "#",
    views: "125K",
    likes: "8.2K",
    comments: "234",
    shares: "1.1K",
    hashtags: ["edit", "transition"]
  },
  {
    id: 'fallback2',
    title: "Color Grading Master",
    description: "Professional color correction showcase #colorgrading #cinematic",
    thumbnail: "https://via.placeholder.com/300x400/1f1f1f/00d4ff?text=Edit+2",
    videoUrl: "#",
    views: "89K",
    likes: "5.7K",
    comments: "123",
    shares: "890",
    hashtags: ["colorgrading", "cinematic"]
  },
  {
    id: 'fallback3',
    title: "Motion Graphics",
    description: "Dynamic text and effects #motiongraphics #design",
    thumbnail: "https://via.placeholder.com/300x400/1f1f1f/ffd700?text=Edit+3",
    videoUrl: "#",
    views: "203K",
    likes: "12.1K",
    comments: "456",
    shares: "2.3K",
    hashtags: ["motiongraphics", "design"]
  }
]

export default useTikTokData
