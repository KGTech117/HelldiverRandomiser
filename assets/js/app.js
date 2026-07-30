/* =============================================================================
 * UI
 * -----------------------------------------------------------------------------
 * Renders four stratagem slots plus one booster, and re-fills them on demand.
 * ========================================================================== */

const LOADOUT_SIZE = 4;
const PLACEHOLDER_ICON = 'assets/icons/placeholder.svg';

const loadoutEl = document.getElementById('loadout');
const boosterEl = document.getElementById('booster');
const rollButton = document.getElementById('roll');
const statusEl = document.getElementById('status');

/**
 * Point an <img> at an entry's artwork, falling back to the placeholder if the
 * file is missing. encodeURI keeps the spaces in the SVG filenames working.
 */
function setIcon(img, item) {
  img.onerror = () => {
    img.onerror = null;
    img.src = PLACEHOLDER_ICON;
  };
  img.src = encodeURI(item.icon);
  img.alt = item.name;
}

/** Restart the reveal animation, staggered by position. */
function reveal(el, index) {
  el.style.setProperty('--delay', `${index * 70}ms`);
  el.classList.remove('is-dealt');
  void el.offsetWidth;
  el.classList.add('is-dealt');
}

/** Build the four empty slots once; rolling only swaps their contents. */
function buildSlots() {
  for (let i = 0; i < LOADOUT_SIZE; i++) {
    const card = document.createElement('article');
    card.className = 'card is-empty';
    card.innerHTML = `
      <span class="card__slot">${String(i + 1).padStart(2, '0')}</span>
      <div class="card__art"><img class="card__icon" alt="" src="${PLACEHOLDER_ICON}"></div>
      <h2 class="card__name">Awaiting Orders</h2>
      <p class="card__category">&mdash;</p>
      <p class="card__tags"></p>`;
    loadoutEl.appendChild(card);
  }
}

function fillCard(card, stratagem, index) {
  const tags = (stratagem.groups || [])
    .map((key) => STRATAGEM_GROUPS[key] && STRATAGEM_GROUPS[key].label)
    .filter(Boolean);

  setIcon(card.querySelector('.card__icon'), stratagem);
  card.querySelector('.card__name').textContent = stratagem.name;
  card.querySelector('.card__category').textContent = stratagem.category;
  card.querySelector('.card__tags').innerHTML = tags
    .map((label) => `<span class="tag">${label}</span>`)
    .join('');

  card.classList.remove('is-empty');
  reveal(card, index);
}

function fillBooster(booster) {
  setIcon(boosterEl.querySelector('.booster__icon'), booster);
  boosterEl.querySelector('.booster__name').textContent = booster.name;
  boosterEl.querySelector('.booster__category').textContent = booster.category;

  boosterEl.classList.remove('is-empty');
  reveal(boosterEl, LOADOUT_SIZE); // lands just after the fourth card
}

function roll() {
  const loadout = rollLoadout({
    pool: STRATAGEMS,
    groups: STRATAGEM_GROUPS,
    size: LOADOUT_SIZE,
  });
  const booster = pickOne(BOOSTERS);

  const cards = loadoutEl.querySelectorAll('.card');
  loadout.forEach((stratagem, i) => fillCard(cards[i], stratagem, i));
  if (booster) fillBooster(booster);

  const names = loadout.map((s) => s.name).join(', ');
  statusEl.textContent = booster
    ? `Loadout issued: ${names}. Booster: ${booster.name}.`
    : `Loadout issued: ${names}.`;
}

buildSlots();
rollButton.addEventListener('click', roll);

// The counts and the caps line are built from data.js, so adding a stratagem,
// a booster or a restriction shows up here without touching the markup.
document.getElementById('pool-count').textContent = STRATAGEMS.length;
document.getElementById('booster-count').textContent = BOOSTERS.length;
document.getElementById('rules').textContent = Object.values(STRATAGEM_GROUPS)
  .map((group) => `max ${group.max} ${group.label}`)
  .join(' · ');
