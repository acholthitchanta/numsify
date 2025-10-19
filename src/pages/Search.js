import { useState, useEffect } from 'react';
import { Nav } from '../components/nav';
import { useNavigate, useParams } from 'react-router-dom';



export function Search() {
  const [artist, setArtist] = useState([])
  const [album, setAlbum] = useState([])
  const [track, setTrack] = useState([])
  const [query, setQuery] = useState('')
  const [queryType, setQueryType] = useState('artists')


    const getArtist = async(query) =>{

      const encodedQuery = encodeURIComponent(query.trim());
          try{
              const params = new URLSearchParams({query: encodedQuery})
              const response = await fetch(`http://localhost:4000/searchArtists?${params}`);
              if(!response.ok) throw new Error('Network response was not ok');
              const data = await response.json();
              setArtist(data.artists.items || [])

          
          }
          catch (err){
              console.log(err);
          }
    }

    const getAlbum = async(query) =>{

      const encodedQuery = encodeURIComponent(query.trim());

          try{
              const params = new URLSearchParams({query: encodedQuery})
              const response = await fetch(`http://localhost:4000/searchAlbums?${params}`);
              if(!response.ok) throw new Error('Network response was not ok');
              const data = await response.json();
              setAlbum(data.albums?.items || [])

          
          }
          catch (err){
              console.log(err);
          }
    }


  const getTrack = async(query) =>{

      const encodedQuery = encodeURIComponent(query.trim());
          try{
              const params = new URLSearchParams({query: encodedQuery})
              const response = await fetch(`http://localhost:4000/searchTracks?${params}`);
              if(!response.ok) throw new Error('Network response was not ok');
              const data = await response.json();
              setTrack(data.tracks?.items || [])

          
          }
          catch (err){
              console.log(err);
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
        <li className="search-item" onClick={() => {navigate(`/artist/${artistData.uri}`)}} key={index}>
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
    <li className="search-item"  onClick={() => {navigate(`/album/${albumData.uri}`)}} key={albumData.uri}>
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
      <li className="search-item"  key={index}>
        <img src={trackData?.album?.images[2].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
        <div className="info">
          {trackData?.name || 'Unknown Album'}
          <p className="album">{trackData.album.name}</p>
          <p className="artist">{
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
