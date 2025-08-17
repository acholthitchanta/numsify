import { Nav } from "../components/nav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArtistPage } from "./Artist";

// spotify:album:1YgekJJTEueWDaMr7BYqPk


export function AlbumPage(){
        const uri = useParams();

        const res = uri.id.split(":");
        const id = res[res.length - 1];

        const [info, setInfo] = useState(null)
        

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
            

            return(
                <>
                    <p>Released:</p> <span className="number">{releaseDate}</span>

                    <div class="other-stats">
                        <div class="stat"><p> Label:</p> <span className="number">{label}</span></div>
                        <div class="stat"><p>Popularity:</p> <span className="number">{result?.popularity}</span></div>
                    </div>


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
            getAlbumInfo();
        }, [])


    return(
        <>
            <Nav/>

            <div className="page">

                <div className="profile">
                    <AlbumProfile result={info} />

                        <Artists result={info}/>


                    <div class="stats">
                        <AlbumInfo result={info} />
                    </div>
                </div>

                <div class="discography">
                        <h2>Discography</h2>
                        <TrackList result={info}/> 
                </div>

            </div>



        </>
    )

}