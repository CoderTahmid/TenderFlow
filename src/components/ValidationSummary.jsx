import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

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
    blockingCount,
    isReady
  } = validationSummary;

  return (
    <div
      className={`rounded-xl border p-5 shadow-xs transition-all ${
        isReady
          ? 'bg-emerald-50/60 border-emerald-200'
          : 'bg-amber-50/60 border-amber-200'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-slate-200/70">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 ${
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
            <h3 className="font-extrabold text-slate-900 text-sm">
              {t('docStatusSummary')}
            </h3>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              {isReady
                ? t('allReady')
                : `${blockingCount} ${t('blockingIssues')}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {isReady ? (
            <span className="badge badge-success text-white font-bold text-xs px-3 py-2 gap-1.5 shadow-2xs">
              <FiCheckCircle className="w-3.5 h-3.5" />
              {t('readyToGenerate')}
            </span>
          ) : (
            <span className="badge badge-warning text-amber-950 font-bold text-xs px-3 py-2 gap-1.5 shadow-2xs">
              <FiAlertTriangle className="w-3.5 h-3.5" />
              {blockingCount} Blocking Issues
            </span>
          )}
        </div>
      </div>

      {/* Counter chips */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
        <div className="bg-white rounded-lg p-2.5 border border-slate-200 shadow-2xs">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{t('totalReqs')}</p>
          <p className="text-lg font-extrabold text-slate-900">{totalCount}</p>
        </div>

        <div className="bg-white rounded-lg p-2.5 border border-emerald-200 shadow-2xs">
          <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">{t('validDocs')}</p>
          <p className="text-lg font-extrabold text-emerald-700">{okCount}</p>
        </div>

        <div
          className={`bg-white rounded-lg p-2.5 border shadow-2xs ${
            missingCount > 0 ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
          }`}
        >
          <p className={`text-[10px] font-semibold uppercase tracking-wider ${missingCount > 0 ? 'text-red-700' : 'text-slate-400'}`}>
            {t('statusMissing')}
          </p>
          <p className={`text-lg font-extrabold ${missingCount > 0 ? 'text-red-700' : 'text-slate-700'}`}>
            {missingCount}
          </p>
        </div>

        <div
          className={`bg-white rounded-lg p-2.5 border shadow-2xs ${
            expiredCount > 0 ? 'border-red-300 bg-red-50/50' : 'border-slate-200'
          }`}
        >
          <p className={`text-[10px] font-semibold uppercase tracking-wider ${expiredCount > 0 ? 'text-red-700' : 'text-slate-400'}`}>
            {t('statusExpired')}
          </p>
          <p className={`text-lg font-extrabold ${expiredCount > 0 ? 'text-red-700' : 'text-slate-700'}`}>
            {expiredCount}
          </p>
        </div>

        <div
          className={`bg-white rounded-lg p-2.5 border shadow-2xs ${
            expiryNeededCount > 0 ? 'border-amber-300 bg-amber-50/50' : 'border-slate-200'
          }`}
        >
          <p className={`text-[10px] font-semibold uppercase tracking-wider ${expiryNeededCount > 0 ? 'text-amber-700' : 'text-slate-400'}`}>
            {t('statusExpiryNeeded')}
          </p>
          <p className={`text-lg font-extrabold ${expiryNeededCount > 0 ? 'text-amber-800' : 'text-slate-700'}`}>
            {expiryNeededCount}
          </p>
        </div>
      </div>
    </div>
  );
};
