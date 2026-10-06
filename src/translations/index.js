import { en } from './en';
import { bn } from './bn';

export const translations = { en, bn };

export function getTranslation(lang, key) {
  const dictionary = translations[lang] || translations.en;
  return dictionary[key] || translations.en[key] || key;
}
