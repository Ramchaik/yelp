import React from 'react';

const StarRating = ({ rating }) => {
  const getStars = (stars, star) => {
    if (star <= rating) {
      stars = [...stars, <i className='fas fa-star'></i>];
    } else if (star === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars = [...stars, <i className='fas fa-star-half-alt'></i>];
    } else {
      stars = [...stars, <i className='far fa-star'></i>];
    }
    return stars;
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1).reduce(getStars, []);

  return <>{stars}</>;
};

export default StarRating;
