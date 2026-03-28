import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Wind, Footprints, Pill, Stethoscope, CheckCircle, Clock, MessageSquare, Heart } from 'lucide-react';

interface CareAction {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  priority: 'urgent' | 'recommended' | 'optional';
  completed: boolean;
  timeEstimate: string;
}

export function CareActions() {
  const [actions, setActions] = useState<CareAction[]>([
    {
      id: '1',
      icon: Wind,
      title: 'Use Rescue Inhaler',
      description: 'Take 2 puffs of Albuterol. Wait 1 minute between puffs. If no relief after 15 minutes, take 2 more puffs.',
      priority: 'urgent',
      completed: false,
      timeEstimate: '5 min',
    },
    {
      id: '2',
      icon: Footprints,
      title: 'Reduce Physical Activity',
      description: 'Limit activity for the next few hours. Rest in a comfortable upright position to ease breathing.',
      priority: 'urgent',
      completed: false,
      timeEstimate: 'Ongoing',
    },
    {
      id: '3',
      icon: Stethoscope,
      title: 'Monitor Oxygen Levels',
      description: 'Check SpO2 every 30 minutes. If readings drop below 90%, seek immediate medical attention.',
      priority: 'recommended',
      completed: false,
      timeEstimate: '2 min',
    },
    {
      id: '4',
      icon: Pill,
      title: 'Take Scheduled Medications',
      description: 'Ensure all scheduled medications are taken on time. Do not skip Tiotropium or Fluticasone/Salmeterol.',
      priority: 'recommended',
      completed: true,
      timeEstimate: '2 min',
    },
    {
      id: '5',
      icon: Heart,
      title: 'Practice Pursed Lip Breathing',
      description: 'Breathe in slowly through your nose for 2 counts, then breathe out through pursed lips for 4 counts.',
      priority: 'optional',
      completed: false,
      timeEstimate: '10 min',
    },
    {
      id: '6',
      icon: MessageSquare,
      title: 'Log Symptoms in Tracker',
      description: 'Record current symptoms to help track patterns and share accurate data with your care team.',
      priority: 'optional',
      completed: false,
      timeEstimate: '3 min',
    },
  ]);

  const [doctorNotified, setDoctorNotified] = useState(false);

  const toggleComplete = (id: string) => {
    setActions(actions.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a)));
  };

  const completedCount = actions.filter((a) => a.completed).length;
  const priorityColors = {
    urgent: 'border-l-red-500 bg-red-50',
    recommended: 'border-l-yellow-500 bg-yellow-50',
    optional: 'border-l-blue-500 bg-blue-50',
  };
  const priorityBadge = {
    urgent: 'bg-red-100 text-red-700',
    recommended: 'bg-yellow-100 text-yellow-700',
    optional: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Care Actions</h2>
        <p className="text-gray-600 mt-1">Recommended actions based on your current health status</p>
      </div>

      {/* Call Doctor CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Contact Your Healthcare Provider</h3>
            <p className="text-blue-100 mt-1">
              {doctorNotified
                ? 'Your care team has been notified and will follow up shortly.'
                : 'Based on current risk level, we recommend reaching out to your doctor.'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {!doctorNotified ? (
              <button
                onClick={() => setDoctorNotified(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                <span>Call Doctor</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 px-6 py-3 bg-white/20 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>Team Notified</span>
              </div>
            )}
          </div>
        </div>
        {doctorNotified && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-sm text-blue-100"
          >
            Dr. Sarah Johnson's office has been notified at 10:45 AM. Expected callback within 2 hours.
          </motion.p>
        )}
      </motion.div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-900">Action Progress</p>
          <p className="text-sm text-gray-600">{completedCount} of {actions.length} completed</p>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / actions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border border-l-4 p-5 transition-all ${
                action.completed ? 'bg-gray-50 border-l-green-500 opacity-75' : priorityColors[action.priority]
              }`}
            >
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleComplete(action.id)}
                  className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    action.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {action.completed && <CheckCircle className="w-4 h-4 text-white" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <Icon className="w-5 h-5 text-gray-700" />
                    <h4 className={`font-semibold ${action.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {action.title}
                    </h4>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded capitalize ${priorityBadge[action.priority]}`}>
                      {action.priority}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${action.completed ? 'text-gray-400' : 'text-gray-700'}`}>
                    {action.description}
                  </p>
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{action.timeEstimate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
