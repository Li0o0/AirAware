import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Check, X, Edit3, Clock, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface HealthEvent {
  id: string;
  timestamp: string;
  date: string;
  symptoms: string[];
  explanation: string;
  status: 'pending' | 'confirmed' | 'escalated' | 'dismissed';
  severity: 'low' | 'medium' | 'high';
}

const mockEvents: HealthEvent[] = [
  {
    id: '1',
    timestamp: '10:32 AM',
    date: 'Today, March 21',
    symptoms: ['Shortness of breath', 'Increased cough'],
    explanation: 'Respiratory rate increased by 18% above your baseline over the past 2 hours. This pattern often precedes symptom flare-ups.',
    status: 'pending',
    severity: 'medium',
  },
  {
    id: '2',
    timestamp: '8:15 AM',
    date: 'Today, March 21',
    symptoms: ['Wheezing', 'Chest tightness'],
    explanation: 'Morning readings show mild airway constriction. This is consistent with typical morning patterns but slightly elevated.',
    status: 'pending',
    severity: 'low',
  },
  {
    id: '3',
    timestamp: '11:45 PM',
    date: 'Yesterday, March 20',
    symptoms: ['Nocturnal cough', 'Shortness of breath'],
    explanation: 'Detected elevated cough frequency during sleep. 12 episodes recorded between 11 PM and 2 AM, above your average of 4.',
    status: 'confirmed',
    severity: 'high',
  },
  {
    id: '4',
    timestamp: '3:20 PM',
    date: 'Yesterday, March 20',
    symptoms: ['Reduced activity'],
    explanation: 'Activity level dropped 40% compared to your daily average. Step count significantly lower than baseline.',
    status: 'confirmed',
    severity: 'medium',
  },
  {
    id: '5',
    timestamp: '9:00 AM',
    date: 'March 19',
    symptoms: ['Increased mucus', 'Cough'],
    explanation: 'Cough pattern analysis suggests increased mucus production. Frequency and duration of cough episodes have risen.',
    status: 'escalated',
    severity: 'high',
  },
  {
    id: '6',
    timestamp: '2:10 PM',
    date: 'March 18',
    symptoms: ['Mild wheezing'],
    explanation: 'Brief wheezing episode detected during light activity. Resolved within 15 minutes without intervention.',
    status: 'dismissed',
    severity: 'low',
  },
];

export function SmartHealthFeed() {
  const [events, setEvents] = useState<HealthEvent[]>(mockEvents);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'escalated'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = events.filter((e) => {
    if (filter === 'all') return e.status !== 'dismissed';
    return e.status === filter;
  });

  const pendingCount = events.filter((e) => e.status === 'pending').length;
  const confirmedCount = events.filter((e) => e.status === 'confirmed').length;

  const updateStatus = (id: string, status: HealthEvent['status']) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const severityConfig = {
    low: { color: 'border-l-green-400', bg: 'bg-green-50', badge: 'bg-green-100 text-green-700' },
    medium: { color: 'border-l-yellow-400', bg: 'bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700' },
    high: { color: 'border-l-red-400', bg: 'bg-red-50', badge: 'bg-red-100 text-red-700' },
  };

  const statusConfig = {
    pending: { badge: 'bg-blue-100 text-blue-700', label: 'Pending Review', icon: Clock },
    confirmed: { badge: 'bg-green-100 text-green-700', label: 'Confirmed', icon: CheckCircle },
    escalated: { badge: 'bg-red-100 text-red-700', label: 'Escalated', icon: AlertTriangle },
    dismissed: { badge: 'bg-gray-100 text-gray-500', label: 'Dismissed', icon: X },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Smart Health Feed</h2>
          <p className="text-gray-600 mt-1">AI-generated health event bulletins based on your data</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
            <Brain className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-sm text-gray-600">Pending Review</p>
          <p className="text-3xl font-semibold text-blue-600 mt-1">{pendingCount}</p>
          <p className="text-xs text-gray-500 mt-1">Events awaiting your input</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-sm text-gray-600">Confirmed Events</p>
          <p className="text-3xl font-semibold text-green-600 mt-1">{confirmedCount}</p>
          <p className="text-xs text-gray-500 mt-1">Included in your health record</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-sm text-gray-600">AI Confidence</p>
          <p className="text-3xl font-semibold text-indigo-600 mt-1">87%</p>
          <p className="text-xs text-gray-500 mt-1">Average detection accuracy</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2">
        {(['all', 'pending', 'confirmed', 'escalated'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Events */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((event) => {
            const sev = severityConfig[event.severity];
            const stat = statusConfig[event.status];
            const StatusIcon = stat.icon;
            const isExpanded = expandedId === event.id;

            return (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 border-l-4 ${sev.color} overflow-hidden`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${stat.badge}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{stat.label}</span>
                        </span>
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${sev.badge}`}>
                          {event.severity} severity
                        </span>
                        <span className="text-xs text-gray-500">{event.date} at {event.timestamp}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {event.symptoms.map((s) => (
                          <span key={s} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">{event.explanation}</p>
                    </div>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : event.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 ml-2"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Actions */}
                  {event.status === 'pending' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100"
                    >
                      <button
                        onClick={() => updateStatus(event.id, 'confirmed')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Confirm</span>
                      </button>
                      <button
                        onClick={() => updateStatus(event.id, 'dismissed')}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <X className="w-4 h-4" />
                        <span>Dismiss</span>
                      </button>
                      <button
                        onClick={() => updateStatus(event.id, 'escalated')}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>Escalate</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    </motion.div>
                  )}

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Detection Method</p>
                            <p className="font-medium text-gray-900 mt-1">Passive sensor analysis</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Confidence Score</p>
                            <p className="font-medium text-gray-900 mt-1">{75 + Math.floor(Math.random() * 20)}%</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Baseline Deviation</p>
                            <p className="font-medium text-gray-900 mt-1">+{10 + Math.floor(Math.random() * 30)}% from normal</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Related Events</p>
                            <p className="font-medium text-gray-900 mt-1">{1 + Math.floor(Math.random() * 3)} similar in past week</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900">No events in this category</p>
            <p className="text-gray-600 mt-1">Check back later for new AI-detected health events</p>
          </div>
        )}
      </div>
    </div>
  );
}
