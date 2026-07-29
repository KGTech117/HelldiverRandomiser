# Stratagem Randomiser

Rolls a random four-stratagem Helldivers loadout that is always legal:

- exactly **4** stratagems
- **no duplicates**
- **max one backpack-slot stratagem**
- **max one support weapon**
- **max one exosuit**
- **max one FRV**

No build step, no dependencies. Open `index.html` in a browser and press
**RANDOMISE**.

```
index.html                  the page
assets/css/styles.css       theme
assets/js/data.js           >>> the roster and the restrictions — edit this <<<
assets/js/randomiser.js     roll logic
assets/js/app.js            renders the four cards
assets/icons/placeholder.svg  shown when a stratagem has no artwork yet
tools/check.cjs             sanity check — node tools/check.cjs
<Ship module>/*.svg         the stratagem artwork, unchanged, where it already was
StratagemList.txt           the source list the roster was built from
```

---

## Adding a stratagem

Everything lives in **`assets/js/data.js`**. Add one line to the `STRATAGEMS`
array. Each entry has four fields:

| field | what it is |
| --- | --- |
| `name` | shown on the card |
| `category` | ship module or Warbond, shown under the name |
| `icon` | path to the SVG, relative to `index.html`. Spaces are fine. |
| `groups` | `[]` for always usable, or a list of restriction keys |

### An always-usable stratagem

`groups: []` — it can appear alongside anything else.

```js
{ name: 'Orbital Napalm Barrage', category: 'Orbital Cannons', icon: 'Orbital Cannons/Orbital Napalm Barrage.svg', groups: [] },
```

### A stratagem restricted to one per loadout

Put the group key in `groups`. Anything tagged `backpack` can only turn up once
per roll, and the same for `exosuit`:

```js
{ name: 'Hellbomb Pack',   category: 'Servants of Freedom', icon: 'Servants of Freedom/Hellbomb Portable.svg', groups: ['backpack'] },
{ name: 'EXO-51 Lumberer', category: 'Exo Experts',         icon: 'Exo Experts/Lumberer Exosuit.svg',          groups: ['exosuit'] },
```

A stratagem can be in more than one group and counts against every cap it
belongs to. The Autocannon is both a backpack item and a support weapon, so it
carries two badges and blocks both:

```js
{ name: 'Autocannon', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Autocannon.svg', groups: ['backpack', 'support'] },
```

That is the whole job. Nothing else needs touching: the roll logic, the
constraint checking, the pool count and the list of caps printed under the
button are all generated from this file.

### The artwork

`icon` points straight at the SVGs already in the repo, in the folders they
shipped in. Two things worth knowing:

- The filename does **not** have to match `name`. Several already differ —
  `M-1000 Maxigun` uses `Python Commandos/Maxigun.svg`, `Hellbomb Pack` uses
  `Servants of Freedom/Hellbomb Portable.svg`. Point `icon` at whatever the file
  is actually called.
- If the file is missing, the card shows a question-mark placeholder instead of
  breaking. So you can add the entry now and drop the SVG in later — no code
  change needed once the file appears at that path.

---

## Adding a new restriction

Say you want at most one sentry per loadout. Add a group to
`STRATAGEM_GROUPS` at the top of `assets/js/data.js`:

```js
const STRATAGEM_GROUPS = {
  backpack: { label: 'Backpack Slot',  max: 1 },
  support:  { label: 'Support Weapon', max: 1 },
  exosuit:  { label: 'Exosuit',        max: 1 },
  frv:      { label: 'FRV',            max: 1 },
  sentry:   { label: 'Sentry',         max: 1 },   // new
};
```

Then tag the members:

```js
{ name: 'Gatling Sentry', category: 'Robotics Workshop', icon: 'Robotics Workshop/Gatling Sentry.svg', groups: ['sentry'] },
```

`label` is the text on the little card badge, and it is also what appears in
the caps line under the RANDOMISE button. `max` is how many members may appear
in one loadout — set it to `2` if you want to allow a pair.

To **remove** a restriction, delete the group and clear that key out of the
`groups` arrays that mention it. To **loosen** one, raise its `max`.

---

## Current restrictions

**Exosuit — max 1** (4 members)

EXO-45 Patriot Exosuit · EXO-49 Emancipator Exosuit · EXO-51 Lumberer ·
EXO-55 Breakthrough

**Backpack Slot — max 1** (21 members)

Airburst Rocket Launcher · Autocannon · AX/FLAM-75 Guard Dog · Ballistic Shield
Backpack · C4 Pack · Cremator · Directional Shield · Guard Dog · Guard Dog
Breath · Guard Dog K-9 · Guard Dog Rover · Hellbomb Pack · Hover Pack · Jump
Pack · LIFT-182 Warp Pack · M-1000 Maxigun · Recoilless Rifle · Shield Generator
Pack · Spear · Supply Pack · W.A.S.P. Launcher

Six of those were **not** on the original restriction list but occupy the
backpack slot in game, so they were added to keep rolled loadouts playable:
**Guard Dog, Guard Dog Breath, Guard Dog K-9, Directional Shield, Hover Pack,
C4 Pack**. Drop `'backpack'` from any of their `groups` arrays if you disagree.

**Support Weapon — max 1** (32 members)

Airburst Rocket Launcher · Anti-Materiel Rifle · Arc Thrower · Autocannon ·
Bullet Storm · C4 Pack · Commando · CQC-20 · Cremator · Defoliation Tool ·
EAT-411 · EAT-700 Napalm · Epoch · Expendable Anti-Tank · Flamethrower · GL-28 ·
GL-52 De-Escalator · Grenade Launcher · Heavy Machine Gun · Laser Cannon ·
M-1000 Maxigun · Machine Gun · MS-11 Solo Silo · One True Flag · Quasar Cannon ·
Railgun · Recoilless Rifle · Spear · Speargun · Stalwart · Sterilizer ·
W.A.S.P. Launcher

Taken from the wiki's "Support Weapons" category. Eight of these are also
backpack items — a stratagem can sit in both groups and counts against both
caps.

Two entries on that wiki page are ignored: **EAT-411 Leveller/zh** is a
translation of a page already covered, and **April Fools/FSF-14 Sprar** is a
joke page. Two more are in the category but not in this roster, because the repo
has no artwork for them: **CQC-72 Entrenchment Tool** and **SG-88 Break-Action
Shotgun**. Add them to `STRATAGEMS` with `groups: ['support']` if the icons turn
up.

**Recoilless Rifle** is tagged `support` even though the wiki category page does
not list it — it is plainly a support weapon, and leaving it out would let it
roll next to a second one.

**FRV — max 1** (3 members)

Fast Recon Vehicle · Incinerator FRV · Supply FRV

**Bastion Tank** is deliberately *not* in this group: it is a vehicle but not an
FRV, so it can still roll alongside one. Add `'frv'` to it — or better, rename
the group to `vehicle` — if you want one vehicle of any kind per loadout.

---

## Roster notes

90 stratagems are in the pool, built from `StratagemList.txt` plus the SVGs that
were in the repo but not on that list (newer Warbond stratagems such as Hover
Pack, Laser Sentry, C4 Pack and the Siege Breakers weapons).

Mission stratagems — Reinforce, Resupply, SOS Beacon, Hellbomb, SEAF Artillery,
the drills, Upload Data and so on, all under `General Stratagems/` — are
deliberately left out, since they are not loadout picks. Add them to
`STRATAGEMS` if you want them rolled.

**Every stratagem in the pool has its own artwork** — the placeholder is not in
use. It stays wired up so that a new entry added without an SVG shows a
question-mark glyph rather than a broken image.

`StratagemList.txt` lists "Eagle Incendiary Bombs" separately from "Eagle Napalm
Airstrike", but they are the same stratagem, so only Eagle Napalm Airstrike is
in the pool.

### A note on icon style

The seven sentry, Guard Dog and Patriot Exosuit icons were traced with the
in-game tile baked in — an opaque dark square plus a coloured border. That was
removed on the way in so they sit on a transparent background like the rest of
the set, and their off-white was set to `#fff` to match. The glyph colour coding
is untouched and already lined up: green for sentries, blue for backpack
equipment and exosuits, red for Eagle strikes.

If you add more artwork traced the same way, strip the background rect and the
border path, or the card will show a filled tile instead of a floating glyph.

---

## Checking your edits

```
node tools/check.cjs
```

It verifies that every entry is complete, that there are no duplicate names,
that every `groups` key refers to a real group, that every `icon` path resolves
to a file, and that 100,000 rolls all come back with four unique stratagems
inside the group caps. A missing SVG is reported as a warning, not a failure.

---

## Changing the loadout size

`LOADOUT_SIZE` at the top of `assets/js/app.js`. The slots are generated from
it, so the grid follows automatically.
