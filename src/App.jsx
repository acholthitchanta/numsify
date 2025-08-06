import './App.css';
import React from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Search } from './pages/Search'
import { HomePage } from './pages/Home';
import { ArtistPage } from './pages/Artist';
import { AlbumPage } from './pages/Album';
import { TrackPage } from './pages/Track';


export default function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/artistpage" element={<ArtistPage uri="spotify:artist:2ApaG60P4r0yhBoDCGD8YG"
/>}/>
        <Route path="/albumpage" element={<AlbumPage uri="spotify:album:2ANVost0y2y52ema1E9xAZ"
/>}/>
        <Route path="/trackpage" element={<TrackPage/>}/>
  
      </Routes>
    </Router>
  )

}