require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GitHub stats endpoint
app.get('/api/github-stats', async (req, res) => {
    try {
        const username = process.env.GITHUB_USERNAME || 'octocat';
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const data = response.data;
        res.json({
            followers: data.followers,
            public_repos: data.public_repos,
            following: data.following
        });
    } catch (error) {
        console.error('Error fetching GitHub stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch GitHub stats' });
    }
});

// YouTube stats endpoint
app.get('/api/youtube-stats', async (req, res) => {
    try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        const channelId = process.env.YOUTUBE_CHANNEL_ID;
        
        if (!apiKey || !channelId) {
            return res.status(400).json({ error: 'YouTube API credentials missing' });
        }

        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`);
        const items = response.data.items;
        
        if (items && items.length > 0) {
            const stats = items[0].statistics;
            res.json({
                subscriberCount: stats.subscriberCount,
                viewCount: stats.viewCount,
                videoCount: stats.videoCount
            });
        } else {
            res.status(404).json({ error: 'Channel not found' });
        }
    } catch (error) {
        console.error('Error fetching YouTube stats:', error.message);
        res.status(500).json({ error: 'Failed to fetch YouTube stats' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
