module.exports = {
  setupRoutes: function (app, db) {
    /**
     * @note Get/Read all restaurants
     */
    app.get('/api/v1/restaurants', async (req, res) => {
      try {
        const results = await db.query('select * from restaurants');
        res.json({
          status: 'success',
          results: results.rows.length,
          data: {
            restaurants: results.rows,
          },
        });
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * @note Get/Read one restaurant
     */
    app.get('/api/v1/restaurants/:id', async (req, res) => {
      console.log(req.params);
      res.send({
        status: 'success',
        data: {
          restaurant: 'mcdonalds',
        },
      });
    });

    /**
     * @note Create a restaurant
     */
    app.post('/api/v1/restaurants', async (req, res) => {
      console.log(req.body);
      res.status(201).send({
        status: 'success',
        data: {
          restaurant: 'mcdonalds',
        },
      });
    });

    /**
     * @note Update a restaurant
     */
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

    /**
     * @note Remove/Delete a restaurant
     */
    app.delete('/api/v1/restaurants/:id', async (req, res) => {
      console.log(req.params);
      res.status(204).send({
        status: 'succes',
      });
    });
  },
};
