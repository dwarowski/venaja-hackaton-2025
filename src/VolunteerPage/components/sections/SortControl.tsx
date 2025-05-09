import React, { useState, useRef } from 'react';

type SortDirection = 'none' | 'asc' | 'desc';

interface SortButtonProps {
  onChange: (direction: SortDirection, criterion: string) => void;
}

const sortCriteria = [
  { value: 'alphabet', label: 'По алфавиту' },
  { value: 'startDate', label: 'По первой дате' },
  { value: 'createdAt', label: 'По дате создания' },
];

const SortButton: React.FC<SortButtonProps> = ({ onChange }) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>('none');
  const [selectedCriterion, setSelectedCriterion] = useState(sortCriteria[0].value);
  const selectRef = useRef<HTMLSelectElement>(null);

  const toggleSortDirection = () => {
    const next: SortDirection =
      sortDirection === 'none' ? 'asc' : sortDirection === 'asc' ? 'desc' : 'none';

    setSortDirection(next);
    onChange(next, selectedCriterion);
  };

  const handleCriterionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCriterion(value);
    const newDirection = sortDirection === 'none' ? 'asc' : sortDirection;
    setSortDirection(newDirection);
    onChange(newDirection, value);
  };
  

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      toggleSortDirection();
    }
  };

  const getIcon = () => {
    if (sortDirection === 'asc') return <img src="/chevron-up.svg" alt="asc" className="sort-icon" />;
    if (sortDirection === 'desc') return <img src="/chevron-down.svg" alt="desc" className="sort-icon" />;
    return <img src="/x.svg" alt="none" className="sort-icon" />;
  };


  return (
    <div
      className={`tab-button sort-button-wrapper ${sortDirection === 'none' ? 'button-inactive' : 'button-active'}`}
      onClick={handleClick}
      role="button"
      aria-pressed={sortDirection !== 'none'}
    >
      <select
        className='sort-select'
        ref={selectRef}
        value={selectedCriterion}
        onChange={handleCriterionChange}
        onClick={(e) => e.stopPropagation()}
      >
        {sortCriteria.map((criterion) => (
          <option key={criterion.value} value={criterion.value}>
            {criterion.label}
          </option>
        ))}
      </select>
      <div>{getIcon()}</div>
    </div>
  );
};

export default SortButton;
