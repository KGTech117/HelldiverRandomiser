# Stratagem Randomiser

Rolls a random four-stratagem Helldivers loadout that is always legal:

- exactly **4** stratagems
- **no duplicates**
- **max one backpack-slot stratagem**
- **max one exosuit**

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

A stratagem can be in more than one group — `groups: ['backpack', 'exosuit']`
counts against both caps.

That is the whole job. Nothing else needs touching: the pool count in the
footer, the roll logic and the constraint checking all read from this array.

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
  backpack: { label: 'Backpack Slot', max: 1 },
  exosuit:  { label: 'Exosuit',       max: 1 },
  sentry:   { label: 'Sentry',        max: 1 },   // new
};
```

Then tag the members:

```js
{ name: 'Gatling Sentry', category: 'Robotics Workshop', icon: 'Robotics Workshop/Gatling Sentry.svg', groups: ['sentry'] },
```

`label` is the text on the little card badge. `max` is how many members may
appear in one loadout — set it to `2` if you want to allow a pair.

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

A handful of newer Warbond stratagems are in the pool with **no** group because
their slot behaviour was not certain: **Epoch, Bullet Storm, Speargun, EAT-411,
GL-28, GL-52 De-Escalator, Defoliation Tool, MS-11 Solo Silo, CQC-20**. If any
of them takes a backpack, add `'backpack'` to its `groups`.

---

## Roster notes

91 stratagems are in the pool, built from `StratagemList.txt` plus the SVGs that
were in the repo but not on that list (newer Warbond stratagems such as Hover
Pack, Laser Sentry, C4 Pack and the Siege Breakers weapons).

Mission stratagems — Reinforce, Resupply, SOS Beacon, Hellbomb, SEAF Artillery,
the drills, Upload Data and so on, all under `General Stratagems/` — are
deliberately left out, since they are not loadout picks. Add them to
`STRATAGEMS` if you want them rolled.

**Eight stratagems have no artwork in the repo yet** and currently show the
placeholder. Drop a file at the listed path and it will appear automatically:

| Stratagem | Expected file |
| --- | --- |
| Machine Gun Sentry | `Robotics Workshop/Machine Gun Sentry.svg` |
| Gatling Sentry | `Robotics Workshop/Gatling Sentry.svg` |
| Mortar Sentry | `Robotics Workshop/Mortar Sentry.svg` |
| Rocket Sentry | `Robotics Workshop/Rocket Sentry.svg` |
| EMS Mortar Sentry | `Robotics Workshop/EMS Mortar Sentry.svg` |
| Guard Dog | `Robotics Workshop/Guard Dog.svg` |
| EXO-45 Patriot Exosuit | `Robotics Workshop/Patriot Exosuit.svg` |
| Eagle Incendiary Bombs | `Hangar/Eagle Incendiary Bombs.svg` |

---

## Checking your edits

```
node tools/check.cjs
```

It verifies that every entry is complete, that there are no duplicate names,
that every `groups` key refers to a real group, that every `icon` path resolves
to a file, and that 100,000 rolls all come back with four unique stratagems
inside the group caps. Missing artwork is reported as a warning, not a failure.

---

## Changing the loadout size

`LOADOUT_SIZE` at the top of `assets/js/app.js`. The slots are generated from
it, so the grid follows automatically.
