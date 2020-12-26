module.exports = {
  setupRoutes: function (app, db) {
    /**
     * @note Get/Read all restaurants
     */
    app.get('/api/v1/restaurants', async (req, res) => {
      const text =
        'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id';

      try {
        const results = await db.query(text);
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
      const { id } = req.params;
      const restaurantQueryText =
        'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1';
      const reviewsQueryText = 'SELECT * FROM reviews WHERE restaurant_id = $1';
      const values = [id];

      try {
        const restaurant = await db.query(restaurantQueryText, values);
        const reviews = await db.query(reviewsQueryText, values);

        res.send({
          status: 'success',
          data: {
            restaurant: restaurant.rows[0],
            reviews: reviews.rows,
          },
        });
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * @note Create a restaurant
     */
    app.post('/api/v1/restaurants', async (req, res) => {
      const { name, location, price_range } = req.body;
      const text =
        'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *';
      const values = [name, location, price_range];

      try {
        const results = await db.query(text, values);

        res.status(201).send({
          status: 'success',
          data: {
            restaurant: results.rows[0],
          },
        });
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * @note Update a restaurant
     */
    app.put('/api/v1/restaurants/:id', async (req, res) => {
      const { id } = req.params;
      const { name, location, price_range } = req.body;
      const text =
        'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *';
      const values = [name, location, price_range, id];

      try {
        const results = await db.query(text, values);

        res.send({
          status: 'success',
          data: {
            restaurant: results.rows[0],
          },
        });
      } catch (error) {
        console.error(error);
      }
    });

    /**
     * @note Remove/Delete a restaurant
     */
    app.delete('/api/v1/restaurants/:id', async (req, res) => {
      const { id } = req.params;
      const text = 'DELETE FROM restaurants WHERE id = $1';
      const values = [id];

      try {
        const results = await db.query(text, values);

        res.status(204).send({
          status: 'succes',
        });
      } catch (error) {
        console.error(error);
      }
    });

    app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
      const { id } = req.params;
      const { name, review, rating } = req.body;
      const text =
        'INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [id, name, review, rating];

      try {
        const newReview = await db.query(text, values);
        res.status(201).json({
          status: 'success',
          data: {
            review: newReview.rows[0],
          },
        });
      } catch (error) {
        console.error(error);
      }
    });
  },
};
