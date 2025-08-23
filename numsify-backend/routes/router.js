const express = require('express')
const fetch = require('node-fetch');


const router = express.Router()

router.get('/users', async (req,res)=>{

    const userData = [
        {
            "id": 1,
            "name": "faye"

        }
    ]

    res.send(userData)

})

router.get('/getArtistInfo', async (req, res) => {
    
    const artistId = req.query.artist;
    console.log(process.env.CLIENT_ID)

    if (!artistId) {
        return res.status(400).json({ error: 'Missing artist parameter' });
    }

    // Get Spotify access token
    const authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET
    };


    try {
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', authParameters);
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        console.log(accessToken)

        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };

        const artistRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, searchParameters);
        const artistData = await artistRes.json();
        if (artistData && !artistData.error) {
            res.send(artistData);
        } else {
            res.status(404).json({ error: 'Artist not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
})

module.exports = router