import React, { useState } from 'react';
import './Volunteers.css';
import MyEvents from './MyEvents';
import FutureEvents from './FutureEvents';
import ClodesEvents from './ClosedEvents';
import {formatDate, formatTimeRange, TimeRange} from '../../src/global_functions/Datetime_redact';

type Tab = 'my' | 'future' | 'past';

const Volunteer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('my');


//Скрипт 
// в events нужно добавить графу описание, но в обычке оторажать только ограниченное кол-во описания. Для всех событий поля одни и теже
const events = [
  {
    title: "Конференция по веб-разработке",
    date: [new Date('2025-05-10T09:00:00'), new Date('2025-05-10T17:00:00')] as TimeRange,
    description: "Ежегодная конференция для профессионалов в области веб-разработки. Презентации, воркшопы и обсуждения новейших технологий.",
    accepted: false
  },
  {
    title: "Хакатон по искусственному интеллекту",
    date: [new Date('2025-06-05T10:00:00'), new Date('2025-06-05T22:00:00')] as TimeRange,
    description: "Марафон по разработке ИИ-решений. Призы для самых инновационных идей.",
    accepted: false
  },
  {
    title: "Семинар по кибербезопасности",
    date: [new Date('2025-07-15T08:30:00'), new Date('2025-07-15T16:30:00')] as TimeRange,
    description: "Обучение методам защиты от кибератак и управления безопасностью данных.",
    accepted: true
  },
  {
    title: "Мастер-класс по 3D-моделированию",
    date: [new Date('2025-08-01T12:00:00'), new Date('2025-08-01T18:00:00')] as TimeRange,
    description: "Интенсивный курс по созданию 3D-моделей для игры и анимации.",
    accepted: false
  },
  {
    title: "Мастер-класс по 3D-моделированию",
    date: [new Date('2025-09-10T14:00:00'), new Date('2025-09-10T19:00:00')] as TimeRange,
    description: "Семинар для разработчиков по новым подходам и инструментам в создании программного обеспечения.",
    accepted: true
  },
];


  return (
    <div className="parent">
      <div className="child buttons">
        <button
          className={`button ${activeTab === 'my' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setActiveTab('my')}
        >
          Мои события
        </button>
        <button
          className={`button ${activeTab === 'future' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setActiveTab('future')}
        >
          Будущие события
        </button>

        <button
          className={`button ${activeTab === 'past' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setActiveTab('past')}
        >
          Завершенные события
        </button>
      </div>
      <div className="child">
        <div className="EventsList">
          {activeTab === 'my' && <MyEvents events={events} />}
          {activeTab === 'future' && <FutureEvents events={events} />}
          {activeTab === 'past' && <ClodesEvents events={events} />}
        </div> 
      </div>
    </div>
  );
};

export default Volunteer;
