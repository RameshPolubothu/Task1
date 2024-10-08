import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Gif from './components/Gifs.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Gif />
  // </StrictMode>,
)
