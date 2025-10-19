import { Nav } from "../components/nav";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export function ArtistPage(){
        const uri = useParams();

        const res = uri.id.split(":");
        const id = res[res.length - 1];

        const [info, setInfo] = useState({})

        const [albums, setAlbums] = useState([]);
        const [topTracks, setTopTracks] = useState([]);
        const [relatedArtists, setRelatedArtists] = useState([]);
        const [tags, setTags] = useState([])


        const getArtist = async(artistId) =>{
            try{
                const params = new URLSearchParams({artist: artistId})
                const response = await fetch(`http://localhost:4000/getArtistInfo?${params}`)
                const data = await response.json();
                if (data){
                    setInfo(data)
                    getRelatedArtists(data.name)
                    getArtistTags(data.name);
                }


            }
            catch (err){
                console.log(err);
            }
        }

        const getRelatedArtistData = async(artist) =>{
            try{
                const encodedQuery = encodeURIComponent(artist.trim());

                const params = new URLSearchParams({query: encodedQuery})
                const response = await fetch(`http://localhost:4000/searchArtist?${params}`)
                const data = await response.json();
                if (data){
                    return data.artists.items[0].images[0].url

                }
                return null

            }
            catch (err){
                console.log(err);
                return null
            }
        }

        const getArtistAlbums = async() =>{
            try{
                const params = new URLSearchParams({artist: id})
                const response = await fetch(`http://localhost:4000/getArtistAlbums?${params}`);
                const data = await response.json();
                setAlbums(data.items)
            
            }
            catch (err){
                console.log(err);
            }
        }

        const getTopTracks = async() =>{
            try{
                const params = new URLSearchParams({artist: id})
                const response = await fetch(`http://localhost:4000/getArtistTracks?${params}`);
                const data = await response.json();
                setTopTracks(data.tracks)
            
            }
            catch (err){
                console.log(err);
            }
        }


        const getRelatedArtists = async(name) => {
            try{
                const params = new URLSearchParams({artist: name})
                const response = await fetch(`http://localhost:4000/getRelatedArtists?${params}`);
                const data = await response.json();
                setRelatedArtists(data.similarartists.artist || [])
            }
            catch (err){
                console.log(err);
            }
        }



        const getArtistTags = async(name) => {
            try {
                const params = new URLSearchParams({name: name})

                const response = await fetch(`http://localhost:4000/getArtistTags?${params}`);
                const data = await response.json();
                setTags(data?.toptags?.tag)
            } catch (err) {
                console.log(err);
            }
        };

        function ArtistTags(){
            return(
                <ul className="tags">
                    {tags.slice(0,5).map((tag, index) =>(
                        <>
                            <div className ="tag">
                                <li key={index}> {tag.name}</li>
                                <div className="bar" style={{ width: `max(${(tag.count +"").length}*15px + 15px, ${tag.count}%)` }}>{tag.count}%</div>
                            </div>

                        </>

                    ))}

                </ul>
            )
        }



        function ArtistProfile(){
            const image = info.images ? info.images[0].url : "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg";
            const name = info.name || "Unknown Artist";

            return(
                <>
                    <div className="profile">
                        <img loading="lazy" src={image}></img>
                        <h1>{name}</h1>
                    </div>

                </>

            )
        }

        function DiscogResults(){
            return(
            <ul className="discog-results">
            {albums.toReversed().filter(discogData => discogData.album_type == "album").map((discogData, index)=>(
                <li className="discog-item" key={discogData.id || index}>
                <>
                <img loading="lazy" src={discogData.images[0].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                <div className="album-info">
                    {discogData.name || 'Unknown Album'} ({discogData.release_date.slice(0,4) })
                </div>
                </>
                </li>
            )
            )}
            </ul>
            )
        }

        function TopTracks(){


            function millisToMinutesAndSeconds(millis) {
                var minutes = Math.floor(millis / 60000);
                var seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }       
            
            return(
            <ul className="track-results">
            {topTracks.slice(0,5).map((trackData, index)=>(
                <li className="track-item" key={trackData.id || index}>
                <>

                <div className="track-info">
                    <img loading="lazy" src={trackData.album.images[2].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                    <div className="track-name">
                        {trackData.name || 'Unknown track'}
                    </div>
                </div>

                <p className="play-count">{millisToMinutesAndSeconds(trackData.duration_ms)}</p>

                </>
                </li>
            )
            )}
            </ul>
            )
        }

        function RelatedArtists(){
            const renderArtist = (artist, index) => {
                const [artistImage, setArtistImage] = useState("https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg")
                
                async function fetchImage(name) {
                    const imageUrl = await getRelatedArtistData(name)
                    setArtistImage(imageUrl || 'https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg')   
                }
                
                const name = artist.name || 'Unknown Artist';
                fetchImage(name);
                    return (
                        <li className="artist-item" key={artist.id || index}>
                            <img src={artistImage} alt={name} />
                            <div className="artist-info">{name}</div>
                        </li>
                    );
                };

            return (
                <>
                    <div className="artist-results">
                        <h2>Related Artists</h2>      
                        <ul className="artist-list">
                            {relatedArtists?.map(renderArtist) || <li>No artists available</li>}
                        </ul>

                    </div>
                </>
  
            );


        }

        function ArtistStats(){

            const followers = info.followers? info.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

            return(
                <>
                    <p>followers</p> <span className="number">{followers}</span>
                    <p id="popularity">popularity</p> <span className="number">{info.popularity}%</span>

                </>
            )
        }


        useEffect(() => {
            if (id) {
                getArtist(id);
                getArtistAlbums();
                getTopTracks();
            }
        }, [id]);


    return(
        <>
            <Nav/>
            <div className="page">
                <div className="profile">
                    <ArtistProfile />
                    <div className="stats">
                        <ArtistTags />
                        <ArtistStats result={info}/>
                    </div>

                </div>

                <div className="info">
                    <div className="top-tracks">
                        <h2>Top Tracks</h2>
                        <TopTracks result={info}/>
                    </div>

                    <div className="discog-section">
                        <h2>Discography</h2>
                        <DiscogResults result={albums}/>
                    </div>     
                    <RelatedArtists result={info}/>
                </div>

            </div>

        </>
    )

}