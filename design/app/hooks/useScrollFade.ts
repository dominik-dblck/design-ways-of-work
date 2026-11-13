'use client';

/**
 * - `useScrollFade` · an edge fades only while there is more past it
 */
import { useEffect, useRef, useState } from 'react';

const FADE = '24px';

/** A scrolling box's fade · an edge fades only while there is more past it. */
export function useScrollFade(): {
  readonly ref: React.RefObject<HTMLDivElement | null>;
  readonly maskImage: string;
} {
  const ref = useRef<HTMLDivElement | null>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });

  useEffect(() => {
    const body = ref.current;
    if (body === null) return;
    const read = () =>
      setEdges({
        top: body.scrollTop > 0,
        bottom: body.scrollTop + body.clientHeight < body.scrollHeight - 1,
      });
    read();
    body.addEventListener('scroll', read, { passive: true });
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(read);
    observer?.observe(body);
    for (const child of Array.from(body.children)) observer?.observe(child);
    return () => {
      body.removeEventListener('scroll', read);
      observer?.disconnect();
    };
  }, []);

  const top = edges.top ? `transparent 0, #000 ${FADE}` : '#000 0';
  const bottom = edges.bottom
    ? `#000 calc(100% - ${FADE}), transparent 100%`
    : '#000 100%';
  return { ref, maskImage: `linear-gradient(to bottom, ${top}, ${bottom})` };
}
