import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { RequirementRow } from './RequirementRow';
import { FiList } from 'react-icons/fi';

export const RequirementsTable = () => {
  const { requirements, language } = useTender();
  const t = (key) => getTranslation(language, key);

  if (!requirements || requirements.length === 0) {
    return null;
  }

  const sortedReqs = [...requirements].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs mb-6 overflow-hidden">
      <div className="px-5 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <FiList className="w-4 h-4 text-[#12355B]" />
          {t('documentChecklist')} ({requirements.length})
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          Sorted by requirement order
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="px-4 py-3 text-center w-14">{t('order')}</th>
              <th className="px-4 py-3">{t('documentName')}</th>
              <th className="px-4 py-3 text-center">{t('requirementType')}</th>
              <th className="px-4 py-3">{t('matchedFile')}</th>
              <th className="px-4 py-3">{t('expiryDate')}</th>
              <th className="px-4 py-3">{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedReqs.map(req => (
              <RequirementRow key={req.id} requirement={req} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
