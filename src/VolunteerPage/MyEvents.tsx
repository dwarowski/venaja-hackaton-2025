import React, { useState } from 'react';
import { TimeRange, formatDate, formatTimeRange } from './Volunteer';


interface Event {
  title: string;
  date: TimeRange;
  description: string;
  accepted: Boolean;
}

interface EventsProps {
  events: Event[];
}


const FutureEvents: React.FC<EventsProps> = ({ events }) => {
  // Состояние для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);  // Состояние для анимации исчезновения
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Функция для открытия модального окна
  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setIsClosing(false);
     // Если окно открылось, сбрасываем анимацию закрытия
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsClosing(true);
    // Устанавливаем задержку для удаления после завершения анимации
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedEvent(null);
    }, 300); // 300ms - это время анимации исчезновения
  };

  return (
    <div>
      <ul className="events-list">
        {events.map((event, index) => (
          <li key={index} onClick={() => openModal(event)}>
            <div className="event-item">
              <div className='main-info'>
                <h1>{event.title}</h1>
                <p>{formatDate(event.date[0])}</p>
                <p>{formatTimeRange(event.date)}</p>
              </div>
              <p className='event-description'>{event.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Модальное окно */}
      {isModalOpen && selectedEvent && (
        <div
          className={`modal-overlay ${isModalOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1><strong>Название:</strong> {selectedEvent.title}</h1>
            <p><strong>Дата:</strong> {formatDate(selectedEvent.date[0])}</p>
            <p><strong>Время:</strong> {formatTimeRange(selectedEvent.date)}</p>
            <p><strong>Описание:</strong> {selectedEvent.description}</p>
            <button onClick={closeModal}>Понял</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureEvents;
