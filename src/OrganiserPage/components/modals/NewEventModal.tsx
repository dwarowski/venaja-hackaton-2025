import React, { useState, useEffect } from 'react';
import { EventForOrganiser } from '../shared/interfaces';

const NewEventModal: React.FC<{ 
  onCreate: (newEvent: Omit<EventForOrganiser, 'id' | 'participants' | 'applications'>) => void;
  onClose: () => void;
}> = ({ onCreate, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const [title] = useState('');
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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true);
    }
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, 300); // дождаться завершения анимации
      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  return (
    <div 
      className={`modal-overlay ${isClosing ? 'closed' : 'open'}`} 
      onClick={handleOverlayClick}
    >

      <div className="modal-content newevent-modal">
        <div className="modal-header">
          <h2>Новое мероприятие</h2>
        </div>
        <form onSubmit={handleSubmit} className="event-form-container">
          <div className='event-columns'>
            <div className="form-left-column">
              <div className="form-section">
                <label>Название</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Введите название мероприятия"
                  required
                  className="input-textarea"
                />
              </div>
              <div className="form-section">
                <label>Описание</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Введите описание мероприятия"
                  required
                  className="input-textarea"
                />
              </div>
            </div>

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
            </div>
          </div>
          <div className="actions">
              <button type="submit" className="button-active">
                Создать
              </button>
              <button type="button" className="button-active" onClick={() => setIsClosing(true)}>
                Отмена
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default NewEventModal;
