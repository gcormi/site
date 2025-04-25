// --- Mobile Menu ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// --- Collapse Functionality ---
const collapseToggles = document.querySelectorAll('.collapse-toggle');
collapseToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('.chevron-icon');

        if (content && content.classList.contains('collapse-content')) {
            content.classList.toggle('hidden');
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        } else {
            console.error("Collapse content not found immediately after toggle:", toggle);
        }
    });
});


// --- Progress Bar ---
const progressBar = document.getElementById('progress-bar');
const updateProgressBar = () => {
    if (!progressBar) return;

    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight <= 0) {
         progressBar.style.width = '0%';
         return;
    }
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollProgress = Math.min(100, (scrollTop / scrollHeight) * 100);

    if (scrollTop > 50) {
        progressBar.style.width = scrollProgress + '%';
    } else {
        progressBar.style.width = '0%';
    }
};
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        updateProgressBar();
        window.addEventListener('scroll', updateProgressBar);
        window.addEventListener('resize', updateProgressBar);
    }, 100);
});


// --- Scroll Animations ---
const animatedElements = document.querySelectorAll('.scroll-animate');
if (window.IntersectionObserver) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => {
        observer.observe(el);
    });
} else {
    console.warn("IntersectionObserver not supported, scroll animations disabled.");
    animatedElements.forEach(el => el.classList.add('visible'));
}


// --- Dark Mode Toggle ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const moonIconClass = 'fa-moon';
const sunIconClass = 'fa-sun';

function applyTheme(isDark) {
    const icon = darkModeToggle?.querySelector('i');
    if (isDark) {
        body.classList.add('dark-mode');
        if (icon) {
            icon.classList.remove(moonIconClass);
            icon.classList.add(sunIconClass);
        }
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        if (icon) {
            icon.classList.remove(sunIconClass);
            icon.classList.add(moonIconClass);
        }
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialThemeIsDark = true;
    if (savedTheme === 'light') {
        initialThemeIsDark = false;
    }

    body.style.transition = 'none';
    applyTheme(initialThemeIsDark);
    setTimeout(() => {
        body.style.transition = '';
    }, 10);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            applyTheme(!isDarkMode);
        });
    }

    setTimeout(updateProgressBar, 150);

}); // Fin DOMContentLoaded
