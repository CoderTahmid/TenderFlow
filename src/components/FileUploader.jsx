import React, { useState, useRef } from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { FiUploadCloud, FiFileText, FiAlertCircle } from 'react-icons/fi';

export const FileUploader = () => {
  const { uploadFiles, fileError, setFileError, language, uploadedFiles } = useTender();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const t = (key) => getTranslation(language, key);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <FiFileText className="w-4 h-4 text-[#12355B]" />
          {t('uploadedFilesTitle')} ({uploadedFiles.length}/30)
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          {t('uploadLimits')}
        </span>
      </div>

      {fileError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{t(fileError)}</span>
          </div>
          <button
            onClick={() => setFileError(null)}
            className="text-red-500 hover:text-red-800 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#2563EB] bg-blue-50/70 scale-[0.99]'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept=".pdf,application/pdf"
          className="hidden"
        />

        <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto mb-3 border border-blue-100 shadow-xs">
          <FiUploadCloud className="w-6 h-6" />
        </div>

        <p className="text-sm font-bold text-slate-800">
          {t('uploadTitle')}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {t('uploadSubtitle')}
        </p>
        <div className="mt-3 inline-block px-3 py-1 bg-white border border-slate-200 rounded-md text-[11px] text-slate-500 font-medium shadow-2xs">
          {t('uploadLimits')}
        </div>
      </div>
    </div>
  );
};
