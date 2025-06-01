import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import virtual cake component
import VirtualCake from './pages/VirtualCake/VirtualCake'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/virtual-cake" element={<VirtualCake />} />
        <Route path="*" element={<VirtualCake />} />
      </Routes>
    </Router>
  )
}

export default App
