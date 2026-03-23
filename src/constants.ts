import type { TeamColor } from './types';

export const TEAM_COLORS: readonly TeamColor[] = [
  { name: 'אדום', bg: 'bg-red-500', text: 'text-red-500', hex: '#ef4444' },
  { name: 'כחול', bg: 'bg-blue-500', text: 'text-blue-500', hex: '#3b82f6' },
  { name: 'ירוק', bg: 'bg-green-500', text: 'text-green-500', hex: '#22c55e' },
  { name: 'צהוב', bg: 'bg-yellow-400', text: 'text-yellow-400', hex: '#facc15' },
  { name: 'סגול', bg: 'bg-purple-500', text: 'text-purple-500', hex: '#a855f7' },
  { name: 'כתום', bg: 'bg-orange-500', text: 'text-orange-500', hex: '#f97316' },
] as const;

export const GAME_DEFAULTS = {
  boardSize: 30,
  turnDuration: 60,
  minTeams: 2,
  maxTeams: 6,
  minBoardSize: 30,
  maxBoardSize: 100,
  boardSizeStep: 5,
  minTurnDuration: 30,
  maxTurnDuration: 120,
  turnDurationStep: 5,
} as const;

export const TIMER_THRESHOLDS = {
  warningRatio: 0.33,
  urgentRatio: 0.17,
} as const;
