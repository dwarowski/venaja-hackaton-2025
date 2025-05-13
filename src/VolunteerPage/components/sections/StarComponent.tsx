import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  onChange?: (rating: number) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({
  rating: initialRating = 0,
  maxRating = 5,
  onChange,
  disabled = false,
  size = 'medium',
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (value: number) => {
    if (disabled) return;
    setRating(value);
    onChange?.(value);
  };

  const getSize = () => {
    switch (size) {
      case 'small': return 20;
      case 'large': return 32;
      default: return 24;
    }
  };

  return (
    <StarContainer>
      {[...Array(maxRating)].map((_, index) => {
        const value = index + 1;
        const isFilled = value <= (hover || rating);
        
        return (
          <StarButton
            key={index}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => !disabled && setHover(value)}
            onMouseLeave={() => !disabled && setHover(null)}
            disabled={disabled}
          >
            <StarIcon 
              width={getSize()}
              height={getSize()}
              viewBox="0 0 24 24"
              fill={isFilled ? "#ffb400" : "#ccc"}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </StarIcon>
          </StarButton>
        );
      })}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  padding: 0;
  margin: 0 2px;
`;

const StarIcon = styled.svg`
  transition: fill 0.2s;
`;

export default StarRating;