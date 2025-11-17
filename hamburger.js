document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const menu = nav.querySelector('.left');
  if (!menu) return;

  // Hamburger tugmasi yaratish
  const btn = document.createElement('button');
  btn.id = 'gamburger-toggle';
  btn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
  btn.style.display = 'none';
  btn.style.flexDirection = 'column';
  btn.style.justifyContent = 'center';
  btn.style.alignItems = 'center';
  btn.style.background = 'transparent';
  btn.style.border = 'none';
  btn.style.cursor = 'pointer';
  btn.style.padding = '8px';
  btn.setAttribute('aria-label', 'Menyu');
  nav.insertBefore(btn, menu);

  // Overlay yaratish
  const overlay = document.createElement('div');
  overlay.id = 'gamburger-overlay';
  overlay.style.display = 'none';
  document.body.appendChild(overlay);

  // Barlar va menyu uchun style
  const style = document.createElement('style');
  style.textContent = `
    #gamburger-toggle .bar {
      width: 28px;
      height: 3px;
      background: #1e3a8a;
      margin: 5px 0;
      border-radius: 2px;
      transition: all 0.3s;
      display: block;
    }
    #gamburger-overlay {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.3s;
      opacity: 0;
      pointer-events: none;
    }
    #gamburger-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    @media (max-width: 500px) {
      #gamburger-toggle { display: flex !important; z-index: 1100; }
      nav .left {
        display: none !important;
        position: fixed !important;
        top: 50%;
        right: 0;
        left: 0;
        transform: translateY(-50%) translateX(100%);
        background: #fff;
        flex-direction: column !important;
        gap: 1.2rem !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 18px;
        box-shadow: 0 8px 32px rgba(30,58,138,0.15);
        width: 80vw;
        max-width: 320px;
        margin: 0 auto;
        z-index: 1101;
        padding: 2rem 1rem;
        transition: transform 0.35s cubic-bezier(.4,2,.6,1), opacity 0.3s;
        opacity: 0;
      }
      nav .left.open {
        display: flex !important;
        transform: translateY(-50%) translateX(0);
        opacity: 1;
      }
      #gamburger-overlay { display: flex; }
    }
  `;
  document.head.appendChild(style);

  function updateMenu() {
    if (window.innerWidth <= 500) {
      btn.style.display = 'flex';
      if (!menu.classList.contains('open')) {
        menu.style.display = 'none';
        overlay.classList.remove('active');
      }
    } else {
      btn.style.display = 'none';
      menu.style.display = '';
      menu.classList.remove('open');
      overlay.classList.remove('active');
    }
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      menu.style.display = 'none';
      overlay.classList.remove('active');
    } else {
      menu.classList.add('open');
      menu.style.display = 'flex';
      overlay.classList.add('active');
    }
  });

  // Overlay yoki tashqariga bosilganda menyuni yopish
  overlay.addEventListener('click', function () {
    menu.classList.remove('open');
    menu.style.display = 'none';
    overlay.classList.remove('active');
  });

  document.addEventListener('click', function (e) {
    if (window.innerWidth > 500) return;
    if (!menu.classList.contains('open')) return;
    if (!nav.contains(e.target) && e.target !== overlay) {
      menu.classList.remove('open');
      menu.style.display = 'none';
      overlay.classList.remove('active');
    }
  });

  window.addEventListener('resize', updateMenu);
  updateMenu();
});
