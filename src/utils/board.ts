/**
 * Generate tile positions for a serpentine board layout.
 * Even rows go left-to-right (in RTL context: natural direction),
 * odd rows reverse to create the snake pattern.
 */
export function generateBoardLayout(
  boardSize: number,
  tilesPerRow: number,
): Array<{ tileNumber: number; row: number; col: number }> {
  const tiles: Array<{ tileNumber: number; row: number; col: number }> = [];

  for (let i = 0; i < boardSize; i++) {
    const row = Math.floor(i / tilesPerRow);
    const colInRow = i % tilesPerRow;

    // Serpentine: even rows normal order, odd rows reversed
    const col = row % 2 === 0 ? colInRow : tilesPerRow - 1 - colInRow;

    tiles.push({ tileNumber: i + 1, row, col });
  }

  return tiles;
}

/**
 * Determine tiles per row based on viewport width.
 */
export function getTilesPerRow(screenWidth: number): number {
  if (screenWidth < 640) return 5; // Mobile
  if (screenWidth < 1024) return 8; // Tablet
  return 10; // Desktop
}
