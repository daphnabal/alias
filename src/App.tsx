import { useGameStore } from './store/gameStore';
import { GamePhase } from './types';

function App() {
  const gamePhase = useGameStore((s) => s.gamePhase);

  return (
    <main className="min-h-screen flex flex-col">
      {gamePhase === GamePhase.SETUP && (
        <div className="flex-1 flex items-center justify-center p-4">
          <h1 className="text-4xl font-black">🎯 אליאס</h1>
        </div>
      )}

      {(gamePhase === GamePhase.TURN || gamePhase === GamePhase.TIME_UP) && (
        <div className="flex-1 flex flex-col">
          <p className="text-center p-4">Game in progress...</p>
        </div>
      )}

      {gamePhase === GamePhase.END_OF_TURN && (
        <div className="flex-1 flex items-center justify-center">
          <p>End of turn</p>
        </div>
      )}

      {gamePhase === GamePhase.GAME_OVER && (
        <div className="flex-1 flex items-center justify-center">
          <p>Game over!</p>
        </div>
      )}
    </main>
  );
}

export default App;
