// Servizio alternativo usando API di terze parti (es. RapidAPI)
// Più semplice da implementare ma meno ufficiale

class TikTokScrapingAPI {
  constructor() {
    this.rapidAPIKey = process.env.REACT_APP_RAPIDAPI_KEY
    this.baseURL = 'https://tiktok-scraper7.p.rapidapi.com'
  }

  // Ottieni profilo utente
  async getUserProfile(username) {
    try {
      const response = await fetch(`${this.baseURL}/user/info?unique_id=${username}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.rapidAPIKey,
          'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com'
        }
      })

      const data = await response.json()
      return this.formatUserProfile(data)
    } catch (error) {
      console.error('Errore nel recupero profilo:', error)
      throw error
    }
  }

  // Ottieni video dell'utente
  async getUserVideos(username, count = 20) {
    try {
      const response = await fetch(`${this.baseURL}/user/posts?unique_id=${username}&count=${count}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.rapidAPIKey,
          'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com'
        }
      })

      const data = await response.json()
      return this.formatVideos(data)
    } catch (error) {
      console.error('Errore nel recupero video:', error)
      throw error
    }
  }

  // Formatta dati profilo
  formatUserProfile(data) {
    const user = data.data?.user || {}
    return {
      username: user.unique_id || '',
      displayName: user.nickname || '',
      bio: user.signature || '',
      avatar: user.avatar_medium?.url_list?.[0] || '',
      followers: this.formatNumber(user.follower_count),
      following: this.formatNumber(user.following_count),
      likes: this.formatNumber(user.total_favorited),
      videos: user.aweme_count || 0,
      verified: user.verification_type === 1
    }
  }

  // Formatta dati video
  formatVideos(data) {
    const videos = data.data?.aweme_list || []
    return videos.map(video => ({
      id: video.aweme_id,
      title: this.extractTitle(video.desc),
      description: video.desc || '',
      thumbnail: video.video?.cover?.url_list?.[0] || '',
      videoUrl: `https://www.tiktok.com/@${video.author?.unique_id}/video/${video.aweme_id}`,
      views: this.formatNumber(video.statistics?.play_count),
      likes: this.formatNumber(video.statistics?.digg_count),
      comments: this.formatNumber(video.statistics?.comment_count),
      shares: this.formatNumber(video.statistics?.share_count),
      duration: video.video?.duration || 0,
      createTime: new Date(video.create_time * 1000),
      hashtags: this.extractHashtags(video.desc)
    }))
  }

  // Estrai titolo dalla descrizione
  extractTitle(description) {
    if (!description) return 'Video TikTok'
    
    // Prendi le prime parole prima degli hashtag
    const withoutHashtags = description.split('#')[0].trim()
    const title = withoutHashtags.substring(0, 50)
    return title || 'Video TikTok'
  }

  // Estrai hashtags
  extractHashtags(description) {
    if (!description) return []
    const hashtags = description.match(/#[\w]+/g) || []
    return hashtags.map(tag => tag.substring(1))
  }

  // Formatta numeri
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

export default TikTokScrapingAPI
