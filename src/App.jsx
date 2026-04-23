import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { Navbar } from '@/layout/Navbar'
import { Movies } from '@/pages/Movies'
import { Trending } from '@/pages/Trending'
import { Footer } from './layout/Footer'

function App() {


  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>

        <Routes>
          <Route path='/' element={< Home />} />
          <Route path='/movies' element={< Movies />}>
            {/* <Route path='/' element={< Home />} /> */}
          </Route>
          <Route path='/trending' element={< Trending />} />
          {/* <Route path='/' element={< Home />} /> */}
        </Routes>

      </main>
      <Footer />
    </div>
  )
}

export default App
