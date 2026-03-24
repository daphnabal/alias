/**
 * Word Flagging System - localStorage utilities
 * Stores flagged words locally and manages email submission
 */

const STORAGE_KEY = 'alias-flagged-words';

export interface FlaggedWord {
  word: string;
  timestamp: number;
}

/**
 * Add a word to the flagged list
 */
export const flagWord = (word: string): void => {
  const flags = getFlaggedWords();
  
  // Avoid duplicates
  if (!flags.some(f => f.word === word)) {
    flags.push({
      word,
      timestamp: Date.now()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  }
};

/**
 * Get all flagged words
 */
export const getFlaggedWords = (): FlaggedWord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Check if a word is already flagged
 */
export const isWordFlagged = (word: string): boolean => {
  return getFlaggedWords().some(f => f.word === word);
};

/**
 * Clear all flagged words (after successful email send)
 */
export const clearFlaggedWords = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Get count of flagged words
 */
export const getFlaggedWordsCount = (): number => {
  return getFlaggedWords().length;
};
