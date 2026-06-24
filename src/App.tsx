import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home    from './pages/Home'
import Terms   from './pages/Terms'
import Privacy from './pages/Privacy'
import Refunds from './pages/Refunds'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home />}    />
        <Route path="/terms"   element={<Terms />}   />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refunds" element={<Refunds />} />
      </Routes>
    </BrowserRouter>
  )
}
