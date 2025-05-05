import { useCallback } from 'react';

export const useButton = () => {
  const scrollLeft = useCallback((tabsRef: React.RefObject<HTMLDivElement>) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback((tabsRef: React.RefObject<HTMLDivElement>) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  }, []);

  return {
    scrollLeft,
    scrollRight
  };
};
