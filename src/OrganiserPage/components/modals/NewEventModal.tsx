// Обновленный компонент NewEventForm в виде модального окна
import React, { useState } from 'react'; // Добавить импорт React и useState
import { Event } from '../shared/interfaces'; // Убедитесь в правильности пути
import {formatDate, formatTimeRange, TimeRange} from '../../../global_functions/Datetime_redact';
const NewEventModal: React.FC<{ 
  onCreate: (newEvent: Omit<Event, 'id' | 'participants' | 'applications'>) => void;
  onClose: () => void;
}> = ({ onCreate, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      title,
      description,
      eventDate: [new Date(startDate), new Date(endDate)],
    });
  };
  



  return (
    <div className="modal-overlay">
      <div className="event-modal" style={{ maxWidth: '800px' }}>
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="event-form-container">
          {/* Левая колонка */}
          <div className="form-left-column">
            <h3>Новое мероприятие</h3>
            <div className="form-section">
              <label>Описание</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Введите описание мероприятия"
                required
                className="description-textarea"
              />
            </div>
          </div>

          {/* Правая колонка */}
          <div className="form-right-column">
            <div className="time-section">
              <div className="form-section">
                <label>Дата и время начала</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-section">
                <label>Дата и время окончания</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="submit" className="submit-btn">
                Отправить заявку
              </button>
              <button type="button" className="cancel-btn" onClick={onClose}>
                Отменить заявку
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEventModal;