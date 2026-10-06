import React from 'react';
import { useTender } from '../context/TenderContext';
import { FiGlobe } from 'react-icons/fi';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useTender();

  return (
    <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
      <FiGlobe className="w-4 h-4 text-slate-500 ml-1.5" />
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
          language === 'en'
            ? 'bg-[#12355B] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('bn')}
        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
          language === 'bn'
            ? 'bg-[#12355B] text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
        }`}
      >
        বাংলা
      </button>
    </div>
  );
};
