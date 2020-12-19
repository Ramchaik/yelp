require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const db = require('./db');
const { setupRoutes } = require('./routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

setupRoutes(app, db);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is up and listening at ${PORT}`);
});
