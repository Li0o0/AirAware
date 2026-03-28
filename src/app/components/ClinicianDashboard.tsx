import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle, AlertCircle, ChevronDown, ChevronUp, Activity,
  Heart, Wind, TrendingUp, TrendingDown, Phone, User, Search,
  Bell, Clock, Stethoscope, FileText
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceArea
} from 'recharts';

// ─── Glassmorphism constants ───
const glass = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
};

// ─── Patient Mock Data ───
interface PatientData {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: string;
  patientId: string;
  hasCOPD: boolean;
  latestRisk: number;
  riskTrend: 'worsening' | 'stable' | 'improving';
  alertLevel: 'critical' | 'warning' | 'watch' | 'stable';
  alertMessage: string;
  riskData: { day: number; dayLabel: string; riskScore: number; status: string }[];
  vitals: { spo2: number; respRate: number; heartRate: number; fev1: number };
  lastUpdated: string;
}

const generateRiskData = (pattern: 'worsening' | 'stable_high' | 'moderate_rise' | 'stable_low' | 'improving') => {
  const data: { day: number; dayLabel: string; riskScore: number; status: string }[] = [];
  for (let i = 1; i <= 30; i++) {
    let score: number;
    switch (pattern) {
      case 'worsening':
        score = 15 + Math.round((i / 30) * 58) + Math.round(Math.random() * 4 - 2);
        break;
      case 'stable_high':
        score = 55 + Math.round(Math.sin(i * 0.3) * 8) + Math.round(Math.random() * 3);
        break;
      case 'moderate_rise':
        score = 20 + Math.round((i / 30) * 30) + Math.round(Math.random() * 5 - 2);
        break;
      case 'stable_low':
        score = 12 + Math.round(Math.sin(i * 0.5) * 5) + Math.round(Math.random() * 3);
        break;
      case 'improving':
        score = 60 - Math.round((i / 30) * 35) + Math.round(Math.random() * 4 - 2);
        break;
    }
    score = Math.max(5, Math.min(95, score));
    const status = score < 20 ? 'Low' : score < 40 ? 'Medium-Low' : score < 60 ? 'Medium' : score < 75 ? 'Medium-High' : 'High';
    data.push({ day: i, dayLabel: i === 30 ? 'Today' : `Day ${i}`, riskScore: score, status });
  }
  return data;
};

const patients: PatientData[] = [
  {
    id: '1', name: 'Margaret Chen', initials: 'MC', age: 72, gender: 'Female',
    patientId: '#PAT-2024-1847', hasCOPD: true,
    latestRisk: 82, riskTrend: 'worsening', alertLevel: 'critical',
    alertMessage: 'Rapid exacerbation detected — SpO₂ dropped below 90% twice this week',
    riskData: generateRiskData('worsening'),
    vitals: { spo2: 89, respRate: 24, heartRate: 98, fev1: 38 },
    lastUpdated: '12 min ago',
  },
  {
    id: '2', name: 'Robert Williams', initials: 'RW', age: 65, gender: 'Male',
    patientId: '#PAT-2024-2156', hasCOPD: true,
    latestRisk: 61, riskTrend: 'worsening', alertLevel: 'warning',
    alertMessage: 'Steady symptom increase over 2 weeks — cough frequency +40%',
    riskData: generateRiskData('stable_high'),
    vitals: { spo2: 92, respRate: 20, heartRate: 88, fev1: 52 },
    lastUpdated: '34 min ago',
  },
  {
    id: '3', name: 'John Anderson', initials: 'JA', age: 67, gender: 'Male',
    patientId: '#PAT-2024-2891', hasCOPD: true,
    latestRisk: 73, riskTrend: 'worsening', alertLevel: 'critical',
    alertMessage: 'Multiple indicators elevated — breathing pattern shift since Day 17',
    riskData: generateRiskData('worsening'),
    vitals: { spo2: 91, respRate: 22, heartRate: 92, fev1: 48 },
    lastUpdated: '8 min ago',
  },
  {
    id: '4', name: 'Susan Park', initials: 'SP', age: 58, gender: 'Female',
    patientId: '#PAT-2024-3204', hasCOPD: false,
    latestRisk: 45, riskTrend: 'worsening', alertLevel: 'watch',
    alertMessage: 'No COPD diagnosis — but respiratory symptoms reaching medium level, recommend evaluation',
    riskData: generateRiskData('moderate_rise'),
    vitals: { spo2: 95, respRate: 18, heartRate: 78, fev1: 72 },
    lastUpdated: '1 hr ago',
  },
  {
    id: '5', name: 'David Thompson', initials: 'DT', age: 74, gender: 'Male',
    patientId: '#PAT-2024-1523', hasCOPD: true,
    latestRisk: 18, riskTrend: 'improving', alertLevel: 'stable',
    alertMessage: 'Condition improving — risk score down 35% this month',
    riskData: generateRiskData('improving'),
    vitals: { spo2: 96, respRate: 16, heartRate: 72, fev1: 78 },
    lastUpdated: '2 hrs ago',
  },
  {
    id: '6', name: 'Linda Gomez', initials: 'LG', age: 61, gender: 'Female',
    patientId: '#PAT-2024-3891', hasCOPD: false,
    latestRisk: 48, riskTrend: 'stable', alertLevel: 'watch',
    alertMessage: 'No COPD diagnosis — persistent cough and mild dyspnea detected, consider spirometry',
    riskData: generateRiskData('moderate_rise'),
    vitals: { spo2: 94, respRate: 19, heartRate: 82, fev1: 68 },
    lastUpdated: '45 min ago',
  },
  {
    id: '7', name: 'James Mitchell', initials: 'JM', age: 70, gender: 'Male',
    patientId: '#PAT-2024-1102', hasCOPD: true,
    latestRisk: 15, riskTrend: 'stable', alertLevel: 'stable',
    alertMessage: 'Stable — all vitals within normal baseline',
    riskData: generateRiskData('stable_low'),
    vitals: { spo2: 95, respRate: 16, heartRate: 74, fev1: 65 },
    lastUpdated: '3 hrs ago',
  },
];

const alertConfig = {
  critical: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertTriangle, dot: 'bg-red-500', label: 'Critical' },
  warning: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertCircle, dot: 'bg-amber-500', label: 'Warning' },
  watch: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: Bell, dot: 'bg-blue-500', label: 'Review' },
  stable: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: Activity, dot: 'bg-emerald-500', label: 'Stable' },
};

// ─── Build gradient stops from risk data ───
function buildGradientStops(data: { riskScore: number }[]) {
  const stops: { offset: string; color: string }[] = [];
  data.forEach((point, i) => {
    const pct = (i / (data.length - 1)) * 100;
    const s = point.riskScore;
    const color = s < 30 ? '#10b981' : s < 60 ? '#f59e0b' : '#ef4444';
    stops.push({ offset: `${pct}%`, color });
  });
  return stops;
}

// ─── Chart tooltip ───
const ChartTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
      <p style={{ fontSize: '12px', color: '#1E293B', margin: 0 }}>{d.dayLabel}</p>
      <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Risk: {d.riskScore}/100</p>
      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0' }}>{d.status}</p>
    </div>
  );
};

// ─── Patient Row Component ───
function PatientRow({ patient, isExpanded, onToggle }: { patient: PatientData; isExpanded: boolean; onToggle: () => void }) {
  const cfg = alertConfig[patient.alertLevel];
  const Icon = cfg.icon;

  return (
    <motion.div
      layout
      style={glass}
      className="rounded-2xl overflow-hidden"
    >
      {/* Row header */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-white/30 transition-colors"
      >
        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-xs shrink-0">
          {patient.initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="text-[#1E293B] text-[0.9rem] truncate">{patient.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[0.7rem] text-slate-400 truncate">{patient.patientId} · {patient.age} yrs · {patient.gender}</p>
            {!patient.hasCOPD && (
              <span className="text-[0.6rem] px-1.5 py-0.5 rounded-full bg-slate-50 text-slate-400 shrink-0">No COPD Dx</span>
            )}
          </div>
        </div>

        {/* Risk score pill */}
        <div className={`px-2.5 py-1 rounded-full text-[0.7rem] ${cfg.bg} ${cfg.color} shrink-0`}>
          {patient.latestRisk}%
        </div>

        {/* Alert indicator */}
        {(patient.alertLevel === 'critical' || patient.alertLevel === 'warning') && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="shrink-0"
          >
            <Icon className={`w-5 h-5 ${cfg.color}`} />
          </motion.div>
        )}
        {patient.alertLevel === 'watch' && (
          <Bell className="w-4.5 h-4.5 text-blue-500 shrink-0" />
        )}

        {/* Expand chevron */}
        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-white/40">

              {/* Alert banner */}
              <div className={`mt-3 px-3.5 py-3 rounded-xl ${cfg.bg} border ${cfg.border} flex items-start gap-2.5`}>
                <Icon className={`w-4 h-4 ${cfg.color} mt-0.5 shrink-0`} />
                <div>
                  <p className={`text-[0.75rem] ${cfg.color}`}>{cfg.label}</p>
                  <p className="text-[0.72rem] text-slate-600 mt-0.5">{patient.alertMessage}</p>
                  <p className="text-[0.6rem] text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Updated {patient.lastUpdated} · Automatically detected based on personal baseline
                  </p>
                </div>
              </div>

              {/* Vitals grid */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'SpO₂', value: `${patient.vitals.spo2}%`, icon: Heart, warn: patient.vitals.spo2 < 92 },
                  { label: 'Resp Rate', value: `${patient.vitals.respRate}/min`, icon: Wind, warn: patient.vitals.respRate > 20 },
                  { label: 'Heart Rate', value: `${patient.vitals.heartRate} bpm`, icon: Activity, warn: patient.vitals.heartRate > 90 },
                  { label: 'FEV1', value: `${patient.vitals.fev1}%`, icon: TrendingUp, warn: patient.vitals.fev1 < 50 },
                ].map((v) => {
                  const VIcon = v.icon;
                  return (
                    <div key={v.label} className="bg-white/50 rounded-xl p-2.5 text-center border border-white/40">
                      <VIcon className={`w-3.5 h-3.5 mx-auto mb-1 ${v.warn ? 'text-red-400' : 'text-teal-500'}`} />
                      <p className={`text-[0.8rem] ${v.warn ? 'text-red-600' : 'text-[#1E293B]'}`}>{v.value}</p>
                      <p className="text-[0.55rem] text-slate-400 mt-0.5">{v.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* 30-Day Risk Chart */}
              <div className="bg-white/50 rounded-xl p-3 border border-white/40">
                <p className="text-[0.75rem] text-[#1E293B] mb-2">30-Day Risk Progression</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={patient.riskData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`riskGrad-${patient.id}`} x1="0" y1="0" x2="1" y2="0">
                          {buildGradientStops(patient.riskData).map((stop, i) => (
                            <stop key={i} offset={stop.offset} stopColor={stop.color} />
                          ))}
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <ReferenceArea key="zone-low" y1={0} y2={30} fill="#10b981" fillOpacity={0.06} />
                      <ReferenceArea key="zone-med" y1={30} y2={60} fill="#f59e0b" fillOpacity={0.06} />
                      <ReferenceArea key="zone-high" y1={60} y2={100} fill="#ef4444" fillOpacity={0.06} />
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={6} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                      <Tooltip content={<ChartTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="riskScore"
                        stroke={`url(#riskGrad-${patient.id})`}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 2, fill: 'white', stroke: '#64748b' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-2">
                  {[
                    { label: 'Low (<30)', color: '#10b981' },
                    { label: 'Medium (30-60)', color: '#f59e0b' },
                    { label: 'High (>60)', color: '#ef4444' },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                      <span className="text-[0.55rem] text-slate-400">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-teal-500 text-white text-[0.75rem] rounded-xl hover:bg-teal-600 transition-colors">
                  <FileText className="w-3.5 h-3.5" /> View Full Chart
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white/60 text-[#1E293B] text-[0.75rem] rounded-xl border border-white/50 hover:bg-white/80 transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Contact Patient
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Clinician Dashboard ───
export function ClinicianDashboard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'watch' | 'stable'>('all');

  const criticalCount = patients.filter(p => p.alertLevel === 'critical').length;
  const warningCount = patients.filter(p => p.alertLevel === 'warning').length;
  const watchCount = patients.filter(p => p.alertLevel === 'watch').length;

  const filtered = patients
    .filter(p => filter === 'all' || p.alertLevel === filter)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Sort: critical first, then warning, watch, stable
  const sortOrder = { critical: 0, warning: 1, watch: 2, stable: 3 };
  filtered.sort((a, b) => sortOrder[a.alertLevel] - sortOrder[b.alertLevel]);

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-[#1E293B] text-[1.3rem]">Patient Monitor</h1>
        <p className="text-[0.78rem] text-slate-400 mt-0.5">{patients.length} patients · {criticalCount + warningCount} need attention</p>
      </motion.div>

      {/* Summary cards */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-3 gap-2.5">
        {[
          { label: 'Critical', count: criticalCount, color: 'from-red-500 to-rose-500', textColor: 'text-white' },
          { label: 'Warning', count: warningCount, color: 'from-amber-400 to-orange-400', textColor: 'text-white' },
          { label: 'Review', count: watchCount, color: 'from-blue-400 to-indigo-400', textColor: 'text-white' },
        ].map((s) => (
          <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-xl p-3 text-center shadow-sm`}>
            <p className={`text-[1.3rem] ${s.textColor}`}>{s.count}</p>
            <p className={`text-[0.65rem] ${s.textColor} opacity-80`}>{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Search bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={glass} className="rounded-xl flex items-center gap-2 px-3.5 py-2.5">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-[0.82rem] text-[#1E293B] placeholder-slate-300 outline-none"
        />
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(['all', 'critical', 'warning', 'watch', 'stable'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-[0.7rem] whitespace-nowrap transition-colors ${
              filter === f
                ? 'bg-teal-500 text-white'
                : 'bg-white/50 text-slate-500 hover:bg-white/70'
            }`}
          >
            {f === 'all' ? 'All' : f === 'watch' ? 'Review' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Patient list */}
      <div className="space-y-3">
        {filtered.map((patient) => (
          <motion.div key={patient.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <PatientRow
              patient={patient}
              isExpanded={expandedId === patient.id}
              onToggle={() => setExpandedId(expandedId === patient.id ? null : patient.id)}
            />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-[0.82rem]">No patients match your search.</div>
        )}
      </div>
    </div>
  );
}