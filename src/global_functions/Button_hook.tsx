import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

// Интерфейс для контекста
interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabsRef: React.RefObject<HTMLDivElement>;
  scrollLeft: () => void;
  scrollRight: () => void;
}

// Интерфейс для пропсов TabProvider, включая children
interface TabProviderProps {
  children: ReactNode; // Здесь мы определяем, что TabProvider может принимать детей
}

// Создание контекста
const TabContext = createContext<TabContextType | undefined>(undefined);

// Провайдер контекста
export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, tabsRef, scrollLeft, scrollRight }}>
      {children}
    </TabContext.Provider>
  );
};

// Хук для использования контекста
export const useTabs = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabProvider');
  }
  return context;
};
