import { Nav } from "../components/nav";

export function ArtistPage({uri}){

        const res = uri.split(":");
        const id = res[res.length - 1];
        console.log(id)
        

        const getArtistInfo = async() => {
            const url = `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}`;
            const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '74c22c0da3msh5eb78bf4fa50947p198d37jsn3564c6bd84e5',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }};

            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }

        }

        const getRelatedArtists = async() => {
            const url = `https://spotify23.p.rapidapi.com/artist_related/?id=${id}`;
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
            <h1>artist page</h1>

        </>
    )

}