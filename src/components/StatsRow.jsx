function StatCard({ value, label, icon, color }) {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 px-3 rounded-2xl transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ color: color || 'rgba(255,255,255,0.4)', fontSize: 18 }}>
        {icon}
      </div>
      <div
        className="font-mono font-bold text-lg leading-none"
        style={{ color: color || 'rgba(255,255,255,0.8)' }}
      >
        {value}
      </div>
      <div className="font-body text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
        {label}
      </div>
    </div>
  );
}

export default function StatsRow({ password, entropy, strength }) {
  const crackTime = () => {
    if (!password) return '—';
    if (strength.score === 4) return 'Centuries';
    if (strength.score === 3) return 'Years';
    if (strength.score === 2) return 'Days';
    return 'Minutes';
  };

  return (
    <div className="flex gap-3">
      <StatCard
        value={password.length || '—'}
        label="Characters"
        icon="✦"
        color="#c084fc"
      />
      <StatCard
        value={entropy > 0 ? `${entropy}` : '—'}
        label="Entropy bits"
        icon="⚡"
        color="#67e8f9"
      />
      <StatCard
        value={crackTime()}
        label="To crack"
        icon="🔒"
        color={strength.color || 'rgba(255,255,255,0.4)'}
      />
    </div>
  );
}
