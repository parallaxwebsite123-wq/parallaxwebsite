import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAutoplayCarouselOptions {
  itemCount: number;
  duration?: number; // Duration per slide in ms (default: 6000)
  enabled?: boolean;
}

export interface UseAutoplayCarouselReturn {
  currentIndex: number;
  progress: number;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

export function useAutoplayCarousel({
  itemCount,
  duration = 6000,
  enabled = true,
}: UseAutoplayCarouselOptions): UseAutoplayCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const lastPauseStartRef = useRef<number | null>(null);

  // Safely clamp index if itemCount changes
  useEffect(() => {
    if (itemCount > 0 && currentIndex >= itemCount) {
      setCurrentIndex(0);
      setProgress(0);
      startTimeRef.current = null;
    }
  }, [itemCount, currentIndex]);

  const resetCycle = useCallback(() => {
    setProgress(0);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    lastPauseStartRef.current = null;
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (itemCount <= 0) return;
    const targetIndex = (index + itemCount) % itemCount;
    setCurrentIndex(targetIndex);
    resetCycle();
  }, [itemCount, resetCycle]);

  const nextSlide = useCallback(() => {
    if (itemCount <= 0) return;
    setCurrentIndex((prev) => (prev + 1) % itemCount);
    resetCycle();
  }, [itemCount, resetCycle]);

  const prevSlide = useCallback(() => {
    if (itemCount <= 0) return;
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
    resetCycle();
  }, [itemCount, resetCycle]);

  // Main animation frame loop for smooth 60fps progress & slide advancement
  useEffect(() => {
    if (!enabled || itemCount <= 1) {
      setProgress(0);
      return;
    }

    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    let isSubscribed = true;

    const tick = (now: number) => {
      if (!isSubscribed) return;

      if (isPaused) {
        if (lastPauseStartRef.current === null) {
          lastPauseStartRef.current = now;
        }
        animFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      // If resuming from pause, offset start time
      if (lastPauseStartRef.current !== null) {
        pausedTimeRef.current += now - lastPauseStartRef.current;
        lastPauseStartRef.current = null;
      }

      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }

      const elapsed = now - startTimeRef.current - pausedTimeRef.current;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(currentProgress);

      if (elapsed >= duration) {
        // Advance slide and reset timing
        setCurrentIndex((prev) => (prev + 1) % itemCount);
        resetCycle();
        startTimeRef.current = now;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isSubscribed = false;
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [enabled, itemCount, duration, isPaused, resetCycle]);

  return {
    currentIndex,
    progress,
    isPaused,
    setIsPaused,
    goToSlide,
    nextSlide,
    prevSlide,
  };
}
