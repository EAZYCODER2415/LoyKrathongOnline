import React, { useEffect, useRef } from 'react';

const Lantern = ({ lantern, onFadeComplete, onLanternClick }) => {
  const lanternRef = useRef(null);

  useEffect(() => {
    let currentTop = lantern.topOff;
    let animationFrame;
    let fadeTimeout;
    let fadeInTimeout;
    let isFading = false;
    const isLooping = lantern.phase === 'looping';

    if (isLooping && lanternRef.current) {
      lanternRef.current.classList.add('is-fading-in');
      fadeInTimeout = window.setTimeout(() => {
        lanternRef.current?.classList.remove('is-fading-in');
      }, 700);
    }

    const animateLantern = () => {
      if (!lanternRef.current) return;

      if (isLooping && currentTop <= 0 && !isFading) {
        isFading = true;
        lanternRef.current.classList.add('is-fading-out');
        fadeTimeout = window.setTimeout(() => {
          currentTop = window.innerHeight * 0.42;
          lanternRef.current?.style.setProperty('top', `${currentTop}px`);
          lanternRef.current?.style.setProperty('left', `${Math.floor(Math.random() * 70) + 15}%`);
          lanternRef.current?.classList.remove('is-fading-out');
          lanternRef.current?.classList.add('is-fading-in');
          window.setTimeout(() => lanternRef.current?.classList.remove('is-fading-in'), 700);
          isFading = false;
          animationFrame = requestAnimationFrame(animateLantern);
        }, 700);
        return;
      }

      currentTop -= isLooping ? 0.35 : 0.8;
      lanternRef.current.style.top = `${currentTop}px`;

      if (!isLooping && currentTop < -100) {
        lanternRef.current.classList.add('is-fading');
        fadeTimeout = window.setTimeout(() => onFadeComplete(lantern.id), 700);
        return;
      }

      animationFrame = requestAnimationFrame(animateLantern);
    };

    animationFrame = requestAnimationFrame(animateLantern);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(fadeTimeout);
      window.clearTimeout(fadeInTimeout);
    };
  }, [lantern, onFadeComplete]);

  const handleKeyDown = (event) => {
    if (lantern.phase !== 'looping') return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onLanternClick(lantern);
    }
  };

  return (
    <div
      className={`lantern ${lantern.phase === 'looping' ? 'is-looping' : 'is-large'}`}
      ref={lanternRef}
      tabIndex="0"
      aria-label={`Lantern by ${lantern.name}`}
      role={lantern.phase === 'looping' ? 'button' : undefined}
      onClick={() => lantern.phase === 'looping' && onLanternClick(lantern)}
      onKeyDown={handleKeyDown}
      style={{
        left: `${lantern.xPosition ?? 50}%`,
        position: 'fixed',
        zIndex: 0.5,
        top: `${lantern.topOff}px`,
        transform: 'translateX(-50%)'
      }}
    >
      <img
        src="https://pngimg.com/d/sky_lantern_PNG26.png"
        alt="lantern"
        style={{ width: '100%', height: '100%', objectPosition: 'center' }}
      />
      <div className="wish">
        <h2>{lantern.name}</h2>
        <p>{lantern.wish}</p>
      </div>
    </div>
  );
};

export default Lantern;