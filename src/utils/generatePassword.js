const SETS = {
  upper:   { chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', size: 26 },
  lower:   { chars: 'abcdefghijklmnopqrstuvwxyz', size: 26 },
  numbers: { chars: '0123456789', size: 10 },
  symbols: { chars: '!@#$%^&*()_+-=[]{}|;:,.<>?~`', size: 30 },
};

export function generatePassword({ length, upper, lower, numbers, symbols }) {
  const enabled = Object.entries({ upper, lower, numbers, symbols })
    .filter(([, v]) => v)
    .map(([k]) => SETS[k].chars);

  if (!enabled.length) return '';

  const pool = enabled.join('');
  const buf  = new Uint32Array(length + enabled.length);
  window.crypto.getRandomValues(buf);

  // At least one from each enabled set
  const guaranteed = enabled.map((set, i) => set[buf[i] % set.length]);
  const rest = Array.from({ length: length - enabled.length }, (_, i) =>
    pool[buf[enabled.length + i] % pool.length]
  );

  const combined = [...guaranteed, ...rest];
  // Fisher-Yates with crypto randomness
  const shuffleBuf = new Uint32Array(combined.length);
  window.crypto.getRandomValues(shuffleBuf);
  for (let i = combined.length - 1; i > 0; i--) {
    const j = shuffleBuf[i] % (i + 1);
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined.join('');
}

export function getStrength(password, opts) {
  if (!password) return { label: 'None', score: 0, pct: 0, color: 'transparent', glow: 'transparent' };

  const types = [opts.upper, opts.lower, opts.numbers, opts.symbols].filter(Boolean).length;
  const len   = password.length;
  let score   = 0;

  if (len >= 8)  score++;
  if (len >= 12) score++;
  if (len >= 18) score++;
  if (len >= 24) score++;
  if (types >= 2) score++;
  if (types >= 3) score++;
  if (types === 4) score++;

  if (score <= 2) return { label: 'Weak',        score: 1, pct: 25,  color: '#ff4d6d', glow: 'rgba(255,77,109,0.4)' };
  if (score <= 4) return { label: 'Fair',         score: 2, pct: 50,  color: '#ffcc00', glow: 'rgba(255,204,0,0.4)' };
  if (score <= 5) return { label: 'Strong',       score: 3, pct: 75,  color: '#00e5a0', glow: 'rgba(0,229,160,0.4)' };
  return              { label: 'Unbreakable',  score: 4, pct: 100, color: '#00e5a0', glow: 'rgba(0,229,160,0.5)' };
}

export function getEntropy(password, opts) {
  if (!password) return 0;
  const poolSize = [
    opts.upper   ? 26 : 0,
    opts.lower   ? 26 : 0,
    opts.numbers ? 10 : 0,
    opts.symbols ? 30 : 0,
  ].reduce((a, b) => a + b, 0);
  return Math.floor(password.length * Math.log2(poolSize || 1));
}
