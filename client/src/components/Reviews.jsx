import React from 'react';
import StarRating from './StarRating';

const Reviews = ({ reviews }) => {
  const reviewCards = reviews.map((review) => {
    return (
      <div
        className='card text-white bg-primary mb-3 mr-4'
        style={{ maxWidth: '30%' }}
        key={review.id}
      >
        <div className='card-header d-flex justify-content-between'>
          <span>{review.name}</span>
          <span>
            <StarRating rating={review.rating} />
          </span>
        </div>
        <div className='card-body'>
          <p className='card-text'>{review.review}</p>
        </div>
      </div>
    );
  });

  return <div className='row row-cols-3 mb-2'>{reviewCards}</div>;
};

export default Reviews;
