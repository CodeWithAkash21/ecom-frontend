import React, { useEffect, useRef, useState } from 'react';

const useParallax = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return offset;
};

const BackgroundShapes = () => {
  const { x, y } = useParallax();
  // Parallax multipliers for each shape
  const m = [30, 20, 18, 12, 10, 8];
  return (
    <div className="background-shapes">
      {/* Large ring top left */}
      <svg className="shape-ring1" viewBox="0 0 220 220" style={{ transform: `translate3d(${x * m[0]}px, ${y * m[0]}px, 0)` }}>
        <defs>
          <radialGradient id="ring1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#fbc2eb" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6f86d6" stopOpacity="0.9" />
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="110" rx="90" ry="90" fill="url(#ring1)" />
        <ellipse cx="110" cy="110" rx="70" ry="70" fill="#fff" fillOpacity="0.1" />
      </svg>
      {/* Smaller ring top right */}
      <svg className="shape-ring2" viewBox="0 0 160 160" style={{ transform: `translate3d(${x * m[1]}px, ${y * m[1]}px, 0)` }}>
        <defs>
          <radialGradient id="ring2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#a18cd1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6f86d6" stopOpacity="0.8" />
          </radialGradient>
        </defs>
        <ellipse cx="80" cy="80" rx="65" ry="65" fill="url(#ring2)" />
        <ellipse cx="80" cy="80" rx="50" ry="50" fill="#fff" fillOpacity="0.08" />
      </svg>
      {/* Blob bottom left */}
      <svg className="shape-blob1" viewBox="0 0 180 180" style={{ transform: `translate3d(${x * m[2]}px, ${y * m[2]}px, 0)` }}>
        <defs>
          <linearGradient id="blob1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbc2eb" />
            <stop offset="100%" stopColor="#a18cd1" />
          </linearGradient>
        </defs>
        <ellipse cx="90" cy="90" rx="80" ry="60" fill="url(#blob1)" />
      </svg>
      {/* Blob bottom right */}
      <svg className="shape-blob2" viewBox="0 0 120 120" style={{ transform: `translate3d(${x * m[3]}px, ${y * m[3]}px, 0)` }}>
        <defs>
          <linearGradient id="blob2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6f86d6" />
            <stop offset="100%" stopColor="#fbc2eb" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="60" rx="50" ry="40" fill="url(#blob2)" />
      </svg>
      {/* Wavy path middle */}
      <svg className="shape-wave" viewBox="0 0 400 80" width="400" height="80" style={{ transform: `translate3d(${x * m[4]}px, ${y * m[4]}px, 0)` }}>
        <defs>
          <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a18cd1" />
            <stop offset="100%" stopColor="#fbc2eb" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q100,0 200,40 T400,40 V80 H0 Z" fill="url(#wave1)" opacity="0.5" />
      </svg>
      {/* Glowing orb center */}
      <svg className="shape-orb" viewBox="0 0 120 120" width="120" height="120" style={{ transform: `translate3d(${x * m[5]}px, ${y * m[5]}px, 0)` }}>
        <defs>
          <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#a18cd1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6f86d6" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="50" fill="url(#orb1)" />
      </svg>
    </div>
  );
};

export default BackgroundShapes; 