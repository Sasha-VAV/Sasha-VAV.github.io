// Set language based on browser preference
function setInitialLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const defaultLang = browserLang.startsWith('ru') ? 'ru' : 'en';
    switchLanguage(defaultLang);
}

function switchLanguage(lang) {
    document.documentElement.lang = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === lang);
    });

    // Toggle language content
    document.querySelectorAll('[lang]').forEach(el => {
        if (el.tagName === 'HTML') return;
        if (el.lang === lang) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    });
}

// Language switching
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        switchLanguage(lang);
    });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setInitialLanguage();

    // Force reflow to trigger animations
    setTimeout(() => {
        document.body.clientHeight;
    }, 100);
});