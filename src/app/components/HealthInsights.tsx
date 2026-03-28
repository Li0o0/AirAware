import { motion } from 'motion/react';
import { AlertCircle, Wind, Activity, Heart, TrendingDown, Check, Phone, Book } from 'lucide-react';

// ─── Glassmorphism style constants ───
const glass = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
};

export function HealthInsights() {
  return (
    <div className="space-y-5 pb-6">
      {/* ── Header ── */}
      <div>
        <h2 className="text-[#1E293B] mb-1">Your Health Insights</h2>
        <p className="text-[0.85rem] text-slate-400">
          We're monitoring your breathing and activity
        </p>
      </div>

      {/* ── Alert Banner ── */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-2xl p-5"
        style={{
          background: 'rgba(255, 245, 240, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(251, 113, 133, 0.2)',
          boxShadow: '0 8px 24px rgba(251, 113, 133, 0.08)',
        }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-rose-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#9F1239] text-[0.95rem] mb-1">Your risk is elevated</h3>
            <p className="text-[0.85rem] text-slate-600 leading-relaxed">
              We've detected changes that may indicate worsening breathing. Your condition may be getting worse.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <p className="text-xs text-slate-500">
            Detected automatically based on your normal patterns
          </p>
        </div>
      </motion.div>

      {/* ── What Changed ── */}
      <div>
        <h3 className="text-[#1E293B] mb-3 text-[0.95rem]">What we noticed this week</h3>
        <div className="space-y-2.5">
          <ChangeCard
            icon={Wind}
            label="Cough increased"
            detail="More frequent than usual"
            severity="high"
          />
          <ChangeCard
            icon={Heart}
            label="Oxygen slightly lower"
            detail="93% compared to your usual 96%"
            severity="medium"
          />
          <ChangeCard
            icon={Activity}
            label="Activity reduced"
            detail="About half your normal amount"
            severity="medium"
          />
          <ChangeCard
            icon={Wind}
            label="Breathing faster"
            detail="24 breaths per minute, usually 16"
            severity="high"
          />
        </div>
      </div>

      {/* ── What To Do ── */}
      <div>
        <h3 className="text-[#1E293B] mb-3 text-[0.95rem]">What you should do</h3>
        <div className="space-y-2.5">
          <ActionCard
            icon={Wind}
            title="Use your inhaler"
            description="Follow your usual rescue medication routine"
            priority="high"
          />
          <ActionCard
            icon={Activity}
            title="Take it easy and rest"
            description="Avoid strenuous activities for now"
            priority="medium"
          />
          <ActionCard
            icon={Book}
            title="Follow breathing exercises"
            description="Try pursed-lip breathing to help you relax"
            priority="medium"
          />
          <ActionCard
            icon={Phone}
            title="Contact your doctor if symptoms worsen"
            description="Call if breathing becomes more difficult"
            priority="low"
          />
        </div>
      </div>

      {/* ── Timeline Comparison ── */}
      <div className="rounded-2xl p-5" style={glass}>
        <h4 className="text-[#1E293B] text-[0.9rem] mb-2">Compared to your usual pattern</h4>
        <p className="text-[0.85rem] text-slate-600 leading-relaxed mb-4">
          These changes happened gradually over the past 7 days. Your device has been tracking everything automatically.
        </p>
        
        <div className="space-y-2">
          <ComparisonBar label="Cough frequency" current={275} normal={100} />
          <ComparisonBar label="Activity level" current={50} normal={100} />
          <ComparisonBar label="Oxygen level" current={97} normal={100} />
        </div>
      </div>

      {/* ── Reassurance Note ── */}
      <div className="rounded-2xl p-5 text-center" style={{
        background: 'rgba(240, 253, 250, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(45, 212, 191, 0.3)',
        boxShadow: '0 8px 24px rgba(45, 212, 191, 0.06)',
      }}>
        <p className="text-[0.85rem] text-slate-700 leading-relaxed">
          Your care team has been notified and will check in with you soon.
        </p>
      </div>
    </div>
  );
}

// ─── Change Card ───
interface ChangeCardProps {
  icon: React.ElementType;
  label: string;
  detail: string;
  severity: 'high' | 'medium';
}

function ChangeCard({ icon: Icon, label, detail, severity }: ChangeCardProps) {
  const colors = {
    high: {
      bg: 'rgba(255, 241, 242, 0.9)',
      border: 'rgba(251, 113, 133, 0.2)',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-500',
    },
    medium: {
      bg: 'rgba(255, 251, 235, 0.9)',
      border: 'rgba(251, 191, 36, 0.2)',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-500',
    },
  };

  const color = colors[severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl p-3.5 flex items-start gap-3"
      style={{
        background: color.bg,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${color.border}`,
      }}
    >
      <div className={`w-8 h-8 rounded-full ${color.iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${color.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[0.9rem] text-[#1E293B] mb-0.5">{label}</p>
        <p className="text-xs text-slate-500">{detail}</p>
      </div>
    </motion.div>
  );
}

// ─── Action Card ───
interface ActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

function ActionCard({ icon: Icon, title, description, priority }: ActionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4"
      style={glass}
    >
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
          priority === 'high' 
            ? 'bg-gradient-to-br from-teal-500 to-cyan-500' 
            : priority === 'medium'
            ? 'bg-teal-100'
            : 'bg-slate-100'
        }`}>
          <Icon className={`w-4.5 h-4.5 ${
            priority === 'high' ? 'text-white' : priority === 'medium' ? 'text-teal-600' : 'text-slate-500'
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[0.9rem] text-[#1E293B] mb-1">{title}</p>
          <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Comparison Bar ───
interface ComparisonBarProps {
  label: string;
  current: number;
  normal: number;
}

function ComparisonBar({ label, current, normal }: ComparisonBarProps) {
  const percentage = (current / normal) * 100;
  const isLower = current < normal;
  const isHigher = current > normal;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-slate-600">{label}</span>
        <span className={`text-xs ${
          isLower ? 'text-amber-600' : isHigher ? 'text-rose-600' : 'text-emerald-600'
        }`}>
          {isLower ? '↓' : isHigher ? '↑' : '→'} {Math.abs(percentage - 100).toFixed(0)}%
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            isLower ? 'bg-amber-400' : isHigher ? 'bg-rose-400' : 'bg-emerald-400'
          }`}
        />
      </div>
    </div>
  );
}
