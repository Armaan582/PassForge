import { useEffect, useRef } from 'react';

function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
    dur: Math.random() * 2 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Background() {
  return (
    <>
      {/* Deep space base */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% -20%, #1a0835 0%, #0a0520 35%, #03010a 70%)',
          zIndex: 0,
        }}
      />

      {/* Grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(176,110,243,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(176,110,243,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
          zIndex: 0,
        }}
      />

      <StarField />

      {/* Large floating orb — left */}
      <div
        className="fixed pointer-events-none animate-float-slow"
        style={{
          left: '-15%', top: '10%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(176,110,243,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          willChange: 'transform',
        }}
      />

      {/* Large floating orb — right */}
      <div
        className="fixed pointer-events-none animate-float-med"
        style={{
          right: '-15%', bottom: '5%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(110,158,245,0.14) 0%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: 0,
          animationDelay: '2s',
          willChange: 'transform',
        }}
      />

      {/* Mid orb */}
      <div
        className="fixed pointer-events-none animate-pulse-glow"
        style={{
          left: '40%', top: '40%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(240,98,146,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          animationDelay: '1s',
          willChange: 'transform, opacity',
        }}
      />

      {/* Rotating ring decoration — top right */}
      <div
        className="fixed pointer-events-none animate-spin-slow"
        style={{
          right: '8%', top: '8%',
          width: 200, height: 200,
          border: '1px solid rgba(176,110,243,0.12)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none animate-spin-reverse"
        style={{
          right: '10%', top: '10%',
          width: 140, height: 140,
          border: '1px solid rgba(110,158,245,0.1)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      {/* Noise texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
          zIndex: 0,
        }}
      />
    </>
  );
}
