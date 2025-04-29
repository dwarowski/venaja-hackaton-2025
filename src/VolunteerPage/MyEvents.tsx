import { formatDateTime } from '../global_functions/Datetime_redact';
import { useModal } from '../global_functions/Modal_window';
import { EventForVolunteer } from './Volunteer';

interface EventsProps {
  events: EventForVolunteer[];
}


const MyEvents: React.FC<EventsProps> = ({ events }) => {
  const { isModalOpen, isClosing, selectedEvent, openModal, closeModal } = useModal();
  console.log('События в MyEvents:', events);

  return (
    <div>
      <ul className="events-list">
        {events.map((event, index) => (
          <li key={index} onClick={() => openModal(event, index)}>
            <div className="event-item">
              <div className='events_el_title-box'>
                  <p className='events_el_title-box_name'>{event.title}</p>
                  <div className='events_el_title-box_time'>
                      <div className='events_el_title-box_time-block'>
                          <p className=''>{formatDateTime(event.eventDate[0])}</p>
                          <p className=''>{formatDateTime(event.eventDate[1])}</p>
                      </div>
                  </div>
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
          <div className="modal-content volunteers-modal" onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2>{selectedEvent.event.title}</h2>
            </div>
            <p><strong>Дата:</strong> {formatDateTime(selectedEvent.event.eventDate[0])} - {formatDateTime(selectedEvent.event.eventDate[1])}</p>
            <p><strong>Описание:</strong> {selectedEvent.event.description}</p>
            <div className='actions'>
              <button onClick={closeModal}>Понял</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
