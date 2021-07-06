require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); 

// PARSE application/json
app.use(
    bodyParser.json({
      limit: '49mb',
    })
  );

// CORS SETTINGS
app.use(cors());

// DB Connection
require('./dbConnection');

app.use('/', require('./app/routes'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`app is running at ${port}`);
});