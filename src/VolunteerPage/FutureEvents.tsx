import React, { useState } from 'react';
import { TimeRange, formatDate, formatDateTime } from '../global_functions/Datetime_redact';
import { EventForVolunteer } from './Volunteer';
import { useModal } from '../global_functions/Modal_window';

interface EventsProps {
  events: EventForVolunteer[];
}

const FutureEvents: React.FC<EventsProps> = ({ events }) => {
    const { isModalOpen, isClosing, selectedEvent, openModal, closeModal } = useModal();
    const [requestedEvents, setRequestedEvents] = useState<number[]>([]);

    const handleRequest = (index: number) => {
        if (!requestedEvents.includes(index)) {
            setRequestedEvents((prev) => [...prev, index]);
        }
    };

    // Вспомогательная функция для получения текста и состояния кнопки
    const getButtonState = (index: number) => {
        const event = events[index];
        const isAccepted = event.accepted;
        const hasRequested = requestedEvents.includes(index);
        let text = 'Подать заявку';

        if (isAccepted) text = 'Прянято';
        else if (hasRequested) text = 'На рассмотрении';

        return {
            text,
            disabled: Boolean(isAccepted || hasRequested),
        };
    };

    return (
        <div>
            <ul className="events-list">
                {events.map((event, index) => {
                    const { text, disabled } = getButtonState(index);

                    return (
                        <li key={index} onClick={() => openModal(event, index)}>
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
                                                handleRequest(index);
                                            }}
                                        >
                                            {text}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </li>
                    );
                })}
            </ul>
            {isModalOpen && selectedEvent !== null && (
            <div
                className={`modal-overlay ${isModalOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
                onClick={closeModal}
            >
                <div className="modal-content volunteers-modal" onClick={(e) => e.stopPropagation()}>
                    <h1><strong>Название:</strong> {selectedEvent.event.title}</h1>
                    <p><strong>Дата:</strong> {selectedEvent.event.eventDate ? `${formatDateTime(selectedEvent.event.eventDate[0])} - ${formatDateTime(selectedEvent.event.eventDate[1])}` : 'Время не указано'}</p>
                    <p><strong>Описание:</strong> {selectedEvent.event.description}</p>

                    {/* Кнопка заявки в модалке */}
                    {(() => {
                        const selectedEventIndex = events.findIndex(event => event.id === selectedEvent.event.id);
                        const { text, disabled } = getButtonState(selectedEventIndex);
                        return (
                            <button
                                className="request-paticipance"
                                disabled={disabled}
                                onClick={() => handleRequest(selectedEventIndex)}
                            >
                                {text}
                            </button>
                        );
                    })()}

                    <button onClick={closeModal} style={{ marginLeft: '10px' }}>Понял</button>
                </div>
            </div>
            )}   
        </div>
    );
};

export default FutureEvents;
