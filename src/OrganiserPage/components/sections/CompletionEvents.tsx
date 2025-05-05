import { useState } from 'react';
import CompletionModal from '../modals/CompletionModal';
import { formatDateTime } from '../../../global_functions/Datetime_redact'; 
import { CompletionEvent, ComplitionParticipants} from '../shared/interfaces'; // Импорт интерфейсо
import { useModal } from '../../../global_functions/Modal_window';

const useCompletionModal = () => {
  const modal = useModal();
  const [participants, setParticipants] = useState<ComplitionParticipants[]>([]);

  const openCompletionModal = (event: CompletionEvent, index: number) => {
    // Вызываем оригинальный openModal
    modal.openModal(event, index);
    
    // Добавляем свою логику инициализации
    setParticipants(
      event.participants.map(p => ({
        ...p,
        isExisted: p.isExisted !== undefined ? p.isExisted : true
      }))
    );
  };

  return {
    ...modal,
    participants,
    setParticipants,
    openModal: openCompletionModal // Переопределяем openModal
  };
};

const CompletionEvents: React.FC<{ 
  events: CompletionEvent[];
  onComplete: (eventId: number, updatedParticipants: ComplitionParticipants[]) => void;
}> = ({ events, onComplete }) => {
  const {
    isModalOpen,
    isClosing,
    selectedEvent,
    participants,
    setParticipants,
    openModal,
    closeModal
  } = useCompletionModal();

  const handleComplete = (eventId: number) => {
    onComplete(eventId, participants);
    closeModal();
  };


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
      {isModalOpen &&  selectedEvent?.event && (
        <div className={`modal-overlay ${isModalOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
          <CompletionModal
            event={selectedEvent.event as CompletionEvent}
            participants = {participants}
            onClose={closeModal}
            onConfirm={setParticipants}/>
        </div>
      )}
    </div>
  );
};
export default CompletionEvents;