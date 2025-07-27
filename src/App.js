import React, { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [music, setMusic] = useState([])

  const getArtist = async() =>{
      const url = 'https://spotify23.p.rapidapi.com/search/?q=Kanye%20west&type=artists&offset=0&limit=10&numberOfTopResults=5';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '74c22c0da3msh5eb78bf4fa50947p198d37jsn3564c6bd84e5',
          'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMusic(result?.artists?.items || []);
        console.log(result?.artists?.items);
      } catch (error) {
        console.error(error);
        setMusic([])
      }
}

    useEffect(() => {
      getArtist();
    },[])

    return (
      <div className="App">
        {music.map((musicData, index)=>(
          <li key={musicData.data.uri || index}>
            {musicData?.data?.profile?.name || 'Unknown Artist'}
          </li>
        )
        )}
      </div>
  );
}

export default App;
