import './App.css';
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
        <Route path="/artistpage" element={<ArtistPage uri="spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"/>}/>
        <Route path="/albumpage" element={<AlbumPage/>}/>
        <Route path="/trackpage" element={<TrackPage/>}/>
  
      </Routes>
    </Router>
  )

}