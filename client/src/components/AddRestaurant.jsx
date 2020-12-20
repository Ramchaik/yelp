import React from 'react';

const AddRestaurant = () => {
  return (
    <div className='mb-4'>
      <form>
        <div className='form-row'>
          <div className='col'>
            <input className='form-control' type='text' placeholder='Name' />
          </div>
          <div className='col'>
            <input
              className='form-control'
              type='text'
              placeholder='Location'
            />
          </div>
          <div className='col'>
            <select className='custom-select mr-sm-2'>
              <option disabled>Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <button className='btn btn-primary'>Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
