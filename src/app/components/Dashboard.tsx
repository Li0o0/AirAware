import { Activity, Wind, Heart, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for the last 7 days
const lungFunctionData = [
  { day: 'Mon', fev1: 68, peakFlow: 320 },
  { day: 'Tue', fev1: 65, peakFlow: 310 },
  { day: 'Wed', fev1: 70, peakFlow: 335 },
  { day: 'Thu', fev1: 67, peakFlow: 325 },
  { day: 'Fri', fev1: 64, peakFlow: 305 },
  { day: 'Sat', fev1: 69, peakFlow: 330 },
  { day: 'Sun', fev1: 71, peakFlow: 340 },
];

const symptomScoreData = [
  { day: 'Mon', breathlessness: 3, cough: 2, mucus: 2 },
  { day: 'Tue', breathlessness: 4, cough: 3, mucus: 3 },
  { day: 'Wed', breathlessness: 3, cough: 2, mucus: 2 },
  { day: 'Thu', breathlessness: 3, cough: 2, mucus: 1 },
  { day: 'Fri', breathlessness: 5, cough: 4, mucus: 3 },
  { day: 'Sat', breathlessness: 4, cough: 3, mucus: 2 },
  { day: 'Sun', breathlessness: 3, cough: 2, mucus: 2 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Health Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm uppercase tracking-wide">Overall Health Status</p>
            <p className="text-3xl font-bold mt-1">Mild Risk</p>
            <p className="text-yellow-100 mt-2 text-sm">Based on your personal baseline — some indicators are elevated</p>
          </div>
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">1 Active Alert</span>
          </div>
        </div>
      </motion.div>

      {/* Patient Info Banner */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">John Anderson</h2>
            <p className="text-gray-600 mt-1">Patient ID: #PAT-2024-1547 • Age: 68 • Male</p>
            <div className="flex items-center space-x-4 mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                GOLD Stage II
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Moderate COPD
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last Visit</p>
            <p className="text-lg font-semibold text-gray-900">March 14, 2026</p>
            <p className="text-sm text-gray-500 mt-1">Next Checkup: April 14, 2026</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Wind}
          title="FEV1"
          value="71%"
          subtitle="of predicted"
          trend="+2%"
          trendUp={true}
          color="blue"
        />
        <MetricCard
          icon={Activity}
          title="Peak Flow"
          value="340"
          subtitle="L/min"
          trend="+10"
          trendUp={true}
          color="green"
        />
        <MetricCard
          icon={Heart}
          title="SpO2"
          value="94%"
          subtitle="blood oxygen"
          trend="-1%"
          trendUp={false}
          color="red"
        />
        <MetricCard
          icon={TrendingUp}
          title="Daily Steps"
          value="4,250"
          subtitle="today"
          trend="+450"
          trendUp={true}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lung Function Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lung Function Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lungFunctionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="fev1"
                stroke="#3b82f6"
                strokeWidth={2}
                name="FEV1 (%)"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="peakFlow"
                stroke="#10b981"
                strokeWidth={2}
                name="Peak Flow (L/min)"
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Symptom Scores Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Symptom Severity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={symptomScoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 5]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="breathlessness"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
                name="Breathlessness"
              />
              <Area
                type="monotone"
                dataKey="cough"
                stackId="1"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.6}
                name="Cough"
              />
              <Area
                type="monotone"
                dataKey="mucus"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
                name="Mucus"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          <AlertItem
            severity="warning"
            message="Increased breathlessness reported on Friday"
            time="2 days ago"
          />
          <AlertItem
            severity="info"
            message="Medication adherence: 95% this week"
            time="3 days ago"
          />
          <AlertItem
            severity="success"
            message="FEV1 improved by 2% over last week"
            time="1 week ago"
          />
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  trendUp: boolean;
  color: 'blue' | 'green' | 'red' | 'purple';
}

function MetricCard({ icon: Icon, title, value, subtitle, trend, trendUp, color }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

interface AlertItemProps {
  severity: 'warning' | 'info' | 'success';
  message: string;
  time: string;
}

function AlertItem({ severity, message, time }: AlertItemProps) {
  const severityClasses = {
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  };

  const iconClasses = {
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    success: 'text-green-600',
  };

  return (
    <div className={`flex items-start space-x-3 p-4 rounded-lg border ${severityClasses[severity]}`}>
      <AlertTriangle className={`w-5 h-5 mt-0.5 ${iconClasses[severity]}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
        <p className="text-xs opacity-75 mt-1">{time}</p>
      </div>
    </div>
  );
}