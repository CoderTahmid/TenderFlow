import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { STATUS_TYPES } from '../utils/validation';
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiMinusCircle } from 'react-icons/fi';

export const StatusBadge = ({ statusObj, showDescription = true }) => {
  const { language } = useTender();
  const t = (key) => getTranslation(language, key);

  if (!statusObj) return null;

  const { status, titleKey, descKey } = statusObj;

  switch (status) {
    case STATUS_TYPES.OK:
      return (
        <div className="flex flex-col gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
            <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            {t(titleKey)}
          </span>
          {showDescription && (
            <span className="text-[11px] text-slate-500">{t(descKey)}</span>
          )}
        </div>
      );

    case STATUS_TYPES.MISSING:
      return (
        <div className="flex flex-col gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 w-fit">
            <FiAlertCircle className="w-3.5 h-3.5 text-red-600" />
            {t(titleKey)}
          </span>
          {showDescription && (
            <span className="text-[11px] text-red-600 font-medium">{t(descKey)}</span>
          )}
        </div>
      );

    case STATUS_TYPES.EXPIRED:
      return (
        <div className="flex flex-col gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 w-fit">
            <FiAlertCircle className="w-3.5 h-3.5 text-red-600" />
            {t(titleKey)}
          </span>
          {showDescription && (
            <span className="text-[11px] text-red-600 font-medium">{t(descKey)}</span>
          )}
        </div>
      );

    case STATUS_TYPES.EXPIRY_NEEDED:
      return (
        <div className="flex flex-col gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 w-fit">
            <FiAlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            {t(titleKey)}
          </span>
          {showDescription && (
            <span className="text-[11px] text-amber-700 font-medium">{t(descKey)}</span>
          )}
        </div>
      );

    case STATUS_TYPES.NOT_PROVIDED:
      return (
        <div className="flex flex-col gap-0.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 w-fit">
            <FiMinusCircle className="w-3.5 h-3.5 text-slate-400" />
            {t(titleKey)}
          </span>
          {showDescription && (
            <span className="text-[11px] text-slate-400">{t(descKey)}</span>
          )}
        </div>
      );

    default:
      return null;
  }
};
