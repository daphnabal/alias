/**
 * Trigger haptic feedback on supported devices (mobile).
 * Silently no-ops on unsupported browsers.
 */
export function haptic(style: 'light' | 'medium' | 'heavy' = 'medium') {
  if (!navigator.vibrate) return;

  const patterns: Record<string, number | number[]> = {
    light: 10,
    medium: 25,
    heavy: [30, 10, 30],
  };

  try {
    navigator.vibrate(patterns[style]);
  } catch {
    // Silently ignore — not all contexts allow vibration
  }
}
