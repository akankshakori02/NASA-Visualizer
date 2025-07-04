const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
  res.json({
      "message": "Hello! Append '/apod', '/epic', or '/mars' to the URL to view data from the backend."
    })
  });

// Route for fetching APOD data 
app.get('/apod', async (req, res) => {
  // Optional parameter- Date, for fetching specific day's APOD image.
  const { date } = req.query;
  try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}${date?`&date=${date}`:''}`);
      res.json(response.data);
  } catch (error) {
      res.json({ error: 'Failed to fetch APOD data' })
  }
});

// Route for fetching Mars Rover data
app.get('/mars', async (req, res) => {
  try {
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.NASA_API_KEY}`;
      const response = await axios.get(url);
      res.json(response.data);
  } catch (error) {
      console.error('Error fetching Mars-rover data:', error.message);
      res.status(500).json({ error: 'Failed to fetch Mars-Rover data' });
  }
});

// Route for fetching EPIC data
app.get('/epic', async (req, res) => {
  // parameter to determine image type (natural or enhanced)
  const { type = 'natural' } = req.query;
  try {
      const url = `https://api.nasa.gov/EPIC/api/${type}?api_key=${process.env.NASA_API_KEY}`;
      const response = await axios.get(url);
      res.json(response.data);
  } catch (error) {
    console.error('Error fetching EPIC data:', error);
    res.status(500).json({ error: 'Failed to fetch EPIC data' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
