import { useState, useEffect } from 'react';
import React from 'react';
import { Nav } from '../components/nav';
import { ArtistPage } from './Artist';
import { AlbumPage } from './Album';
import { TrackPage } from './Track';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

const CLIENT_ID="a99c2d456efd4650823ec7ceef8ddcdc"
const CLIENT_SECRET="072b240960ae4144ad02cdc5b7ad6485"



export function Search() {
  const [artist, setArtist] = useState([])
  const [album, setAlbum] = useState([])
  const [track, setTrack] = useState([])
  const [query, setQuery] = useState('')
  const [queryType, setQueryType] = useState('artists')
   const [accessToken, setAccessToken] = useState("")

    useEffect(() => {
      var authParameters = {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
      }
      fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))

    }, [])


    const getArtist = async(query) =>{
      console.log("Search for " + query);

      var searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }

      const encodedQuery = encodeURIComponent(query.trim());

      //get request using search to get artist id
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=artist&offset=0&limit=10&numberOfTopResults=5`,searchParameters)
        .then(response => response.json())
        .then(data => {
          if (data){
            setArtist(data.artists?.items || [])
          }
          else{
            setArtist([])
            console.log("no results found")
          }
        })
    }



    const getAlbum = async(query) =>{
      console.log("Search for " + query);

      var searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }

      const encodedQuery = encodeURIComponent(query.trim());

      //get request using search to get artist id
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=album&offset=0&limit=10&numberOfTopResults=5`,searchParameters)
        .then(response => response.json())
        .then(data => {
          if (data){
            setAlbum(data.albums?.items || [])
          }
          else{
            setAlbum([])
            console.log("no results found")
          }
        })
    }




  const getTrack = async(query) =>{
    const encodedQuery = encodeURIComponent(query.trim());

    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&offset=0&limit=10&numberOfTopResults=5`,searchParameters)
      .then(response => response.json())
      .then(data => {
        if (data){
          setTrack(data.tracks?.items || [])
        }
        else{
          setTrack([])
          console.log("no results found")
        }
      })
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





function ArtistResults({artist}){

    const navigate = useNavigate();


  return(
    <ul className="search-results">
      {artist.map((artistData, index)=>(
        <>
        <li className="search-item" onClick={() => {navigate(`/artist/${artistData.uri}`)}} key={artistData.uri || index}>
          <>
          <img src={artistData?.images[2]?.url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
          <div className="info">
            {artistData?.name || 'Unknown Artist'}
          </div>
          </>
        </li>
        </>
      )
      )}
    </ul>
  )
}

function AlbumResults({album}){
    const navigate = useNavigate();

  return(
    <ul className="search-results">
    {album.map((albumData, index)=>(
    <li className="search-item"  onClick={() => {navigate(`/album/${albumData.uri}`)}} key={albumData.uri || index}>
      <>
      <img src={albumData.images[0].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>

      <div className="info">
        {albumData.name || 'Unknown Album'}<span>({albumData.release_date.slice(0,4)})</span>
        <p className="artist">{
          albumData.artists.map((artist, index) => (
            artist.name + ((index < albumData.artists.length - 1) ? ", " : "")
          ))           
          }</p>
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
      <li className="search-item"  key={trackData.uri || index}>
        <img src={trackData?.album?.images[2].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
        <div class="info">
          {trackData?.name || 'Unknown Album'}
          <p class="album">{trackData.album.name}</p>
          <p class="artist">{
          trackData.artists.map((artist, index) => (
            artist.name + ((index < trackData.artists.length - 1) ? ", " : "")
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
