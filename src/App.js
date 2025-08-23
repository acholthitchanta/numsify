import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Search } from './pages/Search'
import { HomePage } from './pages/Home';
import { ArtistPage } from './pages/Artist';
import { AlbumPage } from './pages/Album';
import { TrackPage } from './pages/Track';
import { NotFound } from './pages/NotFound';


export default function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/artist/:id" element={<ArtistPage/>}/>
        <Route path="/album/:id" element={<AlbumPage/>}/>
        <Route path="/trackpage" element={<TrackPage/>}/>
        <Route path="*" element={<NotFound/>}/>
  
      </Routes>
    </Router>
  )

}