import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TenderProvider, useTender } from './context/TenderContext';
import { AppHeader } from './components/AppHeader';
import { DashboardPage } from './pages/DashboardPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { ReviewPage } from './pages/ReviewPage';
import { PackagePage } from './pages/PackagePage';
import { HelpPage } from './pages/HelpPage';
import { getTranslation } from './translations';

function AppContent() {
  const { language } = useTender();
  const t = (key) => getTranslation(language, key);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AppHeader />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/package" element={<PackagePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </main>

      <footer className="bg-white border-t border-slate-200 py-5 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-semibold text-slate-600">{t('footerText')}</span>
          <span className="text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md text-[11px] font-mono">100% Client-Side In-Browser PDF Processing</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TenderProvider>
      <Router>
        <AppContent />
      </Router>
    </TenderProvider>
  );
}
