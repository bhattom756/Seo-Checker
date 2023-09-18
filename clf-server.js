const axios = require('axios');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const requestBody = JSON.parse(event.body);

  const post_array = [
    {
      "url": requestBody.url,
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

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while fetching data' }),
    };
  }
};
