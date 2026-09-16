(function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Bunting flags
  var colors = ['#D62828', '#FFC300', '#2E8B57', '#0E7C7B'];
  var bunting = document.getElementById('bunting');
  if (bunting) {
    var flagsHtml = '';
    for (var i = 0; i < 80; i++) {
      flagsHtml += '<div class="flag" style="background:' + colors[i % colors.length] + ';"></div>';
    }
    bunting.innerHTML = flagsHtml;
  }

  // Menu explorer
  var categories = [
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

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function colorFor(i) { return colors[i % colors.length]; }

  var navEl = document.getElementById('menuNav');
  var headerEl = document.getElementById('menuHeader');
  var bodyEl = document.getElementById('menuBody');

  if (navEl && headerEl && bodyEl) {
    var active = 0;

    var renderMenu = function () {
      navEl.innerHTML = categories.map(function (cat, i) {
        var isActive = i === active;
        var color = colorFor(i);
        var num = String(i + 1).padStart(2, '0');
        return '<button type="button" class="tab" data-index="' + i + '" ' +
          'style="border:2px solid ' + color + ';background:' + (isActive ? color : '#FFFFFF') + ';">' +
          '<span class="tab-badge" style="background:' + (isActive ? 'rgba(255,255,255,.9)' : color) + ';color:' + (isActive ? color : '#FFFFFF') + ';">' + num + '</span>' +
          '<span style="font-weight:700;font-size:15px;color:' + (isActive ? '#FFFFFF' : 'var(--ink)') + ';">' + esc(cat.name) + '</span>' +
          '</button>';
      }).join('');

      navEl.querySelectorAll('.tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          active = parseInt(btn.getAttribute('data-index'), 10);
          renderMenu();
        });
      });

      var cur = categories[active];
      var color = colorFor(active);
      var num = String(active + 1).padStart(2, '0');

      headerEl.style.background = color;
      headerEl.innerHTML =
        '<span style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.9);color:' + color + ';font-family:\'Baloo 2\',sans-serif;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;flex:none;">' + num + '</span>' +
        '<h3>' + esc(cur.name) + '</h3>';

      var dishesHtml = cur.dishes.map(function (d) {
        return '<div class="dish-row">' +
          '<span class="veg"><span></span></span>' +
          '<div><div class="dish-name">' + esc(d.name) + '</div>' +
          (d.note ? '<div class="dish-note">' + esc(d.note) + '</div>' : '') +
          '</div></div>';
      }).join('');

      var pillsHtml = '';
      if (cur.pills && cur.pills.length) {
        pillsHtml = '<div style="margin-top:14px;">' + cur.pills.map(function (p) {
          return '<span class="pill">' + esc(p) + '</span>';
        }).join('') + '</div>';
      }

      bodyEl.innerHTML = '<div>' + dishesHtml + '</div>' + pillsHtml;
    };

    renderMenu();
  }
})();
