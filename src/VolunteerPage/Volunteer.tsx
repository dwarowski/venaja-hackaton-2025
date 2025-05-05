import React, { useState, useRef} from 'react';
import './Volunteers.css';
import MyEvents from './components/sections/MyEvents';
import FutureEvents from './components/sections/FutureEvents';
import ClodesEvents from './components/sections/ClosedEvents';
import { EventForVolunteer } from './components/shared/interfaces';
import {TimeRange} from '../global_functions/Datetime_redact';
import { useButton } from '../global_functions/Button_hook';
import SortButton from './components/sections/SortControl';

const Volunteer: React.FC = () => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const { scrollLeft, scrollRight } = useButton();
  const [activeTab, setTab] = useState<'my' | 'future' | 'past'>('my');
  const [sortCriterion, setSortCriterion] = useState<string>('none');
  const [sortDirection, setSortDirection] = useState<'none' | 'asc' | 'desc'>('none');

const onSortChange = (direction: 'none' | 'asc' | 'desc', criterion: string) => {
  setSortDirection(direction);
  setSortCriterion(criterion);
};

  const events = [
    {
      id: 1,
      title: "Конференция по веб-разработке",
      eventDate: [new Date('2025-05-10T09:00:00'), new Date('2025-05-10T17:00:00')] as TimeRange,
      description: "Ежегодная конференция для профессионалов в области веб-разработки. Презентации, воркшопы и обсуждения новейших технологий.",
      accepted: false,
      creationDate: new Date('2025-03-01T12:00:00')
    },
    {
      id: 2,
      title: "Хакатон по искусственному интеллекту",
      eventDate: [new Date('2025-06-05T10:00:00'), new Date('2025-06-05T22:00:00')] as TimeRange,
      description: "Марафон по разработке ИИ-решений. Призы для самых инновационных идей.",
      accepted: false,
      creationDate: new Date('2025-03-10T09:30:00')
    },
    {
      id: 3,
      title: "Семинар по кибербезопасности",
      eventDate: [new Date('2025-07-15T08:30:00'), new Date('2025-07-15T16:30:00')] as TimeRange,
      description: "Обучение методам защиты от кибератак и управления безопасностью данных.",
      accepted: true,
      creationDate: new Date('2025-03-15T10:15:00')
    },
    {
      id: 4,
      title: "Мастер-класс по 3D-моделированию",
      eventDate: [new Date('2025-08-01T12:00:00'), new Date('2025-08-01T18:00:00')] as TimeRange,
      description: "Интенсивный курс по созданию 3D-моделей для игры и анимации.",
      accepted: false,
      creationDate: new Date('2025-03-20T14:45:00')
    },
    {
      id: 5,
      title: "Мастер-класс по 3D-моделированию",
      eventDate: [new Date('2025-09-10T14:00:00'), new Date('2025-09-10T19:00:00')] as TimeRange,
      description: "Семинар для разработчиков по новым подходам и инструментам в создании программного обеспечения.",
      accepted: true,
      creationDate: new Date('2025-03-22T15:00:00')
    },
    {
      id: 6,
      title: "Мастер-класс по 3D-моделированию",
      eventDate: [new Date('2025-09-10T14:00:00'), new Date('2025-09-10T19:00:00')] as TimeRange,
      description: "Семинар для разработчиков по новым подходам и инструментам в создании программного обеспечения.",
      accepted: true,
      creationDate: new Date('2025-03-25T16:30:00')
    },
    {
      id: 7,
      title: "Мастер-класс по 3D-моделированию",
      eventDate: [new Date('2025-09-10T14:00:00'), new Date('2025-09-10T19:00:00')] as TimeRange,
      description: "Семинар для разработчиков по новым подходам и инструментам в создании программного обеспечения.",
      accepted: true,
      creationDate: new Date('2025-03-27T17:00:00')
    },
    {
      id: 8,
      title: "Мастер-класс по 3D-моделированию",
      eventDate: [new Date('2025-09-10T14:00:00'), new Date('2025-09-10T19:00:00')] as TimeRange,
      description: "Семинар для разработчиков по новым подходам и инструментам в создании программного обеспечения.",
      accepted: true,
      creationDate: new Date('2025-03-30T18:00:00')
    },
    {
      id: 9,
      title: "Мастер-класс по 3D-моделированию",
      eventDate: [new Date('2025-09-10T14:00:00'), new Date('2025-09-10T19:00:00')] as TimeRange,
      description: "Семинар для разработчиков по новым подходам и инструментам в создании программного обеспечения.",
      accepted: true,
      creationDate: new Date('2025-04-02T19:30:00')
    },
    {
      id: 10,
      title: "Мастер-класс по 3D-моделированию",
      eventDate: [new Date('2025-09-10T14:00:00'), new Date('2025-09-10T19:00:00')] as TimeRange,
      description: "Семинар для разработчиков по новым подходам и инструментам в создании программного обеспечения.",
      accepted: true,
      creationDate: new Date('2025-04-05T20:15:00')
    }
  ] as EventForVolunteer[];
  
  const sortEvents = (events: EventForVolunteer[]): EventForVolunteer[] => {
    if (sortDirection === 'none' || sortCriterion === 'none') return events;
  
    const sorted = [...events].sort((a, b) => {
      let aValue: string | number = '';
      let bValue: string | number = '';
  
      switch (sortCriterion) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'eventDate':
          aValue = a.eventDate[0].getTime();
          bValue = b.eventDate[0].getTime();
          break;
        case 'creationDate':
          aValue = a.creationDate.getTime();
          bValue = b.creationDate.getTime();
          break;
        default:
          return 0;
      }
  
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  
    return sorted;
  };

  return (
    <div className="parent">
      <div className="tabs-row">
      <button className="scroll-button left" onClick={() => scrollLeft(tabsRef)}>←</button>

      <div className='tabs-container' ref={tabsRef}>
        <button
          className={`tab-button ${activeTab === 'my' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setTab('my')}
        >
          Мои события
        </button>
        <button
          className={`tab-button ${activeTab === 'future' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setTab('future')}
        >
          Будущие события
        </button>
        <button
          className={`tab-button ${activeTab === 'past' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setTab('past')}
        >
          Завершенные события
        </button>
        
        {/* Компонент сортировки справа от вкладок */}
        <div className="sort-panel">
          <SortButton onChange={onSortChange} />
        </div>
      </div>
    <button className="scroll-button right" onClick={() => scrollRight(tabsRef)}>→</button>
  </div>
    <div className="child">
      <div className="EventsList">
        {activeTab === 'my' && <MyEvents events={sortEvents(events)} />}
        {activeTab === 'future' && <FutureEvents events={events} />}
        {activeTab === 'past' && <ClodesEvents events={events} />}
      </div> 
      </div>
    </div>
  );
};

export default Volunteer;
