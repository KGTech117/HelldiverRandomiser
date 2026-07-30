/* =============================================================================
 * STRATAGEM DATABASE
 * -----------------------------------------------------------------------------
 * This is the only file you need to edit to add, remove or restrict stratagems.
 * See README.md for a step-by-step guide.
 * ========================================================================== */

/* -----------------------------------------------------------------------------
 * 1. GROUPS
 * -----------------------------------------------------------------------------
 * A group is a set of stratagems that compete for the same thing (a backpack
 * slot, a vehicle drop, ...). `max` is how many members of that group are
 * allowed to appear in a single rolled loadout.
 *
 * To add a new restriction, add a group here, then list its key in the
 * `groups: [...]` array of every stratagem that belongs to it.
 * -------------------------------------------------------------------------- */
const STRATAGEM_GROUPS = {
  backpack: { label: 'Backpack Slot', max: 1 },
  support: { label: 'Support Weapon', max: 1 },
  exosuit: { label: 'Exosuit', max: 1 },
  frv: { label: 'FRV', max: 1 },
};

/* -----------------------------------------------------------------------------
 * 2. STRATAGEMS
 * -----------------------------------------------------------------------------
 *   name     - shown on the card. Taken from StratagemList.txt where possible.
 *   category - the ship module or Warbond it comes from (shown under the name).
 *   icon     - path to the SVG, relative to index.html. Spaces are fine.
 *              If the file does not exist the card falls back to a placeholder,
 *              so you can add the entry now and drop the artwork in later.
 *   groups   - [] means "always usable"; otherwise the group keys from above.
 * -------------------------------------------------------------------------- */

const BOOSTERS = [
  { name: 'Hellpod Space Optimisation' }, category: 'Helldivers Mobilise', icon: '', groups: [] },
  { name: 'Vitality Enchancement' }, category: 'Helldivers Mobilise', icon: '', groups: [] },
  { name: 'UAV Recon Booster' }, category: 'Helldivers Mobilise', icon: '', groups: [] },
  { name: 'Stamina Enhancement' }, category: 'Helldivers Mobilise', icon: '', groups: [] },
  { name: 'Muscle Enhancement' }, category: 'Helldivers Mobilise', icon: '', groups: [] },
  { name: 'Increased Reinforcement Budget' }, category: 'Helldivers Mobilise', icon: '', groups: [] },
  { name: 'Flexible Reinforcement Budget' }, category: 'Steeled Veterans', icon: '', groups: [] },
  { name: 'Localization Confusion' }, category: 'Cutting Edge', icon: '', groups: [] },
  { name: 'Expert Extraction Pilot' }, category: 'Democratic Detonation', icon: '', groups: [] },
  { name: 'Motivational Shocks' }, category: 'Polar Patriots', icon: '', groups: [] },
  { name: 'Experimental Infusion' }, category: 'Viper Commandos', icon: '', groups: [] },
  { name: 'Firebomb Hellpods' }, category: 'Freedom\'s Flame', icon: '', groups: [] },
  { name: 'Dead Sprint' }, category: 'Truth Enforcers', icon: '', groups: [] },
  { name: 'Armed Resupply Pods' }, category: 'Urban Legends', icon: '', groups: [] },
  { name: 'Sample Extricator' }, category: 'Borderline Justice', icon: '', groups: [] },
  { name: 'Sample Scanner' }, category: 'Masters of Ceremony', icon: '', groups: [] },
  { name: 'Stun Pods' }, category: 'Force of Law', icon: '', groups: [] },
  { name: 'Concealed Insertion' }, category: 'Redacted Regiment', icon: '', groups: [] },

];

const STRATAGEMS = [
  /* --- Bridge ------------------------------------------------------------ */
  { name: 'Orbital Precision Strike', category: 'Bridge', icon: 'Bridge/Orbital Precision Strike.svg', groups: [] },
  { name: 'Orbital Gas Strike', category: 'Bridge', icon: 'Bridge/Orbital Gas Strike.svg', groups: [] },
  { name: 'Orbital EMS Strike', category: 'Bridge', icon: 'Bridge/Orbital EMS Strike.svg', groups: [] },
  { name: 'Orbital Smoke Strike', category: 'Bridge', icon: 'Bridge/Orbital Smoke Strike.svg', groups: [] },
  { name: 'HMG Emplacement', category: 'Bridge', icon: 'Bridge/HMG Emplacement.svg', groups: [] },
  { name: 'Shield Generator Relay', category: 'Bridge', icon: 'Bridge/Shield Generator Relay.svg', groups: [] },
  { name: 'Tesla Tower', category: 'Bridge', icon: 'Bridge/Tesla Tower.svg', groups: [] },
  { name: 'Grenadier Battlement', category: 'Bridge', icon: 'Bridge/Grenadier Battlement.svg', groups: [] },

  /* --- Orbital Cannons --------------------------------------------------- */
  { name: 'Orbital Gatling Barrage', category: 'Orbital Cannons', icon: 'Orbital Cannons/Orbital Gatling Barrage.svg', groups: [] },
  { name: 'Orbital Airburst Strike', category: 'Orbital Cannons', icon: 'Orbital Cannons/Orbital Airburst Strike.svg', groups: [] },
  { name: 'Orbital 120mm HE Barrage', category: 'Orbital Cannons', icon: 'Orbital Cannons/Orbital 120MM HE Barrage.svg', groups: [] },
  { name: 'Orbital Walking Barrage', category: 'Orbital Cannons', icon: 'Orbital Cannons/Orbital Walking Barrage.svg', groups: [] },
  { name: 'Orbital 380mm HE Barrage', category: 'Orbital Cannons', icon: 'Orbital Cannons/Orbital 380MM HE Barrage.svg', groups: [] },
  { name: 'Orbital Laser', category: 'Orbital Cannons', icon: 'Orbital Cannons/Orbital Laser.svg', groups: [] },
  { name: 'Orbital Railcannon Strike', category: 'Orbital Cannons', icon: 'Orbital Cannons/Orbital Railcannon Strike.svg', groups: [] },
  { name: 'Orbital Napalm Barrage', category: 'Orbital Cannons', icon: 'Orbital Cannons/Orbital Napalm Barrage.svg', groups: [] },

  /* --- Hangar ------------------------------------------------------------ */
  { name: 'Eagle Strafing Run', category: 'Hangar', icon: 'Hangar/Eagle Strafing Run.svg', groups: [] },
  { name: 'Eagle Airstrike', category: 'Hangar', icon: 'Hangar/Eagle Airstrike.svg', groups: [] },
  { name: 'Eagle Cluster Bomb', category: 'Hangar', icon: 'Hangar/Eagle Cluster Bomb.svg', groups: [] },
  { name: 'Eagle Napalm Airstrike', category: 'Hangar', icon: 'Hangar/Eagle Napalm Airstrike.svg', groups: [] },
  { name: 'Eagle Smoke Strike', category: 'Hangar', icon: 'Hangar/Eagle Smoke Strike.svg', groups: [] },
  { name: 'Eagle 110mm Rocket Pods', category: 'Hangar', icon: 'Hangar/Eagle 110MM Rocket Pods.svg', groups: [] },
  { name: 'Eagle 500kg Bomb', category: 'Hangar', icon: 'Hangar/Eagle 500KG Bomb.svg', groups: [] },
  { name: 'Jump Pack', category: 'Hangar', icon: 'Hangar/Jump Pack.svg', groups: ['backpack'] },
  { name: 'Fast Recon Vehicle', category: 'Hangar', icon: 'Hangar/Fast Recon Vehicle.svg', groups: ['frv'] },
  { name: 'Incinerator FRV', category: 'Hangar', icon: 'Hangar/Incinerator FRV.svg', groups: ['frv'] },
  { name: 'Supply FRV', category: 'Hangar', icon: 'Hangar/Supply FRV.svg', groups: ['frv'] },

  /* --- Patriotic Administration Center ----------------------------------- */
  { name: 'Machine Gun', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Machine Gun.svg', groups: ['support'] },
  { name: 'Stalwart', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Stalwart.svg', groups: ['support'] },
  { name: 'Heavy Machine Gun', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Heavy Machine Gun.svg', groups: ['support'] },
  { name: 'Anti-Materiel Rifle', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Anti-Materiel Rifle.svg', groups: ['support'] },
  { name: 'Railgun', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Railgun.svg', groups: ['support'] },
  { name: 'Flamethrower', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Flamethrower.svg', groups: ['support'] },
  { name: 'Expendable Anti-Tank', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Expendable Anti-Tank.svg', groups: ['support'] },
  { name: 'Commando', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Commando.svg', groups: ['support'] },
  { name: 'Recoilless Rifle', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Recoilless Rifle.svg', groups: ['backpack', 'support'] },
  { name: 'Airburst Rocket Launcher', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Airburst Rocket Launcher.svg', groups: ['backpack', 'support'] },
  { name: 'Spear', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Spear.svg', groups: ['backpack', 'support'] },
  { name: 'Autocannon', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/Autocannon.svg', groups: ['backpack', 'support'] },
  { name: 'W.A.S.P. Launcher', category: 'Patriotic Administration Center', icon: 'Patriotic Administration Center/StA-X3 W.A.S.P. Launcher.svg', groups: ['backpack', 'support'] },

  /* --- Engineering Bay --------------------------------------------------- */
  { name: 'Grenade Launcher', category: 'Engineering Bay', icon: 'Engineering Bay/Grenade Launcher.svg', groups: ['support'] },
  { name: 'Laser Cannon', category: 'Engineering Bay', icon: 'Engineering Bay/Laser Cannon.svg', groups: ['support'] },
  { name: 'Arc Thrower', category: 'Engineering Bay', icon: 'Engineering Bay/Arc Thrower.svg', groups: ['support'] },
  { name: 'Quasar Cannon', category: 'Engineering Bay', icon: 'Engineering Bay/Quasar Cannon.svg', groups: ['support'] },
  { name: 'Anti-Personnel Minefield', category: 'Engineering Bay', icon: 'Engineering Bay/Anti-Personnel Minefield.svg', groups: [] },
  { name: 'Incendiary Mines', category: 'Engineering Bay', icon: 'Engineering Bay/Incendiary Mines.svg', groups: [] },
  { name: 'Gas Mines', category: 'Engineering Bay', icon: 'Engineering Bay/Gas Mine.svg', groups: [] },
  { name: 'Anti-Tank Mines', category: 'Engineering Bay', icon: 'Engineering Bay/Anti-Tank Mines.svg', groups: [] },
  { name: 'Supply Pack', category: 'Engineering Bay', icon: 'Engineering Bay/Supply Pack.svg', groups: ['backpack'] },
  { name: 'Guard Dog Rover', category: 'Engineering Bay', icon: 'Engineering Bay/Guard Dog Rover.svg', groups: ['backpack'] },
  { name: 'Ballistic Shield Backpack', category: 'Engineering Bay', icon: 'Engineering Bay/Ballistic Shield Backpack.svg', groups: ['backpack'] },
  { name: 'Shield Generator Pack', category: 'Engineering Bay', icon: 'Engineering Bay/Shield Generator Pack.svg', groups: ['backpack'] },

  /* --- Robotics Workshop -------------------------------------------------- */
  { name: 'Machine Gun Sentry', category: 'Robotics Workshop', icon: 'Robotics Workshop/Machine Gun Sentry.svg', groups: [] },
  { name: 'Gatling Sentry', category: 'Robotics Workshop', icon: 'Robotics Workshop/Gatling Sentry.svg', groups: [] },
  { name: 'Mortar Sentry', category: 'Robotics Workshop', icon: 'Robotics Workshop/Mortar Sentry.svg', groups: [] },
  { name: 'Autocannon Sentry', category: 'Robotics Workshop', icon: 'Robotics Workshop/Autocannon Sentry.svg', groups: [] },
  { name: 'Rocket Sentry', category: 'Robotics Workshop', icon: 'Robotics Workshop/Rocket Sentry.svg', groups: [] },
  { name: 'EMS Mortar Sentry', category: 'Robotics Workshop', icon: 'Robotics Workshop/EMS Mortar Sentry.svg', groups: [] },
  { name: 'Guard Dog', category: 'Robotics Workshop', icon: 'Robotics Workshop/Guard Dog.svg', groups: ['backpack'] },
  { name: 'EXO-45 Patriot Exosuit', category: 'Robotics Workshop', icon: 'Robotics Workshop/Patriot Exosuit.svg', groups: ['exosuit'] },
  { name: 'EXO-49 Emancipator Exosuit', category: 'Robotics Workshop', icon: 'Robotics Workshop/Emancipator Exosuit.svg', groups: ['exosuit'] },

  /* --- Chemical Agents ---------------------------------------------------- */
  { name: 'Sterilizer', category: 'Chemical Agents', icon: 'Chemical Agents/Sterilizer.svg', groups: ['support'] },
  { name: 'Guard Dog Breath', category: 'Chemical Agents', icon: 'Chemical Agents/Guard Dog Breath.svg', groups: ['backpack'] },

  /* --- Urban Legends ------------------------------------------------------ */
  { name: 'Anti-Tank Emplacement', category: 'Urban Legends', icon: 'Urban Legends/Anti-Tank Emplacement.svg', groups: [] },
  { name: 'Flame Sentry', category: 'Urban Legends', icon: 'Urban Legends/Flame Sentry.svg', groups: [] },
  { name: 'Directional Shield', category: 'Urban Legends', icon: 'Urban Legends/Directional Shield.svg', groups: ['backpack'] },

  /* --- Warbond stratagems ------------------------------------------------- */
  { name: 'One True Flag', category: 'Masters of Ceremony', icon: 'Masters of Ceremony/One True Flag.svg', groups: ['support'] },
  { name: 'Hover Pack', category: 'Borderline Justice', icon: 'Borderline Justice/Hover Pack.svg', groups: ['backpack'] },
  { name: 'Hellbomb Pack', category: 'Servants of Freedom', icon: 'Servants of Freedom/Hellbomb Portable.svg', groups: ['backpack'] },
  { name: 'Epoch', category: 'Control Group', icon: 'Control Group/Epoch.svg', groups: ['support'] },
  { name: 'Laser Sentry', category: 'Control Group', icon: 'Control Group/Laser Sentry.svg', groups: [] },
  { name: 'LIFT-182 Warp Pack', category: 'Control Group', icon: 'Control Group/Warp Pack.svg', groups: ['backpack'] },
  { name: 'GL-52 De-Escalator', category: 'Force of Law', icon: 'Force of Law/GL-52 De-Escalator.svg', groups: ['support'] },
  { name: 'Guard Dog K-9', category: 'Force of Law', icon: 'Force of Law/Guard Dog K-9.svg', groups: ['backpack'] },
  { name: 'Defoliation Tool', category: 'Python Commandos', icon: 'Python Commandos/Defoliation Tool.svg', groups: ['support'] },
  { name: 'AX/FLAM-75 Guard Dog', category: 'Python Commandos', icon: 'Python Commandos/Guard Dog Hot Dog.svg', groups: ['backpack'] },
  { name: 'M-1000 Maxigun', category: 'Python Commandos', icon: 'Python Commandos/Maxigun.svg', groups: ['backpack', 'support'] },
  { name: 'EAT-700 Napalm', category: 'Dust Devils', icon: 'Dust Devils/Expendable Napalm.svg', groups: ['support'] },
  { name: 'MS-11 Solo Silo', category: 'Dust Devils', icon: 'Dust Devils/Solo Silo.svg', groups: ['support'] },
  { name: 'Speargun', category: 'Dust Devils', icon: 'Dust Devils/Speargun.svg', groups: ['support'] },
  { name: 'Cremator', category: 'Entrenched Division', icon: 'Entrenched Division/Cremator.svg', groups: ['backpack', 'support'] },
  { name: 'Gas Mortar Sentry', category: 'Entrenched Division', icon: 'Entrenched Division/Gas Mortar Sentry.svg', groups: [] },
  { name: 'EXO-51 Lumberer', category: 'Exo Experts', icon: 'Exo Experts/Lumberer Exosuit.svg', groups: ['exosuit'] },
  { name: 'EXO-55 Breakthrough', category: 'Exo Experts', icon: 'Exo Experts/Breakthrough Exosuit.svg', groups: ['exosuit'] },
  { name: 'Bullet Storm', category: 'Exo Experts', icon: 'Exo Experts/Bullet Storm.svg', groups: ['support'] },
  { name: 'C4 Pack', category: 'Redacted Regiment', icon: 'Redacted Regiment/C4 Pack.svg', groups: ['backpack', 'support'] },
  { name: 'Bastion Tank', category: 'Siege Breakers', icon: 'Siege Breakers/Bastion MK XVI.svg', groups: [] },
  { name: 'CQC-20', category: 'Siege Breakers', icon: 'Siege Breakers/CQC-20.svg', groups: ['support'] },
  { name: 'EAT-411', category: 'Siege Breakers', icon: 'Siege Breakers/EAT-411.svg', groups: ['support'] },
  { name: 'GL-28', category: 'Siege Breakers', icon: 'Siege Breakers/GL-28.svg', groups: ['backpack', 'support'] },
];

/* Exported for the Node checker in tools/. Ignored by the browser. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STRATAGEM_GROUPS, STRATAGEMS };
}
