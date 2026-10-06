import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { FiPackage, FiArrowRight, FiAlertTriangle } from 'react-icons/fi';

export const GenerateButton = () => {
  const { validationSummary, language } = useTender();
  const navigate = useNavigate();

  const t = (key) => getTranslation(language, key);

  const isReady = validationSummary?.isReady;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs mb-6 text-center">
      <div className="max-w-md mx-auto flex flex-col items-center gap-3">
        <button
          disabled={!isReady}
          onClick={() => navigate('/review')}
          className={`btn btn-lg w-full font-bold text-sm tracking-wide gap-2 shadow-sm transition-all ${
            isReady
              ? 'bg-[#12355B] hover:bg-[#2563EB] text-white border-none'
              : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
          }`}
        >
          <FiPackage className="w-5 h-5" />
          {t('proceedToReview')}
          <FiArrowRight className="w-4 h-4 ml-1" />
        </button>

        {!isReady ? (
          <p className="text-xs text-amber-700 font-semibold flex items-center justify-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            <FiAlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            {t('resolveBlockingFirst')}
          </p>
        ) : (
          <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
            ✓ {t('readyToGenerate')}
          </p>
        )}
      </div>
    </div>
  );
};
