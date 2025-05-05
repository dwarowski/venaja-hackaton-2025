import React, { useState } from 'react';
import { formatDate, formatDateTime } from '../../../global_functions/Datetime_redact';
// Импортируем необходимые интерфейсы
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
    console.log("Ты много насрал навалил как турист что банонов сожрал наконец-то я все говно откачал")
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
          {event.participants.map((participant: ComplitionParticipants) => (
                <tr key={participant.id} className="">
                  <td>{participant.name} {participant.surname}</td>
                  <td>{formatDate(participant.birthDate)}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={participant.isExisted}
                      onChange={() => handleCheckboxChange(participant.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletionModal;