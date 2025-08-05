import { Nav } from "../components/nav";
import { useState, useEffect } from 'react';


export function ArtistPage({uri}){

        const res = uri.split(":");
        const id = res[res.length - 1];

        const [info, setInfo] = useState([])
        const [discog, setDiscog] = useState([])
        

        const getArtistInfo = async() => {
            const url = `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}`;
            const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '4a8ddad952msh50928f5ffa51466p1bd66ajsn1af966580d01',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }};

            try {
                const response = await fetch(url, options);
                const result = await response.json()
                console.log(result?.data?.artist)
                setInfo(result?.data?.artist || []);

            } catch (error) {
                console.error(error);
            }

        }

        function ArtistProfile({result}){
            const image = result?.visuals?.avatarImage?.sources[0].url;

            const name = result?.profile?.name;

            return(
                <>
                    <div className="profile">
                        <img src={image || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                        <h1>{name}</h1>
                    </div>

                </>

            )
        }

        function DiscogResults({result}){

            const albums = result?.discography?.albums?.items || [];
            
            return(
            <ul className="discog-results">
            {albums.toReversed().map((discogData, index)=>(
                <li className="discog-item" key={discogData.id || index}>
                <>
                <img src={discogData.releases?.items[0].coverArt?.sources[0].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                <div className="info">
                    {discogData.releases.items[0].name || 'Unknown Album'} ({discogData.releases.items[0].date.year })
                </div>
                </>
                </li>
            )
            )}
            </ul>
            )
        }

        function TopTracks({result}){

            const tracks = result?.discography?.topTracks?.items || [];
            
            return(
            <ul className="track-results">
            {tracks.slice(0,5).map((trackData, index)=>(
                <li className="track-item" key={trackData.id || index}>
                <>

                <div className="track-info">
                    <img src={trackData.track?.album?.coverArt?.sources[0].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                    <div className="track-name">
                        {trackData.track?.name || 'Unknown track'}
                    </div>
                </div>

                <p class="play-count">{ trackData.track.playcount? trackData.track.playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}</p>

                </>
                </li>
            )
            )}
            </ul>
            )
        }

        function RelatedArtists({result}){

            const relatedArtists = result?.relatedContent?.relatedArtists?.items || [];
            
            return(

            <>

            <div className="artist-results">
            <h2>Related Artists</h2>      
            <ul class="artist-list">
            {relatedArtists.slice(0,7).map((artist, index)=>(
                <li className="artist-item" key={artist.id || index}>
                <>
                <img src={artist.visuals?.avatarImage?.sources[0].url || "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"}></img>
                <div className="artist-info">
                    {artist.profile.name || 'Unknown Artist'}
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

        function ArtistStats({result}){

            const stats = result?.stats || [];
            const followers = stats.followers? stats.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

            return(
                <>
                    <p>followers</p> <span class="number">{followers}</span>
                    <p id="world-rank">world rank</p> <span class="number">#{stats.worldRank}</span>

                </>
            )
        }


    useEffect(() => {
        getArtistInfo();
    }, [])


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

                <div class="info">

                    <div className="top-tracks">
                        <h2>Top Tracks</h2>
                        <TopTracks result={info}/>
                    </div>

                    <div className="discog-section">
                        <h2>Discography</h2>
                        <DiscogResults result={info}/>
                    </div>     
                    <RelatedArtists result={info}/>
                </div>

            </div>

        </>
    )

}