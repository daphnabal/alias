import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import Board from './Board';

export default function PreTurnScreen() {
  const teams = useGameStore((s) => s.teams);
  const boardSize = useGameStore((s) => s.boardSize);
  const currentTeamIndex = useGameStore((s) => s.currentTeamIndex);
  const startTurn = useGameStore((s) => s.startTurn);

  const currentTeam = teams[currentTeamIndex];

  return (
    <div className="flex-1 flex flex-col">
      {/* Board */}
      <div className="pt-3 pb-2">
        <Board teams={teams} boardSize={boardSize} />
      </div>

      {/* Team announcement + start button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex-1 flex flex-col items-center justify-center p-6 gap-6 max-w-md mx-auto w-full"
      >
        {/* Scoreboard */}
        <div className="w-full space-y-2">
          {teams.map((team, i) => (
            <div
              key={team.id}
              className={`flex items-center justify-between px-4 py-2 rounded-xl ${
                i === currentTeamIndex ? 'bg-slate-700' : 'bg-slate-800/50'
              }`}
              style={
                i === currentTeamIndex
                  ? { outline: `2px solid ${currentTeam.color.hex}`, outlineOffset: '-2px' }
                  : undefined
              }
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: team.color.hex }}
                />
                <span className="text-slate-200 font-medium">{team.name}</span>
              </div>
              <span className="text-slate-400 font-semibold">
                {team.position}/{boardSize}
              </span>
            </div>
          ))}
        </div>

        {/* Team up next */}
        <div className="text-center space-y-3">
          <p className="text-slate-400 text-lg">התור של</p>
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: currentTeam.color.hex }}
            />
            <h2 className="text-4xl font-black text-slate-100">
              {currentTeam.name}
            </h2>
          </div>
        </div>

        {/* Start button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={startTurn}
          className="btn-primary w-full text-2xl"
          style={{
            backgroundColor: currentTeam.color.hex,
          }}
        >
          ▶ התחל תור
        </motion.button>
      </motion.div>
    </div>
  );
}
