import { useState } from 'react';
import { Calendar, Plus, TrendingUp } from 'lucide-react';

interface SymptomEntry {
  id: string;
  date: string;
  breathlessness: number;
  cough: number;
  mucus: number;
  wheezing: number;
  chestTightness: number;
  notes: string;
}

const mockEntries: SymptomEntry[] = [
  {
    id: '1',
    date: '2026-03-21',
    breathlessness: 3,
    cough: 2,
    mucus: 2,
    wheezing: 1,
    chestTightness: 2,
    notes: 'Felt better after morning medication',
  },
  {
    id: '2',
    date: '2026-03-20',
    breathlessness: 4,
    cough: 3,
    mucus: 2,
    wheezing: 2,
    chestTightness: 3,
    notes: 'Experienced some difficulty during light exercise',
  },
  {
    id: '3',
    date: '2026-03-19',
    breathlessness: 3,
    cough: 2,
    mucus: 1,
    wheezing: 1,
    chestTightness: 2,
    notes: 'Regular day, no major issues',
  },
];

export function SymptomTracker() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [entries, setEntries] = useState<SymptomEntry[]>(mockEntries);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Symptom Tracker</h2>
          <p className="text-gray-600 mt-1">Monitor and record daily symptoms</p>
        </div>
        <button
          onClick={() => setShowNewEntry(!showNewEntry)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* New Entry Form */}
      {showNewEntry && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Record Today's Symptoms</h3>
          <NewSymptomForm
            onSave={(entry) => {
              setEntries([entry, ...entries]);
              setShowNewEntry(false);
            }}
            onCancel={() => setShowNewEntry(false)}
          />
        </div>
      )}

      {/* CAT Score Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">COPD Assessment Test (CAT) Score</p>
            <p className="text-4xl font-bold mt-2">18</p>
            <p className="text-blue-100 text-sm mt-1">Medium Impact</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-8 h-8" />
            <span className="text-2xl font-semibold">-3</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-blue-100">
          Your CAT score has improved by 3 points compared to last week, indicating better symptom control.
        </p>
      </div>

      {/* Symptom History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Symptom History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {entries.map((entry) => (
            <SymptomEntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface NewSymptomFormProps {
  onSave: (entry: SymptomEntry) => void;
  onCancel: () => void;
}

function NewSymptomForm({ onSave, onCancel }: NewSymptomFormProps) {
  const [formData, setFormData] = useState({
    breathlessness: 0,
    cough: 0,
    mucus: 0,
    wheezing: 0,
    chestTightness: 0,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: SymptomEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...formData,
    };
    onSave(newEntry);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SymptomSlider
          label="Breathlessness"
          value={formData.breathlessness}
          onChange={(value) => setFormData({ ...formData, breathlessness: value })}
        />
        <SymptomSlider
          label="Cough"
          value={formData.cough}
          onChange={(value) => setFormData({ ...formData, cough: value })}
        />
        <SymptomSlider
          label="Mucus Production"
          value={formData.mucus}
          onChange={(value) => setFormData({ ...formData, mucus: value })}
        />
        <SymptomSlider
          label="Wheezing"
          value={formData.wheezing}
          onChange={(value) => setFormData({ ...formData, wheezing: value })}
        />
        <SymptomSlider
          label="Chest Tightness"
          value={formData.chestTightness}
          onChange={(value) => setFormData({ ...formData, chestTightness: value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any additional observations or triggers..."
        />
      </div>

      <div className="flex items-center justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Entry
        </button>
      </div>
    </form>
  );
}

interface SymptomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function SymptomSlider({ label, value, onChange }: SymptomSliderProps) {
  const getSeverityColor = (val: number) => {
    if (val === 0) return 'text-gray-400';
    if (val <= 2) return 'text-green-600';
    if (val <= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityLabel = (val: number) => {
    if (val === 0) return 'None';
    if (val <= 2) return 'Mild';
    if (val <= 3) return 'Moderate';
    return 'Severe';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className={`text-sm font-semibold ${getSeverityColor(value)}`}>
          {getSeverityLabel(value)}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0</span>
        <span>5</span>
      </div>
    </div>
  );
}

interface SymptomEntryCardProps {
  entry: SymptomEntry;
}

function SymptomEntryCard({ entry }: SymptomEntryCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{formatDate(entry.date)}</p>
            <p className="text-sm text-gray-500">Overall Score: {entry.breathlessness + entry.cough + entry.mucus + entry.wheezing + entry.chestTightness}/25</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <SymptomPill label="Breathlessness" value={entry.breathlessness} />
        <SymptomPill label="Cough" value={entry.cough} />
        <SymptomPill label="Mucus" value={entry.mucus} />
        <SymptomPill label="Wheezing" value={entry.wheezing} />
        <SymptomPill label="Chest Tightness" value={entry.chestTightness} />
      </div>

      {entry.notes && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700">{entry.notes}</p>
        </div>
      )}
    </div>
  );
}

interface SymptomPillProps {
  label: string;
  value: number;
}

function SymptomPill({ label, value }: SymptomPillProps) {
  const getColor = (val: number) => {
    if (val === 0) return 'bg-gray-100 text-gray-600';
    if (val <= 2) return 'bg-green-100 text-green-700';
    if (val <= 3) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className={`rounded-lg p-3 ${getColor(value)}`}>
      <p className="text-xs font-medium mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}/5</p>
    </div>
  );
}
