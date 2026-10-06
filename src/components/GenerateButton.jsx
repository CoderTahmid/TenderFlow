import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { FiPackage, FiArrowRight, FiAlertTriangle, FiEye } from 'react-icons/fi';

export const GenerateButton = () => {
  const {
    validationSummary,
    language,
    isGenerating,
    generationProgress,
    handleGeneratePackage
  } = useTender();
  const navigate = useNavigate();

  const t = (key) => getTranslation(language, key);

  const isReady = validationSummary?.isReady;

  const onGenerateClick = async () => {
    if (!isReady || isGenerating) return;
    const success = await handleGeneratePackage();
    if (success) {
      navigate('/package');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mb-6 text-center">
      <div className="max-w-md mx-auto flex flex-col items-center gap-3">
        {isGenerating ? (
          <div className="w-full space-y-2.5 py-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#12355B]">
              <span>{generationProgress.step || t('generatingPackage')}</span>
              <span>{generationProgress.percent}%</span>
            </div>
            <progress
              className="progress progress-primary w-full h-3"
              value={generationProgress.percent}
              max="100"
            />
            <p className="text-[11px] text-slate-500 font-medium animate-pulse">
              Creating combined PDF package with cover page and footers...
            </p>
          </div>
        ) : (
          <>
            <button
              disabled={!isReady}
              onClick={onGenerateClick}
              className={`btn btn-lg w-full font-bold text-sm tracking-wide gap-2 shadow-sm transition-all ${
                isReady
                  ? 'bg-[#12355B] hover:bg-[#2563EB] text-white border-none'
                  : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
              }`}
            >
              <FiPackage className="w-5 h-5" />
              {t('generatePackage')}
              <FiArrowRight className="w-4 h-4 ml-1" />
            </button>

            {!isReady ? (
              <p className="text-xs text-amber-700 font-semibold flex items-center justify-center gap-1.5 bg-amber-50 px-3.5 py-2 rounded-lg border border-amber-200 w-full">
                <FiAlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                {t('resolveBlockingFirst')}
              </p>
            ) : (
              <div className="flex flex-col items-center gap-1.5 w-full">
                <p className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1">
                  ✓ {t('readyToGenerate')}
                </p>
                <button
                  onClick={() => navigate('/review')}
                  className="text-xs text-slate-500 hover:text-[#12355B] font-semibold underline flex items-center gap-1 mt-1"
                >
                  <FiEye className="w-3.5 h-3.5" />
                  {t('reviewTitle')} ({t('optional')})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
