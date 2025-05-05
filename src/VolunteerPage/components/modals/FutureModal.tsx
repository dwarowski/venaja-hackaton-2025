import React from 'react';
import { formatDateTime, formatDate } from '../../../global_functions/Datetime_redact';
import { EventForVolunteer } from '../shared/interfaces';

interface VolunteerEventModalProps {
    event: EventForVolunteer;
    isOpen: boolean;
    isClosing: boolean;
    onClose: () => void;
    onRequest: () => void;
    buttonState: { text: string; disabled: boolean };
}

const FutureModal: React.FC<VolunteerEventModalProps> = ({
    event,
    isOpen,
    isClosing,
    onClose,
    onRequest,
    buttonState,
}) => {
    return (
        <div
            className={`modal-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
            onClick={onClose}
        >
            <div className="modal-content volunteers-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{event.title}</h2>
                </div>
                <p><strong>Дата создания: </strong>{formatDate(event.creationDate)}</p>
                <p>
                    <strong>Дата проведения:</strong>{' '}
                    {event.eventDate
                        ? `${formatDateTime(event.eventDate[0])} - ${formatDateTime(event.eventDate[1])}`
                        : 'Время не указано'}
                </p>
                <p>
                    <strong>Описание:</strong> {event.description}
                </p>
                <div className="actions">
                    <button
                        className="request-paticipance"
                        disabled={buttonState.disabled}
                        onClick={onRequest}
                    >
                        {buttonState.text}
                    </button>
                    <button onClick={onClose}>Понял</button>
                </div>
            </div>
        </div>
    );
};

export default FutureModal;
