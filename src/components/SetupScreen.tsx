import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GAME_DEFAULTS, TEAM_COLORS } from '../constants';
import { useGameStore } from '../store/gameStore';
import OptionsMenu from './OptionsMenu';
import { POWER_UP_INFO, type PowerUpType } from '../types';
import { ALL_POWER_UPS } from '../utils/powerUps';

const ALL_TYPES: PowerUpType[] = ALL_POWER_UPS;

export default function SetupScreen() {
  const initGame = useGameStore((s) => s.initGame);

  const [teamCount, setTeamCount] = useState<number>(GAME_DEFAULTS.minTeams);
  const [teamNames, setTeamNames] = useState<string[]>(
    Array.from({ length: GAME_DEFAULTS.maxTeams }, (_, i) => `קבוצה ${i + 1}`),
  );
  const [boardSize, setBoardSize] = useState<number>(GAME_DEFAULTS.boardSize);
  const [turnDuration, setTurnDuration] = useState<number>(GAME_DEFAULTS.turnDuration);
  const [enablePowerUps, setEnablePowerUps] = useState<boolean>(true);
  const [enabledPowerUpTypes, setEnabledPowerUpTypes] = useState<PowerUpType[]>([...ALL_TYPES]);
  const [showModes, setShowModes] = useState(false);

  const toggleType = (type: PowerUpType) => {
    setEnabledPowerUpTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleNameChange = (index: number, value: string) => {
    setTeamNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleStart = () => {
    const names = teamNames.slice(0, teamCount);
    const activeTypes = enablePowerUps ? enabledPowerUpTypes : [];
    initGame({ teamNames: names, boardSize, turnDuration, enablePowerUps, enabledPowerUpTypes: activeTypes });
  };

  const canStart = teamCount >= GAME_DEFAULTS.minTeams;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col items-center justify-center p-4 gap-8 max-w-md mx-auto w-full"
    >
      {/* ── Logo ── */}
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-black tracking-tight">🎯 אליאס</h1>
        <p className="text-slate-400 text-lg">משחק מילים קבוצתי</p>
      </div>

      {/* ── Team count ── */}
      <section className="w-full space-y-3">
        <label className="block text-lg font-semibold text-slate-200">
          מספר קבוצות
        </label>
        <div className="flex gap-2 justify-center">
          {Array.from(
            { length: GAME_DEFAULTS.maxTeams - GAME_DEFAULTS.minTeams + 1 },
            (_, i) => i + GAME_DEFAULTS.minTeams,
          ).map((n) => (
            <button
              key={n}
              onClick={() => setTeamCount(n)}
              className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${
                teamCount === n
                  ? 'bg-blue-500 text-white scale-110'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      {/* ── Team names ── */}
      <section className="w-full space-y-3">
        <label className="block text-lg font-semibold text-slate-200">
          שמות קבוצות
        </label>
        <div className="space-y-2">
          {Array.from({ length: teamCount }, (_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: TEAM_COLORS[i].hex }}
              />
              <input
                type="text"
                value={teamNames[i]}
                onChange={(e) => handleNameChange(i, e.target.value)}
                maxLength={20}
                className="flex-1 bg-slate-700 text-slate-100 px-4 py-3 rounded-xl
                           border border-slate-600 focus:border-blue-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500/30
                           text-right placeholder:text-slate-500"
                placeholder={`קבוצה ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Board size ── */}
      <section className="w-full space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold text-slate-200">
            גודל לוח
          </label>
          <span className="text-blue-400 font-bold text-lg">{boardSize}</span>
        </div>
        <input
          type="range"
          min={GAME_DEFAULTS.minBoardSize}
          max={GAME_DEFAULTS.maxBoardSize}
          step={GAME_DEFAULTS.boardSizeStep}
          value={boardSize}
          onChange={(e) => setBoardSize(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-sm text-slate-500">
          <span>{GAME_DEFAULTS.minBoardSize}</span>
          <span>{GAME_DEFAULTS.maxBoardSize}</span>
        </div>
      </section>

      {/* ── Turn duration ── */}
      <section className="w-full space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold text-slate-200">
            זמן תור (שניות)
          </label>
          <span className="text-blue-400 font-bold text-lg">{turnDuration}</span>
        </div>
        <input
          type="range"
          min={GAME_DEFAULTS.minTurnDuration}
          max={GAME_DEFAULTS.maxTurnDuration}
          step={GAME_DEFAULTS.turnDurationStep}
          value={turnDuration}
          onChange={(e) => setTurnDuration(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-sm text-slate-500">
          <span>{GAME_DEFAULTS.minTurnDuration}ש׳</span>
          <span>{GAME_DEFAULTS.maxTurnDuration}ש׳</span>
        </div>
      </section>

      {/* ── Special tiles ── */}
      <section className="w-full space-y-2">
        {/* Main toggle row */}
        <div className="flex items-center justify-between bg-slate-800 rounded-2xl px-4 py-3 border border-slate-700">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-slate-100 font-semibold text-base leading-tight">משבצות מיוחדות</p>
              <p className="text-slate-500 text-xs">הפתעות רנדומליות לאורך הלוח</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Expand modes button */}
            {enablePowerUps && (
              <button
                onClick={() => setShowModes((v) => !v)}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium px-2 py-1 rounded-lg hover:bg-slate-700 transition-colors"
              >
                {showModes ? '▲ פחות' : '▼ הגדרות'}
              </button>
            )}
            {/* Master toggle */}
            <button
              role="switch"
              aria-checked={enablePowerUps}
              onClick={() => { setEnablePowerUps((v) => !v); setShowModes(false); }}
              className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                enablePowerUps ? 'bg-purple-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  enablePowerUps ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Per-mode toggles */}
        <AnimatePresence>
          {enablePowerUps && showModes && (
            <motion.div
              key="modes"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-800/60 rounded-2xl border border-slate-700 divide-y divide-slate-700/50">
                {ALL_TYPES.map((type) => {
                  const info = POWER_UP_INFO[type];
                  const isOn = enabledPowerUpTypes.includes(type);
                  return (
                    <div key={type} className="flex items-center justify-between px-4 py-3 gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="text-xl flex-shrink-0 mt-0.5">{info.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-slate-200 font-medium text-sm leading-tight">{info.name}</p>
                          <p className="text-slate-500 text-xs mt-0.5 leading-snug">{info.description}</p>
                        </div>
                      </div>
                      <button
                        role="switch"
                        aria-checked={isOn}
                        onClick={() => toggleType(type)}
                        className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
                          isOn ? 'bg-purple-600' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                            isOn ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              {enabledPowerUpTypes.length === 0 && (
                <p className="text-center text-xs text-amber-400 pt-1">
                  ⚠️ בחר לפחות מצב אחד
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Start button ── */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
        disabled={!canStart}
        className="btn-primary w-full text-2xl disabled:opacity-40 disabled:pointer-events-none"
      >
        🚀 התחל משחק
      </motion.button>

      {/* Mute button (top-left) */}
      <OptionsMenu mode="mute-only" />
    </motion.div>
  );
}
