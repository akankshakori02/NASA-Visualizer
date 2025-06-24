const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/api/apod', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching APOD data', error: error.toString() });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
