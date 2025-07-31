import { useState, useEffect } from 'react';
import { Nav } from '../components/nav';
import { ArtistPage } from './Artist';
import { AlbumPage } from './Album';
import { TrackPage } from './Track';

export function Search() {
  const [artist, setArtist] = useState([])
  const [album, setAlbum] = useState([])
  const [track, setTrack] = useState([])
  const [query, setQuery] = useState('')
  const [queryType, setQueryType] = useState('artists')

  const getAlbum = async(query) =>{
    const encodedQuery = encodeURIComponent(query.trim());

    const url = `https://spotify23.p.rapidapi.com/search/?q=${encodedQuery}&type=albums&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '74c22c0da3msh5eb78bf4fa50947p198d37jsn3564c6bd84e5',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setAlbum(result?.albums?.items || []);
      console.log(result?.albums?.items);
    } catch (error) {
      console.error(error);
      setAlbum([])
    }
  }


  const getTrack = async(query) =>{
      const encodedQuery = encodeURIComponent(query.trim());

      const url = `https://spotify23.p.rapidapi.com/search/?q=${encodedQuery}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '74c22c0da3msh5eb78bf4fa50947p198d37jsn3564c6bd84e5',
          'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setTrack(result?.tracks?.items || []);
        console.log(result?.tracks?.items);
      } catch (error) {
        console.error(error);
        setTrack([])
      }
}

  const getArtist = async(query) =>{
      const encodedQuery = encodeURIComponent(query.trim());

      const url = `https://spotify23.p.rapidapi.com/search/?q=${encodedQuery}&type=artist&offset=0&limit=10&numberOfTopResults=5`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '74c22c0da3msh5eb78bf4fa50947p198d37jsn3564c6bd84e5',
          'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setArtist(result?.artists?.items || []);
        console.log(result?.artists?.items);
      } catch (error) {
        console.error(error);
        setArtist([])
      }
}

  useEffect(() => {
    if (query){
      if (queryType == "artists"){
        getArtist(query);
        setAlbum([]);
        setTrack([]);
      }
      if (queryType == "albums"){
        getAlbum(query);
        setArtist([])
        setTrack([])
      }
      if (queryType == "tracks"){
        getTrack(query);
        setAlbum([])
        setArtist([])
      }
    }
    else {
      setArtist([]);
      setAlbum([]);
      setTrack([]);
    }
  },[query,queryType])


  function SearchBar(){
    const [inputValue, setInputValue] = useState('');
    const [inputType, setInputType] = useState('artists');

    const handleSubmit = (e) =>{
      e.preventDefault();
      setQuery(inputValue)
      setQueryType(inputType)
    }
    return(
      <>
      <form id="content-search" onSubmit={handleSubmit}>
          <input type="text"
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for artists, albums, or tracks"
          ></input>

          <select value={inputType}
            onChange={(e) =>setInputType(e.target.value)}>
            <option value="artists">Artists</option>
            <option value="albums">Albums</option>
            <option value="tracks">Tracks</option>
          </select>
        <button type="submit">Search</button>
      </form>
      </>
    )
  }

    return (
      <>
      <Nav/>
      <SearchBar/>
      <div className="search">
        {artist.length >0 ? (
          <ArtistResults artist={artist} />
        ) : album.length > 0? (
          <AlbumResults album={album} />
        ) : track.length > 0 ? (
          <TrackResults track={track} />
        ) : <p></p>}
      </div>
      </>
    );

  }


function goToPage(type, id){
  
}

function ArtistResults({artist}){
  return(
    <ul className="search-results">
      {artist.map((artistData, index)=>(


        <li className="search-item" onClick={goToPage(artist, artistData.data.uri)} key={artistData.data.uri || index}>
          <>
          <img src={artistData?.data?.visuals?.avatarImage?.sources[0].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
          <div className="info">
            {artistData?.data?.profile?.name || 'Unknown Artist'}
          </div>
          </>
        </li>
      )
      )}
    </ul>
  )
}

function AlbumResults({album}){
  return(
    <ul className="search-results">
    {album.map((albumData, index)=>(
    <li className="search-item"  key={albumData.data.uri || index}>
      <>
      <img src={albumData?.data?.coverArt?.sources[0].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>

      <div className="info">
        {albumData?.data?.name || 'Unknown Album'}<span>({albumData?.data?.date?.year})</span>
        <p className="artist">{albumData?.data?.artists?.items[0].profile.name}</p>
      </div>
      </>

    </li>
    )
    )}
    </ul>
  )
}


function TrackResults({track}){
  return(
      <ul className="search-results">
      {track.map((trackData, index)=>(
      <li className="search-item"  key={trackData.data.uri || index}>
        <img src={trackData?.data.albumOfTrack?.coverArt?.sources[0].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
        <div class="info">
          {trackData?.data?.name || 'Unknown Album'}
          <p class="album">{trackData.data?.albumOfTrack?.name}</p>
          <p class="artist">{
          trackData.data?.artists?.items.map((artist, index) => (
            artist.profile?.name + ((index < trackData.data?.artists.items.length - 1) ? ", " : "")
          ))           
          }
          </p>
        </div>

      </li>
      )
      )}
      </ul>

  )
}
