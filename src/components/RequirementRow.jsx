import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { getDocumentStatus } from '../utils/validation';
import { FileMatcher } from './FileMatcher';
import { ExpiryDateInput } from './ExpiryDateInput';
import { StatusBadge } from './StatusBadge';

export const RequirementRow = ({ requirement }) => {
  const { language, matches, expiryDates, uploadedFilesMap, tender } = useTender();
  const t = (key) => getTranslation(language, key);

  const matchedFileId = matches[requirement.id];
  const matchedFile = matchedFileId ? uploadedFilesMap[matchedFileId] : null;
  const expiryDate = expiryDates[requirement.id];

  const statusObj = getDocumentStatus(
    requirement,
    matchedFile,
    expiryDate,
    tender?.submission_deadline
  );

  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-200">
      {/* Order */}
      <td className="font-bold text-slate-700 text-xs px-4 py-3 text-center">
        {String(requirement.order).padStart(2, '0')}
      </td>

      {/* Document Name */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 text-xs leading-snug">
            {language === 'bn' ? requirement.title_bn : requirement.title_en}
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {language === 'bn' ? requirement.title_en : requirement.title_bn}
          </span>
        </div>
      </td>

      {/* Required / Optional Badge */}
      <td className="px-4 py-3 text-center">
        {requirement.mandatory ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-50 text-red-700 border border-red-200">
            {t('required')}
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">
            {t('optional')}
          </span>
        )}
      </td>

      {/* Matched File */}
      <td className="px-4 py-3 min-w-[220px]">
        <FileMatcher requirement={requirement} />
      </td>

      {/* Expiry Date */}
      <td className="px-4 py-3 min-w-[140px]">
        <ExpiryDateInput requirement={requirement} />
      </td>

      {/* Status */}
      <td className="px-4 py-3 min-w-[180px]">
        <StatusBadge statusObj={statusObj} showDescription={true} />
      </td>
    </tr>
  );
};
