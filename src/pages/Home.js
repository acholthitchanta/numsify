import { Nav } from '../components/nav';
import { useEffect, useState } from 'react';


export function HomePage(){

    const fetchData = async() => {
        console.log("hi")
        try {
            const response = await fetch('http://localhost:4000/users');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log(data)
        } catch (err) {
            console.log(err);
        }
    };

    const artistData = async() =>{
        try{
            const response = await fetch('http://localhost:4000/getArtistInfo?artist=0TnOYISbd1XYRBk9myaseg')
            if(!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log(data)
        }
        catch (err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
        artistData();
    }, []);


    return(
        <>
        <Nav/>

        <div className="home-page">
            <h1>Welcome to numsify!</h1>
            <p>Any stat on music, all in one place. Click the search tab to begin!</p>
        </div>

        
        </>
    )
}