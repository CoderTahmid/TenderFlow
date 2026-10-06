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
    <div className="space-y-6">
      <StepIndicator currentStep={2} />

      {/* Grid Layout taking advantage of full screen width */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tender Summary & Document Uploads (4 cols on lg screens) */}
        <div className="lg:col-span-4 space-y-6">
          <TenderSummary />
          <FileUploader />
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <UploadedFileList />
          </div>
        </div>

        {/* Right Column: Validation KPIs, Requirements Checklist & Package Generation (8 cols on lg screens) */}
        <div className="lg:col-span-8 space-y-6">
          <ValidationSummary />
          <RequirementsTable />
          <GenerateButton />
        </div>
      </div>
    </div>
  );
};
