document.addEventListener("DOMContentLoaded", () => {
    // 1. Highlight active navigation link based on current page
    const currentPath = location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn), .legal-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // 2. Mobile navigation toggle
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            const isOpen = links.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                links.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 3. Interactive Monthly / Annual Billing Switcher (subscription.html)
    const btnMonthly = document.getElementById('btnMonthly');
    const btnYearly = document.getElementById('btnYearly');
    const priceElements = document.querySelectorAll('.price[data-monthly]');
    const subElements = document.querySelectorAll('.price-sub[data-monthly-sub]');

    function setBillingPeriod(period) {
        const isYearly = period === 'yearly';
        if (btnMonthly && btnYearly) {
            btnMonthly.classList.toggle('active', !isYearly);
            btnYearly.classList.toggle('active', isYearly);
        }
        priceElements.forEach(el => {
            const val = isYearly ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
            const suffix = isYearly ? '/yr' : '/mo';
            el.innerHTML = `${val}<span>${suffix}</span>`;
        });
        subElements.forEach(el => {
            el.textContent = isYearly
                ? el.getAttribute('data-yearly-sub')
                : el.getAttribute('data-monthly-sub');
        });
    }

    if (btnMonthly && btnYearly) {
        btnMonthly.addEventListener('click', () => setBillingPeriod('monthly'));
        btnYearly.addEventListener('click', () => setBillingPeriod('yearly'));
    }

    // 4. Interactive User Guide Accordion & Live Search (user-guide.html)
    const guideCards = document.querySelectorAll('.guide-card');
    guideCards.forEach(card => {
        const headerBtn = card.querySelector('.guide-header-btn');
        if (headerBtn) {
            headerBtn.addEventListener('click', () => {
                const isOpen = card.classList.toggle('open');
                headerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
        }
    });

    const guideSearchInput = document.getElementById('guideSearchInput');
    if (guideSearchInput) {
        guideSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            guideCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                const matches = !query || text.includes(query);
                card.style.display = matches ? '' : 'none';
                if (query && matches) {
                    card.classList.add('open');
                }
            });
        });
    }
});