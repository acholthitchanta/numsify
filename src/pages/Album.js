import { Nav } from "../components/nav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// spotify:album:1YgekJJTEueWDaMr7BYqPk

const CLIENT_ID="a99c2d456efd4650823ec7ceef8ddcdc";
const CLIENT_SECRET="072b240960ae4144ad02cdc5b7ad6485";

export function AlbumPage(){
        const uri = useParams();

        const res = uri.id.split(":");
        const id = res[res.length - 1];


        const [info, setInfo] = useState({})
        const [accessToken, setAccessToken] = useState("")
        const [tags, setTags] = useState([])


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

    
        const getAlbumTags = async(name, artist) =>{
            try{
                const params = new URLSearchParams({album: name, artist: artist});
                const response = await fetch(`http://localhost:4000/getAlbumTags?${params}`);
                const data = await response.json();
                setTags(data?.toptags?.tag)

            }
            catch (err){
                console.log(err)
            }

        }

        const getAlbum = async() =>{      
            var searchParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }

            const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, searchParameters)
                .then(response => response.json())
                .then(data => {
                if (data){
                    setInfo(data || [])
                    getAlbumTags(data.name, data.artists[0].name)
                }
                else{
                    console.log("no results found")
                }
                })

            }
        


        function Artists({result}){
            const artists = result?.artists || [];

            return(            
                <p className="whomadeit">
                {artists.map((artist, index)=>(
                    artist.name + ((index < artists.length - 1) ? ", " : "")
                )
                )}
                </p>

            )

        }

        function AlbumTags(){
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

        function AlbumProfile({result}){
            const albumCover = result?.images[0]?.url;
            const albumTitle = result?.name;

        
            return(
                <>
                    <img loading="lazy" src={albumCover || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                    <h1>{albumTitle}</h1>
                </>

            )
        }


        function AlbumInfo({result}){
            const releaseDate = result?.release_date;
            const label = result?.label;

            const artists = result?.artists || [];
            

            return(
                <>

                   <p>Artists:</p> <span className="number">
                    {artists.map((artist, index)=>(
                        artist.name + ((index < artists.length - 1) ? ", " : "")
                    )
                    )}
                    </span>
                    <p>Released:</p> <span className="number">{releaseDate}</span>
                    <p>Popularity:</p> <span className="number">{result?.popularity}</span>


                </>

            )
        }

        function TrackList({result}){
            const tracks = result?.tracks?.items || [];

            function millisToMinutesAndSeconds(millis) {
                var minutes = Math.floor(millis / 60000);
                var seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }      

            return(
                <ul className="track-results">
                {tracks.map((trackData, index)=>(
                    <li className="track-item tracklist" key={trackData.id || index}>
                    <>

                    <div className="track-info">
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

         
        useEffect(()=>{
            if (id  && accessToken) getAlbum()
        }, [id, accessToken])
        
    



    if (info && info.name) return(
        <>
            <Nav/>

            <div className="page">

                <div className="profile">
                    <AlbumProfile result={info} />

                    <div className="stats">
                        <AlbumTags />

                        <AlbumInfo result={info} />
                        
                    </div>
                </div>

                <div className="discography">
                        <h2>Tracklist</h2>
                        <TrackList result={info}/> 
                </div>

            </div>



        </>
    ) 
}