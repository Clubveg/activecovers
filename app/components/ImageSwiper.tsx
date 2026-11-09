"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageSwiperProps {
  images: string;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

// A flick turns the front photo over on a hinge at the edge it was flicked
// towards (left edge for a left flick, right edge for a right flick): it
// swings back into the page until it is edge-on at that side of the stack
// (OUT_MS), drops behind the others there, unseen, and swings flat at the
// back while every other photo steps forward one place (BACK_MS).
const OUT_MS = 300;
const BACK_MS = 440;
const FLICK_PX = 50;                          // drag distance that counts as a flick
const FLIP_DEG = 90;                          // edge-on
const OUT_EASE = 'cubic-bezier(0.35, 0.1, 0.6, 1)';
const BACK_EASE = 'cubic-bezier(0.25, 0.6, 0.3, 1)';

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

  // Turn a card by `deg` on the hinge at its left (dir -1) or right (dir 1)
  // edge, far side going back into the page.
  const setFlip = (el: HTMLElement, dir: number, deg: number) => {
    el.style.setProperty('--hinge', `${dir * el.offsetWidth / 2}px`);
    el.style.setProperty('--flip', `${-dir * deg}deg`);
  };

  const toss = useCallback((dir: number) => {
    drag.current = null;
    const el = cardRefs.current[orderRef.current[0]];
    if (!el) return;
    const token = ++animToken.current;
    const toBack = () => setOrder(o => [...o.slice(1), o[0]]);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transition = 'none';
      setFlip(el, dir, 0);
      toBack();
      requestAnimationFrame(() => { el.style.transition = ''; });
      return;
    }

    busyUntil.current = performance.now() + OUT_MS + BACK_MS / 2;

    // 1. Swing it back on the hinge until it is edge-on at the side of the stack.
    el.style.transition = `transform ${OUT_MS}ms ${OUT_EASE}`;
    setFlip(el, dir, FLIP_DEG);

    // 2. Edge-on, drop it behind the others and swing it flat at the back.
    window.setTimeout(() => {
      if (token !== animToken.current) return;
      el.style.zIndex = '0';
      el.style.setProperty('--i', String(count));
      el.style.transition = `transform ${BACK_MS}ms ${BACK_EASE}, filter ${BACK_MS}ms ease`;
      setFlip(el, dir, 0);
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
      const dir = dx < 0 ? -1 : 1;
      setFlip(d.el, dir, Math.min(Math.abs(dx) / d.el.offsetWidth, 1) * FLIP_DEG);
      if (Math.abs(dx) > FLICK_PX) toss(dir);
    };
    // Let go before a flick: spring back into place.
    const up = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || e.pointerId !== d.id) return;
      drag.current = null;
      const token = ++animToken.current;
      d.el.style.transition = `transform 250ms ${BACK_EASE}`;
      d.el.style.setProperty('--flip', '0deg');
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
                         translateX(var(--hinge, 0px))
                         rotateY(var(--flip, 0deg))
                         translateX(calc(-1 * var(--hinge, 0px)))`
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
