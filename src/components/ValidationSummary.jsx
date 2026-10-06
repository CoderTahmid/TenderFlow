import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { FiCheckCircle, FiAlertTriangle, FiFileText, FiClock } from 'react-icons/fi';

export const ValidationSummary = () => {
  const { validationSummary, language } = useTender();
  const t = (key) => getTranslation(language, key);

  if (!validationSummary) return null;

  const {
    totalCount,
    okCount,
    missingCount,
    expiredCount,
    expiryNeededCount,
    notProvidedCount,
    blockingCount,
    isReady
  } = validationSummary;

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 shadow-xs mb-6 transition-colors ${
        isReady
          ? 'bg-emerald-50/70 border-emerald-200'
          : 'bg-amber-50/70 border-amber-200'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-white ${
              isReady ? 'bg-[#16A34A]' : 'bg-[#D97706]'
            }`}
          >
            {isReady ? (
              <FiCheckCircle className="w-5 h-5" />
            ) : (
              <FiAlertTriangle className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              {t('docStatusSummary')}
            </h3>
            <p className="text-xs font-medium text-slate-600">
              {isReady
                ? t('allReady')
                : `${blockingCount} ${t('blockingIssues')}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {isReady ? (
            <span className="badge badge-success text-white font-bold text-xs px-3 py-2 gap-1">
              <FiCheckCircle className="w-3.5 h-3.5" />
              {t('readyToGenerate')}
            </span>
          ) : (
            <span className="badge badge-warning text-amber-900 font-bold text-xs px-3 py-2 gap-1">
              <FiAlertTriangle className="w-3.5 h-3.5" />
              {blockingCount} Blocking
            </span>
          )}
        </div>
      </div>

      {/* Counter chips */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
        <div className="bg-white/80 rounded-lg p-2.5 border border-slate-200">
          <p className="text-[11px] font-medium text-slate-500">{t('totalReqs')}</p>
          <p className="text-base font-bold text-slate-800">{totalCount}</p>
        </div>

        <div className="bg-white/80 rounded-lg p-2.5 border border-emerald-200 text-emerald-800">
          <p className="text-[11px] font-medium text-emerald-700">{t('validDocs')}</p>
          <p className="text-base font-bold text-emerald-700">{okCount}</p>
        </div>

        <div
          className={`bg-white/80 rounded-lg p-2.5 border ${
            missingCount > 0 ? 'border-red-300 text-red-700 bg-red-50/50' : 'border-slate-200 text-slate-500'
          }`}
        >
          <p className="text-[11px] font-medium">{t('statusMissing')}</p>
          <p className="text-base font-bold">{missingCount}</p>
        </div>

        <div
          className={`bg-white/80 rounded-lg p-2.5 border ${
            expiredCount > 0 ? 'border-red-300 text-red-700 bg-red-50/50' : 'border-slate-200 text-slate-500'
          }`}
        >
          <p className="text-[11px] font-medium">{t('statusExpired')}</p>
          <p className="text-base font-bold">{expiredCount}</p>
        </div>

        <div
          className={`bg-white/80 rounded-lg p-2.5 border ${
            expiryNeededCount > 0 ? 'border-amber-300 text-amber-800 bg-amber-50/50' : 'border-slate-200 text-slate-500'
          }`}
        >
          <p className="text-[11px] font-medium">{t('statusExpiryNeeded')}</p>
          <p className="text-base font-bold">{expiryNeededCount}</p>
        </div>
      </div>
    </div>
  );
};
