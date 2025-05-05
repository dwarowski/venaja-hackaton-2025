import React, { useState } from 'react';
import { formatDateTime, formatDate } from '../../../global_functions/Datetime_redact';
import { EventForVolunteer, EventsProps } from '../shared/interfaces';
import { useModal } from '../../../global_functions/Modal_window';
import FutureModal from '../modals/FutureModal';

const FutureEvents: React.FC<EventsProps> = ({ events }) => {
    const { isModalOpen, isClosing, selectedEvent, openModal, closeModal } = useModal();
    const [requestedEvents, setRequestedEvents] = useState<number[]>([]);

    const handleRequest = (index: number) => {
        if (!requestedEvents.includes(index)) {
            setRequestedEvents((prev) => [...prev, index]);
        }
    };

    const getButtonState = (index: number) => {
        const event = events[index];
        const isAccepted = event.accepted;
        const hasRequested = requestedEvents.includes(index);
        let text = 'Подать заявку';

        if (isAccepted) text = 'Принято';
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
                                                    <p>{formatDateTime(event.eventDate[0])}</p>
                                                    <p>{formatDateTime(event.eventDate[1])}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='event-description'>{event.description}</p>
                                        <p className='additional-data'>
                                            <span>
                                                Дата создания: {formatDate(event.creationDate)}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="button-container">
                                        <button
                                            className="request-paticipance volunteer__future-events_button"
                                            disabled={disabled}
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
                <FutureModal
                    event={selectedEvent.event as EventForVolunteer}
                    isOpen={isModalOpen}
                    isClosing={isClosing}
                    onClose={closeModal}
                    onRequest={() => handleRequest(selectedEvent.index)}
                    buttonState={getButtonState(selectedEvent.index)}
                />
            )}
        </div>
    );
};

export default FutureEvents;
