import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../Logo/Logo_without_text 1.png';
import logoText from '../Logo/Logo_text.png';
import { BiologicalPulse } from './components/BiologicalPulse';
import { HomePage } from './components/HomePage';
import { TrendsPage } from './components/TrendsPage';
import { GuidesPage } from './components/GuidesPage';
import { PatientProfile } from './components/PatientProfile';
import { HealthInsights } from './components/HealthInsights';
import { ClinicianDashboard } from './components/ClinicianDashboard';
import { Activity, Home, TrendingUp, BookOpen, User, X, Settings, ChevronRight, CheckSquare, Stethoscope, ArrowLeft, ChevronDown, Globe } from 'lucide-react';

type AppMode = 'patient' | 'clinician';
type Language = 'en' | 'fi' | 'sv';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'actions', label: 'Actions', icon: CheckSquare },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [showProfile, setShowProfile] = useState(false);
  const [mode, setMode] = useState<AppMode>('clinician');
  const [language, setLanguage] = useState<Language>('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ─── Clinician View ───
  if (mode === 'clinician') {
    return (
      <div className="min-h-screen flex flex-col relative">
        <BiologicalPulse />
        <div className="relative z-10 flex flex-col min-h-screen">
          <header style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.5)' }} className="sticky top-0 z-40">
            <div className="max-w-lg mx-auto px-2 sm:px-4 flex flex-wrap items-center justify-between h-auto min-h-[3.5rem]">
              <div className="flex items-center gap-0.5 min-w-0 flex-shrink-0">
                <img src={logo} alt="AirAware Logo" className="w-7 h-7 object-contain" />
                <img src={logoText} alt="AirAware" className="h-5 object-contain max-w-[80px] sm:max-w-none" />
              </div>
              <div className="flex items-center gap-1.5 flex-wrap justify-end flex-1 min-w-0">
                <button
                  onClick={() => setMode('patient')}
                  className="text-[0.7rem] text-slate-500 hover:text-slate-700 flex flex-col items-center gap-0.5 transition-colors whitespace-nowrap px-1"
                >
                  <div className="flex items-center gap-1"><User className="w-3.5 h-3.5" /></div>
                  <span className="text-[0.65rem] leading-tight">Patient View</span>
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="h-8 px-2 sm:px-3 bg-white/60 hover:bg-white/80 border border-slate-200/50 shadow-sm rounded-lg flex items-center justify-center gap-1.5 transition-colors text-xs text-slate-600"
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-medium tracking-wide">{language.toUpperCase()}</span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </button>
                  {showLanguageDropdown && (
                    <div className="absolute top-full mt-1 right-0 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 py-1 z-50 min-w-[110px] overflow-hidden">
                      <button
                        onClick={() => {
                          setLanguage('en');
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                          language === 'en' ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        English
                        {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('fi');
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                          language === 'fi' ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Suomi
                        {language === 'fi' && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('sv');
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                          language === 'sv' ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Svenska
                        {language === 'sv' && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto pb-8">
            <div className="max-w-lg mx-auto px-4 py-5">
              <ClinicianDashboard />
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ─── Patient View (original) ───
  return (
    <div className="min-h-screen flex flex-col relative">

      {/* ═══ Layer 1: Living Canvas Background ═══ */}
      <BiologicalPulse />

      {/* ═══ Layer 2: UI Content (glass overlay) ═══ */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── Top Header ── */}
        <header style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.5)' }} className="sticky top-0 z-40">
          <div className="max-w-lg mx-auto px-2 sm:px-4 flex flex-wrap items-center justify-between h-auto min-h-[3.5rem]">
            <div className="flex items-center gap-0.5 min-w-0 flex-shrink-0">
              <img src={logo} alt="AirAware Logo" className="w-7 h-7 object-contain" />
              <img src={logoText} alt="AirAware" className="h-5 object-contain max-w-[80px] sm:max-w-none" />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap justify-end flex-1 min-w-0">
              <button
                onClick={() => setMode('clinician')}
                className="text-[0.65rem] text-slate-400 hover:text-slate-600 flex flex-col items-center gap-0.5 transition-colors whitespace-nowrap px-1"
              >
                <div className="flex items-center gap-1"><Stethoscope className="w-3 h-3" /></div>
                <span className="text-[0.65rem] leading-tight">Clinician View</span>
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="h-8 px-2 sm:px-3 bg-white/60 hover:bg-white/80 border border-slate-200/50 shadow-sm rounded-lg flex items-center justify-center gap-1.5 transition-colors text-xs text-slate-600"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-medium tracking-wide">{language.toUpperCase()}</span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
                {showLanguageDropdown && (
                  <div className="absolute top-full mt-1 right-0 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 py-1 z-50 min-w-[110px] overflow-hidden">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                        language === 'en' ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      English
                      {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('fi');
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                        language === 'fi' ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Suomi
                      {language === 'fi' && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('sv');
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                        language === 'sv' ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Svenska
                      {language === 'sv' && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowProfile(true)}
                className="w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center hover:from-teal-600 hover:to-cyan-700 transition-all shadow-sm"
                aria-label="Profile & Settings"
              >
                <span className="text-white text-xs">JA</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── Main Content ── */}
        <main className="flex-1 overflow-y-auto pb-24">
          <div className="max-w-lg mx-auto px-4 py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && <HomePage />}
                {activeTab === 'trends' && <TrendsPage />}
                {activeTab === 'actions' && <HealthInsights />}
                {activeTab === 'guides' && <GuidesPage />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* ═══ Layer 3: Bottom Tab Bar (static nav) ═══ */}
        <nav style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.5)' }} className="fixed bottom-0 left-0 right-0 z-40 safe-area-pb">
          <div className="max-w-lg mx-auto flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center py-2.5 min-h-[56px] transition-colors ${
                    isActive ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-6 h-6" />
                    {isActive && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </div>
                  <span className="text-[0.65rem] mt-1 tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* ── Profile Slide-over ── */}
      <AnimatePresence>
        {showProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setShowProfile(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-slate-100 px-5 py-4 flex items-center justify-between z-10">
                <h2 className="text-[#1E293B]">Profile & Settings</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="px-5 py-5">
                <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-xl">
                    JA
                  </div>
                  <div>
                    <p className="text-[#1E293B] text-[1.05rem]">John Anderson</p>
                    <p className="text-[0.8rem] text-slate-400">#PAT-2024-2891 · 67 yrs · Male</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">GOLD Stage II</span>
                      <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Moderate COPD</span>
                    </div>
                  </div>
                </div>
                
                <PatientProfile />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}