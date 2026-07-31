import { useRef, useEffect } from 'react';

export function useInfiniteCarousel(dataLength) {
  const scrollRef = useRef(null);
  const paginationRef = useRef(null);
  const activeIndexRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && window.innerWidth <= 900) {
      const cardWidth = scrollRef.current.clientWidth + 16;
      scrollRef.current.scrollTo({ left: dataLength * cardWidth, behavior: 'instant' });
    }
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [dataLength]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.clientWidth + 16;
    const newIndex = Math.round(scrollPosition / cardWidth);

    const actualIndex = newIndex % dataLength;
    
    // Direct DOM manipulation to avoid React re-renders which cause stuttering/blurring!
    if (actualIndex !== activeIndexRef.current) {
      activeIndexRef.current = actualIndex;
      if (paginationRef.current) {
        const dots = paginationRef.current.children;
        for (let i = 0; i < dots.length; i++) {
          if (i === actualIndex) {
            dots[i].classList.add('active');
          } else {
            dots[i].classList.remove('active');
          }
        }
      }
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollRef.current) return;
      const currentScrollPosition = scrollRef.current.scrollLeft;
      const finalIndex = Math.round(currentScrollPosition / cardWidth);

      if (finalIndex <= 0) {
        scrollRef.current.scrollTo({ left: dataLength * cardWidth, behavior: 'instant' });
      } else if (finalIndex >= dataLength * 2) {
        scrollRef.current.scrollTo({ left: dataLength * cardWidth, behavior: 'instant' });
      }
    }, 150);
  };

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth + 16;
    scrollRef.current.scrollTo({
      left: (index + dataLength) * cardWidth,
      behavior: 'smooth'
    });
    
    // Directly update dots when clicked
    activeIndexRef.current = index;
    if (paginationRef.current) {
      const dots = paginationRef.current.children;
      for (let i = 0; i < dots.length; i++) {
        if (i === index) {
          dots[i].classList.add('active');
        } else {
          dots[i].classList.remove('active');
        }
      }
    }
  };

  return { scrollRef, paginationRef, handleScroll, scrollToCard };
}
