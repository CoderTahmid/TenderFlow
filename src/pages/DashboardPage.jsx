import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { StepIndicator } from '../components/StepIndicator';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
import { FiUpload, FiRefreshCw, FiArrowRight, FiShield, FiCheckCircle, FiFileText, FiLayers } from 'react-icons/fi';

export const DashboardPage = () => {
  const { language, loadRequirements, loadDemoData, tender, requirements } = useTender();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const t = (key) => getTranslation(language, key);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        const success = loadRequirements(text);
        if (success) {
          navigate('/workspace');
        }
      } catch (err) {
        console.error('Failed loading file:', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDemoClick = () => {
    loadDemoData();
    navigate('/workspace');
  };

  return (
    <div className="space-y-8 py-6">
      <StepIndicator currentStep={1} />

      {/* Hero Header Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#12355B] text-xs font-bold px-3 py-1 rounded-full">
            <HiOutlineDocumentCheck className="w-4 h-4 text-blue-600" />
            Official Tender Package Builder
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/workspace')}
              className="btn btn-lg bg-[#12355B] hover:bg-[#2563EB] text-white font-bold text-sm tracking-wide gap-2 shadow-sm"
            >
              {t('startNewTender')}
              <FiArrowRight className="w-4 h-4" />
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-lg bg-white hover:bg-slate-50 text-slate-700 border-slate-300 font-bold text-sm gap-2"
            >
              <FiUpload className="w-4 h-4 text-slate-500" />
              {t('loadRequirements')}
            </button>

            <button
              onClick={handleDemoClick}
              className="btn btn-lg bg-slate-100 hover:bg-slate-200 text-[#12355B] border-slate-200 font-bold text-sm gap-1.5"
            >
              <FiRefreshCw className="w-4 h-4 text-[#12355B]" />
              {t('tryDemo')}
            </button>
          </div>
        </div>

        {/* Security / Confidentiality Banner */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500 font-medium">
          <FiShield className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            {t('privacyDesc')}
          </span>
        </div>
      </div>

      {/* Current Active Tender Card (If loaded) */}
      {tender && (
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold px-2 py-0.5 rounded">
                {tender.tender_id}
              </span>
              <span className="text-xs text-slate-400">{requirements.length} Requirements Loaded</span>
            </div>
            <h3 className="text-lg font-bold text-white">{tender.title}</h3>
            <p className="text-xs text-slate-300 mt-0.5">{tender.procuring_entity}</p>
          </div>

          <button
            onClick={() => navigate('/workspace')}
            className="btn bg-[#2563EB] hover:bg-blue-700 text-white border-none gap-2 font-bold text-xs shrink-0 self-start sm:self-auto"
          >
            Open Workspace
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Compact Workflow Explanation Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          {t('workflowTitle')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#12355B] font-bold flex items-center justify-center mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1">{t('workflowStep1Title')}</h3>
            <p className="text-[11px] text-slate-500">{t('workflowStep1Desc')}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#12355B] font-bold flex items-center justify-center mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1">{t('workflowStep2Title')}</h3>
            <p className="text-[11px] text-slate-500">{t('workflowStep2Desc')}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#12355B] font-bold flex items-center justify-center mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1">{t('workflowStep3Title')}</h3>
            <p className="text-[11px] text-slate-500">{t('workflowStep3Desc')}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#12355B] font-bold flex items-center justify-center mb-3">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1">{t('workflowStep4Title')}</h3>
            <p className="text-[11px] text-slate-500">{t('workflowStep4Desc')}</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center mb-3">
              5
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1">{t('workflowStep5Title')}</h3>
            <p className="text-[11px] text-slate-500">{t('workflowStep5Desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
