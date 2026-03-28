import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, BookOpen, Wind, Pill, Heart, Phone, Footprints,
  CheckCircle, Clock, ChevronRight, Stethoscope, ArrowRight,
  Sparkles, X, MessageSquare, AlertTriangle
} from 'lucide-react';

// ─── Types ───
interface CareTask {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  priority: 'urgent' | 'recommended' | 'daily';
  completed: boolean;
  timeEstimate: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  category: 'basics' | 'inhaler' | 'breathing' | 'lifestyle';
  readTime: string;
}

// ─── Data ───
const initialTasks: CareTask[] = [
  { id: '1', icon: Wind, title: 'Use Rescue Inhaler', description: 'Take 2 puffs of Albuterol. Wait 1 minute between puffs.', priority: 'urgent', completed: false, timeEstimate: '5 min' },
  { id: '2', icon: Footprints, title: 'Reduce Activity & Rest', description: 'Sit upright in a comfortable position to ease breathing.', priority: 'urgent', completed: false, timeEstimate: 'Ongoing' },
  { id: '3', icon: Heart, title: 'Pursed Lip Breathing', description: 'Breathe in 2 counts through nose, out 4 counts through pursed lips.', priority: 'daily', completed: false, timeEstimate: '10 min' },
  { id: '4', icon: Stethoscope, title: 'Check Oxygen Levels', description: 'Use pulse oximeter. Seek help if SpO2 drops below 90%.', priority: 'recommended', completed: false, timeEstimate: '2 min' },
  { id: '5', icon: Pill, title: 'Take Scheduled Meds', description: 'Ensure Tiotropium and Fluticasone/Salmeterol taken on time.', priority: 'daily', completed: true, timeEstimate: '2 min' },
  { id: '6', icon: MessageSquare, title: 'Log Symptoms', description: 'Record today\'s symptoms to track patterns.', priority: 'daily', completed: false, timeEstimate: '3 min' },
];

const articles: Article[] = [
  { id: '1', title: 'What is COPD?', description: 'Understanding causes, stages, and how COPD progresses over time.', category: 'basics', readTime: '3 min' },
  { id: '2', title: 'Understanding Your Numbers', description: 'What FEV1, FVC, and peak flow results mean for your daily life.', category: 'basics', readTime: '4 min' },
  { id: '3', title: 'Recognizing Flare-Up Signs', description: 'Early warning signs and when to seek medical attention.', category: 'basics', readTime: '3 min' },
  { id: '4', title: 'How to Use an MDI Inhaler', description: 'Step-by-step guide with proper technique for maximum delivery.', category: 'inhaler', readTime: '5 min' },
  { id: '5', title: 'Dry Powder Inhaler Technique', description: 'Correct technique for Spiriva and similar devices.', category: 'inhaler', readTime: '4 min' },
  { id: '6', title: 'Pursed Lip Breathing', description: 'The easiest technique to slow breathing and reduce shortness of breath.', category: 'breathing', readTime: '4 min' },
  { id: '7', title: 'Diaphragmatic Breathing', description: 'Strengthen your diaphragm to breathe more efficiently.', category: 'breathing', readTime: '5 min' },
  { id: '8', title: 'Staying Active Safely', description: 'Exercises and movement guidelines designed for COPD patients.', category: 'lifestyle', readTime: '4 min' },
  { id: '9', title: 'Nutrition for Lung Health', description: 'Foods and habits that support your respiratory system.', category: 'lifestyle', readTime: '3 min' },
];

const inhalerSteps = [
  { step: 1, text: 'Remove the cap and shake the inhaler well for 5 seconds.' },
  { step: 2, text: 'Breathe out fully, away from the inhaler, emptying your lungs.' },
  { step: 3, text: 'Place the mouthpiece between your teeth and close your lips.' },
  { step: 4, text: 'Press down on the inhaler while breathing in slowly and deeply.' },
  { step: 5, text: 'Hold your breath for 10 seconds (or as long as comfortable).' },
  { step: 6, text: 'If a second puff is needed, wait 1 minute and repeat.' },
  { step: 7, text: 'Rinse your mouth with water after steroid inhalers.' },
];

// ─── Component ───
export function GuidesPage() {
  const [tasks, setTasks] = useState<CareTask[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeStep, setActiveStep] = useState(0);
  const [showInhalerGuide, setShowInhalerGuide] = useState(false);
  const [doctorNotified, setDoctorNotified] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const hasUrgent = tasks.some(t => t.priority === 'urgent' && !t.completed);

  const filteredArticles = articles.filter(a => {
    const matchesSearch = searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'basics', label: 'COPD Basics' },
    { id: 'inhaler', label: 'Inhalers' },
    { id: 'breathing', label: 'Breathing' },
    { id: 'lifestyle', label: 'Lifestyle' },
  ];

  const priorityColors = {
    urgent: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700' },
    recommended: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
    daily: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
  };

  return (
    <div className="space-y-6 pb-6">

      {/* ── Header ── */}
      <div>
        <h2 className="text-gray-900">Guides & Actions</h2>
        <p className="text-[0.85rem] text-gray-500 mt-0.5">What to do and how to do it</p>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search guides, e.g. 'inhaler technique'..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 min-h-[48px] bg-white border border-gray-200 rounded-2xl text-[0.9rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm placeholder:text-gray-400"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Emergency CTA (only when urgent tasks pending) ── */}
      <AnimatePresence>
        {hasUrgent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="text-[0.9rem] opacity-90">Urgent actions pending — consider contacting your care team</p>
                </div>
                {!doctorNotified ? (
                  <button
                    onClick={() => setDoctorNotified(true)}
                    className="flex items-center gap-2 px-5 py-3 min-h-[48px] bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors text-[0.85rem] flex-shrink-0"
                  >
                    <Phone className="w-4 h-4" /> Call Doctor
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/20 rounded-xl text-[0.85rem]">
                    <CheckCircle className="w-4 h-4" /> Team Notified
                  </div>
                )}
              </div>
              {doctorNotified && (
                <p className="text-[0.8rem] text-blue-100 mt-2">Dr. Johnson's office notified — expect callback within 2 hours.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Care Tasks ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900">Today's Tasks</h3>
          <span className="text-xs text-gray-500">{completedCount}/{tasks.length} done</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* All done */}
        {completedCount === tasks.length && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center mb-4"
          >
            <Sparkles className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-emerald-800 text-[0.9rem]">All tasks completed — well done!</p>
          </motion.div>
        )}

        <div className="space-y-2">
          {tasks.map(task => {
            const Icon = task.icon;
            const pc = priorityColors[task.priority];
            return (
              <motion.div
                key={task.id}
                layout
                className={`rounded-2xl border p-4 transition-all ${task.completed ? 'bg-gray-50 border-gray-200 opacity-60' : `${pc.bg} ${pc.border}`}`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-0.5 w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-400'
                    }`}
                  >
                    {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className={`text-[0.9rem] ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </span>
                      <span className={`text-[0.7rem] px-2 py-0.5 rounded-lg capitalize ${pc.badge}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className={`text-[0.8rem] mt-1 ${task.completed ? 'text-gray-300' : 'text-gray-600'}`}>
                      {task.description}
                    </p>
                    <span className="flex items-center gap-1 text-[0.75rem] text-gray-400 mt-1">
                      <Clock className="w-3 h-3" /> {task.timeEstimate}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Inhaler Quick Guide Button ── */}
      <button
        onClick={() => setShowInhalerGuide(!showInhalerGuide)}
        className="w-full bg-white border border-blue-200 rounded-2xl p-5 flex items-center justify-between min-h-[56px] hover:bg-blue-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Pill className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-[0.9rem] text-gray-900">Inhaler Step-by-Step Guide</p>
            <p className="text-xs text-gray-500">Interactive tutorial</p>
          </div>
        </div>
        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showInhalerGuide ? 'rotate-90' : ''}`} />
      </button>

      {/* Inhaler Steps */}
      <AnimatePresence>
        {showInhalerGuide && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-2">
              {inhalerSteps.map((s, i) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-colors min-h-[48px] ${
                    i === activeStep ? 'bg-blue-50 border border-blue-200' : i < activeStep ? 'bg-emerald-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[0.8rem] ${
                    i < activeStep ? 'bg-emerald-500 text-white' : i === activeStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {i < activeStep ? <CheckCircle className="w-4 h-4" /> : s.step}
                  </div>
                  <p className={`text-[0.85rem] pt-1 ${i === activeStep ? 'text-blue-900' : 'text-gray-700'}`}>{s.text}</p>
                </button>
              ))}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="flex-1 min-h-[48px] bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-40 transition-colors text-[0.85rem]"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(inhalerSteps.length - 1, activeStep + 1))}
                  disabled={activeStep === inhalerSteps.length - 1}
                  className="flex-1 min-h-[48px] bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors text-[0.85rem]"
                >
                  Next Step
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Knowledge Base ── */}
      <div>
        <h3 className="text-gray-900 mb-3">Learn About COPD</h3>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 min-h-[44px] rounded-xl text-[0.8rem] whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[0.7rem] px-2 py-0.5 rounded-lg bg-gray-100 text-gray-600 capitalize">
                  {article.category === 'inhaler' ? 'Inhaler' : article.category}
                </span>
                <span className="flex items-center gap-1 text-[0.7rem] text-gray-400">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </div>
              <h4 className="text-[0.9rem] text-gray-900">{article.title}</h4>
              <p className="text-[0.8rem] text-gray-500 mt-1">{article.description}</p>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-[0.9rem]">No articles match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
