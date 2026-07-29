/* =============================================================================
 * ROLL LOGIC
 * -----------------------------------------------------------------------------
 * Pure functions, no DOM. Also loaded by tools/check.cjs so the constraints can
 * be verified from the command line.
 * ========================================================================== */

/** Fisher-Yates. Returns a new array, leaves the input alone. */
function shuffle(items, rng) {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Would adding `candidate` to `loadout` break a group cap?
 * A stratagem in no groups is always allowed.
 */
function fitsGroupLimits(loadout, candidate, groups) {
  return (candidate.groups || []).every((key) => {
    const group = groups[key];
    if (!group) return true; // unknown group key: treat as unrestricted
    const used = loadout.filter((s) => (s.groups || []).includes(key)).length;
    return used < group.max;
  });
}

/** True if every group cap holds across the whole loadout, with no duplicates. */
function isValidLoadout(loadout, groups) {
  const names = new Set(loadout.map((s) => s.name));
  if (names.size !== loadout.length) return false;

  return Object.entries(groups).every(([key, group]) => {
    const count = loadout.filter((s) => (s.groups || []).includes(key)).length;
    return count <= group.max;
  });
}

/**
 * Pick `size` stratagems at random, never the same one twice, never breaking a
 * group cap.
 *
 * Strategy: draw a plain random sample first — that is an unbiased pick from
 * every possible loadout — and re-draw if it breaks a cap. If enough draws fail
 * (a tiny, heavily restricted pool), fall back to walking a shuffled pool and
 * skipping anything that would break a cap, which always produces the largest
 * valid loadout it can.
 */
function rollLoadout(options) {
  const {
    pool,
    groups = {},
    size = 4,
    rng = Math.random,
    maxAttempts = 200,
  } = options;

  if (!Array.isArray(pool) || pool.length === 0) return [];
  const target = Math.min(size, pool.length);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = shuffle(pool, rng).slice(0, target);
    if (isValidLoadout(candidate, groups)) return candidate;
  }

  const loadout = [];
  for (const stratagem of shuffle(pool, rng)) {
    if (loadout.length === target) break;
    if (fitsGroupLimits(loadout, stratagem, groups)) loadout.push(stratagem);
  }
  return loadout;
}

/* Exported for the Node checker in tools/. Ignored by the browser. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { shuffle, fitsGroupLimits, isValidLoadout, rollLoadout };
}
