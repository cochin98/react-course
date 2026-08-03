import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import './App.css'

function App() {

  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path="/checkout" element={<div>test checout</div>} />
    </Routes>
  )
}

export default App
