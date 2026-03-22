import { useState, useEffect, useRef } from 'react';

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  );
}

export default function PasswordDisplay({ password, onRegenerate, strength }) {
  const [copied, setCopied]       = useState(false);
  const [chars, setChars]         = useState([]);
  const [spinning, setSpinning]   = useState(false);
  const [ripple, setRipple]       = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setChars(password.split('').map((c, i) => ({ char: c, id: `${i}-${Date.now()}` })));
  }, [password]);

  const handleCopy = async () => {
    if (!password || copied) return;
    try { await navigator.clipboard.writeText(password); }
    catch { /* fallback handled */ }
    setCopied(true);
    setRipple(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => { setCopied(false); setRipple(false); }, 2400);
  };

  const handleRegen = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
    onRegenerate();
  };

  const isSymbol  = c => '!@#$%^&*()_+-=[]{}|;:,.<>?~`'.includes(c);
  const isNumber  = c => /[0-9]/.test(c);
  const isUpper   = c => /[A-Z]/.test(c);

  const charColor = (c) => {
    if (isSymbol(c))  return '#f06292';
    if (isNumber(c))  return '#67e8f9';
    if (isUpper(c))   return '#c084fc';
    return 'rgba(255,255,255,0.92)';
  };

  return (
    <div className="relative">
      {/* Outer glow based on strength */}
      <div
        className="absolute -inset-[2px] rounded-3xl transition-all duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${strength.color}22, ${strength.color}11)`,
          filter: 'blur(8px)',
          opacity: password ? 1 : 0,
        }}
      />

      <div className="glass-bright relative overflow-hidden" style={{ borderRadius: 24 }}>
        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(176,110,243,0.6), rgba(110,158,245,0.6), transparent)',
            backgroundSize: '200% auto',
            animation: 'shimmer 3s linear infinite',
          }}
        />

        {/* Label */}
        <div className="px-6 pt-5 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse-glow"
              style={{ background: strength.color || '#b06ef3', boxShadow: `0 0 8px ${strength.color}` }}
            />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Generated Password
            </span>
          </div>
          <span
            className="text-xs font-bold tracking-wide transition-all duration-300"
            style={{ color: strength.color || 'rgba(255,255,255,0.3)' }}
          >
            {strength.label !== 'None' ? strength.label : ''}
          </span>
        </div>

        {/* Password chars */}
        <div className="px-6 py-4 min-h-[72px] flex items-center no-scrollbar overflow-x-auto">
          {password ? (
            <div className="flex gap-[2px] flex-wrap">
              {chars.map(({ char, id }, i) => (
                <span
                  key={id}
                  className="font-mono text-2xl font-semibold"
                  style={{
                    color: charColor(char),
                    // Cap stagger at 0.3s total so long passwords don't lag
                    animation: `charPop 0.3s cubic-bezier(0.34,1.56,0.64,1) ${Math.min(i * 0.018, 0.3)}s both`,
                    display: 'inline-block',
                    willChange: 'transform, opacity',
                    textShadow: isSymbol(char) ? '0 0 10px rgba(240,98,146,0.55)' : isNumber(char) ? '0 0 10px rgba(103,232,249,0.55)' : isUpper(char) ? '0 0 10px rgba(192,132,252,0.45)' : 'none',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          ) : (
            <span className="font-body text-base" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Click generate to create your password...
            </span>
          )}
        </div>

        {/* Actions bar */}
        <div
          className="mx-4 mb-4 p-1 flex gap-2 items-center"
          style={{
            background: 'rgba(0,0,0,0.25)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* Copy button */}
          <button
            onClick={handleCopy}
            disabled={!password}
            className="relative flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: copied
                ? 'linear-gradient(135deg, rgba(0,229,160,0.2), rgba(0,229,160,0.1))'
                : 'rgba(255,255,255,0.05)',
              color: copied ? '#00e5a0' : 'rgba(255,255,255,0.7)',
              border: `1px solid ${copied ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            {/* Ripple effect */}
            {ripple && (
              <div
                className="absolute inset-0 rounded-xl animate-ring-ping pointer-events-none"
                style={{ background: 'rgba(0,229,160,0.15)' }}
              />
            )}
            <span className={copied ? 'animate-copy-success' : ''}>
              {copied ? <CheckIcon /> : <CopyIcon />}
            </span>
            {copied ? 'Copied!' : 'Copy Password'}
          </button>

          {/* Regenerate */}
          <button
            onClick={handleRegen}
            className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
            style={{
              background: 'rgba(176,110,243,0.1)',
              border: '1px solid rgba(176,110,243,0.2)',
              color: 'rgba(176,110,243,0.9)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(176,110,243,0.2)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(176,110,243,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(176,110,243,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
            title="Regenerate"
          >
            <span style={{ display: 'inline-block', animation: spinning ? 'spin 0.5s cubic-bezier(0.16,1,0.3,1)' : 'none' }}>
              <RefreshIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
