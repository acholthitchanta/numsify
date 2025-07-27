import React, { useState, useEffect } from 'react';
import './App.css';


export default function App() {
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
        <button type="submit">Submit</button>
      </form>
      </>
    )
  }


    return (
      <>
      <SearchBar></SearchBar>
      <div className="Artists">
        <ul>
        {artist.map((artistData, index)=>(
          <li key={artistData.data.uri || index}>
            {artistData?.data?.profile?.name || 'Unknown Artist'}
          </li>
        )
        )}
        </ul>
      </div>
      <div className="Albums">
          <ul>
          {album.map((albumData, index)=>(
          <li key={albumData.data.uri || index}>
            {albumData?.data?.name || 'Unknown Album'}
          </li>
          )
          )}
          </ul>
      </div>
      <div className="Tracks">
          <ul>
          {track.map((trackData, index)=>(
          <li key={trackData.data.uri || index}>
            {trackData?.data?.name || 'Unknown Album'}
          </li>
          )
          )}
          </ul>
      </div>
      </>
  );
}

function ArtistPage(){
  return(
    <>
      <h1 className="name">Kanye West</h1>
      <img className="avatarImage"></img>

    </>

  )
}




