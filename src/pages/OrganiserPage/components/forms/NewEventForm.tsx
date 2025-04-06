// components/forms/NewEventForm.tsx
import React, { useState } from 'react';
import { Event } from '../shared/interfaces';

interface Props {
  onCreate: (newEvent: Omit<Event, 'id' | 'participants' | 'applications'>) => void;
  onCancel: () => void;
}

const NewEventForm: React.FC<{ 
  onCreate: (newEvent: Omit<Event, 'id' | 'participants' | 'applications'>) => void;
  onCancel: () => void;
}> = ({ onCreate, onCancel }) => {
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      description,
      time: `${startDate} - ${endDate}`,
      startDate,
      endDate,
    });
  };

  return (
    <div className="new-event-form">
      <h2>Новое мероприятие</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Описание:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Дата и время начала:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Дата и время окончания:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Отправить заявку
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEventForm;