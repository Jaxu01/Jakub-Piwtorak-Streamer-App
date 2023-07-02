import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Streamer from './pages/Streamer.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<App/>}/>
        <Route path="/streamer/:streamerId" element={<Streamer></Streamer>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
