import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
import { FiHelpCircle, FiGrid, FiFileText } from 'react-icons/fi';

export const AppHeader = () => {
  const { language } = useTender();
  const location = useLocation();

  const t = (key) => getTranslation(language, key);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-2xs">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo & Tagline */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#12355B] flex items-center justify-center text-white shadow-xs group-hover:bg-[#2563EB] transition-colors">
            <HiOutlineDocumentCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-[#12355B]">
                {t('appName')}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </Link>

        {/* Navigation & Language Switcher */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden md:flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                location.pathname === '/'
                  ? 'bg-white text-[#12355B] shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FiGrid className="w-3.5 h-3.5" />
              {t('dashboard')}
            </Link>
            <Link
              to="/workspace"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                location.pathname === '/workspace'
                  ? 'bg-white text-[#12355B] shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FiFileText className="w-3.5 h-3.5" />
              {t('workspace')}
            </Link>
            <Link
              to="/help"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                location.pathname === '/help'
                  ? 'bg-white text-[#12355B] shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FiHelpCircle className="w-3.5 h-3.5" />
              {t('help')}
            </Link>
          </nav>

          <LanguageSwitcher />

          <Link
            to="/help"
            className="md:hidden p-2 text-slate-500 hover:text-[#12355B] hover:bg-slate-100 rounded-lg transition-colors"
            title={t('help')}
          >
            <FiHelpCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
