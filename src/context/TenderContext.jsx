import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import demoRequirements from '../data/demoRequirements.json';
import { validateRequirementsJson, getOverallValidationSummary } from '../utils/validation';
import { computeFileHash, updateDuplicateFlags } from '../utils/fileHash';
import { getPdfPageCount, generateTenderPackagePdf } from '../utils/pdfUtils';

const TenderContext = createContext(null);

export const TenderProvider = ({ children }) => {
  const [tender, setTender] = useState(demoRequirements.tender);
  const [requirements, setRequirements] = useState(demoRequirements.requirements);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [matches, setMatches] = useState({});
  const [expiryDates, setExpiryDates] = useState({});
  const [language, setLanguage] = useState('en');

  const [jsonError, setJsonError] = useState(null);
  const [fileError, setFileError] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ step: '', percent: 0 });
  const [generatedPackage, setGeneratedPackage] = useState(null);

  // Helper map of file ID -> file object
  const uploadedFilesMap = useMemo(() => {
    const map = {};
    uploadedFiles.forEach(f => {
      map[f.id] = f;
    });
    return map;
  }, [uploadedFiles]);

  // Load requirements JSON
  const loadRequirements = useCallback((jsonContent) => {
    setJsonError(null);
    const result = validateRequirementsJson(jsonContent);
    if (!result.valid) {
      setJsonError(result.error);
      return false;
    }

    setTender(result.data.tender);
    setRequirements(result.data.requirements);
    // Reset matches and expiry dates when new requirements are loaded
    setMatches({});
    setExpiryDates({});
    setGeneratedPackage(null);
    return true;
  }, []);

  // Load demo requirements
  const loadDemoData = useCallback(() => {
    setJsonError(null);
    setTender(demoRequirements.tender);
    setRequirements(demoRequirements.requirements);
    setMatches({});
    setExpiryDates({});
    setGeneratedPackage(null);
  }, []);

  // Handle uploading PDF files with validations (max 30 files, max 50 MB total)
  const uploadFiles = useCallback(async (newFilesArray) => {
    setFileError(null);
    if (!newFilesArray || newFilesArray.length === 0) return;

    // Filter only PDF files
    const validPdfFiles = [];
    let hasNonPdf = false;

    for (let i = 0; i < newFilesArray.length; i++) {
      const file = newFilesArray[i];
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        validPdfFiles.push(file);
      } else {
        hasNonPdf = true;
      }
    }

    if (hasNonPdf) {
      setFileError('errOnlyPdf');
    }

    if (validPdfFiles.length === 0) return;

    // Validate maximum file count limit (30 files)
    if (uploadedFiles.length + validPdfFiles.length > 30) {
      setFileError('errMaxFiles');
      return;
    }

    // Validate total size limit (50 MB)
    const existingTotalSize = uploadedFiles.reduce((sum, f) => sum + f.size, 0);
    const newTotalSize = validPdfFiles.reduce((sum, f) => sum + f.size, 0);

    if (existingTotalSize + newTotalSize > 50 * 1024 * 1024) {
      setFileError('errMaxSize');
      return;
    }

    // Process new PDF files: compute page count and SHA-256 hash
    const processedNewFiles = [];

    for (const file of validPdfFiles) {
      const id = `file_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      let pages = 0;
      let pageError = false;

      try {
        pages = await getPdfPageCount(file);
      } catch (err) {
        console.error('Page count error:', err);
        pageError = true;
      }

      const hash = await computeFileHash(file);

      processedNewFiles.push({
        id,
        file,
        name: file.name,
        size: file.size,
        pages,
        pageError,
        hash,
        isDuplicate: false,
        duplicateOf: null
      });
    }

    // Combine with existing files and update duplicate flags
    setUploadedFiles(prev => {
      const combined = [...prev, ...processedNewFiles];
      return updateDuplicateFlags(combined);
    });
  }, [uploadedFiles]);

  // Remove uploaded file
  const removeFile = useCallback((fileId) => {
    setUploadedFiles(prev => {
      const filtered = prev.filter(f => f.id !== fileId);
      return updateDuplicateFlags(filtered);
    });

    // Clean up matches pointing to this file
    setMatches(prevMatches => {
      const updated = { ...prevMatches };
      Object.keys(updated).forEach(reqId => {
        if (updated[reqId] === fileId) {
          delete updated[reqId];
        }
      });
      return updated;
    });
  }, []);

  // Match file to requirement (prevent matching duplicates)
  const matchFile = useCallback((requirementId, fileId) => {
    const file = uploadedFilesMap[fileId];
    if (file && file.isDuplicate) {
      setFileError('duplicateWarning');
      return;
    }

    setMatches(prev => ({
      ...prev,
      [requirementId]: fileId
    }));
  }, [uploadedFilesMap]);

  // Unmatch requirement
  const unmatchFile = useCallback((requirementId) => {
    setMatches(prev => {
      const updated = { ...prev };
      delete updated[requirementId];
      return updated;
    });
  }, []);

  // Set expiry date for requirement
  const setExpiryDate = useCallback((requirementId, dateString) => {
    setExpiryDates(prev => ({
      ...prev,
      [requirementId]: dateString
    }));
  }, []);

  // Overall validation summary
  const validationSummary = useMemo(() => {
    return getOverallValidationSummary(
      requirements,
      matches,
      expiryDates,
      uploadedFilesMap,
      tender?.submission_deadline
    );
  }, [requirements, matches, expiryDates, uploadedFilesMap, tender?.submission_deadline]);

  // Generate combined PDF package
  const handleGeneratePackage = useCallback(async () => {
    if (!validationSummary.isReady) {
      return false;
    }

    setIsGenerating(true);
    setGenerationProgress({ step: 'Preparing package...', percent: 5 });

    try {
      const result = await generateTenderPackagePdf({
        tender,
        requirements,
        matches,
        expiryDates,
        uploadedFilesMap,
        onProgress: (step, percent) => {
          setGenerationProgress({ step, percent });
        }
      });

      setGeneratedPackage(result);
      setIsGenerating(false);
      return true;
    } catch (err) {
      console.error('Generation error:', err);
      setIsGenerating(false);
      setFileError('errReadingPdf');
      return false;
    }
  }, [validationSummary.isReady, tender, requirements, matches, expiryDates, uploadedFilesMap]);

  const value = {
    tender,
    setTender,
    requirements,
    setRequirements,
    uploadedFiles,
    uploadedFilesMap,
    matches,
    expiryDates,
    language,
    setLanguage,
    jsonError,
    setJsonError,
    fileError,
    setFileError,
    validationSummary,
    isGenerating,
    generationProgress,
    generatedPackage,
    loadRequirements,
    loadDemoData,
    uploadFiles,
    removeFile,
    matchFile,
    unmatchFile,
    setExpiryDate,
    handleGeneratePackage
  };

  return (
    <TenderContext.Provider value={value}>
      {children}
    </TenderContext.Provider>
  );
};

export const useTender = () => {
  const ctx = useContext(TenderContext);
  if (!ctx) {
    throw new Error('useTender must be used within a TenderProvider');
  }
  return ctx;
};
