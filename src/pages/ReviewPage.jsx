import React from 'react';
import { StepIndicator } from '../components/StepIndicator';
import { ReviewPanel } from '../components/ReviewPanel';

export const ReviewPage = () => {
  return (
    <div className="space-y-6 py-4">
      <StepIndicator currentStep={4} />
      <ReviewPanel />
    </div>
  );
};
