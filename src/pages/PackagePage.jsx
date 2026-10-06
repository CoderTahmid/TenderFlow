import React from 'react';
import { StepIndicator } from '../components/StepIndicator';
import { PackageSuccess } from '../components/PackageSuccess';

export const PackagePage = () => {
  return (
    <div className="space-y-6 py-4">
      <StepIndicator currentStep={5} />
      <PackageSuccess />
    </div>
  );
};
