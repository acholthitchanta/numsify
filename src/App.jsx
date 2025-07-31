import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Search } from './pages/Search'
import { HomePage } from './pages/Home';
import { MusicPage } from './pages/MusicPage';

export default function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>

        <Route path="/search" element={<Search/>}/>
        <Route path="/musicpage" element={<MusicPage/>}/>

  
      </Routes>
    </Router>
  )

}