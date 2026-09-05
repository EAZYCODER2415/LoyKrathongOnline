import React, { useEffect, useRef } from 'react';

const Lantern = ({ lantern }) => {
  const lanternRef = useRef(null);

  useEffect(() => {
    const animateLantern = () => {
      if (!lanternRef.current) return;

      // Update position
      lantern.topOff -= 10; // Decrease by 10px each frame (adjust speed as needed)
      lanternRef.current.style.top = `${lantern.topOff}px`;

      // If lantern goes off screen (top < -100), we can remove it or reset?
      // In the original, they just keep going up and are never removed from the array.
      // We'll keep it in the array but stop animating when off screen to save resources.
      if (lantern.topOff < -100) {
        cancelAnimationFrame(lantern.animationFrame);
        return;
      }

      // Request next frame
      lantern.animationFrame = requestAnimationFrame(animateLantern);
    };

    // Start animation
    lantern.animationFrame = requestAnimationFrame(animateLantern);

    // Cleanup on unmount or before next animation frame if lantern changes
    return () => {
      cancelAnimationFrame(lantern.animationFrame);
    };
  }, [lantern]); // Re-run effect if lantern changes (though we don't expect it to)

  return (
    <div
      className="lantern"
      ref={lanternRef}
      style={{
        left: '50%', // Original had left: 50% but then set via JS? In original: style="left: 50%"
        position: 'fixed',
        width: '700px',
        height: '437.75px',
        zIndex: 0.5,
        top: `${lantern.topOff}px`, // Initial top set by state
        transform: 'translateX(-50%)' // To center horizontally
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