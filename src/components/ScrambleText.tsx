/**
 * ScrambleText — Text decoding effect on hover or mouse leave.
 * Characters scramble randomly then resolve into the target string.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';

const UPPER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const LOWER_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const NUM_CHARS = '0123456789';

export interface UseScrambleOptions {
  duration?: number;
  speed?: number;
}

/**
 * Hook to apply text scramble / decoding effect to any string.
 * Preserves character casing, spaces, and punctuation so text never overflows its container.
 */
export function useScramble(text: string, options: UseScrambleOptions = {}) {
  const { duration = 360, speed = 22 } = options;
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const trigger = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current);
    const start = performance.now();

    frameRef.current = setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolvedCount = Math.floor(progress * text.length);

      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            // Keep whitespace, slashes, hyphens, and punctuation strictly intact
            if (/[^a-zA-Z0-9]/.test(char)) {
              return char;
            }
            if (i < resolvedCount) return char;

            // Preserve casing and character metrics so words do not expand or wrap
            if (/[A-Z]/.test(char)) {
              return UPPER_CHARS[Math.floor(Math.random() * UPPER_CHARS.length)];
            }
            if (/[a-z]/.test(char)) {
              return LOWER_CHARS[Math.floor(Math.random() * LOWER_CHARS.length)];
            }
            return NUM_CHARS[Math.floor(Math.random() * NUM_CHARS.length)];
          })
          .join('')
      );

      if (progress >= 1) {
        clearInterval(frameRef.current!);
        setDisplayed(text);
      }
    }, speed);
  }, [text, duration, speed]);

  useEffect(() => {
    setDisplayed(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, []);

  return { displayed, trigger };
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  duration?: number;
  triggerOn?: 'hover' | 'leave' | 'both';
}

export function ScrambleText({
  text,
  className,
  speed = 30,
  duration = 600,
  triggerOn = 'both',
}: ScrambleTextProps) {
  const { displayed, trigger } = useScramble(text, { speed, duration });

  const handleMouseEnter = () => {
    if (triggerOn === 'hover' || triggerOn === 'both') {
      trigger();
    }
  };

  const handleMouseLeave = () => {
    if (triggerOn === 'leave' || triggerOn === 'both') {
      trigger();
    }
  };

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'default' }}
    >
      {displayed}
    </span>
  );
}
