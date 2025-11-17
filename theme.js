 document.addEventListener('DOMContentLoaded', function () {
    // Theme Switch tugmasini yaratamiz
    const themeSwitch = document.createElement('div');
    themeSwitch.id = 'theme-switch';
    
    // Har ikkala tugmani yaratamiz, lekin birini yashiramiz
    themeSwitch.innerHTML = `
        <button class="theme-btn light-btn" aria-label="Oq fon" title="Oq fon">☀️</button>
        <button class="theme-btn dark-btn" aria-label="Qora fon" title="Qora fon">🌙</button>
    `;

    // Tugmalar uchun style
    const style = document.createElement('style');
    style.textContent = `
        #theme-switch {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            padding: 6px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .theme-btn {
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .light-btn {
            background: #fff;
            color: #ffd700;
            box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .dark-btn {
            background: #222;
            color: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
        .theme-btn:hover {
            transform: scale(1.1);
        }
        .theme-btn:active {
            transform: scale(0.95);
        }
        /* Yashirish uchun */
        .theme-btn.hidden {
            display: none !important;
        }

        /* Light Theme */
        body.light-theme {
            background-color: #ffffff !important;
            color: #222222 !important;
            transition: all 0.3s ease;
        }
        body.light-theme .main {
            background: #f0f9ff !important;
        }
        body.light-theme nav {
            background: #e0f2fe !important;
        }
        body.light-theme nav a,
        body.light-theme nav h1 {
            color: #1e40af !important;
        }
        body.light-theme .service-card {
            background: #ffffff !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        }
        body.light-theme .service-card h3 {
            color: #1e40af !important;
        }
        body.light-theme .service-card p {
            color: #334155 !important;
        }
        body.light-theme .main h1 {
            color: #1e40af !important;
        }
        body.light-theme a {
            color: #1e40af !important;
        }
        body.light-theme .haqida {
            background: #f1f5f9 !important;
            color: #222222 !important;
        }
        body.light-theme .haqida h1 {
            color: #1e40af !important;
        }
        body.light-theme .haqida p,
        body.light-theme .haqida span {
            color: #334155 !important;
        }
        body.light-theme .rasm {
            background: #ffffff !important;
        }
        body.light-theme .rasm h1 {
            color: #1e40af !important;
        }

        /* Dark Theme */
        body.dark-theme {
            background-color: #111111 !important;
            color: #ffffff !important;
            transition: all 0.3s ease;
        }
        body.dark-theme .main {
            background: #1e293b !important;
            color: #e2e8f0 !important;
        }
        body.dark-theme nav {
            background: #0f172a !important;
        }
        body.dark-theme nav a,
        body.dark-theme nav h1 {
            color: #60a5fa !important;
        }
        body.dark-theme .service-card {
            background: #1e293b !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
        }
        body.dark-theme .service-card h3 {
            color: #60a5fa !important;
        }
        body.dark-theme .service-card p {
            color: #e2e8f0 !important;
        }
        body.dark-theme .main h1 {
            color: #60a5fa !important;
        }
        body.dark-theme a {
            color: #60a5fa !important;
        }
        body.dark-theme .haqida {
            background: #1e293b !important;
            color: #e2e8f0 !important;
        }
        body.dark-theme .haqida h1 {
            color: #60a5fa !important;
        }
        body.dark-theme .haqida p,
        body.dark-theme .haqida span {
            color: #e2e8f0 !important;
        }
        body.dark-theme .rasm {
            background: #1e293b !important;
        }
        body.dark-theme .rasm h1 {
            color: #60a5fa !important;
        }
    `;
    document.head.appendChild(style);

    // Tugmani sahifaga qo'shamiz
    document.body.appendChild(themeSwitch);

    // Tugmalarni topib olish
    const lightBtn = themeSwitch.querySelector('.light-btn');
    const darkBtn = themeSwitch.querySelector('.dark-btn');

    // Tugmalarni yashirish/ko'rsatish funksiyasi
    function updateButtons(theme) {
        if (theme === 'dark') {
            lightBtn.classList.remove('hidden');
            darkBtn.classList.add('hidden');
        } else {
            darkBtn.classList.remove('hidden');
            lightBtn.classList.add('hidden');
        }
    }

    // Mavjud theme ni localStorage dan olamiz
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(currentTheme + '-theme');
    updateButtons(currentTheme); // Boshlang'ich holatda tugmalarni moslashtirish

    // Oq fon tugmasi
    lightBtn.addEventListener('click', () => {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        updateButtons('light');
    });

    // Qora fon tugmasi
    darkBtn.addEventListener('click', () => {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateButtons('dark');
    });

    // Responsive uchun
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    function handleResponsive(e) {
        if (e.matches) {
            themeSwitch.style.top = '80px';
            themeSwitch.style.right = '10px';
        } else {
            themeSwitch.style.top = '20px';
            themeSwitch.style.right = '20px';
        }
    }
    mediaQuery.addListener(handleResponsive);
    handleResponsive(mediaQuery);
});

