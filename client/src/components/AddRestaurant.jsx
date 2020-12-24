import React, { useContext, useState } from 'react';
import restaurantFinder from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');

  const resetFields = () => {
    setName('');
    setLocation('');
    setPriceRange('Price Range');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await restaurantFinder.post('/', {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
      resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mb-4'>
      <form onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='col'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-control'
              type='text'
              placeholder='Name'
            />
          </div>
          <div className='col'>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='form-control'
              type='text'
              placeholder='Location'
            />
          </div>
          <div className='col'>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className='custom-select mr-sm-2'
            >
              <option disabled>Price Range</option>
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
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
