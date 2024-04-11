import { lazy } from 'react'

// import viteLogo from '/vite.svg'
import { Route, Routes, Link, Navigate } from 'react-router-dom'
const Popular = lazy(() => import('./pages/popular'))
const Battle = lazy(() => import('./pages/battle'))
const BattleResult = lazy(() => import('./pages/battleResult'))
import './App.css'

function App() {
  return (
    <div className='app-box'>
      <div className='nav-box'>
        <Link to='./popular'>Popular</Link>
        <Link to='./battle'>Battle</Link>
      </div>
      <div className='view-box'>
        <Routes>
          <Route path='/popular' element={<Popular />}></Route>
          <Route path='/battle' element={<Battle />}></Route>
          <Route path='/battleResult' element={<BattleResult />}></Route>
          <Route path='/' element={<Navigate to='/popular' />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
