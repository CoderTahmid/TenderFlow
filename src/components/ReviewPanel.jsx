import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { formatDate } from '../utils/formatters';
import { FiCheckCircle, FiFileText, FiPackage, FiArrowLeft, FiAlertCircle, FiInfo } from 'react-icons/fi';

export const ReviewPanel = () => {
  const {
    tender,
    requirements,
    matches,
    expiryDates,
    uploadedFilesMap,
    language,
    isGenerating,
    generationProgress,
    handleGeneratePackage
  } = useTender();

  const navigate = useNavigate();
  const t = (key) => getTranslation(language, key);

  const sortedReqs = [...requirements].sort((a, b) => a.order - b.order);

  const includedDocs = [];
  const excludedDocs = [];

  sortedReqs.forEach(req => {
    const fileId = matches[req.id];
    const fileObj = fileId ? uploadedFilesMap[fileId] : null;
    const expiry = expiryDates[req.id];

    if (fileObj) {
      includedDocs.push({ req, fileObj, expiry });
    } else {
      excludedDocs.push({ req });
    }
  });

  const totalPagesCount = 1 + includedDocs.reduce((sum, d) => sum + (d.fileObj.pages || 0), 0);

  const onConfirmGenerate = async () => {
    const success = await handleGeneratePackage();
    if (success) {
      navigate('/package');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {t('reviewTitle')}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {t('reviewSubtitle')}
            </p>
          </div>

          <button
            onClick={() => navigate('/workspace')}
            className="btn btn-sm bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 gap-1.5 normal-case font-semibold self-start sm:self-auto"
          >
            <FiArrowLeft className="w-4 h-4" />
            {t('backToWorkspace')}
          </button>
        </div>

        {/* Cover Page Notice */}
        <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium flex items-start gap-2.5">
          <FiInfo className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>{t('coverPageNotice')}</span>
        </div>
      </div>

      {/* Tender Info Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-3">
          {t('tenderDetails')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 font-medium uppercase text-[10px] block">{t('tenderId')}</span>
            <span className="font-bold text-slate-900 text-sm">{tender.tender_id}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium uppercase text-[10px] block">{t('procuringEntity')}</span>
            <span className="font-semibold text-slate-800">{tender.procuring_entity}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium uppercase text-[10px] block">{t('bidderName')}</span>
            <span className="font-semibold text-slate-800">{tender.bidder}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium uppercase text-[10px] block">{t('submissionDeadline')}</span>
            <span className="font-bold text-emerald-700">{formatDate(tender.submission_deadline, language)}</span>
          </div>
        </div>
      </div>

      {/* Documents to be Included */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FiCheckCircle className="w-4 h-4 text-emerald-600" />
            {t('includedDocsCount')} ({includedDocs.length})
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            Estimated Total Pages: ~{totalPagesCount}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase">
                <th className="px-4 py-3 text-center w-12">{t('order')}</th>
                <th className="px-4 py-3">{t('documentName')}</th>
                <th className="px-4 py-3">{t('matchedFile')}</th>
                <th className="px-4 py-3 text-center">{t('pages')}</th>
                <th className="px-4 py-3">{t('expiryDate')}</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Cover Page */}
              <tr className="bg-blue-50/60 font-semibold border-b border-slate-200">
                <td className="px-4 py-3 text-center text-blue-900">00</td>
                <td className="px-4 py-3 text-blue-900">
                  📄 Official English Cover Page (Auto Generated)
                </td>
                <td className="px-4 py-3 text-slate-500 italic">System Cover Template</td>
                <td className="px-4 py-3 text-center font-bold text-blue-900">1</td>
                <td className="px-4 py-3 text-slate-400">N/A</td>
              </tr>

              {includedDocs.map(({ req, fileObj, expiry }) => (
                <tr key={req.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-3 text-center font-bold text-slate-700">
                    {String(req.order).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {language === 'bn' ? req.title_bn : req.title_en}
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-medium">
                    {fileObj.name}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">
                    {fileObj.pages}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {expiry ? formatDate(expiry, language) : req.has_expiry ? 'N/A' : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Excluded Optional Documents */}
      {excludedDocs.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <h4 className="font-bold text-slate-700 text-xs mb-2">
            {t('excludedDocsCount')} ({excludedDocs.length})
          </h4>
          <ul className="space-y-1">
            {excludedDocs.map(({ req }) => (
              <li key={req.id} className="text-xs text-slate-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>{language === 'bn' ? req.title_bn : req.title_en}</span>
                <span className="text-[10px] text-slate-400">({t('optional')})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Footer Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs text-center space-y-3">
        <p className="text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1.5">
          <FiCheckCircle className="w-4 h-4 text-emerald-600" />
          {t('readyConfirmation')}
        </p>

        {isGenerating ? (
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>{generationProgress.step}</span>
              <span>{generationProgress.percent}%</span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={generationProgress.percent}
              max="100"
            />
          </div>
        ) : (
          <button
            onClick={onConfirmGenerate}
            className="btn btn-lg bg-[#12355B] hover:bg-[#2563EB] text-white font-bold text-sm tracking-wide gap-2 px-8 shadow-sm"
          >
            <FiPackage className="w-5 h-5" />
            {t('generatePackage')}
          </button>
        )}
      </div>
    </div>
  );
};
