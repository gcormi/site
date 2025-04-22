document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.main-menu a, .back-to-top');
    const accueilSection = document.getElementById('accueil');
    const modal = document.getElementById('infoModalEvolution');
    const modalContent = modal.querySelector('.modal-content-evolution');
    const modalTitle = document.getElementById('modalTitleEvolution');
    const modalText = document.getElementById('modalTextEvolution');
    const closeButton = modal.querySelector('.close-button-evolution');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const dyslexiaModeToggle = document.getElementById('dyslexiaModeToggle');

    // --- Gestion Thème Sombre et Mode Dyslexie ---

    // Fonction pour appliquer un thème
    function applyTheme(theme) {
        body.dataset.theme = theme;
        localStorage.setItem('theme', theme); // Sauvegarde
        // Met à jour l'icône du bouton (optionnel)
        if (darkModeToggle) {
            darkModeToggle.innerHTML = theme === 'dark'
                ? '<i class="fas fa-sun"></i> Mode Clair'
                : '<i class="fas fa-moon"></i> Mode Sombre';
        }
    }

    // Fonction pour appliquer le mode dyslexie
    function applyDyslexiaMode(isDyslexia) {
        const mode = isDyslexia ? 'true' : 'false';
        body.dataset.dyslexia = mode;
        localStorage.setItem('dyslexiaMode', mode); // Sauvegarde
        // Met à jour le texte du bouton (optionnel)
         if (dyslexiaModeToggle) {
            dyslexiaModeToggle.innerHTML = isDyslexia
                ? '<i class="fas fa-eye"></i> Mode Normal'
                : '<i class="fas fa-low-vision"></i> Mode Dys';
        }
    }

    // Écouteur pour le bouton Mode Sombre
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
        });
    }

    // Écouteur pour le bouton Mode Dyslexie
    if (dyslexiaModeToggle) {
        dyslexiaModeToggle.addEventListener('click', () => {
            const isDyslexia = body.dataset.dyslexia !== 'true'; // Inverse la valeur actuelle
            applyDyslexiaMode(isDyslexia);
        });
    }

    // Charger les préférences au démarrage
    const savedTheme = localStorage.getItem('theme') || 'light'; // 'light' par défaut
    const savedDyslexia = localStorage.getItem('dyslexiaMode') === 'true'; // false par défaut
    applyTheme(savedTheme);
    applyDyslexiaMode(savedDyslexia);


    // --- Gestion de la navigation entre les sections ---
    function showSection(sectionId) {
        let targetSection = null;

        sections.forEach(section => {
            if (`#${section.id}` === sectionId) {
                targetSection = section;
            } else {
                section.style.display = 'none';
                section.classList.remove('section-fade-in');
                section.style.opacity = '0';
            }
        });

        if (targetSection) {
            if (targetSection.id === 'accueil') {
                 targetSection.style.display = 'flex';
            } else {
                 targetSection.style.display = 'block';
            }
            // Force reflow pour animation
            void targetSection.offsetWidth;
            targetSection.classList.add('section-fade-in');

            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);

            if (window.location.hash !== sectionId) {
                 history.pushState(null, null, sectionId);
            }
        } else if (sectionId === '#accueil' && accueilSection) {
            accueilSection.style.display = 'flex';
             // Force reflow pour animation
            void accueilSection.offsetWidth;
            accueilSection.classList.add('section-fade-in');
             setTimeout(() => {
                accueilSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
             if (window.location.hash !== '#accueil' && window.location.hash !== '') {
                 history.pushState(null, null, '#accueil');
             }
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            showSection(targetId);
        });
    });

    const initialSectionId = window.location.hash || '#accueil';
    sections.forEach(section => {
        if (`#${section.id}` !== initialSectionId) {
            section.style.display = 'none';
            section.style.opacity = '0';
        }
    });
    setTimeout(() => showSection(initialSectionId), 0);


    // --- Gestion de la fenêtre modale (glossaire) ---
    function openModal(title, text) {
        modalTitle.textContent = title;
        modalText.innerHTML = text;
        modal.style.display = 'flex';
        // Réinitialise l'animation du contenu
        modalContent.style.animation = 'none';
        void modalContent.offsetWidth; // Force reflow
        modalContent.style.animation = '';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.body.addEventListener('click', (event) => {
        const target = event.target.closest('.glossary-term-evolution');
        if (target) {
            event.preventDefault();
            const term = target.getAttribute('data-term-evol') || target.textContent;
            const info = target.getAttribute('data-info-evol');

            if (info) {
                 openModal(term, info);
            } else {
                console.warn("Terme de glossaire cliqué mais sans data-info-evol:", term);
            }
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

});
