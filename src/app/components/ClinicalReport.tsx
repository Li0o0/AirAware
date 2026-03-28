import { FileText, Download, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const exacerbationData = [
  { month: 'Sep', mild: 1, moderate: 0, severe: 0 },
  { month: 'Oct', mild: 0, moderate: 1, severe: 0 },
  { month: 'Nov', mild: 2, moderate: 0, severe: 0 },
  { month: 'Dec', mild: 1, moderate: 0, severe: 1 },
  { month: 'Jan', mild: 0, moderate: 1, severe: 0 },
  { month: 'Feb', mild: 1, moderate: 0, severe: 0 },
  { month: 'Mar', mild: 0, moderate: 0, severe: 0 },
];

export function ClinicalReport() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Clinical Reports</h2>
          <p className="text-gray-600 mt-1">Comprehensive health summary for healthcare providers</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Report Period */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Reporting Period</p>
            <p className="text-2xl font-semibold mt-1">Last 6 Months</p>
            <p className="text-blue-100 text-sm mt-1">September 2025 - March 2026</p>
          </div>
          <div className="p-4 bg-white/20 rounded-lg">
            <Calendar className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Executive Summary</h3>
        </div>
        <div className="p-6 space-y-4">
          <SummaryItem
            icon={CheckCircle}
            iconColor="text-green-600"
            iconBg="bg-green-100"
            label="Overall Status"
            value="Stable with Improvement"
            description="Patient shows consistent improvement in lung function and reduced symptom severity over the past 6 months."
          />
          <SummaryItem
            icon={TrendingUp}
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
            label="FEV1 Trend"
            value="+5% Improvement"
            description="FEV1 has improved from 66% to 71% of predicted value, indicating better airflow."
          />
          <SummaryItem
            icon={AlertTriangle}
            iconColor="text-yellow-600"
            iconBg="bg-yellow-100"
            label="Risk Assessment"
            value="Moderate Risk"
            description="Patient at moderate risk for exacerbations. Continue current treatment plan with close monitoring."
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricBox label="FEV1" value="71%" trend="+5%" trendUp={true} reference="% of predicted" />
        <MetricBox label="CAT Score" value="18" trend="-3" trendUp={true} reference="Medium impact" />
        <MetricBox label="Exacerbations" value="0" trend="-1" trendUp={true} reference="Last 3 months" />
        <MetricBox label="Adherence" value="93%" trend="+3%" trendUp={true} reference="Medication" />
      </div>

      {/* Detailed Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spirometry Results */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spirometry Results</h3>
          <div className="space-y-4">
            <ResultRow label="FEV1" value="71%" predicted="2.13 L" change="+5%" />
            <ResultRow label="FVC" value="83%" predicted="3.45 L" change="+4%" />
            <ResultRow label="FEV1/FVC" value="77%" predicted="0.62" change="+1%" />
            <ResultRow label="Peak Flow" value="340 L/min" predicted="Best: 345" change="+10" />
          </div>
        </div>

        {/* Symptom Analysis */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Symptom Analysis</h3>
          <div className="space-y-4">
            <SymptomBar label="Breathlessness" value={30} maxValue={100} />
            <SymptomBar label="Cough Frequency" value={25} maxValue={100} />
            <SymptomBar label="Mucus Production" value={20} maxValue={100} />
            <SymptomBar label="Wheezing" value={15} maxValue={100} />
            <SymptomBar label="Chest Tightness" value={25} maxValue={100} />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Average symptom burden has decreased by 15% compared to previous reporting period.
          </p>
        </div>
      </div>

      {/* Exacerbation History */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Exacerbation History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={exacerbationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
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
            <Bar dataKey="mild" fill="#10b981" stackId="a" name="Mild" radius={[8, 8, 0, 0]} />
            <Bar dataKey="moderate" fill="#f59e0b" stackId="a" name="Moderate" />
            <Bar dataKey="severe" fill="#ef4444" stackId="a" name="Severe" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-4">
          Total exacerbations in reporting period: 8 events (6 mild, 2 moderate, 1 severe)
        </p>
      </div>

      {/* Treatment Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Clinical Recommendations</h3>
        </div>
        <div className="p-6 space-y-3">
          <RecommendationItem
            priority="high"
            text="Continue current medication regimen with close monitoring of FEV1 and symptom scores"
          />
          <RecommendationItem
            priority="medium"
            text="Consider pulmonary rehabilitation program to improve exercise tolerance and quality of life"
          />
          <RecommendationItem
            priority="medium"
            text="Monitor SpO2 levels closely; consider supplemental oxygen assessment if levels remain below 92%"
          />
          <RecommendationItem
            priority="low"
            text="Encourage smoking cessation counseling and support (if applicable)"
          />
          <RecommendationItem
            priority="low"
            text="Schedule follow-up spirometry in 3 months to assess disease progression"
          />
        </div>
      </div>

      {/* Clinical Notes */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Notes</h3>
        <div className="prose max-w-none">
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            <strong>Patient Overview:</strong> 68-year-old male with moderate COPD (GOLD Stage II) showing positive response to current treatment plan. Patient demonstrates good medication adherence (93%) and active engagement in symptom monitoring.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            <strong>Recent Progress:</strong> Significant improvement in lung function metrics with FEV1 increasing from 66% to 71% over the past 6 months. Symptom burden has decreased by 15%, and patient reports improved quality of life and exercise tolerance.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Areas of Concern:</strong> Occasional episodes of low SpO2 (below 90%) reported during physical exertion. Patient should be monitored for hypoxemia and may benefit from supplemental oxygen assessment. Continue to monitor for signs of disease progression or exacerbation.
          </p>
        </div>
      </div>
    </div>
  );
}

interface SummaryItemProps {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  description: string;
}

function SummaryItem({ icon: Icon, iconColor, iconBg, label, value, description }: SummaryItemProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className={`p-3 ${iconBg} rounded-lg flex-shrink-0`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}

interface MetricBoxProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  reference: string;
}

function MetricBox({ label, value, trend, trendUp, reference }: MetricBoxProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <p className="text-sm text-gray-600">{label}</p>
      <div className="flex items-baseline space-x-2 mt-2">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{reference}</p>
    </div>
  );
}

interface ResultRowProps {
  label: string;
  value: string;
  predicted: string;
  change: string;
}

function ResultRow({ label, value, predicted, change }: ResultRowProps) {
  const isPositive = change.startsWith('+');
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{predicted}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">{value}</p>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

interface SymptomBarProps {
  label: string;
  value: number;
  maxValue: number;
}

function SymptomBar({ label, value, maxValue }: SymptomBarProps) {
  const percentage = (value / maxValue) * 100;
  const getColor = (val: number) => {
    if (val < 30) return 'bg-green-500';
    if (val < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-sm text-gray-600">{value}%</p>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(value)} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface RecommendationItemProps {
  priority: 'high' | 'medium' | 'low';
  text: string;
}

function RecommendationItem({ priority, text }: RecommendationItemProps) {
  const priorityConfig = {
    high: { color: 'bg-red-100 text-red-700', label: 'High Priority' },
    medium: { color: 'bg-yellow-100 text-yellow-700', label: 'Medium Priority' },
    low: { color: 'bg-blue-100 text-blue-700', label: 'Low Priority' },
  };

  const config = priorityConfig[priority];

  return (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color} flex-shrink-0`}>
        {config.label}
      </span>
      <p className="text-sm text-gray-700 flex-1">{text}</p>
    </div>
  );
}
