import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import restaurantFinder from '../apis/restaurantFinder';

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const setRestaurant = (restaurant) => {
    setName(restaurant.name);
    setLocation(restaurant.location);
    setPriceRange(restaurant.price_range);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantFinder.get(`/${id}`);
        const restaurant = response.data.data.restaurant;

        setRestaurant(restaurant);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await restaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });

      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='form-control'
            type='text'
          />
        </div>
        <div className='form-group'>
          <label>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='form-control'
            type='text'
          />
        </div>
        <div className='form-group'>
          <label>PriceRange</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className='custom-select mr-sm-2'
          >
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$</option>
          </select>
        </div>
        <button
          className='btn btn-primary'
          type='submit'
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
