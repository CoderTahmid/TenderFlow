import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { FiCheck } from 'react-icons/fi';

export const StepIndicator = ({ currentStep = 1 }) => {
  const { language, tender, uploadedFiles, matches, validationSummary, generatedPackage } = useTender();
  const t = (key) => getTranslation(language, key);

  const matchedCount = Object.keys(matches).length;

  const steps = [
    {
      id: 1,
      title: t('stepTender'),
      isCompleted: Boolean(tender && tender.tender_id) && currentStep > 1
    },
    {
      id: 2,
      title: t('stepDocuments'),
      isCompleted: uploadedFiles.length > 0 && currentStep > 2
    },
    {
      id: 3,
      title: t('stepMatching'),
      isCompleted: matchedCount > 0 && currentStep > 3
    },
    {
      id: 4,
      title: t('stepValidation'),
      isCompleted: validationSummary.isReady && currentStep > 4
    },
    {
      id: 5,
      title: t('stepGenerate'),
      isCompleted: Boolean(generatedPackage)
    }
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center justify-between w-full">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.id;
            const isCompleted = step.isCompleted;

            return (
              <li
                key={step.id}
                className={`flex items-center ${
                  idx < steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-[#16A34A] text-white'
                        : isActive
                        ? 'bg-[#12355B] text-white ring-4 ring-blue-100 shadow-xs'
                        : 'bg-slate-100 text-slate-400 border border-slate-300'
                    }`}
                  >
                    {isCompleted ? <FiCheck className="w-4 h-4 stroke-[3]" /> : step.id}
                  </div>
                  <span
                    className={`text-xs font-semibold hidden sm:inline ${
                      isActive
                        ? 'text-[#12355B] font-bold'
                        : isCompleted
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 sm:mx-4 transition-colors ${
                      isCompleted ? 'bg-[#16A34A]' : 'bg-slate-200'
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
