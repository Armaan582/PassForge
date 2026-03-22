import { useState, useCallback, useEffect, useRef } from 'react';
import Background from './components/Background';
import PasswordDisplay from './components/PasswordDisplay';
import Controls from './components/Controls';
import StrengthMeter from './components/StrengthMeter';
import StatsRow from './components/StatsRow';
import GithubButton from './components/GithubButton';
import { generatePassword, getStrength, getEntropy } from './utils/generatePassword';

const DEFAULT = { length: 16, upper: true, lower: true, numbers: true, symbols: false };

function ShieldLogo() {
  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <div
        className="absolute inset-0 rounded-xl animate-pulse-glow"
        style={{ background: 'linear-gradient(135deg, rgba(176,110,243,0.3), rgba(110,158,245,0.2))', borderRadius: 12 }}
      />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#sg)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}>
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c084fc"/>
            <stop offset="100%" stopColor="#67e8f9"/>
          </linearGradient>
        </defs>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    </div>
  );
}

export default function App() {
  const [options, setOptions]   = useState(DEFAULT);
  const [password, setPassword] = useState('');
  const [mounted, setMounted]   = useState(false);
  const [genCount, setGenCount] = useState(0);
  const mainRef = useRef(null);

  const regen = useCallback(() => {
    const pw = generatePassword(options);
    setPassword(pw);
    setGenCount(c => c + 1);
  }, [options]);

  useEffect(() => {
    const pw = generatePassword(DEFAULT);
    setPassword(pw);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) regen();
  }, [options.length, options.upper, options.lower, options.numbers, options.symbols]);

  const strength = getStrength(password, options);
  const entropy  = getEntropy(password, options);

  return (
    <div className="relative min-h-screen flex flex-col" style={{ isolation: 'isolate' }}>
      <Background />

      {/* ── NAV ── */}
      <nav
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(3,1,10,0.3)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-3">
          <ShieldLogo />
          <div>
            <div className="font-body font-black text-xl leading-none tracking-tight">
              Pass<span className="text-aurora">Forge</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              SECURE GENERATOR
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(0,229,160,0.08)',
              border: '1px solid rgba(0,229,160,0.2)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
            <span className="font-mono text-xs font-medium" style={{ color: '#00e5a0' }}>
              Zero data stored
            </span>
          </div>
          <GithubButton />
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <main
        ref={mainRef}
        className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 md:px-6 pt-12 pb-20"
      >
        {/* Headline */}
        <div
          className="text-center mb-10 space-y-4"
          style={{ animation: 'slideUpFade 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2 font-mono text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'linear-gradient(135deg, rgba(176,110,243,0.12), rgba(110,158,245,0.08))',
              border: '1px solid rgba(176,110,243,0.25)',
              color: '#c084fc',
            }}
          >
            <span className="animate-pulse-glow">⚡</span>
            Powered by Web Crypto API
          </div>

          <h1 className="font-body font-black leading-tight" style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)' }}>
            Generate{' '}
            <span
              className="text-aurora"
              style={{ display: 'inline-block', animation: 'slideUpFade 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}
            >
              Ultra-Secure
            </span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Passwords Instantly</span>
          </h1>

          <p
            className="font-body text-base max-w-md mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.38)', animation: 'slideUpFade 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}
          >
            Cryptographically random. Customizable. Beautiful.
            Built for developers and security enthusiasts.
          </p>
        </div>

        {/* ── MAIN CARD ── */}
        <div
          className="w-full max-w-xl space-y-4"
          style={{ animation: 'slideUpFade 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}
        >
          {/* Password display */}
          <PasswordDisplay
            password={password}
            onRegenerate={regen}
            strength={strength}
          />

          {/* Strength + entropy */}
          <div
            className="px-5 py-4 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <StrengthMeter strength={strength} entropy={entropy} />
          </div>

          {/* Stats */}
          <StatsRow password={password} entropy={entropy} strength={strength} />

          {/* Controls */}
          <div style={{ animation: 'slideUpFade 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both' }}>
            <Controls options={options} setOptions={setOptions} />
          </div>

          {/* Generate Button */}
          <div style={{ animation: 'slideUpFade 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both' }}>
            <button
              className="btn-generate w-full flex items-center justify-center gap-3"
              onClick={regen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Generate New Password
              {genCount > 0 && (
                <span
                  className="ml-1 text-xs font-mono opacity-60"
                  style={{ fontWeight: 400 }}
                >
                  #{genCount}
                </span>
              )}
            </button>
          </div>

          {/* Color legend */}
          <div
            className="flex items-center justify-center gap-5 py-3"
            style={{ animation: 'slideUpFade 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both' }}
          >
            {[
              { color: '#c084fc', label: 'Uppercase' },
              { color: '#67e8f9', label: 'Numbers' },
              { color: '#f06292', label: 'Symbols' },
              { color: 'rgba(255,255,255,0.7)', label: 'Lowercase' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="relative z-10 py-6 px-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(3,1,10,0.5)' }}
      >
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Built with ❤️ by{' '}
            <a
              href="https://github.com/Armaan582"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors duration-200"
              style={{ color: '#c084fc' }}
              onMouseEnter={e => e.currentTarget.style.color = '#e9d5ff'}
              onMouseLeave={e => e.currentTarget.style.color = '#c084fc'}
            >
              Armaanjot Singh
            </a>
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
              v2.0.0
            </span>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
              <span className="font-mono text-[10px]" style={{ color: 'rgba(0,229,160,0.7)' }}>
                100% Client-Side
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
