import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import restaurantFinder from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from './StarRating';

const RestaurantList = (props) => {
  const history = useHistory();
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

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await restaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => () =>
    history.push(`/restaurants/${id}`);

  const renderRating = ({ average_rating, count } = {}) => {
    if ((typeof count === 'number' && count === 0) || !count) {
      return <span className='text-warning'>0 reviews</span>;
    }

    return (
      <>
        <StarRating rating={average_rating} />
        <span className='text-warning ml-1'>({count})</span>
      </>
    );
  };

  const renderRestaurantList = (restaurants) => {
    return restaurants.map(
      ({ id, name, location, price_range, average_rating, count } = {}) => (
        <tr onClick={handleRestaurantSelect(id)} key={id} role='button'>
          <td>{name}</td>
          <td>{location}</td>
          <td>{'$'.repeat(price_range)}</td>
          <td>{renderRating({ average_rating, count })}</td>
          <td>
            <button
              onClick={(e) => handleUpdate(e, id)}
              className='btn btn-warning'
            >
              Update
            </button>
          </td>
          <td>
            <button
              onClick={(e) => handleDelete(e, id)}
              className='btn btn-danger'
            >
              Delete
            </button>
          </td>
        </tr>
      )
    );
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
