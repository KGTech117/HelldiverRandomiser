/* =============================================================================
 * UI
 * -----------------------------------------------------------------------------
 * Renders four slots and re-fills them from rollLoadout() on demand.
 * ========================================================================== */

const LOADOUT_SIZE = 4;
const PLACEHOLDER_ICON = 'assets/icons/placeholder.svg';

const loadoutEl = document.getElementById('loadout');
const rollButton = document.getElementById('roll');
const statusEl = document.getElementById('status');

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
  const img = card.querySelector('.card__icon');
  const tags = (stratagem.groups || [])
    .map((key) => STRATAGEM_GROUPS[key] && STRATAGEM_GROUPS[key].label)
    .filter(Boolean);

  // encodeURI keeps the spaces in the SVG filenames working as URLs.
  img.onerror = () => {
    img.onerror = null;
    img.src = PLACEHOLDER_ICON;
  };
  img.src = encodeURI(stratagem.icon);
  img.alt = stratagem.name;

  card.querySelector('.card__name').textContent = stratagem.name;
  card.querySelector('.card__category').textContent = stratagem.category;
  card.querySelector('.card__tags').innerHTML = tags
    .map((label) => `<span class="tag">${label}</span>`)
    .join('');

  card.classList.remove('is-empty');
  card.style.setProperty('--delay', `${index * 70}ms`);

  // Restart the reveal animation on every roll.
  card.classList.remove('is-dealt');
  void card.offsetWidth;
  card.classList.add('is-dealt');
}

function roll() {
  const loadout = rollLoadout({
    pool: STRATAGEMS,
    groups: STRATAGEM_GROUPS,
    size: LOADOUT_SIZE,
  });

  const cards = loadoutEl.querySelectorAll('.card');
  loadout.forEach((stratagem, i) => fillCard(cards[i], stratagem, i));

  statusEl.textContent = `Loadout issued: ${loadout.map((s) => s.name).join(', ')}.`;
}

buildSlots();
rollButton.addEventListener('click', roll);

// The footer hint is built from the groups, so adding a restriction in data.js
// shows up here without touching the markup.
document.getElementById('pool-count').textContent = STRATAGEMS.length;
document.getElementById('rules').textContent = Object.values(STRATAGEM_GROUPS)
  .map((group) => `max ${group.max} ${group.label}`)
  .join(' · ');
