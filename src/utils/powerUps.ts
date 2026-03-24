import type { PowerUpTile, PowerUpType } from '../types';

/** All available power-up types (used as default). */
export const ALL_POWER_UPS: PowerUpType[] = [
  'both_teams',
  'bonus_or_minus',
  'speed_demon',
  'gift_or_curse',
  'steal_the_lead',
];

/**
 * Generate special power-up tiles for the board.
 * Every 8-12 tiles there is a special tile, placed randomly within each window.
 * The power-up type is chosen randomly from the provided list of enabled types.
 * Special tiles never occupy position 0 (start) or the last tile (finish).
 */
export function generatePowerUpTiles(boardSize: number, enabledTypes: PowerUpType[] = ALL_POWER_UPS): PowerUpTile[] {
  if (enabledTypes.length === 0) return [];

  const tiles: PowerUpTile[] = [];
  const minGap = 8;
  const maxGap = 12;

  let cursor = 0;

  while (cursor < boardSize - 1) {
    // Random gap between 8 and 12
    const gap = minGap + Math.floor(Math.random() * (maxGap - minGap + 1));
    cursor += gap;

    // Don't place on the finish tile or beyond
    if (cursor >= boardSize - 1) break;

    // Pick a random power-up type from the enabled list
    const type = enabledTypes[Math.floor(Math.random() * enabledTypes.length)];

    tiles.push({ position: cursor, type });
  }

  return tiles;
}

/**
 * Find a power-up at the given board position.
 * Returns the PowerUpTile or undefined if none.
 */
export function getPowerUpAtPosition(
  position: number,
  powerUpTiles: PowerUpTile[],
): PowerUpTile | undefined {
  return powerUpTiles.find((t) => t.position === position);
}
