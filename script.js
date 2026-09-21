// Khau Gully Express — site interactivity
// Colors cycle the same way the design did: chili, turmeric, chutney, teal, repeating.

const COLORS = ['#D62828', '#FFC300', '#2E8B57', '#0E7C7B'];

const CATEGORIES = [
  { name: 'Vada Pav', dishes: [
    { name: 'Bombay OG Vadapav', price: '$4.99' },
    { name: 'Amdavadi Butter Vadapav', price: '$5.99' }
  ] },
  { name: 'Sandwiches', dishes: [
    { name: 'Bombay Sandwich Toastie', price: '$10.99' },
    { name: 'Amdavadi Gughra Sandwich', price: '$11.99' },
    { name: 'Vegetable Sandwich', price: '$8.99' },
    { name: 'Bread Slices', note: 'Butter, jam & chutney', price: '$3.99' }
  ] },
  { name: 'Frankie', dishes: [
    { name: 'Chatpata Paneer Frankie', price: '$11.99' },
    { name: 'Bombay Masala Frankie', price: '$10.99' }
  ] },
  { name: 'Buttery Bites', dishes: [
    { name: 'Makai Masti', note: 'Corn sautéed with spices', price: '$4.99' },
    { name: 'Desi Tadka Pasta', price: '$8.99' },
    { name: 'Butter Tadka Maggi', price: '$5.99' },
    { name: 'Butter Tawa Pulav', price: '$9.99' },
    { name: 'Muska Bun', price: '$3.99' }
  ] },
  { name: 'Chaat Corner', dishes: [
    { name: 'Papdi Chaat', price: '$8.99' },
    { name: 'Sev Puri', price: '$7.99' },
    { name: 'Dahi Puri', price: '$8.99' },
    { name: 'Bhel', price: '$7.99' },
    { name: 'Bombay Sukha Bhel', price: '$7.99' }
  ] },
  { name: 'Pani Puri', dishes: [
    { name: 'All You Can Eat', price: '$13.99' },
    { name: '8 Piece Plate', price: '$6.99' }
  ], pills: ['Phudina', 'Kaccha Aam', 'Garlic', 'Hajma Hajam'] },
  { name: 'DIY Chaat Bar', dishes: [
    { name: 'Build Your Own Chaat', note: 'Pick your base, chutneys & toppings', price: '$9.99' }
  ] },
  { name: 'Desi Walking Taco', dishes: [
    { name: 'Truck Chips Included', note: 'Chips + your choice of veggies', price: '$8.99' },
    { name: 'BYO Chips (We Load It)', price: '$5.99' }
  ] },
  { name: 'Dessert', dishes: [
    { name: 'Malai Tres Leches', price: '$8.99' }
  ] },
  { name: 'Beverages', dishes: [
    { name: 'Kadak Masala Chai', price: '$2.99' },
    { name: 'Cold Coffee', note: '+Bournvita (Coffee Vita) $1.00 · +Ice Cream $2.00', price: '$4.99' },
    { name: 'Masala Soda', price: '$2.99' }
  ] }
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
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.gap = '12px';

    const left = document.createElement('div');
    left.style.display = 'flex';
    left.style.alignItems = 'flex-start';
    left.style.gap = '10px';
    left.innerHTML = '<span class="veg"><span></span></span>';

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
    left.appendChild(textWrap);
    row.appendChild(left);

    if (dish.price) {
      const price = document.createElement('div');
      price.className = 'dish-price';
      price.textContent = dish.price;
      price.style.fontWeight = '700';
      price.style.whiteSpace = 'nowrap';
      price.style.color = color;
      row.appendChild(price);
    }

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
