// Khau Gully Express — site interactivity
// Colors cycle the same way the design did: chili, turmeric, chutney, teal, repeating.

const COLORS = ['#D62828', '#FFC300', '#2E8B57', '#0E7C7B'];

const CATEGORIES = [
  { name: 'Vada Pav', dishes: [{ name: 'Bombay Vada Pav' }, { name: 'Amdavadi Butter Vada Pav' }] },
  { name: 'Sandwiches', dishes: [{ name: 'Bombay Sandwich Toastie' }, { name: 'Amdavadi Ghughra Sandwich' }, { name: 'Vegetable Sandwich' }, { name: 'Bread Slices', note: 'Butter, jam or chutney' }] },
  { name: 'Frankie', dishes: [{ name: 'Chatpata Paneer Frankie' }, { name: 'Bombay Masala Frankie' }] },
  { name: 'Buttery Bites', dishes: [{ name: 'Makai Masti', note: 'Corn sautéed with spices' }, { name: 'Desi Tadka Pasta' }, { name: 'Butter Tadka Maggi' }, { name: 'Butter Tawa Pulav' }, { name: 'Bun Maska' }] },
  { name: 'Chaat Corner', dishes: [{ name: 'Papdi Chaat' }, { name: 'Sev Puri' }, { name: 'Bhel' }, { name: 'Bombay Sukha Bhel' }, { name: 'Dahi Puri' }] },
  { name: 'Pani Puri', dishes: [{ name: 'Pick your flavor', note: '8-piece plate or all-you-can-eat' }], pills: ['Phudina', 'Kaccha Aam', 'Hajma Hajam', 'Garlic'] },
  { name: 'DIY Chaat Bar', dishes: [{ name: 'Pick your base, chutneys and toppings.' }] },
  { name: 'Desi Walking Taco', dishes: [{ name: 'Indian chips with your choice of veggies' }], pills: ['Truck Chips', 'BYO Chips'] },
  { name: 'Dessert', dishes: [{ name: 'Malai Tres Leches' }] },
  { name: 'Beverages', dishes: [{ name: 'Karak Masala Chai' }, { name: 'Phudina Chai' }, { name: 'Cold Coffee', note: 'Add Coffee Vita (Bournvita) or ice cream' }, { name: 'Masala Soda', note: 'Jaljeera with your choice of soft drink' }] }
];

let activeIndex = 0;

function colorFor(i) {
  return COLORS[i % COLORS.length];
}

function renderBunting() {
  const bunting = document.getElementById('bunting');
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 60; i++) {
    const flag = document.createElement('div');
    flag.className = 'flag';
    flag.style.background = colorFor(i);
    frag.appendChild(flag);
  }
  bunting.appendChild(frag);
}

function renderMarquee() {
  const track = document.getElementById('marqueeTrack');
  const names = CATEGORIES.map((c) => c.name);
  const doubled = names.concat(names);
  const frag = document.createDocumentFragment();
  doubled.forEach((name, i) => {
    const item = document.createElement('div');
    item.className = 'marquee-item';
    const dot = document.createElement('span');
    dot.className = 'marquee-dot';
    dot.style.background = colorFor(i);
    item.appendChild(dot);
    item.appendChild(document.createTextNode(name));
    frag.appendChild(item);
  });
  track.appendChild(frag);
}

function renderMenuNav() {
  const nav = document.getElementById('menuNav');
  nav.innerHTML = '';
  CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tab';
    btn.setAttribute('role', 'tab');
    btn.dataset.index = String(i);
    btn.addEventListener('click', () => {
      activeIndex = i;
      renderMenuNav();
      renderMenuDetail();
    });

    const badge = document.createElement('span');
    badge.className = 'tab-badge';
    badge.textContent = String(i + 1).padStart(2, '0');

    const label = document.createElement('span');
    label.className = 'tab-name';
    label.textContent = cat.name;

    const color = colorFor(i);
    const isActive = i === activeIndex;
    btn.style.borderColor = color;
    btn.style.background = isActive ? color : '#FFFFFF';
    badge.style.background = isActive ? 'rgba(255,255,255,.9)' : color;
    badge.style.color = isActive ? color : '#FFFFFF';
    label.style.color = isActive ? '#FFFFFF' : 'var(--ink)';
    btn.setAttribute('aria-selected', String(isActive));

    btn.appendChild(badge);
    btn.appendChild(label);
    nav.appendChild(btn);
  });
}

function renderMenuDetail() {
  const header = document.getElementById('menuHeader');
  const body = document.getElementById('menuBody');
  const cat = CATEGORIES[activeIndex];
  const color = colorFor(activeIndex);

  header.style.background = color;
  header.innerHTML = '';
  const badge = document.createElement('span');
  badge.className = 'menu-detail-badge';
  badge.style.color = color;
  badge.textContent = String(activeIndex + 1).padStart(2, '0');
  const h3 = document.createElement('h3');
  h3.textContent = cat.name;
  header.appendChild(badge);
  header.appendChild(h3);

  body.innerHTML = '';
  const list = document.createElement('div');
  cat.dishes.forEach((dish) => {
    const row = document.createElement('div');
    row.className = 'dish-row';
    row.innerHTML = '<span class="veg"><span></span></span>';
    const textWrap = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'dish-name';
    name.textContent = dish.name;
    textWrap.appendChild(name);
    if (dish.note) {
      const note = document.createElement('div');
      note.className = 'dish-note';
      note.textContent = dish.note;
      textWrap.appendChild(note);
    }
    row.appendChild(textWrap);
    list.appendChild(row);
  });
  body.appendChild(list);

  if (cat.pills && cat.pills.length) {
    const pillWrap = document.createElement('div');
    pillWrap.className = 'pill-wrap';
    cat.pills.forEach((label) => {
      const pill = document.createElement('span');
      pill.className = 'pill';
      pill.textContent = label;
      pillWrap.appendChild(pill);
    });
    body.appendChild(pillWrap);
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
renderBunting();
renderMarquee();
renderMenuNav();
renderMenuDetail();
