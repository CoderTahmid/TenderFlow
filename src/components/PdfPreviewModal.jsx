import React, { useEffect, useRef, useState } from 'react';
import { renderPdfPageToCanvas } from '../utils/pdfUtils';
import { FiX, FiChevronLeft, FiChevronRight, FiFileText } from 'react-icons/fi';

export const PdfPreviewModal = ({ fileObj, onClose }) => {
  const canvasRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = fileObj?.pages || 1;

  useEffect(() => {
    if (!fileObj || !fileObj.file) return;

    let isMounted = true;
    setLoading(true);

    renderPdfPageToCanvas(fileObj.file, currentPage, canvasRef.current)
      .then(() => {
        if (isMounted) setLoading(false);
      })
      .catch(err => {
        console.error('Error rendering PDF preview:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fileObj, currentPage]);

  if (!fileObj) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <FiFileText className="w-5 h-5 text-blue-400 shrink-0" />
            <span className="font-semibold text-sm truncate">{fileObj.name}</span>
            <span className="text-xs text-slate-400 font-mono">({fileObj.pages} pages)</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Canvas Page Render */}
        <div className="flex-1 bg-slate-100 overflow-auto p-4 flex items-center justify-center min-h-[400px]">
          {loading && (
            <div className="flex flex-col items-center gap-2 text-slate-500">
              <span className="loading loading-spinner loading-md"></span>
              <span className="text-xs font-medium">Loading PDF Preview...</span>
            </div>
          )}
          <canvas
            ref={canvasRef}
            className={`max-w-full h-auto shadow-md rounded border border-slate-200 bg-white ${
              loading ? 'hidden' : 'block'
            }`}
          />
        </div>

        {/* Modal Footer - Page Navigation */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="btn btn-xs bg-slate-100 hover:bg-slate-200 border-slate-300 disabled:opacity-40 gap-1"
            >
              <FiChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="btn btn-xs bg-slate-100 hover:bg-slate-200 border-slate-300 disabled:opacity-40 gap-1"
            >
              Next <FiChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
