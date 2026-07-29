#!/usr/bin/env node
/* =============================================================================
 * Sanity check for the stratagem database. Run with:  node tools/check.cjs
 *
 *   1. every stratagem has a name, category, icon and groups array
 *   2. no duplicate names
 *   3. every `groups` entry refers to a group that actually exists
 *   4. every icon file is present on disk
 *   5. 100,000 rolls all produce 4 unique stratagems within the group caps
 * ========================================================================== */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const { STRATAGEM_GROUPS, STRATAGEMS } = require(path.join(root, 'assets/js/data.js'));
const { rollLoadout, isValidLoadout } = require(path.join(root, 'assets/js/randomiser.js'));

const problems = [];
const warnings = [];

/* 1 + 2 + 3 --------------------------------------------------------------- */
const seen = new Set();
for (const s of STRATAGEMS) {
  const where = s.name || JSON.stringify(s);
  if (!s.name) problems.push('Entry with no name: ' + JSON.stringify(s));
  if (!s.category) problems.push(`${where}: missing category`);
  if (!s.icon) problems.push(`${where}: missing icon path`);
  if (!Array.isArray(s.groups)) problems.push(`${where}: groups must be an array`);

  if (seen.has(s.name)) problems.push(`${where}: duplicate name`);
  seen.add(s.name);

  for (const key of s.groups || []) {
    if (!STRATAGEM_GROUPS[key]) {
      problems.push(`${where}: unknown group "${key}"`);
    }
  }
}

/* 4 ------------------------------------------------------------------------ */
for (const s of STRATAGEMS) {
  if (s.icon && !fs.existsSync(path.join(root, s.icon))) {
    warnings.push(`${s.name}: no SVG at "${s.icon}" (a placeholder is shown instead)`);
  }
}

/* 5 ------------------------------------------------------------------------ */
const ROLLS = 100000;
let badRolls = 0;
let shortRolls = 0;
for (let i = 0; i < ROLLS; i++) {
  const loadout = rollLoadout({ pool: STRATAGEMS, groups: STRATAGEM_GROUPS, size: 4 });
  if (loadout.length !== 4) shortRolls++;
  if (!isValidLoadout(loadout, STRATAGEM_GROUPS)) badRolls++;
}
if (badRolls) problems.push(`${badRolls}/${ROLLS} rolls broke a constraint`);
if (shortRolls) problems.push(`${shortRolls}/${ROLLS} rolls returned fewer than 4 stratagems`);

/* Report ------------------------------------------------------------------- */
const counts = Object.keys(STRATAGEM_GROUPS).map((key) => {
  const n = STRATAGEMS.filter((s) => s.groups.includes(key)).length;
  return `  ${STRATAGEM_GROUPS[key].label}: ${n} members, max ${STRATAGEM_GROUPS[key].max} per loadout`;
});

console.log(`${STRATAGEMS.length} stratagems in the pool`);
console.log(counts.join('\n'));
console.log(`${ROLLS} rolls checked\n`);

if (warnings.length) {
  console.log(`Missing artwork (${warnings.length}):`);
  warnings.forEach((w) => console.log('  - ' + w));
  console.log('');
}

if (problems.length) {
  console.error(`FAILED (${problems.length}):`);
  problems.forEach((p) => console.error('  - ' + p));
  process.exit(1);
}

console.log('All checks passed.');
