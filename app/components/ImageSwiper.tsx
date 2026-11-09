"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageSwiperProps {
  images: string;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

// A shuffle, always at the left edge of the stack.
// Drag left: the front photo slides to the left edge, tucks under the stack
// there and settles at the back; the photo below comes to the front.
// Drag right: the reverse. The photo last sent to the back slides out from
// under the left edge, comes on top there and settles at the front.
// The photo changes layer at PARK widths to the left, where it only just
// overlaps the stack, so the swap happens at the edge, not mid-photo.
const OUT_MS = 260;
const BACK_MS = 420;
const FLICK_PX = 50;                          // drag distance that counts as a shuffle
const PARK = 0.92;
const TILT = 3;                               // degrees, a hand-held feel
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

  const shuffle = useCallback((dir: number) => {
    drag.current = null;
    const o = orderRef.current;
    const forward = dir < 0;
    const front = cardRefs.current[o[0]];
    const el = forward ? front : cardRefs.current[o[o.length - 1]];
    if (!el || !front) return;
    const token = ++animToken.current;
    const reorder = () => setOrder(o => forward
      ? [...o.slice(1), o[0]]
      : [o[o.length - 1], ...o.slice(0, -1)]);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      front.style.transition = 'none';
      setSwipe(front, 0, 0);
      reorder();
      requestAnimationFrame(() => { front.style.transition = ''; });
      return;
    }

    busyUntil.current = performance.now() + OUT_MS + BACK_MS / 2;

    // Going back, the front photo was only nudged by the drag: settle it.
    if (!forward) {
      front.style.transition = `transform 200ms ${BACK_EASE}`;
      setSwipe(front, 0, 0);
      window.setTimeout(() => {
        if (token === animToken.current) front.style.transition = '';
      }, 200);
    }

    // 1. Slide to the left edge of the stack on its own layer (on top going
    //    forward, underneath going back).
    el.style.transition = `transform ${OUT_MS}ms ${OUT_EASE}`;
    setSwipe(el, -el.offsetWidth * PARK, -TILT);

    // 2. Change layer there and slide home (to the back going forward, to
    //    the front going back).
    window.setTimeout(() => {
      if (token !== animToken.current) return;
      el.style.zIndex = forward ? '0' : String(count + 1);
      el.style.setProperty('--i', forward ? String(count) : '1');
      el.style.transition = `transform ${BACK_MS}ms ${BACK_EASE}, filter ${BACK_MS}ms ease`;
      setSwipe(el, 0, 0);
      reorder();
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
      // left: the front photo follows the finger; right: it only gives a little
      if (dx < 0) setSwipe(d.el, dx, Math.max(dx * 0.06, -TILT));
      else setSwipe(d.el, dx * 0.3, 0);
      if (Math.abs(dx) > FLICK_PX) shuffle(dx < 0 ? -1 : 1);
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
  }, [shuffle]);

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
