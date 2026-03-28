import { useState } from 'react';
import { BookOpen, Wind, Pill, ChevronRight, CheckCircle, Play, Clock } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  category: 'basics' | 'inhaler' | 'lifestyle';
  readTime: string;
  completed: boolean;
}

const articles: Article[] = [
  { id: '1', title: 'What is COPD?', description: 'Understanding the basics of Chronic Obstructive Pulmonary Disease, including causes and progression.', category: 'basics', readTime: '3 min', completed: true },
  { id: '2', title: 'Understanding Your Lung Function', description: 'Learn what FEV1, FVC, and peak flow numbers mean for your daily life.', category: 'basics', readTime: '4 min', completed: true },
  { id: '3', title: 'Recognizing Exacerbation Signs', description: 'Know the early warning signs of a flare-up so you can act quickly.', category: 'basics', readTime: '3 min', completed: false },
  { id: '4', title: 'How to Use a Metered-Dose Inhaler', description: 'Step-by-step guide to proper MDI technique for maximum medication delivery.', category: 'inhaler', readTime: '5 min', completed: false },
  { id: '5', title: 'Dry Powder Inhaler Technique', description: 'Proper technique for Spiriva and other dry powder inhalers.', category: 'inhaler', readTime: '4 min', completed: false },
  { id: '6', title: 'Breathing Exercises for COPD', description: 'Pursed lip breathing and diaphragmatic breathing techniques to improve airflow.', category: 'lifestyle', readTime: '5 min', completed: false },
  { id: '7', title: 'Staying Active with COPD', description: 'Safe exercises and activity guidelines for managing COPD.', category: 'lifestyle', readTime: '4 min', completed: false },
  { id: '8', title: 'Nutrition Tips for Lung Health', description: 'Foods and dietary habits that support respiratory health.', category: 'lifestyle', readTime: '3 min', completed: false },
];

const inhalerSteps = [
  'Remove the cap and shake the inhaler well.',
  'Breathe out fully, away from the inhaler.',
  'Place the mouthpiece in your mouth and close lips around it.',
  'Press down on the inhaler while breathing in slowly and deeply.',
  'Hold your breath for 10 seconds (or as long as comfortable).',
  'If a second puff is needed, wait 1 minute and repeat.',
  'Rinse your mouth with water after using a steroid inhaler.',
];

export function Education() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basics' | 'inhaler' | 'lifestyle'>('all');
  const [completedArticles, setCompletedArticles] = useState<Set<string>>(
    new Set(articles.filter((a) => a.completed).map((a) => a.id))
  );
  const [activeStep, setActiveStep] = useState(0);

  const filtered = selectedCategory === 'all' ? articles : articles.filter((a) => a.category === selectedCategory);
  const completedCount = completedArticles.size;

  const markComplete = (id: string) => {
    setCompletedArticles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories = [
    { id: 'all' as const, label: 'All Topics' },
    { id: 'basics' as const, label: 'COPD Basics' },
    { id: 'inhaler' as const, label: 'Inhaler Use' },
    { id: 'lifestyle' as const, label: 'Lifestyle' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Education Center</h2>
        <p className="text-gray-600 mt-1">Learn about managing your COPD effectively</p>
      </div>

      {/* Progress */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-100 text-sm">Learning Progress</p>
            <p className="text-3xl font-bold mt-1">{completedCount} of {articles.length}</p>
            <p className="text-teal-100 text-sm mt-1">articles completed</p>
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-4 w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${(completedCount / articles.length) * 100}%` }} />
        </div>
      </div>

      {/* Inhaler Tutorial */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Pill className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Inhaler Usage Tutorial</h3>
            <p className="text-sm text-gray-500">Step-by-step metered-dose inhaler technique</p>
          </div>
        </div>
        <div className="space-y-2">
          {inhalerSteps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`w-full text-left flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                i === activeStep ? 'bg-blue-50 border border-blue-200' : i < activeStep ? 'bg-green-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium ${
                i < activeStep ? 'bg-green-500 text-white' : i === activeStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {i < activeStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <p className={`text-sm ${i === activeStep ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>{step}</p>
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3 mt-4">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStep(Math.min(inhalerSteps.length - 1, activeStep + 1))}
            disabled={activeStep === inhalerSteps.length - 1}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center space-x-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((article) => {
          const isComplete = completedArticles.has(article.id);
          return (
            <div
              key={article.id}
              className={`bg-white rounded-xl shadow-sm border p-5 transition-all hover:shadow-md cursor-pointer ${
                isComplete ? 'border-green-200' : 'border-gray-200'
              }`}
              onClick={() => markComplete(article.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600 capitalize">
                      {article.category === 'inhaler' ? 'Inhaler Use' : article.category}
                    </span>
                    <span className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{article.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                </div>
                <div className="ml-3 flex-shrink-0">
                  {isComplete ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
