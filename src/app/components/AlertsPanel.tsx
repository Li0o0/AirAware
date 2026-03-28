import { AlertTriangle, AlertCircle, CheckCircle, Info, Bell, X } from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionable: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Low SpO2 Detected',
    message: 'Blood oxygen saturation dropped to 89% at 3:45 PM. Consider using supplemental oxygen and contact your healthcare provider if symptoms persist.',
    timestamp: '2026-03-21T15:45:00',
    read: false,
    actionable: true,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Increased Breathlessness',
    message: 'Symptom severity increased over the past 2 days. CAT score elevated from 15 to 18. Monitor closely and consider reviewing treatment plan.',
    timestamp: '2026-03-20T09:30:00',
    read: false,
    actionable: true,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Missed Medication',
    message: 'Tiotropium Bromide dose was missed this morning. Please take as soon as possible.',
    timestamp: '2026-03-20T10:00:00',
    read: true,
    actionable: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'Upcoming Appointment',
    message: 'You have a pulmonology appointment scheduled for April 14, 2026 at 10:00 AM with Dr. Sarah Johnson.',
    timestamp: '2026-03-19T08:00:00',
    read: true,
    actionable: false,
  },
  {
    id: '5',
    type: 'success',
    title: 'Improved Lung Function',
    message: 'Your FEV1 has improved by 3% over the past month. Keep up the good work with your treatment plan!',
    timestamp: '2026-03-18T14:20:00',
    read: true,
    actionable: false,
  },
  {
    id: '6',
    type: 'info',
    title: 'Weekly Activity Summary',
    message: 'You walked 28,600 steps this week, exceeding your goal by 2,600 steps. Great job staying active!',
    timestamp: '2026-03-17T20:00:00',
    read: true,
    actionable: false,
  },
  {
    id: '7',
    type: 'warning',
    title: 'High Symptom Score',
    message: 'Your symptom score on March 15 was 18/25, higher than your recent average. Consider discussing with your doctor.',
    timestamp: '2026-03-16T11:15:00',
    read: true,
    actionable: true,
  },
  {
    id: '8',
    type: 'success',
    title: 'Medication Adherence Milestone',
    message: 'You have maintained 95%+ medication adherence for 30 consecutive days. Excellent consistency!',
    timestamp: '2026-03-15T07:00:00',
    read: true,
    actionable: false,
  },
];

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'unread' | 'actionable'>('all');

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'unread') return !alert.read;
    if (filter === 'actionable') return alert.actionable;
    return true;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;
  const actionableCount = alerts.filter((a) => a.actionable).length;

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Alerts & Notifications</h2>
          <p className="text-gray-600 mt-1">Stay informed about your health status</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="p-3 bg-blue-100 rounded-full">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Alerts</p>
              <p className="text-3xl font-semibold text-gray-900 mt-1">{alerts.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unread</p>
              <p className="text-3xl font-semibold text-gray-900 mt-1">{unreadCount}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Actionable</p>
              <p className="text-3xl font-semibold text-gray-900 mt-1">{actionableCount}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Alerts
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('actionable')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'actionable'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Actionable ({actionableCount})
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900">No alerts to display</p>
            <p className="text-gray-600 mt-1">You're all caught up!</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onMarkAsRead={() => markAsRead(alert.id)}
              onDismiss={() => dismissAlert(alert.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface AlertCardProps {
  alert: Alert;
  onMarkAsRead: () => void;
  onDismiss: () => void;
}

function AlertCard({ alert, onMarkAsRead, onDismiss }: AlertCardProps) {
  const typeConfig = {
    critical: {
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      badgeColor: 'bg-red-600',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      badgeColor: 'bg-yellow-600',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      badgeColor: 'bg-blue-600',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      badgeColor: 'bg-green-600',
    },
  };

  const config = typeConfig[alert.type];
  const Icon = config.icon;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`${config.bgColor} border ${config.borderColor} rounded-xl p-6 transition-all ${
        !alert.read ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className={`p-3 ${config.iconBg} rounded-lg flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-semibold text-gray-900">{alert.title}</h3>
              {!alert.read && <div className={`w-2 h-2 rounded-full ${config.badgeColor}`} />}
              {alert.actionable && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white border border-gray-300 text-gray-700">
                  Action Required
                </span>
              )}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{alert.message}</p>
            <p className="text-xs text-gray-500 mt-2">{formatTimestamp(alert.timestamp)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {!alert.read && (
            <button
              onClick={onMarkAsRead}
              className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-gray-900"
              title="Mark as read"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onDismiss}
            className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-gray-900"
            title="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
