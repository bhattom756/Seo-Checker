const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/check-seo', async (req, res) => {
  const post_array = [
    {
      "url": req.body.url,
      "enable_javascript": true,
      "custom_js": "meta = {}; meta.url = document.URL; meta;"
    }
  ];

  const auth = {
    username: 'ombhatt1158@gmail.com',
    password: 'aecbabe10e7c77c6', 
  };

  const apiUrl = 'https://api.dataforseo.com/v3/on_page/instant_pages';

  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
      auth: auth,
      data: post_array,
      headers: {
        'content-type': 'application/json',
      },
    });

    const result = response.data.tasks;
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
