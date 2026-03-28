import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp, Wind, Activity, Heart, Droplets, Download, Calendar,
  ChevronDown, ChevronUp, CheckCircle, Filter, AlertTriangle
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ReferenceLine
} from 'recharts';

// ─── Mock Data ───
const spirometryData = [
  { month: 'Oct', fev1: 67, fvc: 79 },
  { month: 'Nov', fev1: 65, fvc: 77 },
  { month: 'Dec', fev1: 68, fvc: 80 },
  { month: 'Jan', fev1: 69, fvc: 81 },
  { month: 'Feb', fev1: 70, fvc: 82 },
  { month: 'Mar', fev1: 71, fvc: 83 },
];

const symptomScoreData = [
  { day: 'Mon', breathlessness: 3, cough: 2, mucus: 1.5, confirmed: true },
  { day: 'Tue', breathlessness: 4, cough: 3, mucus: 2, confirmed: false },
  { day: 'Wed', breathlessness: 3, cough: 2, mucus: 1, confirmed: true },
  { day: 'Thu', breathlessness: 2, cough: 1, mucus: 0.5, confirmed: false },
  { day: 'Fri', breathlessness: 3, cough: 2, mucus: 1, confirmed: true },
  { day: 'Sat', breathlessness: 4, cough: 3, mucus: 2, confirmed: true },
  { day: 'Sun', breathlessness: 4.5, cough: 4, mucus: 2.5, confirmed: false },
];

const activityData = [
  { day: 'Mon', steps: 3800, duration: 45 },
  { day: 'Tue', steps: 4200, duration: 52 },
  { day: 'Wed', steps: 3500, duration: 38 },
  { day: 'Thu', steps: 4500, duration: 58 },
  { day: 'Fri', steps: 3200, duration: 35 },
  { day: 'Sat', steps: 5100, duration: 65 },
  { day: 'Sun', steps: 4250, duration: 48 },
];

const medicationAdherence = [
  { name: 'Albuterol Inhaler', dosage: '2 puffs, 4x daily', adherence: 95, lastTaken: '2 hours ago' },
  { name: 'Tiotropium (Spiriva)', dosage: '1 capsule, daily', adherence: 100, lastTaken: '7:00 AM today' },
  { name: 'Fluticasone/Salmeterol', dosage: '1 puff, 2x daily', adherence: 90, lastTaken: '8:00 AM today' },
  { name: 'Prednisone', dosage: '10mg, daily', adherence: 85, lastTaken: 'Yesterday, 8:00 AM' },
];

// Custom dot to highlight confirmed symptom points
const ConfirmedDot = (props: any) => {
  const { cx, cy, index } = props;
  if (!symptomScoreData[index]?.confirmed) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill="#f59e0b" opacity={0.25} />
      <circle cx={cx} cy={cy} r={4} fill="#f59e0b" stroke="white" strokeWidth={1.5} />
    </g>
  );
};

type TimeRange = '7d' | '30d' | '90d';

export function TrendsPage() {
  const [selectedRange, setSelectedRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [expandedSection, setExpandedSection] = useState<string | null>('symptoms');
  const [showReport, setShowReport] = useState(false);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const sections = [
    { id: 'symptoms', title: 'Your Symptoms', subtitle: 'Breathlessness, cough, and mucus' },
    { id: 'lung', title: 'Lung Function', subtitle: 'FEV1 and FVC measurements' },
    { id: 'activity', title: 'Daily Activity', subtitle: 'Steps and active minutes' },
    { id: 'meds', title: 'Your Medications', subtitle: 'How well you\'re following your treatment plan' },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* ── Header ── */}
      <div>
        <h2 className="text-[#1E293B] mb-1">Your Health Journey</h2>
        <p className="text-[0.85rem] text-slate-400">Understanding how things have been changing</p>
      </div>

      {/* ── Time Range Selector ── */}
      <div className="flex items-center gap-2 rounded-2xl p-1.5"
           style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        {([
          { id: '7d' as TimeRange, label: '7 Days' },
          { id: '30d' as TimeRange, label: '30 Days' },
          { id: '90d' as TimeRange, label: '90 Days' },
        ]).map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedRange(t.id)}
            className={`flex-1 py-2.5 min-h-[44px] rounded-xl text-[0.85rem] transition-all ${
              selectedRange === t.id
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-sm'
                : 'text-slate-500 hover:bg-white/50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <QuickStat label="FEV1" value="71%" trend="+5%" up />
        <QuickStat label="CAT Score" value="18" trend="-3" up />
        <QuickStat label="Avg Steps" value="4,078" trend="+200" up />
        <QuickStat label="Adherence" value="93%" trend="+3%" up />
      </div>

      {/* ── Accordion Sections ── */}
      <div className="space-y-3">
        {sections.map(section => {
          const isOpen = expandedSection === section.id;
          return (
            <div key={section.id} className="rounded-2xl overflow-hidden"
                 style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-5 min-h-[56px] text-left"
              >
                <div>
                  <h3 className="text-[#1E293B]">{section.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 tracking-wide">{section.subtitle}</p>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      {section.id === 'symptoms' && <SymptomChart />}
                      {section.id === 'lung' && <LungChart />}
                      {section.id === 'activity' && <ActivityChart />}
                      {section.id === 'meds' && <MedsSection />}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── Report Preview Modal ── */}
      <AnimatePresence>
        {showReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowReport(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-xl"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-gray-900">Clinical Health Report</h3>
                <p className="text-xs text-gray-500 mt-1">7-Day Summary with Automated Risk Detection</p>
              </div>
              <div className="p-6 space-y-6">
                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-4 text-[0.85rem]">
                  <ReportRow label="Patient" value="John Anderson, 67M" />
                  <ReportRow label="Patient ID" value="#PAT-2024-2891" />
                  <ReportRow label="Diagnosis" value="COPD GOLD Stage II" />
                  <ReportRow label="Report Date" value="March 27, 2026" />
                </div>

                {/* Elevated Risk Alert */}
                <div className="rounded-xl p-4 bg-rose-50 border border-rose-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-[#FB7185]" />
                    <span className="text-sm text-[#9F1239]">ELEVATED RISK DETECTED</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated monitoring detected significant deviation from personal baseline over 7-day period. Immediate clinical assessment recommended.
                  </p>
                </div>

                {/* 7-Day Trend Chart */}
                <div>
                  <h4 className="text-gray-900 text-sm mb-3">7-Day Respiratory Trend</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={symptomScoreData}>
                      <CartesianGrid key="report-grid" strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis key="report-xaxis" dataKey="day" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                      <YAxis key="report-yaxis" stroke="#9ca3af" domain={[0, 6]} tick={{ fontSize: 11 }} />
                      <Tooltip key="report-tooltip" contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: 12 }} />
                      <Legend key="report-legend" wrapperStyle={{ fontSize: 11 }} />
                      <Line key="report-breathlessness" type="monotone" dataKey="breathlessness" stroke="#FB7185" strokeWidth={2} dot={{ r: 3, fill: '#FB7185' }} name="Breathlessness" />
                      <Line key="report-cough" type="monotone" dataKey="cough" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} name="Cough" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Key Signals */}
                <div>
                  <h4 className="text-gray-900 text-sm mb-3">Key Signal Changes</h4>
                  <div className="space-y-2 text-[0.85rem]">
                    <ReportRow label="Cough Frequency" value="+275% (4 → 15 episodes/day)" />
                    <ReportRow label="Respiratory Rate" value="+50% (16 → 24 br/min)" />
                    <ReportRow label="Activity Level" value="-50% (4200 → 2100 steps)" />
                    <ReportRow label="SpO₂" value="-3% (96% → 93%)" />
                    <ReportRow label="Sleep Quality" value="Disrupted (nocturnal cough episodes)" />
                  </div>
                </div>

                {/* Automated Detection Info */}
                <div className="rounded-xl p-4 bg-teal-50 border border-teal-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    <span className="text-xs text-teal-800">Passive Automated Monitoring</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All data collected automatically via wearable sensors and passive monitoring. No manual patient input required. Detection confidence: 92%.
                  </p>
                </div>

                {/* Clinical Recommendation */}
                <div>
                  <h4 className="text-gray-900 text-sm mb-2">Clinical Recommendation</h4>
                  <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                    Patient showing early signs of COPD exacerbation. Recommend immediate clinical assessment (teleconsult or in-person visit within 24 hours). Consider rescue medication protocol and possible short-term prednisone course. Follow-up spirometry advised.
                  </p>
                </div>

                {/* Metadata */}
                <div className="pt-4 border-t border-gray-100 text-xs text-gray-400">
                  <p>Generated automatically by AirAware COPD Monitoring System</p>
                  <p>Report ID: RPT-2024-03-27-1547 · Generated: March 27, 2024, 2:47 PM</p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex gap-3">
                <button
                  onClick={() => setShowReport(false)}
                  className="flex-1 min-h-[48px] bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 min-h-[48px] bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Chart Sub-components ───

function SymptomChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={symptomScoreData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
          <YAxis stroke="#9ca3af" domain={[0, 6]} tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: 13 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="breathlessness" stroke="#FB7185" fill="#FB7185" fillOpacity={0.12} strokeWidth={2} name="Breathlessness" />
          <Area type="monotone" dataKey="cough" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.10} strokeWidth={2} name="Cough" />
          <Area type="monotone" dataKey="mucus" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.10} strokeWidth={2} name="Mucus" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function LungChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={spirometryData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
        <YAxis stroke="#9ca3af" domain={[60, 90]} tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: 13 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <ReferenceLine y={70} stroke="#10b981" strokeDasharray="5 5" label={{ value: 'Target', fill: '#10b981', fontSize: 11 }} />
        <Line type="monotone" dataKey="fev1" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} name="FEV1 (%)" />
        <Line type="monotone" dataKey="fvc" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} name="FVC (%)" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={activityData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
        <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: 13 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="steps" fill="#10b981" name="Steps" radius={[6, 6, 0, 0]} />
        <Bar dataKey="duration" fill="#3b82f6" name="Duration (min)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function MedsSection() {
  return (
    <div className="space-y-3">
      {medicationAdherence.map(med => (
        <div key={med.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="min-w-0 flex-1">
            <p className="text-gray-900 text-[0.9rem] truncate">{med.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{med.dosage}</p>
            <p className="text-xs text-gray-400 mt-0.5">Last: {med.lastTaken}</p>
          </div>
          <div className="text-right ml-4 flex-shrink-0">
            <p className={`text-[1rem] ${med.adherence >= 95 ? 'text-emerald-600' : med.adherence >= 85 ? 'text-amber-600' : 'text-red-600'}`}>
              {med.adherence}%
            </p>
            <div className="w-20 h-2 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${med.adherence >= 95 ? 'bg-emerald-500' : med.adherence >= 85 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${med.adherence}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Utilities ───

function QuickStat({ label, value, trend, up }: { label: string; value: string; trend: string; up: boolean }) {
  return (
    <div className="rounded-2xl p-4"
         style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
      <p className="text-xs text-slate-400 tracking-wide">{label}</p>
      <p className="text-[1.25rem] text-[#1E293B] mt-1">{value}</p>
      <span className={`text-xs ${up ? 'text-emerald-600' : 'text-[#FB7185]'}`}>
        {up ? '↑' : '↓'} {trend}
      </span>
    </div>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-400 flex-shrink-0">{label}</span>
      <span className="text-[#1E293B] text-right">{value}</span>
    </div>
  );
}