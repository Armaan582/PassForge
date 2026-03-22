import { useEffect, useRef } from 'react';

const TOGGLE_OPTIONS = [
  {
    key: 'upper',
    label: 'Uppercase',
    example: 'A B C',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
    ),
    color: '#c084fc',
  },
  {
    key: 'lower',
    label: 'Lowercase',
    example: 'a b c',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="14" r="5"/><path d="M16 9v5"/>
      </svg>
    ),
    color: '#67e8f9',
  },
  {
    key: 'numbers',
    label: 'Numbers',
    example: '1 2 3',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
      </svg>
    ),
    color: '#34d399',
  },
  {
    key: 'symbols',
    label: 'Symbols',
    example: '! @ #',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    color: '#f06292',
  },
];

function Toggle({ option, enabled, onChange }) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 group"
      style={{
        background: enabled
          ? `linear-gradient(135deg, ${option.color}12, ${option.color}06)`
          : 'rgba(255,255,255,0.025)',
        border: `1px solid ${enabled ? option.color + '35' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: enabled ? `0 0 20px ${option.color}18` : 'none',
      }}
      onClick={onChange}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: enabled ? `${option.color}22` : 'rgba(255,255,255,0.05)',
            color: enabled ? option.color : 'rgba(255,255,255,0.3)',
            border: `1px solid ${enabled ? option.color + '40' : 'transparent'}`,
            boxShadow: enabled ? `0 0 12px ${option.color}40` : 'none',
          }}
        >
          {option.icon}
        </div>
        <div>
          <div
            className="font-body font-semibold text-sm transition-colors duration-300"
            style={{ color: enabled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)' }}
          >
            {option.label}
          </div>
          <div className="font-mono text-[11px]" style={{ color: enabled ? option.color + 'bb' : 'rgba(255,255,255,0.2)' }}>
            {option.example}
          </div>
        </div>
      </div>
      <div
        className={`toggle-pill ${enabled ? 'on' : 'off'}`}
        onClick={e => { e.stopPropagation(); onChange(); }}
      >
        <div className="thumb" />
      </div>
    </div>
  );
}

export default function Controls({ options, setOptions }) {
  const { length } = options;
  const sliderRef = useRef(null);

  const updatePct = (val) => {
    if (sliderRef.current) {
      const pct = ((val - 6) / (32 - 6)) * 100;
      sliderRef.current.style.setProperty('--pct', `${pct}%`);
    }
  };

  useEffect(() => { updatePct(length); }, [length]);

  const handleLength = (e) => {
    const val = Number(e.target.value);
    setOptions(p => ({ ...p, length: val }));
  };

  const toggle = (key) => {
    setOptions(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const anyOn = ['upper','lower','numbers','symbols'].some(k => next[k]);
      return anyOn ? next : prev;
    });
  };

  // Strength color for length display
  const lengthColor = length >= 20 ? '#00e5a0' : length >= 12 ? '#ffcc00' : '#ff4d6d';

  return (
    <div className="space-y-4">

      {/* Length Slider Card */}
      <div
        className="p-5 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-body font-semibold text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Password Length
            </div>
            <div className="font-mono text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Drag to adjust
            </div>
          </div>
          <div
            className="font-display font-black text-5xl leading-none transition-all duration-200"
            style={{
              color: lengthColor,
              textShadow: `0 0 30px ${lengthColor}80`,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {length}
          </div>
        </div>

        <input
          ref={sliderRef}
          type="range"
          min="6" max="32" step="1"
          value={length}
          onChange={handleLength}
          className="fancy-range"
        />

        <div className="flex justify-between mt-2 px-1">
          {[6, 12, 18, 24, 32].map(v => (
            <span
              key={v}
              className="font-mono text-[10px] cursor-pointer transition-colors duration-200"
              style={{ color: length === v ? lengthColor : 'rgba(255,255,255,0.2)' }}
              onClick={() => setOptions(p => ({ ...p, length: v }))}
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Toggle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TOGGLE_OPTIONS.map(opt => (
          <Toggle
            key={opt.key}
            option={opt}
            enabled={options[opt.key]}
            onChange={() => toggle(opt.key)}
          />
        ))}
      </div>
    </div>
  );
}
