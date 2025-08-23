import { Nav } from "../components/nav";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const CLIENT_ID="a99c2d456efd4650823ec7ceef8ddcdc"
const CLIENT_SECRET="072b240960ae4144ad02cdc5b7ad6485"

const lastfm_key = "3b900eb4942c6d4adbd1b70ecf2376a2";
const lastfm_secret = "ae30be50429067fe1407a804ea85bf34";



export function ArtistPage(){
        const uri = useParams();

        const res = uri.id.split(":");
        const id = res[res.length - 1];

        const [info, setInfo] = useState({})

        const [albums, setAlbums] = useState([]);
        const [topTracks, setTopTracks] = useState([]);
        const [relatedArtists, setRelatedArtists] = useState([]);


        const artistData = async() =>{
            try{
                const params = new URLSearchParams({artist: id})
                const response = await fetch(`http://localhost:4000/getArtistInfo?${params}`)
                if(!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setInfo(data)
                getRelatedArtists(data.name)


            }
            catch (err){
                console.log(err);
            }
        }

        const getArtistAlbums = async() =>{
            try{
                const params = new URLSearchParams({artist: id})
                const response = await fetch(`http://localhost:4000/getArtistAlbums?${params}`);
                if(!response.ok) throw new Error('Network response was not ok');
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
                if(!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setTopTracks(data.tracks)
            
            }
            catch (err){
                console.log(err);
            }
        }


        const getRelatedArtists = async(artist) => {

            const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=${lastfm_key}&format=json&limit=10`;
            
            const response = await fetch(url)
            .then (response => response.json())
            .then(data =>{
                if (data){
                    setRelatedArtists(data.similarartists.artist || [])
                }
                else{
                    console.log("no results found")
                }
            })
        }

        


        function ArtistProfile(){
            const image = info.images ? info.images[0].url : "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg";
            const name = info.name || "Unknown Artist";

            return(
                <>
                    <div className="profile">
                        <img src={image}></img>
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
                <img src={discogData.images[0].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                <div className="info">
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
                    <img src={trackData.album.images[2].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
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

            return(
            <>

            <div className="artist-results">
            <h2>Related Artists</h2>      
            <ul className="artist-list">
            {relatedArtists.slice(0,7).map((artist, index)=>(
                <li className="artist-item" key={artist.url || index}>
                <>
                <img src={artist.image[0]["#text"] || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                <div className="artist-info">
                    {artist.name || 'Unknown Artist'}
                </div>
                </>
                </li>
            )
            )}
            </ul>

            </div>
            </>
            )

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
                artistData();
                getArtistAlbums();
                getTopTracks();

            }
        }, [id]);


    return(
        <>
            <Nav/>
            <div className="page">
                <div className="profile">
                    <ArtistProfile result={info} />
                    <div className="stats">
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