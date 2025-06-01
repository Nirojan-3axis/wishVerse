import React, { useState, useEffect } from "react";

// Confetti component for celebration effect
const Confetti = ({ isActive }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isActive) {
      // Generate confetti particles
      const newConfetti = [];
      for (let i = 0; i < 100; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -20 - Math.random() * 100,
          color: ["#FF9EAA", "#FFD6A5", "#FFFEC4", "#CBFFA9", "#A0C4FF", "#D0AAFF"][Math.floor(Math.random() * 6)],
          size: 5 + Math.random() * 10,
          rotation: Math.random() * 360,
          speedX: Math.random() * 6 - 3,
          speedY: 3 + Math.random() * 5,
          speedRotation: Math.random() * 10 - 5,
        });
      }
      setConfetti(newConfetti);

      // Clear confetti after animation completes
      const timer = setTimeout(() => {
        setConfetti([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // Animation frame for confetti
  useEffect(() => {
    if (!confetti.length) return;

    let frameId;
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 16; // Normalize to ~60fps
      lastTime = currentTime;

      setConfetti((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.speedX * deltaTime,
            y: particle.y + particle.speedY * deltaTime,
            rotation: (particle.rotation + particle.speedRotation * deltaTime) % 360,
          }))
          .filter((particle) => particle.y < window.innerHeight + 50)
      );

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [confetti.length]);

  if (!confetti.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size * 1.5}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;