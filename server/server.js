require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is up and listening at ${PORT}`);
});
