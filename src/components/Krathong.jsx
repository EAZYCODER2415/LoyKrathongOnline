import React, { useEffect, useRef, useState } from 'react';

const KRATHONG_IMAGE = 'https://png.pngtree.com/png-clipart/20221130/original/pngtree-loy-krathong-fesival-clipart-transparent-background-png-image_8745179.png';

const Krathong = ({ krathong, onComplete }) => {
  const krathongRef = useRef(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const element = krathongRef.current;
    if (!element) return undefined;

    let animationFrame;
    let fadeTimeout;
    const isNew = krathong.phase === 'new';
    const startTime = performance.now();
    const startX = isNew ? 50 : -12;
    const startY = isNew ? window.innerHeight * 0.56 : window.innerHeight * 0.58;
    let startedGlide = !isNew;
    let currentX = startX;
    let previousTime = startTime;

    element.style.left = `${startX}%`;
    element.style.top = `${startY}px`;
    element.classList.add(isNew ? 'krathong-entering' : 'krathong-fade-in');

    const animate = (now) => {
      const elapsed = now - startTime;
      const frameScale = (now - previousTime) / (1000 / 60);
      previousTime = now;

      if (isNew && elapsed >= 1500) startedGlide = true;
      if (isNew && !startedGlide) {
        const lift = Math.min(elapsed / 1500, 1) * 42;
        element.style.top = `${startY - lift}px`;
      } else {
        currentX += ((0.45 * frameScale) / window.innerWidth) * 100;
        const x = currentX;
        const glideElapsed = isNew ? elapsed - 1500 : elapsed;
        const y = (isNew ? startY - 42 : startY) + Math.sin(glideElapsed / 280) * 9;
        element.style.left = `${x}%`;
        element.style.top = `${y}px`;

        if (x >= 112) {
          element.classList.remove('krathong-entering', 'krathong-fade-in');
          element.classList.add('krathong-fade-out');
          fadeTimeout = window.setTimeout(() => onComplete(krathong.id), 700);
          return;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(fadeTimeout);
    };
  }, [krathong, onComplete]);

  const toggleDetails = () => {
    setShowDetails(previous => !previous);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDetails();
    }
  };

  return (
    <div
      ref={krathongRef}
      className={`krathong ${krathong.phase === 'new' ? 'is-new' : 'is-looping'}${showDetails ? ' is-details-visible' : ''}`}
      role="button"
      aria-label={`Krathong by ${krathong.name}`}
      tabIndex="0"
      aria-expanded={showDetails}
      onClick={toggleDetails}
      onKeyDown={handleKeyDown}
    >
      <img src={KRATHONG_IMAGE} alt="Loy Krathong floral raft" />
      <div className="krathong-wish">
        <h2>{krathong.name}</h2>
        <p>{krathong.wish}</p>
      </div>
    </div>
  );
};

export default Krathong;
