// TikTok API Service
// Nota: Richiede registrazione su TikTok for Developers

class TikTokAPI {
  constructor() {
    this.baseURL = 'https://open.tiktokapis.com/v2'
    this.clientKey = process.env.REACT_APP_TIKTOK_CLIENT_KEY
    this.clientSecret = process.env.REACT_APP_TIKTOK_CLIENT_SECRET
    this.accessToken = null
  }

  // Metodo per ottenere l'access token (OAuth 2.0)
  async getAccessToken() {
    try {
      const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_key: this.clientKey,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials'
        })
      })
      
      const data = await response.json()
      this.accessToken = data.access_token
      return data.access_token
    } catch (error) {
      console.error('Errore nel recupero access token:', error)
      throw error
    }
  }

  // Ottieni informazioni del profilo utente
  async getUserInfo(username) {
    if (!this.accessToken) {
      await this.getAccessToken()
    }

    try {
      const response = await fetch(`${this.baseURL}/user/info/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          fields: ['open_id', 'username', 'display_name', 'avatar_url', 'follower_count', 'following_count', 'likes_count']
        })
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Errore nel recupero info utente:', error)
      throw error
    }
  }

  // Ottieni i video dell'utente
  async getUserVideos(username, cursor = null, maxCount = 20) {
    if (!this.accessToken) {
      await this.getAccessToken()
    }

    try {
      const body = {
        username: username,
        max_count: maxCount,
        fields: ['id', 'title', 'video_description', 'duration', 'cover_image_url', 'play_count', 'like_count', 'comment_count', 'share_count']
      }

      if (cursor) {
        body.cursor = cursor
      }

      const response = await fetch(`${this.baseURL}/video/list/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Errore nel recupero video:', error)
      throw error
    }
  }

  // Formatta i dati per il nostro componente
  formatVideoData(apiData) {
    return apiData.videos?.map(video => ({
      id: video.id,
      title: video.title || 'Video TikTok',
      description: video.video_description || '',
      thumbnail: video.cover_image_url,
      videoUrl: `https://www.tiktok.com/@username/video/${video.id}`,
      views: this.formatNumber(video.play_count),
      likes: this.formatNumber(video.like_count),
      comments: this.formatNumber(video.comment_count),
      shares: this.formatNumber(video.share_count),
      duration: video.duration
    })) || []
  }

  // Formatta numeri (es. 1234 -> 1.2K)
  formatNumber(num) {
    if (!num) return '0'
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }
}

export default TikTokAPI
