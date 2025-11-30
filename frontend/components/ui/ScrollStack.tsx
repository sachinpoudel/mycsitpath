import React, { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ 
  children, 
  itemClassName = '',
  style = {}
}) => (
  <div
    className={`scroll-stack-card relative w-full min-h-[400px] my-8 p-8 md:p-12 rounded-[40px] shadow-xl box-border ${itemClassName}`.trim()}
    style={style}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  containerClassName = '',
  itemDistance = 60,
  itemScale = 0.02,
  itemStackDistance = 20,
  stackPosition = '15%',
  scaleEndPosition = '10%',
  baseScale = 0.95,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const ticking = useRef(false);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCards = useCallback(() => {
    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardTop = rect.top + scrollTop;
      
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;

      // Calculate scale progress
      let scaleProgress = 0;
      if (scrollTop >= triggerStart && scrollTop <= triggerEnd) {
        scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      } else if (scrollTop > triggerEnd) {
        scaleProgress = 1;
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      // Apply transform with GPU acceleration
      card.style.transform = `scale(${scale.toFixed(4)})`;
      card.style.transformOrigin = 'top center';
    });

    ticking.current = false;
  }, [stackPosition, scaleEndPosition, itemStackDistance, baseScale, itemScale, parsePercentage]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(updateCards);
    }
  }, [updateCards]);

  useEffect(() => {
    // Get all cards
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    // Set initial styles
    cards.forEach((card, i) => {
      card.style.position = 'sticky';
      card.style.top = `${80 + i * itemStackDistance}px`;
      card.style.willChange = 'transform';
      card.style.transition = 'transform 0.1s ease-out';
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateCards();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, updateCards, itemDistance, itemStackDistance]);

  return (
    <div className={`relative w-full ${className}`.trim()} ref={scrollerRef}>
      <div className={`px-4 md:px-8 lg:px-20 pb-40 ${containerClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;