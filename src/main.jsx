import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import './index.css'
import { NextUIProvider as NextUi } from '@nextui-org/react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUi>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </NextUi>
  </StrictMode>,
)
