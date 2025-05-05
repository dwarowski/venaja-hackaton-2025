import React from 'react';
import { formatDateTime, formatDate } from '../../../global_functions/Datetime_redact';
import { Event } from '../../../global_functions/global_interfaces';

interface EventModalProps {
    event: Event;
    isOpen: boolean;
    isClosing: boolean;
    onClose: () => void;
}

const CurrentModal: React.FC<EventModalProps> = ({ event, isOpen, isClosing, onClose }) => {
    return (
        <div
            className={`modal-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
            onClick={onClose}
        >
            <div className="modal-content volunteers-modal" onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2>{event.title}</h2>
                </div>
                <p><strong>Дата создания: </strong>{formatDate(event.creationDate)}</p>
                <p><strong>Дата проведения: </strong> {formatDateTime(event.eventDate[0])} - {formatDateTime(event.eventDate[1])}</p>
                <p><strong>Описание:</strong> {event.description}</p>
                <div className='actions'>
                    <button onClick={onClose}>Понял</button>
                </div>
            </div>
        </div>
    );
};

export default CurrentModal;
