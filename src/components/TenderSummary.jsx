import React, { useRef } from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { formatDate } from '../utils/formatters';
import { FiBriefcase, FiCalendar, FiUser, FiUpload, FiRefreshCw } from 'react-icons/fi';
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
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-50 text-[#12355B] text-xs font-bold px-2.5 py-0.5 rounded-md border border-blue-200">
              {tender.tender_id || 'NO-ID'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {t('tenderDetails')}
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">
            {tender.title || 'Untitled Tender Document Package'}
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-sm bg-white hover:bg-slate-50 text-slate-700 border-slate-300 gap-2 normal-case font-semibold"
          >
            <FiUpload className="w-4 h-4 text-slate-500" />
            {t('loadRequirements')}
          </button>
          <button
            onClick={loadDemoData}
            className="btn btn-sm bg-slate-100 hover:bg-slate-200 text-[#12355B] border-slate-200 gap-1.5 normal-case font-semibold"
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

      {/* Grid Metadata details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/70 border border-slate-100">
          <div className="p-2 rounded-md bg-white border border-slate-200 text-[#12355B]">
            <HiOutlineBuildingOffice className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              {t('procuringEntity')}
            </p>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">
              {tender.procuring_entity || 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/70 border border-slate-100">
          <div className="p-2 rounded-md bg-white border border-slate-200 text-blue-600">
            <FiUser className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              {t('bidderName')}
            </p>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">
              {tender.bidder || 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100/80">
          <div className="p-2 rounded-md bg-white border border-emerald-200 text-emerald-600">
            <FiCalendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              {t('submissionDeadline')}
            </p>
            <p className="text-xs font-bold text-emerald-800 mt-0.5">
              {formatDate(tender.submission_deadline, language)} ({tender.submission_deadline})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
