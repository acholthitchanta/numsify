const express = require('express')
const fetch = require('node-fetch');

const router = express.Router()


router.get('/yeah', async (req,res)=>{
    console.log("/yeah route hit");

    const userData = [
        {
            "poop": "y",
            "yeah": "ok"

        }
    ]

    res.send(userData)

})


router.get('/getArtistInfo', async (req, res) => {
    
    const artistId = req.query.artist;

    if (!artistId) {
        return res.status(400).json({ error: 'Missing artist parameter' });
    }

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


router.get('/getArtistAlbums', async (req, res) => {
    
    const artistId = req.query.artist;

    if (!artistId) {
        return res.status(400).json({ error: 'Missing artist parameter' });
    }

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

        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };

        const artistRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums `, searchParameters);
        const artistData = await artistRes.json();
        if (artistData && !artistData.error) {
            res.send(artistData);
        } else {
            res.status(404).json({ error: 'Artists not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
})




router.get('/getArtistTracks', async (req, res) => {
    
    const artistId = req.query.artist;

    if (!artistId) {
        return res.status(400).json({ error: 'Missing artist parameter' });
    }

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

        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };

        const artistRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, searchParameters);
        const artistData = await artistRes.json();
        if (artistData && !artistData.error) {
            res.send(artistData);
        } else {
            res.status(404).json({ error: 'Artists not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
})



module.exports = router