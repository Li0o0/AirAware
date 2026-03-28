import { Wind, Activity, Heart, Droplets, ThermometerSun } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const spirometryData = [
  { month: 'Sep', fev1: 66, fvc: 78, fev1fvc: 72 },
  { month: 'Oct', fev1: 67, fvc: 79, fev1fvc: 73 },
  { month: 'Nov', fev1: 65, fvc: 77, fev1fvc: 71 },
  { month: 'Dec', fev1: 68, fvc: 80, fev1fvc: 74 },
  { month: 'Jan', fev1: 69, fvc: 81, fev1fvc: 75 },
  { month: 'Feb', fev1: 70, fvc: 82, fev1fvc: 76 },
  { month: 'Mar', fev1: 71, fvc: 83, fev1fvc: 77 },
];

const peakFlowData = [
  { time: '6 AM', value: 310 },
  { time: '9 AM', value: 330 },
  { time: '12 PM', value: 340 },
  { time: '3 PM', value: 335 },
  { time: '6 PM', value: 325 },
  { time: '9 PM', value: 315 },
];

const vitalSignsData = [
  { subject: 'SpO2', value: 94, fullMark: 100 },
  { subject: 'Heart Rate', value: 72, fullMark: 100 },
  { subject: 'Resp. Rate', value: 18, fullMark: 30 },
  { subject: 'Blood Pressure', value: 128, fullMark: 160 },
  { subject: 'Temperature', value: 98.2, fullMark: 100 },
];

const exerciseData = [
  { day: 'Mon', steps: 3800, distance: 2.1, duration: 45 },
  { day: 'Tue', steps: 4200, distance: 2.4, duration: 52 },
  { day: 'Wed', steps: 3500, distance: 1.9, duration: 38 },
  { day: 'Thu', steps: 4500, distance: 2.6, duration: 58 },
  { day: 'Fri', steps: 3200, distance: 1.8, duration: 35 },
  { day: 'Sat', steps: 5100, distance: 2.9, duration: 65 },
  { day: 'Sun', steps: 4250, distance: 2.4, duration: 48 },
];

export function HealthMetrics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Health Metrics</h2>
        <p className="text-gray-600 mt-1">Comprehensive health data and trends</p>
      </div>

      {/* Current Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <VitalCard
          icon={Wind}
          label="FEV1"
          value="71%"
          unit="predicted"
          color="blue"
          status="stable"
        />
        <VitalCard
          icon={Heart}
          label="SpO2"
          value="94%"
          unit="oxygen"
          color="red"
          status="watch"
        />
        <VitalCard
          icon={Activity}
          label="Heart Rate"
          value="72"
          unit="bpm"
          color="green"
          status="normal"
        />
        <VitalCard
          icon={Droplets}
          label="Resp. Rate"
          value="18"
          unit="breaths/min"
          color="purple"
          status="normal"
        />
        <VitalCard
          icon={ThermometerSun}
          label="Temperature"
          value="98.2"
          unit="°F"
          color="orange"
          status="normal"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spirometry Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spirometry Trends (6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spirometryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[60, 85]} />
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
                dataKey="fvc"
                stroke="#10b981"
                strokeWidth={2}
                name="FVC (%)"
                dot={{ fill: '#10b981', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="fev1fvc"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="FEV1/FVC (%)"
                dot={{ fill: '#8b5cf6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Peak Flow Today */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Flow Throughout Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[280, 360]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" name="Peak Flow (L/min)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vital Signs Radar */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={vitalSignsData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
              <PolarRadiusAxis stroke="#6b7280" />
              <Radar
                name="Current Values"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Exercise & Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={exerciseData}>
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
              <Bar dataKey="steps" fill="#10b981" name="Steps" radius={[8, 8, 0, 0]} />
              <Bar dataKey="duration" fill="#3b82f6" name="Duration (min)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Medication Adherence */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Adherence</h3>
        <div className="space-y-4">
          <MedicationItem
            name="Albuterol Inhaler"
            dosage="2 puffs, 4x daily"
            adherence={95}
            lastTaken="2 hours ago"
          />
          <MedicationItem
            name="Tiotropium Bromide"
            dosage="1 capsule, daily"
            adherence={100}
            lastTaken="7:00 AM today"
          />
          <MedicationItem
            name="Fluticasone/Salmeterol"
            dosage="1 puff, 2x daily"
            adherence={90}
            lastTaken="8:00 AM today"
          />
          <MedicationItem
            name="Prednisone"
            dosage="10mg, daily"
            adherence={85}
            lastTaken="Yesterday, 8:00 AM"
          />
        </div>
      </div>
    </div>
  );
}

interface VitalCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  unit: string;
  color: string;
  status: 'normal' | 'watch' | 'stable';
}

function VitalCard({ icon: Icon, label, value, unit, color, status }: VitalCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  const statusMap = {
    normal: { color: 'text-green-600', label: 'Normal' },
    watch: { color: 'text-yellow-600', label: 'Monitor' },
    stable: { color: 'text-blue-600', label: 'Stable' },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
      <div className={`inline-flex p-2 rounded-lg ${colorMap[color]} mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">{unit}</p>
        <span className={`text-xs font-medium ${statusMap[status].color}`}>
          {statusMap[status].label}
        </span>
      </div>
    </div>
  );
}

interface MedicationItemProps {
  name: string;
  dosage: string;
  adherence: number;
  lastTaken: string;
}

function MedicationItem({ name, dosage, adherence, lastTaken }: MedicationItemProps) {
  const getAdherenceColor = (value: number) => {
    if (value >= 95) return 'bg-green-500';
    if (value >= 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-600 mt-1">{dosage}</p>
        <p className="text-xs text-gray-500 mt-1">Last taken: {lastTaken}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{adherence}%</p>
        <div className="w-24 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full ${getAdherenceColor(adherence)}`}
            style={{ width: `${adherence}%` }}
          />
        </div>
      </div>
    </div>
  );
}
