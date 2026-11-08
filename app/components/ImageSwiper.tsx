"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageSwiperProps {
  images: string;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

// A flick tosses the front photo aside (OUT_MS), then drops it behind the
// stack and slides it home underneath while every other photo steps forward
// one place (BACK_MS).
const OUT_MS = 220;
const BACK_MS = 460;
const FLICK_PX = 50;                          // drag distance that counts as a flick
const OUT_EASE = 'cubic-bezier(0.2, 0.7, 0.3, 1)';
const BACK_EASE = 'cubic-bezier(0.45, 0, 0.2, 1)';

export const ImageSwiper: React.FC<ImageSwiperProps> = ({
  images,
  cardWidth = 500,
  cardHeight = 300,
  className = ''
}) => {
  const imageList = images.split(',').map(img => img.trim()).filter(img => img);
  const count = imageList.length;

  // Size the stack in CSS rather than after mount, so the server-rendered
  // height is already right on phones and the page doesn't shift (which
  // threw off jumps to #contact from other pages by ~100 px).
  const cardW = `min(${cardWidth}px, calc(100vw - 48px))`;
  const cardH = `calc(${cardW} * ${cardHeight / cardWidth})`;

  // order[k] is the photo at stack position k (0 = front). Cards stay in a
  // fixed DOM order and only their position styles change, so moving a photo
  // to the back animates instead of jumping.
  const [order, setOrder] = useState<number[]>(() => imageList.map((_, i) => i));
  const orderRef = useRef(order);
  useEffect(() => { orderRef.current = order; }, [order]);

  const stackRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const drag = useRef<{ id: number; startX: number; el: HTMLElement } | null>(null);
  const busyUntil = useRef(0);
  const animToken = useRef(0);

  const setSwipe = (el: HTMLElement, x: number, tilt: number) => {
    el.style.setProperty('--swipe-x', `${x}px`);
    el.style.setProperty('--swipe-tilt', `${tilt}deg`);
  };

  const toss = useCallback((dir: number) => {
    drag.current = null;
    const el = cardRefs.current[orderRef.current[0]];
    if (!el) return;
    const token = ++animToken.current;
    const toBack = () => setOrder(o => [...o.slice(1), o[0]]);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transition = 'none';
      setSwipe(el, 0, 0);
      toBack();
      requestAnimationFrame(() => { el.style.transition = ''; });
      return;
    }

    busyUntil.current = performance.now() + OUT_MS + BACK_MS / 2;

    // 1. Toss it aside, still on top of the stack.
    el.style.transition = `transform ${OUT_MS}ms ${OUT_EASE}`;
    setSwipe(el, dir * el.offsetWidth * 0.7, dir * 8);

    // 2. Drop it behind the others and slide it home at the back.
    window.setTimeout(() => {
      if (token !== animToken.current) return;
      el.style.zIndex = '0';
      el.style.setProperty('--i', String(count));
      el.style.transition = `transform ${BACK_MS}ms ${BACK_EASE}, filter ${BACK_MS}ms ease`;
      setSwipe(el, 0, 0);
      toBack();
      window.setTimeout(() => {
        if (token === animToken.current) el.style.transition = '';
      }, BACK_MS);
    }, OUT_MS);
  }, [count]);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const down = (e: PointerEvent) => {
      if (e.button !== 0 || drag.current || performance.now() < busyUntil.current) return;
      const el = cardRefs.current[orderRef.current[0]];
      if (!el) return;
      animToken.current++;
      drag.current = { id: e.pointerId, startX: e.clientX, el };
      el.style.transition = 'none';
      try { stack.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ }
    };
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || e.pointerId !== d.id) return;
      const dx = e.clientX - d.startX;
      setSwipe(d.el, dx, dx * 0.06);
      if (Math.abs(dx) > FLICK_PX) toss(Math.sign(dx));
    };
    // Let go before a flick: spring back into place.
    const up = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || e.pointerId !== d.id) return;
      drag.current = null;
      const token = ++animToken.current;
      d.el.style.transition = `transform 250ms ${OUT_EASE}`;
      setSwipe(d.el, 0, 0);
      window.setTimeout(() => {
        if (token === animToken.current) d.el.style.transition = '';
      }, 250);
    };

    stack.addEventListener('pointerdown', down);
    stack.addEventListener('pointermove', move);
    stack.addEventListener('pointerup', up);
    stack.addEventListener('pointercancel', up);
    return () => {
      stack.removeEventListener('pointerdown', down);
      stack.removeEventListener('pointermove', move);
      stack.removeEventListener('pointerup', up);
      stack.removeEventListener('pointercancel', up);
    };
  }, [toss]);

  return (
    <section
      className={`relative grid place-content-center select-none ${className}`}
      ref={stackRef}
      style={{
        width: `calc(${cardW} + 32px)`,
        height: `calc(${cardH} + 32px)`,
        // vertical swipes still scroll the page; horizontal ones flick photos
        touchAction: 'pan-y',
        transformStyle: 'preserve-3d',
        '--card-perspective': '700px',
        '--card-z-offset': '12px',
        '--card-y-offset': '7px',
      } as React.CSSProperties}
    >
      {imageList.map((src, photo) => {
        const pos = order.indexOf(photo);
        return (
          <article
            key={`${src}-${photo}`}
            ref={el => { cardRefs.current[photo] = el; }}
            className="image-card absolute cursor-grab active:cursor-grabbing
                       place-self-center border border-white/10 rounded-2xl
                       shadow-2xl overflow-hidden will-change-transform
                       transition-[transform,filter] duration-[460ms] ease-[cubic-bezier(0.45,0,0.2,1)]"
            style={{
              '--i': (pos + 1).toString(),
              zIndex: count - pos,
              width: cardW,
              height: cardH,
              // photos further back are a little darker, so depth reads clearly
              filter: `brightness(${1 - pos * 0.06})`,
              transform: `perspective(var(--card-perspective))
                         translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                         translateY(calc(var(--card-y-offset) * var(--i)))
                         translateX(var(--swipe-x, 0px))
                         rotate(var(--swipe-tilt, 0deg))`
            } as React.CSSProperties}
          >
            <Image
              src={src}
              alt={`Active Covers installation ${photo + 1}`}
              fill
              sizes={`(max-width: ${cardWidth + 48}px) calc(100vw - 48px), ${cardWidth}px`}
              className="object-cover select-none pointer-events-none"
              draggable={false}
            />
          </article>
        );
      })}
    </section>
  );
};
