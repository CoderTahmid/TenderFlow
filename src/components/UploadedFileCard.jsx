import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { formatFileSize } from '../utils/formatters';
import { FiFileText, FiTrash2, FiEye, FiAlertTriangle, FiCheck, FiLink } from 'react-icons/fi';

export const UploadedFileCard = ({ fileObj, onPreview }) => {
  const { removeFile, language, requirements, matches } = useTender();
  const t = (key) => getTranslation(language, key);

  // Check if file is matched to any requirement
  const matchedReqId = Object.keys(matches).find(reqId => matches[reqId] === fileObj.id);
  const matchedReq = matchedReqId ? requirements.find(r => r.id === matchedReqId) : null;

  return (
    <div
      className={`rounded-xl border p-3.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        fileObj.isDuplicate
          ? 'bg-amber-50/60 border-amber-300'
          : matchedReq
          ? 'bg-blue-50/40 border-blue-200'
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white shadow-xs ${
            fileObj.isDuplicate ? 'bg-amber-600' : 'bg-[#12355B]'
          }`}
        >
          <FiFileText className="w-5 h-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold text-slate-900 truncate" title={fileObj.name}>
              {fileObj.name}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-0.5">
            <span>
              {fileObj.pages} {fileObj.pages === 1 ? t('page') : t('pages')}
            </span>
            <span>•</span>
            <span>{formatFileSize(fileObj.size)}</span>
          </div>

          {/* Duplicate Badge */}
          {fileObj.isDuplicate && (
            <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-md">
              <FiAlertTriangle className="w-3 h-3 text-amber-600" />
              <span>{t('duplicateWarning')}</span>
            </div>
          )}

          {/* Matched Document Indicator */}
          {matchedReq && !fileObj.isDuplicate && (
            <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-md">
              <FiLink className="w-3 h-3 text-blue-600" />
              <span>
                Matched: {language === 'bn' ? matchedReq.title_bn : matchedReq.title_en}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
        <button
          onClick={() => onPreview(fileObj)}
          className="btn btn-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 gap-1 normal-case"
          title="Preview PDF"
        >
          <FiEye className="w-3.5 h-3.5" />
          {t('previewPdf')}
        </button>

        <button
          onClick={() => removeFile(fileObj.id)}
          className="btn btn-xs bg-red-50 hover:bg-red-100 text-red-600 border-red-200 gap-1 normal-case"
          title={t('removeFile')}
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          {t('removeFile')}
        </button>
      </div>
    </div>
  );
};
