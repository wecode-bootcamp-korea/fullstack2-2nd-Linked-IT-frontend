import { useEffect, useRef } from 'react';

export default function useClickOutside(handleState) {
  const inputWrapperRef = useRef();

  useEffect(() => {
    const handleOutsideClick = e => {
      if (!inputWrapperRef.current.contains(e.target)) {
        handleState(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return inputWrapperRef;
}
