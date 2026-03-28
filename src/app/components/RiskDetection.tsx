import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, TrendingDown, Activity, Wind, ThermometerSun, Shield, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const respiratoryTrend = [
  { hour: '6AM', rate: 16, baseline: 16 },
  { hour: '8AM', rate: 17, baseline: 16 },
  { hour: '10AM', rate: 19, baseline: 16 },
  { hour: '12PM', rate: 21, baseline: 16 },
  { hour: '2PM', rate: 23, baseline: 16 },
  { hour: '4PM', rate: 22, baseline: 16 },
  { hour: 'Now', rate: 24, baseline: 16 },
];

const activityTrend = [
  { day: 'Mon', steps: 4200, baseline: 4000 },
  { day: 'Tue', steps: 3800, baseline: 4000 },
  { day: 'Wed', steps: 3200, baseline: 4000 },
  { day: 'Thu', steps: 2800, baseline: 4000 },
  { day: 'Fri', steps: 2400, baseline: 4000 },
  { day: 'Sat', steps: 2100, baseline: 4000 },
  { day: 'Sun', steps: 1800, baseline: 4000 },
];

interface RiskFactor {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  deviation: string;
  severity: 'low' | 'medium' | 'high';
}

const riskFactors: RiskFactor[] = [
  {
    id: '1',
    label: 'Increased Respiratory Rate',
    icon: Wind,
    description: 'Respiratory rate has risen from 16 to 24 breaths/min over the past 12 hours.',
    deviation: '+50% above baseline',
    severity: 'high',
  },
  {
    id: '2',
    label: 'Reduced Physical Activity',
    icon: Activity,
    description: 'Daily step count has decreased steadily over the past 7 days.',
    deviation: '-55% below average',
    severity: 'high',
  },
  {
    id: '3',
    label: 'Increased Cough Frequency',
    icon: ThermometerSun,
    description: 'Cough episodes have tripled compared to your 30-day average.',
    deviation: '+200% above normal',
    severity: 'medium',
  },
  {
    id: '4',
    label: 'Declining SpO2 Trend',
    icon: TrendingDown,
    description: 'Blood oxygen saturation trending downward from 95% to 92%.',
    deviation: '-3% from baseline',
    severity: 'medium',
  },
];

export function RiskDetection() {
  const [acknowledged, setAcknowledged] = useState(false);
  const overallRisk: 'low' | 'medium' | 'high' = 'high';

  const riskColors = {
    low: { bg: 'from-green-500 to-emerald-600', text: 'Low Risk' },
    medium: { bg: 'from-yellow-500 to-orange-500', text: 'Medium Risk' },
    high: { bg: 'from-red-500 to-rose-600', text: 'High Risk' },
  };

  const factorSeverity = {
    low: 'border-green-200 bg-green-50',
    medium: 'border-yellow-200 bg-yellow-50',
    high: 'border-red-200 bg-red-50',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Risk Detection & Alerts</h2>
        <p className="text-gray-600 mt-1">Early exacerbation detection based on your health patterns</p>
      </div>

      {/* Risk Level Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-r ${riskColors[overallRisk].bg} rounded-xl shadow-lg p-6 text-white`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <AlertTriangle className="w-8 h-8" />
              <span className="text-sm uppercase tracking-wide opacity-90">Current Risk Level</span>
            </div>
            <p className="text-4xl font-bold">{riskColors[overallRisk].text}</p>
            <p className="mt-2 opacity-90">
              Early exacerbation warning detected. Deviation from your normal pattern identified across multiple indicators.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center">
              <Shield className="w-12 h-12 opacity-80" />
            </div>
          </div>
        </div>
        {!acknowledged && (
          <button
            onClick={() => setAcknowledged(true)}
            className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <span>Acknowledge Alert</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        {acknowledged && (
          <p className="mt-4 text-sm opacity-80">Alert acknowledged. Your care team has been notified.</p>
        )}
      </motion.div>

      {/* Risk Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {riskFactors.map((factor, i) => {
          const Icon = factor.icon;
          return (
            <motion.div
              key={factor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border p-5 ${factorSeverity[factor.severity]}`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{factor.label}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      factor.severity === 'high' ? 'bg-red-100 text-red-700' :
                      factor.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {factor.deviation}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{factor.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Respiratory Rate Today</h3>
          <p className="text-sm text-gray-500 mb-4">Compared to your personal baseline of 16 breaths/min</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={respiratoryTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[12, 28]} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <ReferenceLine y={16} stroke="#10b981" strokeDasharray="5 5" label={{ value: 'Baseline', fill: '#10b981', fontSize: 12 }} />
              <ReferenceLine y={22} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Alert', fill: '#ef4444', fontSize: 12 }} />
              <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} name="Resp. Rate" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Activity Level (7 Days)</h3>
          <p className="text-sm text-gray-500 mb-4">Step count declining below your average of 4,000 steps/day</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={activityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 5000]} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <ReferenceLine y={4000} stroke="#3b82f6" strokeDasharray="5 5" label={{ value: 'Avg', fill: '#3b82f6', fontSize: 12 }} />
              <Line type="monotone" dataKey="steps" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} name="Steps" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-2">How Risk is Calculated</h4>
        <p className="text-sm text-blue-800">
          Our AI monitors your respiratory rate, activity levels, cough frequency, and oxygen saturation continuously. When multiple indicators deviate from your personal baseline simultaneously, an early exacerbation warning is triggered. This system detects potential flare-ups 24-48 hours before they typically become severe.
        </p>
      </div>
    </div>
  );
}
