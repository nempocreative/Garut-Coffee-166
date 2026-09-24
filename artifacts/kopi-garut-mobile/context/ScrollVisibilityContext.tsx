import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type ScrollVisibilityValue = {
  isScrolling: boolean;
  notifyScroll: () => void;
};

const ScrollVisibilityContext = createContext<ScrollVisibilityValue | null>(null);

export function ScrollVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollingRef = useRef(false);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notifyScroll = useCallback(() => {
    if (!scrollingRef.current) {
      scrollingRef.current = true;
      setIsScrolling(true);
    }
    if (stopTimer.current) clearTimeout(stopTimer.current);
    stopTimer.current = setTimeout(() => {
      scrollingRef.current = false;
      setIsScrolling(false);
      stopTimer.current = null;
    }, 180);
  }, []);

  useEffect(() => () => {
    if (stopTimer.current) clearTimeout(stopTimer.current);
    scrollingRef.current = false;
  }, []);

  const value = useMemo(() => ({ isScrolling, notifyScroll }), [isScrolling, notifyScroll]);

  return <ScrollVisibilityContext.Provider value={value}>{children}</ScrollVisibilityContext.Provider>;
}

export function useScrollVisibility() {
  const context = useContext(ScrollVisibilityContext);
  if (!context) throw new Error('useScrollVisibility must be used within ScrollVisibilityProvider');
  return context;
}