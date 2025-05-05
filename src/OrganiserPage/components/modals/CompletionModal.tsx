import React, { useState } from 'react';
import { formatDate, formatDateTime } from '../../../global_functions/Datetime_redact';
import { CompletionEvent, ComplitionParticipants } from '../shared/interfaces';

interface CompletionModalProps {
  event: CompletionEvent;
  participants: ComplitionParticipants[];
  onClose: () => void;
  onConfirm: (participants: ComplitionParticipants[]) => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ 
  event, 
  participants, 
  onClose, 
  onConfirm 
}) => {
  const handleCheckboxChange = (id: number) => {
    const updated = participants.map(p =>
      p.id === id ? { ...p, isExisted: !p.isExisted } : p
    );
    onConfirm(updated);
  };
  

  return (
    <div className="modal-content complitionevent-modal"
    onClick={(e) => e.stopPropagation()}>
      <div className='modal-header'>
        <h2>{event.title}</h2>
      </div>
      <p><strong>Дата:</strong> {formatDateTime(event.eventDate[0])} - {formatDateTime(event.eventDate[1])}</p>
      <div className='scrollable-table-container members'>
        <table className='completion-table'>
          <thead>
            <tr>
              <th>Участник</th>
              <th>Дата рождения</th>
              <th>Присутствие</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant: ComplitionParticipants) => (
              <tr key={participant.id}>
                <td>{participant.name} {participant.surname}</td>
                <td>{formatDate(participant.birthDate)}</td>
                <td className="checkbox-cell">
                  <label className="custom-checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={participant.isExisted}
                      onChange={() => handleCheckboxChange(participant.id)}
                    />
                    <span className="custom-checkbox" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="actions">
        <button type="submit" className="button-active">
          Подтверждение
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;