// components/VolunteerEventModal.tsx
import React from 'react';
import { TimeRange, formatDateTime } from '../../../global_functions/Datetime_redact';
import { EventForVolunteer} from '../shared/interfaces';

interface VolunteerEventModalProps {
  isOpen: boolean;
  isClosing: boolean;
  event: EventForVolunteer | null;
  onClose: () => void;
  calculateTimeDifference: (timeRange: TimeRange) => number;
}

const CloseModal: React.FC<VolunteerEventModalProps> = ({
  isOpen,
  isClosing,
  event,
  onClose,
  calculateTimeDifference,
}) => {
  if (!isOpen || !event) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
      onClick={onClose}
    >
      <div className="modal-content volunteers-modal" onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2>{event.title}</h2>
        </div>
        <p><strong>Дата:</strong> {formatDateTime(event.eventDate[0])} - {formatDateTime(event.eventDate[1])}</p>
        <p><strong>Описание:</strong> {event.description}</p>
        {event.accepted ? (
          <p><strong>Статус:</strong> {calculateTimeDifference(event.eventDate)} часов</p>
        ) : (
          <p><strong>Статус:</strong> Отсутствовал</p>
        )}

        <div className='actions'>
          <button onClick={onClose}>Понял</button>
        </div>
      </div>
    </div>
  );
};

export default CloseModal;
