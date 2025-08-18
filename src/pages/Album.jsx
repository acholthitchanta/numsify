import { Nav } from "../components/nav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArtistPage } from "./Artist";

// spotify:album:1YgekJJTEueWDaMr7BYqPk


const CLIENT_ID="a99c2d456efd4650823ec7ceef8ddcdc"
const CLIENT_SECRET="072b240960ae4144ad02cdc5b7ad6485"


export function AlbumPage(){
        const uri = useParams();

        const res = uri.id.split(":");
        const id = res[res.length - 1];

        const [info, setInfo] = useState(null)
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

        

        const getAlbumInfo= async() => {
            const url = `https://spotify23.p.rapidapi.com/albums/?ids=${id}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '4a8ddad952msh50928f5ffa51466p1bd66ajsn1af966580d01',
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result.albums[0]);
                if (result) setInfo(result.albums[0]);
            } catch (error) {
                console.error(error);
            }
        }

        const getAlbum = async() =>{
            const url = `https://api.spotify.com/v1/albums/${id}`;
            var searchParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }

            const response = await fetch(url,searchParameters)
                .then(response => response.json())
                .then(data => {
                if (data){
                    console.log(data)
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

        function AlbumProfile({result}){


            const albumCover = result?.images[0]?.url;
            const albumTitle = result?.name;

        
            return(
                <>
                    <img src={albumCover || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
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

             
                    <audio controls className="track-preview"> <source src={trackData.preview_url}></source></audio>

                    </>
                    </li>
                )
                )}
                </ul>

            )
  
        }


        useEffect(() => {
            getAlbumInfo()
        }, [])

        useEffect(()=>{
            getAlbum()

        })


    return(
        <>
            <Nav/>

            <div className="page">

                <div className="profile">
                    <AlbumProfile result={info} />

                    <div class="stats">
                        <AlbumInfo result={info} />
                    </div>
                </div>

                <div class="discography">
                        <h2>Tracklist</h2>
                        <TrackList result={info}/> 
                </div>

            </div>



        </>
    )
}