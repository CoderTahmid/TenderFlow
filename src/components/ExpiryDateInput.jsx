import React from 'react';
import { useTender } from '../context/TenderContext';
import { getTranslation } from '../translations';
import { FiCalendar } from 'react-icons/fi';

export const ExpiryDateInput = ({ requirement }) => {
  const { matches, expiryDates, setExpiryDate, language } = useTender();
  const t = (key) => getTranslation(language, key);

  const matchedFileId = matches[requirement.id];
  const currentDate = expiryDates[requirement.id] || '';

  if (!requirement.has_expiry) {
    return (
      <span className="text-xs text-slate-400 italic">
        Not required
      </span>
    );
  }

  if (!matchedFileId) {
    return (
      <span className="text-xs text-slate-400 font-medium">
        Match PDF first
      </span>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <input
        type="date"
        value={currentDate}
        onChange={(e) => setExpiryDate(requirement.id, e.target.value)}
        className="input input-xs input-bordered text-xs font-medium border-slate-300 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] pr-2"
        placeholder={t('enterDate')}
      />
    </div>
  );
};
