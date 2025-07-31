import { Nav } from "../components/nav";


export function AlbumPage({id}){

        const getAlbumInfo= async(query) => {
            const url = 'https://spotify23.p.rapidapi.com/albums/?ids=3IBcauSj5M2A6lTeffJzdv';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '74c22c0da3msh5eb78bf4fa50947p198d37jsn3564c6bd84e5',
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }

        }

        const getTrackInfo= async(query) => {
            const url = 'https://spotify23.p.rapidapi.com/tracks/?ids=4WNcduiCmDNfmTEz7JvmLv';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '74c22c0da3msh5eb78bf4fa50947p198d37jsn3564c6bd84e5',
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }

        const getTrackRecommendations = async(query) => {
            const url = 'https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '74c22c0da3msh5eb78bf4fa50947p198d37jsn3564c6bd84e5',
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }

        const getTrackLyrics = async(query) => {
            const url = 'https://spotify23.p.rapidapi.com/track_lyrics/?id=4snRyiaLyvTMui0hzp8MF7';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '74c22c0da3msh5eb78bf4fa50947p198d37jsn3564c6bd84e5',
                    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }


    return(
        <>
            <Nav/>
        </>
    )

}