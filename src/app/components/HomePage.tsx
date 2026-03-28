import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wind, Activity, Heart, AlertTriangle, Phone, Pill, Clock, 
  TrendingUp, TrendingDown, ChevronRight, Calendar, Info 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine, ReferenceArea 
} from 'recharts';

// ─── Glassmorphism style constants ───
const glass = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
};

const glassSubtle = {
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
};

// ─── 30-Day Risk Progression Data ───
const riskProgressionData = [
  { day: 1, dayLabel: 'Day 1', riskScore: 15, status: 'Low' },
  { day: 2, dayLabel: 'Day 2', riskScore: 16, status: 'Low' },
  { day: 3, dayLabel: 'Day 3', riskScore: 17, status: 'Low' },
  { day: 4, dayLabel: 'Day 4', riskScore: 16, status: 'Low' },
  { day: 5, dayLabel: 'Day 5', riskScore: 18, status: 'Low' },
  { day: 6, dayLabel: 'Day 6', riskScore: 17, status: 'Low' },
  { day: 7, dayLabel: 'Day 7', riskScore: 19, status: 'Low' },
  { day: 8, dayLabel: 'Day 8', riskScore: 18, status: 'Low' },
  { day: 9, dayLabel: 'Day 9', riskScore: 20, status: 'Low' },
  { day: 10, dayLabel: 'Day 10', riskScore: 22, status: 'Medium-Low' },
  { day: 11, dayLabel: 'Day 11', riskScore: 25, status: 'Medium-Low' },
  { day: 12, dayLabel: 'Day 12', riskScore: 28, status: 'Medium-Low' },
  { day: 13, dayLabel: 'Day 13', riskScore: 31, status: 'Medium-Low' },
  { day: 14, dayLabel: 'Day 14', riskScore: 34, status: 'Medium-Low' },
  { day: 15, dayLabel: 'Day 15', riskScore: 37, status: 'Medium-Low' },
  { day: 16, dayLabel: 'Day 16', riskScore: 40, status: 'Medium-Low' },
  { day: 17, dayLabel: 'Day 17', riskScore: 43, status: 'Medium' },
  { day: 18, dayLabel: 'Day 18', riskScore: 46, status: 'Medium' },
  { day: 19, dayLabel: 'Day 19', riskScore: 49, status: 'Medium' },
  { day: 20, dayLabel: 'Day 20', riskScore: 52, status: 'Medium' },
  { day: 21, dayLabel: 'Day 21', riskScore: 56, status: 'Medium' },
  { day: 22, dayLabel: 'Day 22', riskScore: 59, status: 'Medium' },
  { day: 23, dayLabel: 'Day 23', riskScore: 62, status: 'Medium-High' },
  { day: 24, dayLabel: 'Day 24', riskScore: 65, status: 'Medium-High' },
  { day: 25, dayLabel: 'Day 25', riskScore: 68, status: 'Medium-High' },
  { day: 26, dayLabel: 'Day 26', riskScore: 71, status: 'Medium-High' },
  { day: 27, dayLabel: 'Day 27', riskScore: 73, status: 'Medium-High' },
  { day: 28, dayLabel: 'Day 28', riskScore: 74, status: 'Medium-High' },
  { day: 29, dayLabel: 'Day 29', riskScore: 72, status: 'Medium-High' },
  { day: 30, dayLabel: 'Today', riskScore: 73, status: 'Medium-High' },
];

// Timeline events showing key changes
interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'alert';
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'Day 1-9',
    title: 'Stable Period',
    description: 'Your breathing was within normal range',
    severity: 'info',
  },
  {
    date: 'Day 10-16',
    title: 'Early Changes',
    description: 'We noticed gradual increases in respiratory rate',
    severity: 'info',
  },
  {
    date: 'Day 17-22',
    title: 'Pattern Shift',
    description: 'Coughing became more frequent, especially mornings',
    severity: 'warning',
  },
  {
    date: 'Day 23-30',
    title: 'Elevated Risk Period',
    description: 'Multiple indicators suggest your breathing needs attention',
    severity: 'alert',
  },
];

// Custom dot for "Today" marker
const CustomDot = (props: any) => {
  const { cx, cy, index, payload } = props;
  
  // Only show special dot for the last point (Day 30 - Today)
  if (payload.day !== 30) return null;
  
  return (
    <g key={`today-dot-${payload.day}`}>
      <circle key={`outer-${payload.day}`} cx={cx} cy={cy} r={8} fill="#f97316" opacity={0.2} />
      <circle key={`inner-${payload.day}`} cx={cx} cy={cy} r={5} fill="#f97316" stroke="white" strokeWidth={2} />
    </g>
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload[0]) return null;
  
  const data = payload[0].payload;
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.5)',
      borderRadius: '12px',
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    }}>
      <p style={{ fontSize: '12px', fontWeight: 600, color: '#1E293B', margin: 0 }}>
        {data.dayLabel}
      </p>
      <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
        Risk: {data.riskScore}/100
      </p>
      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0 0' }}>
        {data.status}
      </p>
    </div>
  );
};

export function HomePage() {
  const [showTimeline, setShowTimeline] = useState(false);
  const currentRisk = riskProgressionData[riskProgressionData.length - 1];
  const startRisk = riskProgressionData[0];

  return (
    <div className="space-y-6 pb-6">
      
      {/* ── Personal Greeting ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-2"
      >
        <h1 className="text-[#1E293B] text-[1.4rem]">Hello, John</h1>
        <p className="text-slate-500 text-[0.9rem] mt-1">Here's how you've been doing</p>
      </motion.div>

      {/* ── Current Status Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl p-5"
        style={{
          ...glass,
          background: 'linear-gradient(135deg, rgba(255, 241, 242, 0.8) 0%, rgba(255, 247, 237, 0.8) 100%)',
          border: '1px solid rgba(251, 113, 133, 0.3)',
          boxShadow: '0 8px 32px rgba(251, 113, 133, 0.12)',
        }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#FB7185]/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#FB7185]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#9F1239] text-[1.05rem]">We've noticed some changes</h3>
            <p className="text-[0.85rem] text-slate-600 mt-1 leading-relaxed">
              Over the past 30 days, your breathing has gradually become more difficult. This is important to address.
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-[#FB7185] text-white rounded-xl hover:bg-[#F43F5E] transition-colors text-[0.85rem] shadow-sm flex-1">
            <Phone className="w-4 h-4" />
            Call My Nurse
          </button>
          <button className="flex items-center gap-2 px-4 py-3 min-h-[44px] text-[#9F1239] rounded-xl hover:bg-rose-50 transition-colors text-[0.85rem] flex-1"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(251,113,133,0.3)' }}>
            <Pill className="w-4 h-4" />
            Medication Help
          </button>
        </div>
      </motion.div>

      {/* ── 30-Day Risk Progression Chart ── */}
      <div className="rounded-2xl p-5" style={glass}>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[#1E293B]">Your condition over the past 30 days</h3>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-orange-100 text-orange-700 border border-orange-200">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              Medium-High Risk
            </div>
          </div>
          <p className="text-xs text-slate-400 tracking-wide">Risk score progression from stable to elevated</p>
        </div>
        
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={riskProgressionData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="33%" stopColor="#84cc16" />
                <stop offset="66%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            
            {/* Risk Zone Backgrounds */}
            <ReferenceArea key="zone-1" y1={0} y2={20} fill="#10b981" fillOpacity={0.08} />
            <ReferenceArea key="zone-2" y1={20} y2={40} fill="#84cc16" fillOpacity={0.08} />
            <ReferenceArea key="zone-3" y1={40} y2={60} fill="#eab308" fillOpacity={0.08} />
            <ReferenceArea key="zone-4" y1={60} y2={80} fill="#f97316" fillOpacity={0.08} />
            <ReferenceArea key="zone-5" y1={80} y2={100} fill="#ef4444" fillOpacity={0.08} />
            
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            
            <XAxis 
              dataKey="dayLabel" 
              stroke="#94a3b8" 
              tick={{ fontSize: 10 }}
              tickMargin={8}
              interval="preserveStartEnd"
              ticks={['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Today']}
            />
            
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fontSize: 11 }}
              domain={[0, 100]}
              tickMargin={8}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Horizontal zone lines */}
            <ReferenceLine key="line-1" y={20} stroke="#10b981" strokeDasharray="5 5" strokeOpacity={0.3} />
            <ReferenceLine key="line-2" y={40} stroke="#84cc16" strokeDasharray="5 5" strokeOpacity={0.3} />
            <ReferenceLine key="line-3" y={60} stroke="#eab308" strokeDasharray="5 5" strokeOpacity={0.3} />
            <ReferenceLine key="line-4" y={80} stroke="#f97316" strokeDasharray="5 5" strokeOpacity={0.3} />
            
            <Line 
              type="monotone" 
              dataKey="riskScore" 
              stroke="url(#riskGradient)" 
              strokeWidth={3} 
              dot={<CustomDot />}
              activeDot={false}
              name="Risk Score"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 pt-4 border-t border-slate-100/60">
          <p className="text-xs text-slate-500 italic mb-3">
            Compared to your usual pattern
          </p>
          
          {/* Risk Zone Legend */}
          <div className="grid grid-cols-5 gap-1.5 mb-3">
            <RiskZoneLegend color="bg-emerald-500" label="Low" range="0-20" />
            <RiskZoneLegend color="bg-lime-500" label="Med-Low" range="21-40" />
            <RiskZoneLegend color="bg-yellow-500" label="Medium" range="41-60" />
            <RiskZoneLegend color="bg-orange-500" label="Med-High" range="61-80" />
            <RiskZoneLegend color="bg-red-500" label="High" range="81-100" />
          </div>

          <button 
            onClick={() => setShowTimeline(!showTimeline)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-[0.8rem] text-teal-600"
          >
            <Calendar className="w-4 h-4" />
            {showTimeline ? 'Hide Timeline' : 'View Key Moments'}
          </button>
        </div>
      </div>

      {/* ── Timeline View (Expandable) ── */}
      <AnimatePresence>
        {showTimeline && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl p-5" style={glass}>
              <h3 className="text-[#1E293B] mb-4">Key Moments in Your Journey</h3>
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <TimelineItem key={index} event={event} isLast={index === timelineEvents.length - 1} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Risk Change Summary ── */}
      <div>
        <h3 className="text-[#1E293B] mb-3">30-Day Change Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          <RiskChangeCard
            label="Starting Risk"
            value={startRisk.riskScore}
            status={startRisk.status}
            color="emerald"
          />
          <RiskChangeCard
            label="Current Risk"
            value={currentRisk.riskScore}
            status={currentRisk.status}
            color="orange"
          />
        </div>
      </div>

      {/* ── Today's Vitals ── */}
      <div>
        <h3 className="text-[#1E293B] mb-3">Right Now</h3>
        <div className="grid grid-cols-3 gap-3">
          <VitalCard 
            icon={Wind} 
            label="Breathing" 
            value="26" 
            unit="br/min"
            status="high"
          />
          <VitalCard 
            icon={Heart} 
            label="Oxygen" 
            value="92%" 
            unit=""
            status="medium"
          />
          <VitalCard 
            icon={Activity} 
            label="Activity" 
            value="42" 
            unit="score"
            status="low"
          />
        </div>
      </div>

      {/* ── Understanding Section ── */}
      <div className="rounded-2xl p-5" 
           style={{
             ...glassSubtle,
             background: 'rgba(240, 253, 250, 0.8)',
             border: '1px solid rgba(20, 184, 166, 0.2)',
           }}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
            <Info className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <h4 className="text-[#1E293B] text-[0.95rem] mb-1">What this means</h4>
            <p className="text-[0.85rem] text-slate-600 leading-relaxed">
              Your COPD symptoms are showing signs of worsening. This doesn't mean anything is wrong with you—it's your lungs asking for a bit more support right now. Speaking with your doctor can help get you feeling better.
            </p>
            <p className="text-[0.85rem] text-slate-600 leading-relaxed mt-2">
              The gradual increase from Day 10 onwards shows this has been building slowly. Early detection gives you the best chance to feel better quickly.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── Sub-components ───

interface RiskZoneLegendProps {
  color: string;
  label: string;
  range: string;
}

function RiskZoneLegend({ color, label, range }: RiskZoneLegendProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-full h-2 ${color} rounded-full mb-1`} />
      <span className="text-[0.65rem] text-slate-600 text-center leading-tight">{label}</span>
      <span className="text-[0.6rem] text-slate-400 text-center">{range}</span>
    </div>
  );
}

interface RiskChangeCardProps {
  label: string;
  value: number;
  status: string;
  color: 'emerald' | 'orange';
}

function RiskChangeCard({ label, value, status, color }: RiskChangeCardProps) {
  const colorMap = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  };
  const cfg = colorMap[color];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-2xl p-4 ${cfg.bg}`}
      style={{
        border: `1px solid ${color === 'emerald' ? 'rgba(16,185,129,0.2)' : 'rgba(249,115,22,0.2)'}`,
        boxShadow: color === 'emerald' ? '0 8px 24px rgba(16,185,129,0.08)' : '0 8px 24px rgba(249,115,22,0.08)',
      }}
    >
      <p className="text-xs text-slate-500 tracking-wide mb-2">{label}</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className={`text-[1.5rem] ${cfg.text}`}>{value}</span>
        <span className="text-xs text-slate-400">/100</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
        <span className="text-xs text-slate-600">{status}</span>
      </div>
    </motion.div>
  );
}

interface VitalCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'medium' | 'high' | 'low';
}

function VitalCard({ icon: Icon, label, value, unit, status }: VitalCardProps) {
  const cfgMap = {
    normal: { iconColor: 'text-emerald-500', dot: 'bg-emerald-400', glow: 'rgba(16,185,129,0.1)' },
    medium: { iconColor: 'text-amber-500', dot: 'bg-amber-400', glow: 'rgba(245,158,11,0.1)' },
    high: { iconColor: 'text-[#FB7185]', dot: 'bg-[#FB7185]', glow: 'rgba(251,113,133,0.1)' },
    low: { iconColor: 'text-slate-400', dot: 'bg-slate-300', glow: 'rgba(148,163,184,0.1)' },
  }[status];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="rounded-2xl p-4 text-center"
      style={{
        ...glass,
        boxShadow: `0 8px 24px ${cfgMap.glow}`,
      }}
    >
      <Icon className={`w-5 h-5 mx-auto ${cfgMap.iconColor}`} />
      <p className="text-[1.15rem] text-[#1E293B] mt-1.5">{value}</p>
      <p className="text-xs text-slate-400 tracking-wide">{label}</p>
      <div className={`w-2 h-2 rounded-full ${cfgMap.dot} mx-auto mt-2`} />
    </motion.div>
  );
}

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
}

function TimelineItem({ event, isLast }: TimelineItemProps) {
  const severityConfig = {
    info: { bg: 'bg-blue-500', ring: 'ring-blue-200' },
    warning: { bg: 'bg-amber-500', ring: 'ring-amber-200' },
    alert: { bg: 'bg-[#FB7185]', ring: 'ring-rose-200' },
  };
  const config = severityConfig[event.severity];

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${config.bg} ring-4 ${config.ring}`} />
        {!isLast && <div className="w-0.5 h-full bg-slate-200 mt-1" />}
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-[0.9rem] text-[#1E293B]">{event.title}</span>
          <span className="text-xs text-slate-400">{event.date}</span>
        </div>
        <p className="text-[0.85rem] text-slate-500 leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}