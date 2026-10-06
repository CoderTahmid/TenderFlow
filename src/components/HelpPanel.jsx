import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { FiShield, FiFileText, FiCalendar, FiPackage, FiHelpCircle, FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiMinusCircle } from 'react-icons/fi';

export const HelpPanel = () => {
  const { language } = useTender();
  const t = (key) => getTranslation(language, key);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#12355B] text-white flex items-center justify-center font-bold">
            <FiHelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {t('helpTitle')}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Complete user guide for submitting tender document packages with TenderFlow.
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Guide */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
          {t('workflowTitle')}
        </h3>

        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">{t('helpSection1')}</h4>
            <p>{t('helpSection1Body')}</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">{t('helpSection2')}</h4>
            <p>{t('helpSection2Body')}</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">{t('helpSection3')}</h4>
            <p>{t('helpSection3Body')}</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-1">{t('helpSection4')}</h4>
            <p>{t('helpSection4Body')}</p>
          </div>
        </div>
      </div>

      {/* Status Indicators Reference Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4 border-b border-slate-100 pb-2">
          Status Badges Reference
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
            <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-800">🟢 OK (Valid)</span>
              <p className="text-slate-600 mt-0.5">{t('statusOkDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
            <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-red-800">🔴 Missing (Blocking)</span>
              <p className="text-slate-600 mt-0.5">{t('statusMissingDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <FiAlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-800">🟠 Expiry date needed (Blocking)</span>
              <p className="text-slate-600 mt-0.5">{t('statusExpiryNeededDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
            <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-red-800">🔴 Expired (Blocking)</span>
              <p className="text-slate-600 mt-0.5">{t('statusExpiredDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-100 border border-slate-200">
            <FiMinusCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">⚪ Not provided (Non-blocking)</span>
              <p className="text-slate-600 mt-0.5">{t('statusNotProvidedDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Confidentiality Box */}
      <div className="bg-gradient-to-br from-[#12355B] to-[#1e40af] text-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <FiShield className="w-6 h-6 text-teal-300" />
          <h3 className="font-bold text-base">{t('helpSection5')}</h3>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          {t('helpSection5Body')}
        </p>
      </div>
    </div>
  );
};
