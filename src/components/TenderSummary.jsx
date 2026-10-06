import React, { useRef } from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { formatDate } from '../utils/formatters';
import { FiCalendar, FiUser, FiUpload, FiRefreshCw } from 'react-icons/fi';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';

export const TenderSummary = () => {
  const { tender, language, loadRequirements, loadDemoData, jsonError } = useTender();
  const fileInputRef = useRef(null);
  const t = (key) => getTranslation(language, key);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        loadRequirements(text);
      } catch (err) {
        console.error('Failed reading requirements file:', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!tender) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-[#12355B] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-2xs font-mono">
            {tender.tender_id || 'NO-ID'}
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            {t('tenderDetails')}
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-900 leading-snug">
          {tender.title || 'Untitled Tender Package'}
        </h2>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-xs bg-white hover:bg-slate-50 text-slate-700 border-slate-300 gap-1.5 normal-case font-bold flex-1"
          >
            <FiUpload className="w-3.5 h-3.5 text-slate-500" />
            {t('loadRequirements')}
          </button>
          <button
            onClick={loadDemoData}
            className="btn btn-xs bg-slate-100 hover:bg-slate-200 text-[#12355B] border-slate-200 gap-1 normal-case font-bold"
            title="Load sample tender criteria"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
            {t('tryDemo')}
          </button>
        </div>
      </div>

      {jsonError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
          <span>⚠️ {t(jsonError)}</span>
        </div>
      )}

      {/* Info Tiles */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <div className="p-1.5 rounded-md bg-white border border-slate-200 text-[#12355B] shrink-0 mt-0.5">
            <HiOutlineBuildingOffice className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t('procuringEntity')}
            </p>
            <p className="font-bold text-slate-800 truncate">
              {tender.procuring_entity || 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
          <div className="p-1.5 rounded-md bg-white border border-slate-200 text-blue-600 shrink-0 mt-0.5">
            <FiUser className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t('bidderName')}
            </p>
            <p className="font-bold text-slate-800 truncate">
              {tender.bidder || 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
          <div className="p-1.5 rounded-md bg-white border border-emerald-200 text-emerald-600 shrink-0 mt-0.5">
            <FiCalendar className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {t('submissionDeadline')}
            </p>
            <p className="font-bold text-emerald-800">
              {formatDate(tender.submission_deadline, language)} ({tender.submission_deadline})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
