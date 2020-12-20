require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const { setupRoutes } = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

setupRoutes(app, db);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is up and listening at ${PORT}`);
});
