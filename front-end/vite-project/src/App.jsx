import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import Tuto from './pages/Tuto'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/tuto" element={<Tuto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
