import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { Navbar } from '@/layout/Navbar'
import { Trending } from '@/pages/Trending'
import { Footer } from '@/layout/Footer'
import { Popular } from '@/pages/movies/Popular'
import { MovieDetails } from '@/pages/movies/MoviesDetail'
import { Toprated } from '@/pages/movies/Toprated'
import { UpcomingMovie } from '@/pages/movies/UpcomingMovie'
import { PopularTv } from '@/pages/tv/PopularTv'

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
          <Route path='/trending' element={< Trending />} />

          {/* tv */}
          <Route path='/tv' element={<PopularTv />} />
          {/* <Route path='/' element={< Home />} /> */}
        </Routes>

      </main>
      <Footer />
    </div >
  )
}

export default App
