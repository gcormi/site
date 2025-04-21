document.addEventListener('DOMContentLoaded', () => {
    console.log("SCRIPT FINAL (Option B - No Modal): DOM chargé.");

    // --- Sélecteurs ---
    const mainMenu = document.getElementById('main-menu');
    const categoryItems = document.querySelectorAll('.category-item[data-target]'); // Doit en trouver 4
    const contentSections = document.querySelectorAll('.content-section'); // Doit en trouver 4
    const backButtons = document.querySelectorAll('.back-button'); // Doit en trouver 4
    const tooltipBox = document.getElementById('tooltip-box');
    const tooltipContent = document.getElementById('tooltip-content');
    const tooltipClose = document.getElementById('tooltip-close');
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    const currentDateElement = document.getElementById('current-date');

     // Vérification initiale des éléments clés
     if (!mainMenu) console.error("ERREUR: #main-menu introuvable!");
     if (!tooltipBox) console.error("ERREUR: #tooltip-box introuvable!");
     if (categoryItems.length !== 4) console.warn(`WARN: ${categoryItems.length} éléments .category-item[data-target] trouvés (attendu 4).`);
     if (contentSections.length !== 4) console.warn(`WARN: ${contentSections.length} éléments .content-section trouvés (attendu 4).`);
     if (backButtons.length !== 4) console.warn(`WARN: ${backButtons.length} éléments .back-button trouvés (attendu 4).`);


    // --- Mise à jour de la date ---
    if (currentDateElement) {
        try {
            const today = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            currentDateElement.textContent = today.toLocaleDateString('fr-FR', options);
             console.log("Date mise à jour.");
        } catch (e) {
            console.error("Erreur lors de la mise à jour de la date:", e);
            currentDateElement.textContent = "Date indisponible";
        }
    } else {
        console.warn("WARN: L'élément #current-date est introuvable.");
    }

    // --- Fonctions Utilitaires ---
    function hideAllSections() {
        contentSections.forEach(sec => sec.classList.remove('active'));
    }
    function showMainMenu() { if(mainMenu) mainMenu.classList.remove('hidden'); }
    function hideMainMenu() { if(mainMenu) mainMenu.classList.add('hidden'); }

    // --- Gestion de la Navigation (Sections de Cours - Thèmes 1-4) ---
     if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.getAttribute('data-target');
                console.log("Clic item cours:", targetId);
                closeTooltipInstantly(); // Ferme tooltip au cas où
                hideAllSections(); // Cache autres sections

                const targetSection = document.getElementById(targetId);

                if (targetSection && mainMenu) {
                    hideMainMenu(); // Cache le menu principal
                    setTimeout(() => {
                        targetSection.classList.add('active');
                        targetSection.scrollTop = 0; // Scroll en haut
                    }, 50); // Délai court pour animation menu
                } else {
                     console.error("Section cible ou menu introuvable:", targetId);
                }
            });
        });
     } else {
         console.warn("WARN: Aucun item de catégorie de cours trouvé pour attacher les écouteurs.");
     }

    // Gestion du bouton retour des sections de cours
    if (backButtons.length > 0 && mainMenu) {
        backButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log("Clic bouton Retour");
                const currentSection = button.closest('.content-section');
                if (currentSection) {
                    currentSection.classList.remove('active');
                    setTimeout(() => { // Attend la fin de la transition de la section (0.3s dans CSS)
                        showMainMenu();
                    }, 300);
                }
            });
        });
     } else {
          console.warn("WARN: Aucun bouton retour ou menu principal trouvé pour attacher les écouteurs.");
     }

    // --- LA LOGIQUE POUR LA MODALE EST SUPPRIMÉE ---


    // --- Gestion des Tooltips ---
    function closeTooltip() {
        if (tooltipBox) {
            tooltipBox.classList.remove('visible');
            setTimeout(() => { if (tooltipBox && !tooltipBox.classList.contains('visible')) { tooltipBox.style.display = 'none'; } }, 300);
        }
    }
    function closeTooltipInstantly() {
        if (tooltipBox) {
             tooltipBox.classList.remove('visible');
             tooltipBox.style.display = 'none';
         }
    }

    if (tooltipTriggers.length > 0 && tooltipBox && tooltipContent && tooltipClose) {
        tooltipTriggers.forEach(trigger => {
            trigger.addEventListener('click', (event) => {
                 if (tooltipBox.classList.contains('visible') && !tooltipBox.contains(event.target)) {
                   closeTooltipInstantly();
                }
                event.stopPropagation(); // Empêche la fermeture par le clic document

                const definition = trigger.getAttribute('data-definition');
                tooltipContent.textContent = definition;

                // Calcul position
                const rect = trigger.getBoundingClientRect();
                let top = rect.bottom + window.scrollY + 8;
                let left = rect.left + window.scrollX;

                tooltipBox.style.visibility = 'hidden'; tooltipBox.style.display = 'block'; // Pour mesurer
                const tooltipRect = tooltipBox.getBoundingClientRect();
                // Ajustements pour ne pas sortir de l'écran
                if (left + tooltipRect.width > window.innerWidth - 15) { left = window.innerWidth - tooltipRect.width - 15; }
                if (left < 15) { left = 15; }
                if (top + tooltipRect.height > window.innerHeight - 15) { top = rect.top + window.scrollY - tooltipRect.height - 8; } // Au dessus
                if (top < 15) { top = 15; }

                tooltipBox.style.top = `${top}px`;
                tooltipBox.style.left = `${left}px`;

                tooltipBox.style.visibility = 'visible'; // Rend visible pour la transition
                tooltipBox.classList.add('visible'); // Déclenche transition opacité
            });
        });

        tooltipClose.addEventListener('click', closeTooltip);

        // Fermeture tooltip si clic extérieur
         document.addEventListener('click', (event) => {
             if (tooltipBox && tooltipBox.classList.contains('visible') && !tooltipBox.contains(event.target) && !event.target.closest('.tooltip-trigger')) {
                 closeTooltip();
             }
         });

        // Fermeture tooltip avec Echap
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && tooltipBox && tooltipBox.classList.contains('visible')) {
                 closeTooltip();
            }
        });

    } else {
        console.warn("WARN: Eléments Tooltip manquants.");
    }

    console.log("SCRIPT FINAL (Option B - No Modal): Initialisation terminée.");

}); // Fin de DOMContentLoaded