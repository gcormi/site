document.addEventListener('DOMContentLoaded', () => {
    const body = document.body; // Define body early for use in multiple functions

    // --- Section Navigation (SPA Logic) ---
    const sections = document.querySelectorAll('main section');
    const accueilSection = document.getElementById('accueil');
    const tilesGrid = document.querySelector('.tiles-grid');
    const backToTopLinks = document.querySelectorAll('.back-to-top');

    let currentVisibleSection = accueilSection;
    const animationDuration = 500;

    sections.forEach(section => {
        if (section.id !== 'accueil') {
            section.style.display = 'none';
            section.style.opacity = '0';
        } else {
            section.style.display = 'block';
            section.style.opacity = '1';
        }
    });

    const showSection = (sectionId) => {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection || targetSection === currentVisibleSection) {
            if (targetSection === currentVisibleSection) {
                window.scrollTo(0, 0);
            }
            return;
        }
        const sectionToHide = currentVisibleSection;
        if (sectionToHide) {
            sectionToHide.style.animation = `sectionFadeOut ${animationDuration / 1000}s ease-out forwards`;
            setTimeout(() => {
                if (sectionToHide === currentVisibleSection) return;
                sectionToHide.style.display = 'none';
                sectionToHide.style.animation = '';
            }, animationDuration);
        }
        targetSection.style.display = 'block';
        targetSection.style.opacity = '0';
        targetSection.style.animation = '';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                targetSection.style.animation = `sectionFadeIn ${animationDuration / 1000}s ease-out forwards`;
                targetSection.style.opacity = '1';
            });
        });
        currentVisibleSection = targetSection;
        window.scrollTo(0, 0);
        observeElements(targetSection);
    };

    if (tilesGrid) {
        tilesGrid.addEventListener('click', (event) => {
            const tileLink = event.target.closest('a.tile');
            if (tileLink) {
                event.preventDefault();
                const targetSectionId = tileLink.getAttribute('href').substring(1);
                showSection(targetSectionId);
            }
        });
    }

    backToTopLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSectionId = link.getAttribute('href').substring(1);
            showSection(targetSectionId);
        });
    });

    // --- Glossary Modal Logic ---
    const modal = document.getElementById('infoModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalTerm = document.getElementById('modalTerm');
    const modalInfo = document.getElementById('modalInfo');
    const closeButton = document.querySelector('.close-button');
    const mainContent = document.querySelector('main');

    const openModal = (term, info) => {
        modalTerm.textContent = term;
        modalInfo.textContent = info;
        modal.style.display = 'block';
        modalContent.style.animation = 'none';
        modalContent.offsetHeight; // Force reflow
        modalContent.style.animation = `slideDown 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
    };

    const closeModal = () => {
        modalContent.style.animation = `slideUp 0.4s ease-out forwards`;
        setTimeout(() => {
            modal.style.display = 'none';
            modalContent.style.animation = '';
        }, 400);
    };

    if (mainContent) {
        mainContent.addEventListener('click', (event) => {
            const glossarySpan = event.target.closest('.glossary-term');
            if (glossarySpan) {
                event.preventDefault();
                const term = glossarySpan.dataset.term;
                const info = glossarySpan.dataset.info;
                if (term && info) {
                    openModal(term, info);
                }
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // --- Dark Mode Logic ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const moonIcon = 'fa-moon';
    const sunIcon = 'fa-sun';

    const applyMode = (mode) => {
        const iconElement = darkModeToggle.querySelector('i');
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            iconElement.classList.remove(moonIcon);
            iconElement.classList.add(sunIcon);
            localStorage.setItem('themeMode', 'dark');
        } else {
            body.classList.remove('dark-mode');
            iconElement.classList.remove(sunIcon);
            iconElement.classList.add(moonIcon);
            localStorage.setItem('themeMode', 'light');
        }
    };

    darkModeToggle.addEventListener('click', () => {
        const currentMode = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyMode(currentMode);
    });

    const savedMode = localStorage.getItem('themeMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode) {
        applyMode(savedMode);
    } else if (prefersDark) {
        applyMode('dark');
    } else {
        applyMode('light'); // Default to light
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('themeMode')) {
            applyMode(event.matches ? 'dark' : 'light');
        }
    });
    // --- End Dark Mode Logic ---


    // --- Dyslexia Font Logic ---
    const dyslexiaFontToggle = document.getElementById('dyslexiaFontToggle');

    const applyDyslexiaFont = (enable) => {
        if (enable) {
            body.classList.add('dyslexia-mode');
            dyslexiaFontToggle.classList.add('active'); // Add active class to button
            localStorage.setItem('dyslexiaFontEnabled', 'true');
        } else {
            body.classList.remove('dyslexia-mode');
            dyslexiaFontToggle.classList.remove('active'); // Remove active class
            localStorage.setItem('dyslexiaFontEnabled', 'false');
        }
    };

    dyslexiaFontToggle.addEventListener('click', () => {
        const isEnabled = body.classList.contains('dyslexia-mode');
        applyDyslexiaFont(!isEnabled); // Toggle the state
    });

    // Check for saved preference on load
    const savedDyslexiaPref = localStorage.getItem('dyslexiaFontEnabled');

    if (savedDyslexiaPref === 'true') {
        applyDyslexiaFont(true);
    } else {
        applyDyslexiaFont(false); // Default to disabled
    }
    // --- End Dyslexia Font Logic ---


    // --- Scroll-triggered Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    const observeElements = (container = document) => {
        const elementsToAnimate = container.querySelectorAll('.animated-element');
        elementsToAnimate.forEach(el => {
            if (container !== document && container.id !== 'accueil') {
                 el.classList.remove('is-visible');
                 el.style.animation = '';
                 el.style.opacity = '0';
            }
            if (!el.classList.contains('is-visible')) {
                 scrollObserver.observe(el);
            }
        });
    }

    observeElements();
    // --- End Scroll-triggered Animations ---

}); // End DOMContentLoaded
