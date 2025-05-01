import { useRef, useCallback, useEffect } from 'react';

export const useVideoScroller = (videos, onActiveChange) => {
  const videoRefs = useRef([]);

  const assignRef = useCallback((index) => (el) => {
    videoRefs.current[index] = el;
  }, []);

  const scrollToVideo = useCallback((index) => {
    const el = videoRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1 && typeof onActiveChange === 'function') {
              onActiveChange(index);
            }
          }
        });
      },
      { root: null, threshold: 0.9 }
    );

    videoRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      videoRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, [videos, onActiveChange]);

  return { assignRef, scrollToVideo };
};