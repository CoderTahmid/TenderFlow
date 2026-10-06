import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
import { FiHelpCircle } from 'react-icons/fi';

export const AppHeader = () => {
  const { language } = useTender();
  const location = useLocation();

  const t = (key) => getTranslation(language, key);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Tagline */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#12355B] flex items-center justify-center text-white shadow-xs group-hover:bg-[#2563EB] transition-colors">
            <HiOutlineDocumentCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-[#12355B]">
                {t('appName')}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </Link>

        {/* Navigation & Language Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                location.pathname === '/'
                  ? 'bg-slate-100 text-[#12355B]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('dashboard')}
            </Link>
            <Link
              to="/workspace"
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                location.pathname === '/workspace'
                  ? 'bg-slate-100 text-[#12355B]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('workspace')}
            </Link>
            <Link
              to="/help"
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                location.pathname === '/help'
                  ? 'bg-slate-100 text-[#12355B]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
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
