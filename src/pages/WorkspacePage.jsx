import React from 'react';
import { StepIndicator } from '../components/StepIndicator';
import { TenderSummary } from '../components/TenderSummary';
import { ValidationSummary } from '../components/ValidationSummary';
import { FileUploader } from '../components/FileUploader';
import { UploadedFileList } from '../components/UploadedFileList';
import { RequirementsTable } from '../components/RequirementsTable';
import { GenerateButton } from '../components/GenerateButton';

export const WorkspacePage = () => {
  return (
    <div className="space-y-6 py-4">
      <StepIndicator currentStep={2} />

      {/* Validation Summary Bar */}
      <ValidationSummary />

      {/* Tender Info Summary Card */}
      <TenderSummary />

      {/* File Upload Zone */}
      <FileUploader />

      {/* Uploaded File List */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs mb-6">
        <UploadedFileList />
      </div>

      {/* Document Requirements Checklist & Matching Table */}
      <RequirementsTable />

      {/* Final Action Button */}
      <GenerateButton />
    </div>
  );
};
