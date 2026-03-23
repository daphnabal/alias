import type { Word, WordDataset } from '../types';

/**
 * Validate raw JSON data and normalize into Word[].
 * Words without a difficulty default to "medium".
 */
export function validateDataset(data: WordDataset): Word[] {
  if (!data.words || !Array.isArray(data.words) || data.words.length === 0) {
    throw new Error('Word dataset is empty or invalid');
  }

  const validDifficulties = new Set(['easy', 'medium', 'hard']);

  return data.words
    .filter((entry) => entry.word && entry.word.trim().length > 0)
    .map((entry) => ({
      word: entry.word.trim(),
      difficulty: (
        entry.difficulty && validDifficulties.has(entry.difficulty)
          ? entry.difficulty
          : 'medium'
      ) as Word['difficulty'],
    }));
}

/**
 * Fisher-Yates (Knuth) shuffle — returns a new shuffled copy.
 */
export function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Initialize word selection state: shuffle the pool and set pointer to 0.
 */
export function initWordSelection(words: Word[]): {
  shuffledWords: Word[];
  currentWordIndex: number;
} {
  return {
    shuffledWords: fisherYatesShuffle(words),
    currentWordIndex: 0,
  };
}

/**
 * Draw the next word from the shuffled pool.
 * If the pool is exhausted, it reshuffles automatically.
 * Returns the word and updated state (new pointer, possibly reshuffled array).
 */
export function drawNextWord(
  shuffledWords: Word[],
  currentWordIndex: number,
): {
  word: Word;
  newShuffled: Word[];
  newIndex: number;
} {
  let words = shuffledWords;
  let index = currentWordIndex;

  // Reshuffle if exhausted
  if (index >= words.length) {
    words = fisherYatesShuffle(words);
    index = 0;
  }

  const word = words[index];

  return {
    word,
    newShuffled: words,
    newIndex: index + 1,
  };
}
