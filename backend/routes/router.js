const express = require('express')
const fetch = require('node-fetch');

const router = express.Router()



router.get('/searchArtists', async (req, res) => {
    
    const query = req.query.query;

    if (!query) {
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

        const artistRes = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&offset=0&limit=10&numberOfTopResults=5`, searchParameters);
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


router.get('/searchArtist', async (req, res) => {
    
    const query = req.query.query;

    if (!query) {
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

        const artistRes = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&offset=0&limit=1&numberOfTopResults=1`, searchParameters);
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


router.get('/searchAlbums', async (req, res) => {
    
    const query = req.query.query;

    if (!query) {
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

        const artistRes = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=album&offset=0`, searchParameters);
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



router.get('/searchTracks', async (req, res) => {
    
    const query = req.query.query;

    if (!query) {
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

        const trackRes = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&offset=0&limit=10&numberOfTopResults=5`, searchParameters);
        const trackData = await trackRes.json();
        if (trackData && !trackData.error) {
            res.send(trackData);
        } else {
            res.status(404).json({ error: 'Artists not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
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

router.get("/getRelatedArtists", async (req,res) => {

    const artist = req.query.artist;

    try{
        if (!artist) {
            return res.status(400).json({ error: 'Missing artist parameter' });
        }

        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=${process.env.LASTFM_KEY}&format=json&limit=7`)
        const data = await response.json();
        console.log(data)
            if (data && !data.error){
                res.send(data)
            }
            else{
                res.status(404).json({error: 'Artists not found'});
            }
    }
    catch (err){
        res.status(500).json({error: 'Server error', details: err.message})
    }

})

router.get("/getLastfmArtist", async (req,res) => {

    const mbid = req.query.mbid;

    try{
        if (!mbid) {
            return res.status(400).json({ error: 'Missing artist parameter' });
        }

        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${mbid}&api_key=${process.env.LASTFM_KEY}&format=json`)
        const data = await response.json();
        console.log(data)
            if (data && !data.error){
                res.send(data)
            }
            else{
                res.status(404).json({error: 'Artists not found'});
            }
    }
    catch (err){
        res.status(500).json({error: 'Server error', details: err.message})
    }

})


router.get("/getArtistTags", async (req,res) => {

    const name = req.query.name;

    try{
        if (!name) {
            return res.status(400).json({ error: 'Missing artist parameter' });
        }

        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${name}&api_key=${process.env.LASTFM_KEY}&format=json`)
        const data = await response.json();
        console.log(data)
            if (data && !data.error){
                res.send(data)
            }
            else{
                res.status(404).json({error: 'Artists not found'});
            }
    }
    catch (err){
        res.status(500).json({error: 'Server error', details: err.message})
    }

})


module.exports = router