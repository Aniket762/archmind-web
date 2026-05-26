import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width:     window.innerWidth,
    height:    window.innerHeight,
    isMobile:  window.innerWidth < 600,
    isTablet:  window.innerWidth >= 600 && window.innerWidth < 900,
    isDesktop: window.innerWidth >= 900,
  });

  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setSize({
        width:     w,
        height:    h,
        isMobile:  w < 600,
        isTablet:  w >= 600 && w < 900,
        isDesktop: w >= 900,
      });
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}
