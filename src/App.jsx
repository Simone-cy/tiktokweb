import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import VideoGallery from './components/VideoGallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  // Configura qui il tuo username TikTok per usare dati reali
  // Lascia null per usare i dati demo
  const TIKTOK_USERNAME = null // Cambia con il tuo username es. "tuo_username"

  return (
    <div className="App">
      <Header />
      <Hero />
      <VideoGallery username={TIKTOK_USERNAME} />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
