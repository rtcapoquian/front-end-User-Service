import React from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ value, onChange }) => {
  const handleRatingClick = (rating) => {
    if (onChange) onChange(rating);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <FaStar
          key={rating}
          size={24}
          className={`cursor-pointer ${
            value >= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => handleRatingClick(rating)}
        />
      ))}
    </div>
  );
};

export default Rating;
