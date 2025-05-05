import React, { useState } from 'react';

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

  const toggleSortDirection = () => {
    const nextDirection: SortDirection =
      sortDirection === 'none' ? 'asc' : sortDirection === 'asc' ? 'desc' : 'none';

    setSortDirection(nextDirection);
    onChange(nextDirection, selectedCriterion);
  };

  const handleCriterionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCriterion(value);
    onChange(sortDirection, value);
  };

  const getIcon = () => {
    if (sortDirection === 'asc') return <img src="/icons/arrow-up.svg" alt="asc" className="sort-icon" />;
    if (sortDirection === 'desc') return <img src="/icons/arrow-down.svg" alt="desc" className="sort-icon" />;
    return null;
  };

  return (
    <div className="tab-button">
      <select className="sort-select" value={selectedCriterion} onChange={handleCriterionChange}>
        {sortCriteria.map((criterion) => (
          <option key={criterion.value} value={criterion.value}>
            {criterion.label}
          </option>
        ))}
      </select>

      <button
        className={`sort-toggle-button ${sortDirection !== 'none' ? 'active' : ''}`}
        onClick={toggleSortDirection}
      >
        Сортировка {getIcon()}
      </button>
    </div>
  );
};

export default SortButton;
