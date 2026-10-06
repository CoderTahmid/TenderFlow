import React, { useState } from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { UploadedFileCard } from './UploadedFileCard';
import { PdfPreviewModal } from './PdfPreviewModal';
import { FiFolder } from 'react-icons/fi';

export const UploadedFileList = () => {
  const { uploadedFiles, language } = useTender();
  const [previewingFile, setPreviewingFile] = useState(null);

  const t = (key) => getTranslation(language, key);

  if (uploadedFiles.length === 0) {
    return (
      <div className="text-center py-6 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
        <FiFolder className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-xs font-medium text-slate-500">
          {t('noFilesUploaded')}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2.5">
        {uploadedFiles.map(fileObj => (
          <UploadedFileCard
            key={fileObj.id}
            fileObj={fileObj}
            onPreview={(file) => setPreviewingFile(file)}
          />
        ))}
      </div>

      {previewingFile && (
        <PdfPreviewModal
          fileObj={previewingFile}
          onClose={() => setPreviewingFile(null)}
        />
      )}
    </>
  );
};
