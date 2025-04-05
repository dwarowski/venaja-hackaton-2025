import React, { useState } from 'react';
import MyEvents from './MyEvents';
import FutureEvents from './FutureEvents';

type Tab = 'my' | 'future';

const Volunteer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('my');

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'my' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('my')}
        >
          Мои события
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'future' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('future')}
        >
          Будущие мероприятия
        </button>
      </div>

      <div className="w-full mt-4">
        {activeTab === 'my' ? (
          <MyEvents />
        ) : (
          <FutureEvents />
        )}
      </div>
    </div>
  );
};

export default Volunteer;
