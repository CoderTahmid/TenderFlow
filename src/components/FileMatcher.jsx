import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { FiCheck, FiX, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';

export const FileMatcher = ({ requirement }) => {
  const { uploadedFiles, matches, matchFile, unmatchFile, language } = useTender();
  const t = (key) => getTranslation(language, key);

  const matchedFileId = matches[requirement.id];
  const matchedFile = uploadedFiles.find(f => f.id === matchedFileId);

  // Available unmatched files (excluding duplicates and files matched to other requirements)
  const availableFiles = uploadedFiles.filter(f => {
    if (f.isDuplicate) return false;
    // Check if matched to another requirement
    const otherReqId = Object.keys(matches).find(reqId => matches[reqId] === f.id);
    return !otherReqId || otherReqId === requirement.id;
  });

  const handleSelect = (e) => {
    const fileId = e.target.value;
    if (fileId) {
      matchFile(requirement.id, fileId);
    } else {
      unmatchFile(requirement.id);
    }
  };

  if (matchedFile) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-slate-100 border border-slate-300 px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs min-w-0">
          <span className="font-semibold text-slate-800 truncate" title={matchedFile.name}>
            📄 {matchedFile.name}
          </span>
          <span className="text-[11px] text-slate-500 font-mono ml-2 shrink-0">
            ({matchedFile.pages} pgs)
          </span>
        </div>

        <button
          onClick={() => unmatchFile(requirement.id)}
          className="btn btn-xs btn-ghost text-red-600 hover:bg-red-50 p-1"
          title={t('unmatch')}
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <select
      value={matchedFileId || ''}
      onChange={handleSelect}
      className="select select-bordered select-xs w-full max-w-xs text-xs font-medium border-slate-300 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
    >
      <option value="">{t('selectPdfPlaceholder')}</option>
      {availableFiles.map(file => (
        <option key={file.id} value={file.id}>
          {file.name} ({file.pages} pgs • {(file.size / 1024 / 1024).toFixed(1)}MB)
        </option>
      ))}
    </select>
  );
};
