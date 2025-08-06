import { Nav } from "../components/nav";
import { useEffect, useState } from "react";
import { ArtistPage } from "./Artist";


export function AlbumPage({uri}){
        const res = uri.split(":");
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
            console.log(artists);

            return(            
                
                <ul className="album-artists">
                {artists.map((artist, index)=>(
                    <li className="album-artist" key={artist.id || index}>
                        {artist.name || 'Unknown Artist'}
                    </li>
                )
                )}
                </ul>

            )

        }

        function AlbumProfile({result}){


            const albumCover = result?.images[0]?.url;
            const albumTitle = result?.name;
            const releaseDate = result?.release_date
            

            return(
                <>
                    <img src={albumCover || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                    <h1>{albumTitle}</h1>
                    <p>Popularity: {result?.popularity}</p>
                    <p>Released: {releaseDate}</p>

                </>

            )
        }


        useEffect(() => {
            getAlbumInfo();
        }, [])


    return(
        <>
            <Nav/>

            <AlbumProfile result={info}/>
            <Artists result={info} />

        </>
    )

}