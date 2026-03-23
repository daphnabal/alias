import type { Team } from '../types';

/**
 * Calculate new board position after a turn.
 * Clamped to [0, boardSize]. Reaching boardSize means a win.
 */
export function calculateNewPosition(
  currentPosition: number,
  turnScore: number,
  boardSize: number,
): number {
  const newPosition = currentPosition + turnScore;
  return Math.max(0, Math.min(newPosition, boardSize));
}

/**
 * Check if a position qualifies as a win.
 */
export function checkWin(position: number, boardSize: number): boolean {
  return position >= boardSize;
}

/**
 * Find the first team that has reached or passed the finish.
 */
export function findWinner(teams: Team[], boardSize: number): Team | null {
  return teams.find((team) => team.position >= boardSize) ?? null;
}
