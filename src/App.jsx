// import { useState } from 'react'

// import viteLogo from '/vite.svg'
import {  Route,Routes,Link, Navigate  } from 'react-router-dom'
import Popular from './pages/popular';
import Battle from './pages/battle';
import './App.css'

function App() {

  return (
      <div>
        <Link to="./popular">Popular</Link>
        <Link to="./battle">Battle</Link>
       <div className='view-box'>
       <Routes>
          <Route path="/popular" element={<Popular/>}></Route>
          <Route path="/battle" element={<Battle/>}></Route>
          <Route path="/" element={<Navigate to="/popular" />} />
        </Routes>
       </div>
      </div>
  )
}

export default App
