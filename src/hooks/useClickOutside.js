import { useEffect, useRef } from 'react';

export default function useClickOutside(handleState) {
  const contentRef = useRef();

  useEffect(() => {
    const handleOutsideClick = e => {
      if (!contentRef.current.contains(e.target)) {
        handleState(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return contentRef;
}
