import React, { useContext, useEffect } from 'react';
import restaurantFinder from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await restaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const renderRestaurantList = (restaurants) => {
    return restaurants.map(({ id, name, location, price_range } = {}) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{location}</td>
        <td>{'$'.repeat(price_range)}</td>
        <td>reviews</td>
        <td>
          <button className='btn btn-warning'>Update</button>
        </td>
        <td>
          <button onClick={() => handleDelete(id)} className='btn btn-danger'>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Rating</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>{restaurants && renderRestaurantList(restaurants)}</tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
