require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/v1/restaurants', async (req, res) => {
  res.json({
    status: 'success',
    data: {
      restaurant: ['mcdonalds', 'wendys'],
    },
  });
});

app.get('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params);
  res.send({
    status: 'success',
    data: {
      restaurant: 'mcdonalds',
    },
  });
});

app.post('/api/v1/restaurants', async (req, res) => {
  console.log(req.body);
  res.statusCode(201).send({
    status: 'success',
    data: {
      restaurant: 'mcdonalds',
    },
  });
});

app.put('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.send({
    status: 'success',
    data: {
      restaurant: 'mcdonalds',
    },
  });
});

app.delete('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params);
  res.statusCode(204).send({
    status: 'succes',
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is up and listening at ${PORT}`);
});