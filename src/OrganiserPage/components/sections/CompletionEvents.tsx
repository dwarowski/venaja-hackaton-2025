import CompletionModal from '../modals/CompletionModal';
import { formatDateTime } from '../../../global_functions/Datetime_redact'; 
import { CompletionEvent } from '../shared/interfaces'; // Импорт интерфейсо
import { useModal } from '../../../global_functions/Modal_window';
const CompletionEvents: React.FC<{ 
  events: CompletionEvent[];
  onComplete: (id: number) => void;
}> = ({ events, onComplete }) => {
  const { isModalOpen, isClosing, selectedEvent, openModal, closeModal } = useModal();
  const EventComplition = selectedEvent?.event as CompletionEvent | null;

  return (
    <div>
      <ul className="events-list">
        {events.map((event) => {
            return (
                <li key={event.id} onClick={() => openModal(event, event.id)}>
                    <div className="event-item">
                        <div className="event-content">
                            <div className="event-box">
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
                            <div className="button-container">
                                <button
                                    className="request-paticipance volunteer__future-events_button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                  Завершить
                                </button>
                            </div>
                        </div>
                    </div>

                </li>
            );
        })}
      </ul>
      {isModalOpen && EventComplition !== null && (
        <div className={`modal-overlay ${isModalOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
          <CompletionModal
            event={EventComplition}
            onClose={closeModal}
            onConfirm={(attendances) => {
              onComplete(EventComplition.id);
            }}/>
        </div>
      )}
    </div>
  );
};
export default CompletionEvents;