'use client';

import { type ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 2,
      // Consider adding orientation and gestureOrientation options if needed
      // orientation: 'vertical', // vertical, horizontal
      // gestureOrientation: 'vertical', // vertical, horizontal, both
    });

    lenisRef.current = lenis;

    // Store lenis instance on window for other components like ScrollToTop if absolutely necessary,
    // though passing via context or props is generally cleaner.
    // For now, we replicate the old behavior.
    (window as any).lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      (window as any).lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll; 