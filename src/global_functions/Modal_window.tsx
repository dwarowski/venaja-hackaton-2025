import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '../global_functions/global_interfaces';

interface ModalContextType {
  isModalOpen: boolean;
  isClosing: boolean;
  selectedEvent: { event: Event; index: number } | null;
  openModal: (event: Event, index: number) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ event: Event; index: number } | null>(null);

  // Обновление openModal для передачи индекса вместе с событием
  const openModal = (event: Event, index: number) => {
    setIsClosing(false);
    setTimeout(() => {
      setSelectedEvent({ event, index });
      setIsModalOpen(true);
    }, 300);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedEvent(null);
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, isClosing, selectedEvent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
