import { createContext, useContext, useRef, useCallback } from 'react';

export interface RippleEvent {
  x: number;
  y: number;
  count?: number;
}

interface RippleContextValue {
  triggerRipple: (event: RippleEvent) => void;
  onRipple: (cb: (event: RippleEvent) => void) => () => void;
}

const RippleContext = createContext<RippleContextValue>({
  triggerRipple: () => {},
  onRipple: () => () => {},
});

export function RippleProvider({ children }: { children: React.ReactNode }) {
  const listenersRef = useRef<Set<(e: RippleEvent) => void>>(new Set());

  const triggerRipple = useCallback((event: RippleEvent) => {
    listenersRef.current.forEach(cb => cb(event));
  }, []);

  const onRipple = useCallback((cb: (e: RippleEvent) => void) => {
    listenersRef.current.add(cb);
    return () => { listenersRef.current.delete(cb); };
  }, []);

  return (
    <RippleContext.Provider value={{ triggerRipple, onRipple }}>
      {children}
    </RippleContext.Provider>
  );
}

export const useRipple = () => useContext(RippleContext);
