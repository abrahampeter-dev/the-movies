import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { Navbar } from '@/layout/Navbar'
import { Trending } from '@/pages/trending/Trending'
import { Footer } from '@/layout/Footer'
import { Popular } from '@/pages/movies/Popular'
import { MovieDetails } from '@/pages/movies/MoviesDetail'
import { Toprated } from '@/pages/movies/Toprated'
import { UpcomingMovie } from '@/pages/movies/UpcomingMovie'
import { PopularTv } from '@/pages/tv/PopularTv'
import { TvDetails } from '@/pages/tv/TvDetails'
import { SeasonDetails } from '@/pages/tv/SeasonDetails'
import { EpisodeDetails } from '@/pages/tv/EpisodeDetails'
import { TopRatedTv } from '@/pages/tv/TopRatedTv'
import { OnTheAir } from '@/pages/tv/OnTheAir'
import { Artists } from '@/pages/artists/Artists'
import { ArtistDetail } from './pages/artists/ArtistDetails'

function App() {


  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>

        <Routes>

          <Route path='/' element={< Home />} />

          {/* movies */}
          <Route path='/movies' element={< Popular />} />
          <Route path='/movies/top-rated' element={< Toprated />} />
          <Route path='/movies/upcoming' element={< UpcomingMovie />} />
          <Route path='/movies/:id' element={< MovieDetails />} />

          {/* tv */}
          <Route path='/tv' element={<PopularTv />} />
          <Route path='/tv/top-rated' element={<TopRatedTv />} />
          <Route path='/tv/on-the-air' element={<OnTheAir />} />
          <Route path='/tv-series/:id' element={< TvDetails />} />
          <Route path='/tv-series/:id/season/:season_number' element={< SeasonDetails />} />
          <Route path='/tv-series/:id/season/:season_number' element={< SeasonDetails />} />
          <Route path='/tv-series/:id/season/:season_number/episode/:episode_number' element={< EpisodeDetails />} />


          {/* trending */}
          <Route path='/trending' element={< Trending />} />

          {/* artists */}
          <Route path='/artists' element={< Artists />} />
          <Route path='/artists/:id' element={< ArtistDetail />} />

        </Routes>

      </main>
      <Footer />
    </div >
  )
}

export default App
