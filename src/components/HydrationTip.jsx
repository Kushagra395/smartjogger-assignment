import { useEffect, useRef, useState } from 'react';
import React from 'react';

const HydrationTip = () => {
  const tipRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        root: null,
        threshold: 0.5, // 50% visibility to trigger
      }
    );

    if (tipRef.current) {
      observer.observe(tipRef.current);
    }

    return () => {
      if (tipRef.current) {
        observer.unobserve(tipRef.current);
      }
    };
  }, []);

  return (
    <div ref={tipRef} className="mt-10">
      {isVisible && (
        <div className="bg-blue-900 border border-blue-400 p-5 rounded-2xl shadow-md text-white text-center animate-fade-in">
          💧 <span className="font-semibold text-blue-200">Hydration Reminder:</span><br />
          Don’t forget to sip water every 10 minutes!
        </div>
      )}

      {!isVisible && (
        <div className="text-center text-sm text-gray-500 italic mt-6">
          Scroll to see hydration tip...
        </div>
      )}
    </div>
  );
};

export default HydrationTip;
