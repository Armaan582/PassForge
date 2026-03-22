import { useState, useEffect } from 'react';

const DESCRIPTIONS = {
  0: '',
  1: 'Easy to guess — add more complexity',
  2: 'Moderate security — could be stronger',
  3: 'Great password — hard to crack',
  4: 'Military-grade — virtually uncrackable',
};

export default function StrengthMeter({ strength, entropy }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [displayColor, setDisplayColor] = useState(strength.color);
  const [displayGlow, setDisplayGlow]   = useState(strength.glow);

  useEffect(() => {
    // Brief reset so bars animate fresh every time
    setDisplayScore(0);
    const t = setTimeout(() => {
      setDisplayScore(strength.score);
      setDisplayColor(strength.color);
      setDisplayGlow(strength.glow);
    }, 60);
    return () => clearTimeout(t);
  }, [strength.score, strength.color]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((seg) => {
          const active = displayScore >= seg;
          return (
            <div key={seg} className="strength-segment">
              <div
                className="fill"
                style={{
                  width: active ? '100%' : '0%',
                  backgroundColor: active ? displayColor : 'transparent',
                  boxShadow: active ? `0 0 8px ${displayGlow}` : 'none',
                  transition: active
                    ? `width 0.42s cubic-bezier(0.4,0,0.2,1) ${(seg - 1) * 0.07}s,
                       background-color 0.3s ease,
                       box-shadow 0.3s ease`
                    : 'width 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {DESCRIPTIONS[strength.score]}
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          {entropy > 0 && (
            <span className="font-mono text-xs font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {entropy} bits
            </span>
          )}
          {strength.score > 0 && (
            <span
              className="font-body text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: `${displayColor}18`,
                color: displayColor,
                border: `1px solid ${displayColor}45`,
                boxShadow: `0 0 14px ${displayGlow}`,
                transition: 'all 0.4s ease',
              }}
            >
              {strength.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
