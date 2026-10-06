import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import confetti from 'canvas-confetti';
import { FiCheckCircle, FiDownload, FiArrowLeft, FiFileText, FiCalendar, FiLayers } from 'react-icons/fi';

export const PackageSuccess = () => {
  const { generatedPackage, tender, language } = useTender();
  const navigate = useNavigate();
  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    // Automatically trigger download & celebration confetti when screen loads if package is ready
    if (generatedPackage?.blobUrl && generatedPackage?.fileName) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if canvas confetti fails
      }

      const link = document.createElement('a');
      link.href = generatedPackage.blobUrl;
      link.download = generatedPackage.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [generatedPackage]);

  if (!generatedPackage) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
        <p className="text-sm font-semibold text-slate-600 mb-4">
          No generated package found in session.
        </p>
        <button
          onClick={() => navigate('/workspace')}
          className="btn btn-sm bg-[#12355B] text-white"
        >
          {t('goToWorkspace')}
        </button>
      </div>
    );
  }

  const handleManualDownload = () => {
    if (generatedPackage?.blobUrl) {
      const link = document.createElement('a');
      link.href = generatedPackage.blobUrl;
      link.download = generatedPackage.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-emerald-200 p-8 shadow-md text-center">
        {/* Success Animated Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-xs">
          <FiCheckCircle className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {t('successTitle')}
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {t('successSubtitle')}
        </p>

        {/* Exact Filename Highlight Card */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('generatedFileName')}
          </span>
          <span className="font-mono text-base font-bold text-[#12355B] select-all">
            {generatedPackage.fileName}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 my-6 text-center">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <FiLayers className="w-4 h-4 text-slate-500 mx-auto mb-1" />
            <p className="text-[10px] text-slate-500 uppercase font-semibold">{t('totalReqs')}</p>
            <p className="text-base font-bold text-slate-800">{generatedPackage.includedDocCount}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <FiFileText className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-[10px] text-slate-500 uppercase font-semibold">{t('totalGeneratedPages')}</p>
            <p className="text-base font-bold text-slate-800">{generatedPackage.totalPages}</p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <FiCalendar className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
            <p className="text-[10px] text-slate-500 uppercase font-semibold">{t('tenderId')}</p>
            <p className="text-base font-bold text-slate-800">{tender.tender_id}</p>
          </div>
        </div>

        {/* Primary Download Button */}
        <div className="space-y-3">
          <button
            onClick={handleManualDownload}
            className="btn btn-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm tracking-wide w-full shadow-md gap-2"
          >
            <FiDownload className="w-5 h-5" />
            {t('downloadPackage')}
          </button>

          <button
            onClick={() => navigate('/workspace')}
            className="btn btn-sm bg-white hover:bg-slate-100 text-slate-700 border-slate-300 w-full font-semibold gap-1.5"
          >
            <FiArrowLeft className="w-4 h-4" />
            {t('backToWorkspace')}
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-4">
          {t('downloadInstruction')}
        </p>
      </div>
    </div>
  );
};
