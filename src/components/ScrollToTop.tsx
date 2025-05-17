'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type Lenis from 'lenis'; // Import type for Lenis

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Access the Lenis instance from the window object
    const lenis = (window as any).lenisInstance as Lenis | undefined;

    if (lenis) {
      // Scroll to top with duration and easing
      lenis.scrollTo(0, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      // Fallback to default browser scroll if Lenis is not available
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Native smooth scroll as a fallback
      });
    }
  }, [pathname]);

  return null; // This component does not render anything
};

export default ScrollToTop; 