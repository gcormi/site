// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Variables Globales ---
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;
    let activeAudioButton = null;
    let voices = [];
    let gamePaused = false; // Pour certains jeux
    let currentAnimations = []; // Pour gérer les animations en cours de l'explorateur

    // --- Initialisation des Fonctionnalités ---

    // 1. Barre de progression de lecture
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', updateReadingProgress);
    }

    // 2. Bouton de retour en haut
    const scrollTopBtn = document.getElementById('scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', toggleScrollTopButton);
        scrollTopBtn.addEventListener('click', scrollToTop);
    }

    // 3. Navigation Mobile (Burger Menu)
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // 4. Smooth Scrolling & Active Nav Link
    const navMenuLinks = document.querySelectorAll('.nav-link'); // Liens dans la navbar principale
    if (navMenuLinks.length > 0) {
        navMenuLinks.forEach(anchor => {
            if (anchor.id !== 'arcade-game-link' && anchor.getAttribute('href').startsWith('#')) {
                anchor.addEventListener('click', smoothScrollToTarget);
            }
        });
        window.addEventListener('scroll', highlightActiveNavLink);
        highlightActiveNavLink(); // Appel initial
    }

    // 5. Mode Sombre
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        initializeDarkMode();
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // 6. Police Dyslexique
    const dyslexicFontToggle = document.getElementById('dyslexic-font-toggle');
    if (dyslexicFontToggle) {
        initializeDyslexicFont();
        dyslexicFontToggle.addEventListener('click', toggleDyslexicFont);
    }

    // 7. Éléments Interactifs (Accordéon)
    const interactiveElements = document.querySelectorAll('.interactive-element');
    interactiveElements.forEach(element => {
        const header = element.querySelector('h4');
        if (header) {
            header.addEventListener('click', () => toggleInteractiveElement(element));
            header.style.cursor = 'pointer';
        }
    });

    // 8. Système d'Onglets
    const tabContainers = document.querySelectorAll('.tab-container');
    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => switchTab(button, container));
        });
        if (!container.querySelector('.tab-button.active') && buttons.length > 0) {
            buttons[0].classList.add('active');
            const firstTabId = buttons[0].dataset.tab;
            const firstTabContent = container.querySelector(`#${firstTabId}`);
            if (firstTabContent) {
                firstTabContent.classList.add('active');
            }
        }
    });

    // 9. Quiz Principal
    const quizOptions = document.querySelectorAll('.quiz-container .quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', () => handleQuizAnswer(option));
    });

    // 10. Exercice d'Appariement (Matching)
    const matchingItems = document.querySelectorAll('.matching-exercise .matching-item');
    let selectedMatchingItem = null;
    const correctMatches = { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5" };
    matchingItems.forEach(item => {
        item.addEventListener('click', () => handleMatchingSelection(item, correctMatches));
    });

    // 11. Explorateur Océanique Interactif (RÉACTIVÉ)
    initializeOceanExplorer(); // Appel décommenté

    // 12. Jeu de Nettoyage Océanique
    console.log("Tentative d'initialisation du jeu de nettoyage...");
    initializeOceanCleanupGame();

    // 13. Quiz Espèces Marines
    initializeSpeciesQuiz();

    // 14. Jeu de Mémoire (Chaîne Alimentaire)
    initializeMemoryGame();

    // 15. Synthèse Vocale
    initializeSpeechSynthesis();

    // 16. Lien Jeu Arcade Popup
    const arcadeLink = document.getElementById('arcade-game-link');
    if (arcadeLink) {
        arcadeLink.addEventListener('click', (event) => {
            event.preventDefault();
            openArcadeGamePopup();
        });
    }

    // --- Fonctions Détaillées ---

    // 1. Barre de progression
    function updateReadingProgress() {
        const progressBar = document.getElementById('reading-progress'); // Get progressBar inside function
        if (!progressBar) return; // Check if progressBar exists
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight <= 0) {
            progressBar.style.width = '0%';
            return;
        }
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    }


    // 2. Bouton Scroll-to-Top
    function toggleScrollTopButton() {
        const scrollTopBtn = document.getElementById('scroll-to-top'); // Get button inside function
        if (!scrollTopBtn) return; // Check if button exists
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 3. Menu Mobile
    function toggleMobileMenu() {
        const navToggle = document.getElementById('nav-toggle'); // Get elements inside function
        const navLinks = document.getElementById('nav-links');
        if (!navToggle || !navLinks) return; // Check if elements exist

        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    }
    function closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle'); // Get elements inside function
        const navLinks = document.getElementById('nav-links');
        if (!navToggle || !navLinks) return; // Check if elements exist

        if (window.innerWidth < 768) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // 4. Smooth Scroll & Active Link
    function smoothScrollToTarget(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 60;
            const targetPosition = targetElement.offsetTop - navbarHeight - 10;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            closeMobileMenu();
        }
    }
    function highlightActiveNavLink() {
        let currentSectionId = '';
        const sections = document.querySelectorAll('section[id].chapter, section[id].game-container, section[id]#zone-interactives');
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 60;
        const scrollPosition = window.pageYOffset + navbarHeight + 50;
        const navMenuLinks = document.querySelectorAll('.nav-link'); // Get links inside function

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (sections.length > 0 && window.pageYOffset < sections[0].offsetTop - navbarHeight - 50) {
             currentSectionId = sections[0].getAttribute('id');
        }

        navMenuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // 5. Mode Sombre
    function initializeDarkMode() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        updateDarkModeButtonState(isDarkMode);
    }
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkModeNow = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkModeNow);
        updateDarkModeButtonState(isDarkModeNow);
        announceScreenReader(isDarkModeNow ? 'Mode sombre activé' : 'Mode clair activé');
    }
    function updateDarkModeButtonState(isDark) {
        const darkModeToggle = document.getElementById('dark-mode-toggle'); // Get button inside function
        if (!darkModeToggle) return; // Check if button exists
        const lightIcon = darkModeToggle.querySelector('.light-mode-icon');
        const darkIcon = darkModeToggle.querySelector('.dark-mode-icon');
        if (lightIcon && darkIcon) {
            lightIcon.style.opacity = isDark ? '0' : '1';
            lightIcon.style.transform = isDark ? 'scale(0)' : 'scale(1)';
            darkIcon.style.opacity = isDark ? '1' : '0';
            darkIcon.style.transform = isDark ? 'scale(1)' : 'scale(0)';
        }
    }

    // 6. Police Dyslexique
    function initializeDyslexicFont() {
        const dyslexicFontToggle = document.getElementById('dyslexic-font-toggle'); // Get button inside function
        if (!dyslexicFontToggle) return; // Check if button exists
        const isDyslexicFont = localStorage.getItem('dyslexicFont') === 'true';
        if (isDyslexicFont) {
            document.body.classList.add('dyslexic-font');
            dyslexicFontToggle.classList.add('active');
        }
    }
    function toggleDyslexicFont() {
        const dyslexicFontToggle = document.getElementById('dyslexic-font-toggle'); // Get button inside function
        if (!dyslexicFontToggle) return; // Check if button exists
        document.body.classList.toggle('dyslexic-font');
        const isDyslexicFontNow = document.body.classList.contains('dyslexic-font');
        dyslexicFontToggle.classList.toggle('active', isDyslexicFontNow);
        localStorage.setItem('dyslexicFont', isDyslexicFontNow);
        announceScreenReader(isDyslexicFontNow ? 'Police pour dyslexie activée' : 'Police standard activée');
    }

    // 7. Éléments Interactifs (Accordéon)
    function toggleInteractiveElement(element) {
        element.classList.toggle('active');
        const isExpanded = element.classList.contains('active');
        const header = element.querySelector('h4');
        header?.setAttribute('aria-expanded', isExpanded);
        setTimeout(initializeAudioButtons, 300); // Re-init audio buttons after content visibility changes
    }

    // 8. Système d'Onglets
    function switchTab(clickedButton, container) {
        const tabId = clickedButton.dataset.tab;
        const targetTabContent = container.querySelector(`#${tabId}`);

        if (!targetTabContent || clickedButton.classList.contains('active')) {
            return;
        }

        container.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        container.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('hidden', '');
        });

        clickedButton.classList.add('active');
        clickedButton.setAttribute('aria-selected', 'true');
        targetTabContent.classList.add('active');
        targetTabContent.removeAttribute('hidden');

        setTimeout(initializeAudioButtons, 300); // Re-init audio buttons after content visibility changes
    }

    // 9. Quiz Principal
    function handleQuizAnswer(selectedOption) {
        const questionContainer = selectedOption.closest('.quiz-question');
        if (!questionContainer) return;

        const options = questionContainer.querySelectorAll('.quiz-option');
        const feedback = questionContainer.querySelector('.quiz-feedback');
        const alreadyAnswered = Array.from(options).some(opt => opt.classList.contains('correct') || opt.classList.contains('incorrect'));

        if (alreadyAnswered || !feedback) return;

        const isCorrect = selectedOption.dataset.correct === 'true';

        options.forEach(opt => {
            opt.style.cursor = 'default';
            opt.setAttribute('aria-disabled', 'true');
            if (opt.dataset.correct === 'true') {
                opt.classList.add('correct');
            } else if (opt === selectedOption) {
                opt.classList.add('incorrect');
            }
        });

        if (isCorrect) {
            feedback.textContent = "Correct ! Bonne réponse.";
            feedback.classList.remove('incorrect');
            feedback.classList.add('correct');
        } else {
            feedback.textContent = "Incorrect.";
            feedback.classList.remove('correct');
            feedback.classList.add('incorrect');
        }
        feedback.classList.add('show');
        feedback.setAttribute('aria-live', 'polite');
    }

    // 10. Exercice d'Appariement
    function handleMatchingSelection(item, correctMatchesMap) {
        if (item.classList.contains('matched') || item.classList.contains('shake')) return;

        const exerciseContainer = item.closest('.matching-exercise');
        if (!exerciseContainer) return;
        const feedbackEl = exerciseContainer.querySelector('.matching-feedback');
        const allItems = exerciseContainer.querySelectorAll('.matching-item');
        if (!feedbackEl) return;

        if (selectedMatchingItem === null) {
            allItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedMatchingItem = item;
            feedbackEl.style.display = 'none';
        } else {
            if (selectedMatchingItem === item) {
                item.classList.remove('selected');
                selectedMatchingItem = null;
                return;
            }

            const id1 = selectedMatchingItem.dataset.id;
            const match1 = selectedMatchingItem.dataset.match;
            const id2 = item.dataset.id;
            const match2 = item.dataset.match;

            let isMatch = false;
            if (id1 && match2 && correctMatchesMap[id1] === match2) {
                isMatch = true;
            } else if (id2 && match1 && correctMatchesMap[id2] === match1) {
                isMatch = true;
            }

            if (isMatch) {
                selectedMatchingItem.classList.add('matched');
                item.classList.add('matched');
                selectedMatchingItem.classList.remove('selected');
                item.classList.remove('selected');
                selectedMatchingItem.setAttribute('aria-disabled', 'true');
                item.setAttribute('aria-disabled', 'true');

                feedbackEl.textContent = "Bonne association !";
                feedbackEl.className = 'matching-feedback correct';
                feedbackEl.style.display = 'block';

                const allMatched = Array.from(allItems).every(i => i.classList.contains('matched'));
                if (allMatched) {
                    feedbackEl.textContent = "Félicitations ! Vous avez complété l'exercice.";
                }
                selectedMatchingItem = null;
            } else {
                feedbackEl.textContent = "Ce n'est pas la bonne association. Essayez encore !";
                feedbackEl.className = 'matching-feedback incorrect';
                feedbackEl.style.display = 'block';

                selectedMatchingItem.classList.add('shake');
                item.classList.add('shake');

                const currentSelectedItem = selectedMatchingItem;
                const currentItem = item;
                currentSelectedItem.style.pointerEvents = 'none';
                currentItem.style.pointerEvents = 'none';

                setTimeout(() => {
                    currentSelectedItem?.classList.remove('selected', 'shake');
                    currentItem?.classList.remove('shake');
                    currentSelectedItem.style.pointerEvents = '';
                    currentItem.style.pointerEvents = '';
                    selectedMatchingItem = null;
                }, 800);
            }
        }
    }
    // Try adding shake animation (might fail locally without a server)
    try {
        const styleSheet = document.styleSheets[0];
        let shakeRuleExists = false;
        if (styleSheet && styleSheet.cssRules) { // Check if stylesheet and rules are accessible
            for (let i = 0; i < styleSheet.cssRules.length; i++) {
                // Check if the rule is a keyframes rule and has the correct name
                if (styleSheet.cssRules[i].type === CSSRule.KEYFRAMES_RULE && styleSheet.cssRules[i].name === 'shake') {
                    shakeRuleExists = true;
                    break;
                }
            }
            if (!shakeRuleExists) {
                styleSheet.insertRule(`
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                        20%, 40%, 60%, 80% { transform: translateX(5px); }
                    }
                `, styleSheet.cssRules.length);
            }
        } else {
             console.warn("Cannot access CSS rules to add shake animation (common in local 'file://' context).");
        }
    } catch(e) { console.warn("Error adding/checking shake animation:", e); }


    // 11. Explorateur Océanique (RÉACTIVÉ)
    function initializeOceanExplorer() {
        // Début du code décommenté
        const explorer = document.querySelector('.ocean-explorer');
        if (!explorer) return;

        const oceanTabs = explorer.querySelectorAll('.ocean-tab');
        const oceanVisuals = explorer.querySelectorAll('.ocean-section-visual');
        const oceanInfoPanels = explorer.querySelectorAll('.ocean-info');
        const animationLayer = explorer.querySelector('#animation-layer');
        const oceanFeatures = explorer.querySelectorAll('.ocean-feature');

        const creaturesData = {
            surface: [
                { emoji: '🐬', startPos: { x: -50, y: '30%' }, endPos: { x: '105%', y: '40%' }, size: '3rem', duration: 12 },
                { emoji: '🐠', startPos: { x: '105%', y: '60%' }, endPos: { x: -50, y: '55%' }, size: '2rem', duration: 10 },
                { emoji: '🐢', startPos: { x: '20%', y: '75%' }, endPos: { x: '80%', y: '70%' }, size: '2.5rem', duration: 18 },
                { emoji: '🐟', startPos: { x: -50, y: '50%' }, endPos: { x: '105%', y: '45%' }, size: '1.8rem', duration: 9 },
                { emoji: '🐳', startPos: { x: '105%', y: '20%' }, endPos: { x: -80, y: '25%' }, size: '4rem', duration: 25 },
                { emoji: '🕊️', startPos: { x: '40%', y: '5%' }, endPos: { x: '60%', y: '8%' }, size: '2rem', duration: 15 },
            ],
            middle: [
                { emoji: '🦑', startPos: { x: -50, y: '40%' }, endPos: { x: '105%', y: '50%' }, size: '3rem', duration: 15 },
                { emoji: '🐡', startPos: { x: '105%', y: '70%' }, endPos: { x: -50, y: '65%' }, size: '2.5rem', duration: 13 },
                { emoji: '✨', startPos: { x: '50%', y: '30%' }, endPos: { x: '50%', y: '30%' }, size: '1rem', duration: 1, type: 'bioluminescent' },
                { emoji: '🦐', startPos: { x: '10%', y: '80%' }, endPos: { x: '30%', y: '75%' }, size: '1.5rem', duration: 16 },
                { emoji: '🦈', startPos: { x: -60, y: '60%' }, endPos: { x: '105%', y: '55%' }, size: '3.5rem', duration: 18 },
                { emoji: '💡', startPos: { x: '70%', y: '45%' }, endPos: { x: '70%', y: '45%' }, size: '0.8rem', duration: 1, type: 'bioluminescent-pulse' },
            ],
            deep: [
                { emoji: '🦀', startPos: { x: '10%', y: '85%' }, endPos: { x: '30%', y: '85%' }, size: '2rem', duration: 25 },
                { emoji: '🎣', startPos: { x: '70%', y: '60%' }, endPos: { x: '40%', y: '65%' }, size: '3.5rem', duration: 20 },
                { emoji: '⚫', startPos: { x: '50%', y: '50%' }, endPos: { x: '50%', y: '50%' }, size: '0.5rem', duration: 1, type: 'bioluminescent-pulse' },
                { emoji: '🦞', startPos: { x: '80%', y: '90%' }, endPos: { x: '60%', y: '90%' }, size: '2.2rem', duration: 30 },
                { emoji: '🦠', startPos: { x: '25%', y: '70%' }, endPos: { x: '35%', y: '72%' }, size: '1.2rem', duration: 22 },
                { emoji: '🐌', startPos: { x: '5%', y: '95%' }, endPos: { x: '15%', y: '95%' }, size: '1.5rem', duration: 40 },
            ],
            hotspots: [ ], // No creatures needed for these sections
            currents: [ ]  // No creatures needed for these sections
        };
         const featureInfoData = {
            coral: "Les récifs coralliens abritent 25% de la vie marine. Ils sont menacés par le blanchissement dû au réchauffement.",
            plankton: "Base de la chaîne alimentaire, le phytoplancton produit plus de 50% de notre oxygène.",
            coastal: "Mangroves, herbiers... protègent les côtes et servent de nurseries.",
            migration: "Des trillions d'organismes montent la nuit pour manger et redescendent le jour.",
            bioluminescence: "Plus de 90% des créatures des profondeurs produisent leur propre lumière pour chasser, communiquer ou se cacher.",
            predators: "Poissons-hachettes, poissons-lanternes... adaptés à la faible lumière avec de grands yeux.",
            trench: "La Fosse des Mariannes atteint 11km de profondeur. La pression y est 1000 fois supérieure à la surface.",
            vents: "Sources hydrothermales où la vie (bactéries, vers tubicoles) prospère grâce à la chimiosynthèse.",
            "deep-creatures": "Adaptations incroyables : corps gélatineux, métabolisme lent, organes sensoriels uniques.",
            "great-barrier": "La Grande Barrière de Corail a perdu la moitié de ses coraux. Des efforts de restauration sont en cours.",
            "garbage-patch": "La 'Grande plaque de déchets du Pacifique' est une soupe de plastique grande comme 3 fois la France.",
            "dead-zones": "Zones pauvres en oxygène causées par la pollution (engrais, eaux usées), où la vie marine suffoque.",
            "gulf-stream": "Courant chaud majeur qui influence le climat de l'Europe de l'Ouest.",
            "global-conveyor": "Circulation thermohaline mondiale qui redistribue chaleur et nutriments. Un cycle prend ~1000 ans.",
            "el-nino": "Phénomène climatique majeur dans le Pacifique affectant la météo mondiale (sécheresses, inondations)."
        };

        oceanTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const section = tab.dataset.section;
                if (!section) return;

                // Stop and clear previous animations
                currentAnimations.forEach(anim => clearTimeout(anim.timeoutId));
                currentAnimations = []; // Reset the array
                if (animationLayer) animationLayer.innerHTML = ''; // Clear visual elements

                // Update active states for tabs and visuals
                oceanTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                oceanVisuals.forEach(v => v.classList.remove('active'));
                const activeVisual = explorer.querySelector(`#${section}-visual`);
                if (activeVisual) activeVisual.classList.add('active');

                // Update active state for info panels
                oceanInfoPanels.forEach(p => p.style.display = 'none');
                const activeInfo = explorer.querySelector(`#${section}-info`);
                 if (activeInfo) {
                    activeInfo.style.display = 'block';
                    // Reset active feature and description within the panel
                    activeInfo.querySelectorAll('.ocean-feature').forEach(f => f.classList.remove('active'));
                    const existingDesc = activeInfo.querySelector('.feature-description');
                    if (existingDesc) existingDesc.remove();
                 }

                // Add new creatures for this section if applicable
                if (animationLayer && creaturesData[section] && creaturesData[section].length > 0) {
                    creaturesData[section].forEach(creature => {
                        // Add a random initial delay for starting
                        setTimeout(() => {
                            // Check if the tab is still active before creating
                            const currentActiveTab = document.querySelector('.ocean-tab.active');
                            if (currentActiveTab && currentActiveTab.dataset.section === section) {
                                createAnimatedCreature(creature, section, animationLayer);
                            }
                        }, Math.random() * 1500); // Delay up to 1.5s
                    });
                }
            });
        });

        oceanFeatures.forEach(feature => {
            feature.addEventListener('click', () => {
                const featureId = feature.dataset.feature;
                const info = featureInfoData[featureId];
                const parentInfoPanel = feature.closest('.ocean-info');
                if (!info || !parentInfoPanel) return;

                // Handle active state for features
                parentInfoPanel.querySelectorAll('.ocean-feature').forEach(f => f.classList.remove('active'));
                feature.classList.add('active');

                // Display/Update the description
                let descElement = parentInfoPanel.querySelector('.feature-description');
                if (!descElement) {
                    descElement = document.createElement('div');
                    descElement.className = 'feature-description';
                    const featureList = feature.closest('.ocean-feature-list');
                    // Insert after the list for better layout
                    if (featureList) {
                         featureList.after(descElement);
                    } else {
                         parentInfoPanel.appendChild(descElement); // Fallback
                    }
                }
                descElement.innerHTML = `<p>${info}</p>`; // Use innerHTML to allow potential formatting later
            });
        });

        // Initialize with the first tab if available
        if (oceanTabs.length > 0) {
            oceanTabs[0].click();
        }
        // Fin du code décommenté
    }
    function createAnimatedCreature(creature, section, layer) {
        // Début du code décommenté
        // Check if the layer still exists (in case the user navigates quickly)
        if (!document.body.contains(layer)) return;

        const creatureEl = document.createElement('div');
        creatureEl.className = 'animated-creature';
        creatureEl.textContent = creature.emoji;
        creatureEl.style.fontSize = creature.size || '2.5rem';
        creatureEl.style.position = 'absolute';
        // Ensure start positions are strings or pixel values
        creatureEl.style.left = typeof creature.startPos.x === 'string' ? creature.startPos.x : `${creature.startPos.x}px`;
        creatureEl.style.top = typeof creature.startPos.y === 'string' ? creature.startPos.y : `${creature.startPos.y}px`;
        creatureEl.style.zIndex = '5'; // Ensure creatures are above background visuals but below UI elements

        // Add slight duration variation
        const baseDuration = creature.duration || 15;
        const randomDurationOffset = (Math.random() - 0.5) * (baseDuration * 0.2); // +/- 10% duration
        const finalDuration = Math.max(5, baseDuration + randomDurationOffset); // Min duration 5s
        creatureEl.style.transition = `all ${finalDuration}s linear`;

        // Specific styles (bioluminescence)
        if (creature.type === 'bioluminescent') {
             creatureEl.style.textShadow = '0 0 10px #a6dffc, 0 0 20px #a6dffc';
             creatureEl.style.transition = 'none'; // No movement transition
        }
        if (creature.type === 'bioluminescent-pulse') {
             creatureEl.style.transition = 'none'; // No movement transition
             // Animation defined in CSS
             creatureEl.style.animation = 'pulse-bioluminescent 3s infinite ease-in-out';
        }

        layer.appendChild(creatureEl);

        // Add random delay before starting movement
        const startDelay = Math.random() * 1000; // Delay up to 1 second

        // Use requestAnimationFrame for smoother start of transition
        requestAnimationFrame(() => {
            // Apply transition after a minimal delay + random start delay
            const animTimeout = setTimeout(() => {
                // Check if the tab is still active AND the element still exists
                const currentActiveTab = document.querySelector('.ocean-tab.active');
                if (document.body.contains(creatureEl) && currentActiveTab && currentActiveTab.dataset.section === section) {
                    // Ensure end positions are strings or pixel values
                    creatureEl.style.left = typeof creature.endPos.x === 'string' ? creature.endPos.x : `${creature.endPos.x}px`;
                    creatureEl.style.top = typeof creature.endPos.y === 'string' ? creature.endPos.y : `${creature.endPos.y}px`;
                }
            }, 100 + startDelay); // Apply delay here
        });


        // Set timeout for looping/removing the creature
        const loopTimeout = setTimeout(() => {
             if (document.body.contains(creatureEl)) {
                 creatureEl.remove();
             }
            // Recreate only if the tab is still active
            const currentActiveTab = document.querySelector('.ocean-tab.active');
            if (currentActiveTab && currentActiveTab.dataset.section === section) {
                // Add delay before recreating to avoid immediate overload
                setTimeout(() => {
                    // Double-check tab activity again before creating
                     const stillActiveTab = document.querySelector('.ocean-tab.active');
                     if (stillActiveTab && stillActiveTab.dataset.section === section) {
                         createAnimatedCreature(creature, section, layer);
                     }
                }, Math.random() * 2000); // Random recreation delay
            }
        }, finalDuration * 1000 + 200 + startDelay); // Adjust recreation timeout

        // Add to list for potential cleanup
        currentAnimations.push({ element: creatureEl, timeoutId: loopTimeout });
        // Fin du code décommenté
    }


    // 12. Jeu de Nettoyage Océanique
    function initializeOceanCleanupGame() {
        console.log("Fonction initializeOceanCleanupGame appelée.");
        const gameArea = document.getElementById('ocean-cleanup');
        const startBtn = document.getElementById('start-cleanup');
        const resetBtn = document.getElementById('reset-cleanup');
        const scoreEl = document.getElementById('cleanup-score');
        const livesEl = document.getElementById('lives-count');
        const timerEl = document.getElementById('game-timer');
        const levelButtons = document.querySelectorAll('.level-selector .level-button');
        const currentLevelEl = document.getElementById('current-level');
        const bubblesContainer = document.getElementById('bubbles-container');

        if (!gameArea || !startBtn || !resetBtn || !scoreEl || !livesEl || !timerEl || !currentLevelEl) {
             console.warn("Éléments manquants pour le jeu de nettoyage. Initialisation annulée.");
             return;
        }
        console.log("Tous les éléments du jeu de nettoyage trouvés.");

        let score = 0;
        let lives = 3;
        let gameStarted = false;
        let gameTimerInterval = null;
        let timeLeft = 60;
        let gameElements = [];
        let gameLevel = 'moyen';
        const cleanupLevelConfig = {
            facile: { trashCount: 8, animalCount: 3, timeLimit: 90, lives: 5, speedMultiplier: 0.8, points: { small: 5, medium: 10, large: 15 }, penalty: 3 },
            moyen: { trashCount: 12, animalCount: 5, timeLimit: 60, lives: 3, speedMultiplier: 1, points: { small: 10, medium: 15, large: 20 }, penalty: 5 },
            difficile: { trashCount: 18, animalCount: 7, timeLimit: 45, lives: 2, speedMultiplier: 1.3, points: { small: 15, medium: 20, large: 30 }, penalty: 10 }
        };

        currentLevelEl.textContent = gameLevel.charAt(0).toUpperCase() + gameLevel.slice(1);
        resetGameCleanup(); // Appel initial pour configurer l'affichage

        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log("Clic sur bouton niveau:", button.dataset.level);
                if (gameStarted) return;
                levelButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                gameLevel = button.dataset.level;
                currentLevelEl.textContent = gameLevel.charAt(0).toUpperCase() + gameLevel.slice(1);
                resetGameCleanup(); // Réinitialise avec les nouvelles valeurs de niveau
            });
        });

        startBtn.addEventListener('click', () => {
            console.log("Clic sur bouton Commencer détecté ! Appel de startGameCleanup...");
            startGameCleanup();
        });

        resetBtn.addEventListener('click', () => {
            console.log("Clic sur bouton Recommencer (Reset)");
            resetGameCleanup(true); // Force un reset complet
        });
        console.log("Écouteurs d'événements pour le jeu de nettoyage ajoutés.");

        function startGameCleanup() {
            console.log("Fonction startGameCleanup appelée.");
            if (gameStarted) {
                console.log("Jeu déjà démarré, sortie de startGameCleanup.");
                return;
            }
            gameStarted = true; // DOIT être mis à true ici
            gamePaused = false;
            console.log(`startGameCleanup: gameStarted = ${gameStarted}, gamePaused = ${gamePaused}`);

            resetGameCleanup(false); // Reset partiel (ne doit PAS remettre gameStarted à false)

            console.log("Génération des éléments de jeu...");
            generateGameElementCleanup('trash', cleanupLevelConfig[gameLevel].trashCount);
            generateGameElementCleanup('animal', cleanupLevelConfig[gameLevel].animalCount);
            // generateBubblesCleanup(30); // Laissé commenté comme demandé
            // console.log("Génération des bulles désactivée.");
            console.log("Éléments générés.");

            timeLeft = cleanupLevelConfig[gameLevel].timeLimit;
            timerEl.textContent = timeLeft;
            gameTimerInterval = setInterval(updateTimerCleanup, 1000);
            console.log("Jeu démarré, timer lancé.");
        }

        // --- VERSION CORRIGÉE DE resetGameCleanup ---
        function resetGameCleanup(fullReset = true) {
            console.log("Fonction resetGameCleanup appelée. fullReset:", fullReset);
            // Ne remettre gameStarted à false QUE si c'est un reset complet demandé explicitement
            if (fullReset) {
                gameStarted = false;
            }
            gamePaused = false; // Toujours remettre gamePaused à false lors d'un reset
            console.log(`resetGameCleanup (après modif état): gameStarted = ${gameStarted}, gamePaused = ${gamePaused}`); // Log pour vérifier l'état après modification
            clearInterval(gameTimerInterval);
            gameTimerInterval = null;
            gameElements.forEach(el => el.remove());
            gameElements = [];
            if (bubblesContainer) bubblesContainer.innerHTML = ''; // Vider les bulles aussi

            score = 0;
            lives = cleanupLevelConfig[gameLevel].lives;
            timeLeft = cleanupLevelConfig[gameLevel].timeLimit;
            scoreEl.textContent = score;
            livesEl.textContent = lives;
            timerEl.textContent = timeLeft;

            const modal = gameArea.querySelector('.game-modal');
            if (modal) modal.remove();

             if (fullReset) {
                 console.log("Reset complet: Ajout des courants.");
                 gameArea.querySelectorAll('.current, .coral-deco').forEach(el => el.remove());
                 for (let i = 0; i < 2; i++) {
                     const current = document.createElement('div');
                     current.classList.add('current');
                     current.style.top = (30 + (i * 30)) + '%';
                     current.style.animationDuration = (10 - i * 2) + 's';
                     current.style.animationDirection = i % 2 === 0 ? 'normal' : 'reverse';
                     gameArea.appendChild(current);
                 }
             }
             console.log("Reset terminé.");
        }
        // --- FIN VERSION CORRIGÉE ---

        function updateTimerCleanup() {
            if (gamePaused || !gameStarted) return;
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                console.log("Temps écoulé.");
                endGameCleanup(false);
            }
            if (gameLevel === 'difficile' && timeLeft > 0 && timeLeft % 8 === 0 && gameElements.filter(el => el.dataset.type === 'trash').length < 25) {
                 generateGameElementCleanup('trash', 1);
            }
        }

        function generateGameElementCleanup(type, count) {
             const types = {
                trash: [ { emoji: '🍾', size: 'medium', points: cleanupLevelConfig[gameLevel].points.medium }, { emoji: '👜', size: 'medium', points: cleanupLevelConfig[gameLevel].points.medium }, { emoji: '🥫', size: 'small', points: cleanupLevelConfig[gameLevel].points.small }, { emoji: '🥤', size: 'small', points: cleanupLevelConfig[gameLevel].points.small }, { emoji: '📦', size: 'large', points: cleanupLevelConfig[gameLevel].points.large }, ],
                animal: [ { emoji: '🐠', swimming: true }, { emoji: '🐢', swimming: false }, { emoji: '🐬', swimming: true }, { emoji: '🦀', swimming: false }, { emoji: '🐙', swimming: false } ]
            };
            for (let i = 0; i < count; i++) {
                const config = types[type][Math.floor(Math.random() * types[type].length)];
                const element = document.createElement('div');
                element.classList.add(type === 'trash' ? 'trash-item' : 'animal');
                if (config.size) element.classList.add(config.size);
                if (config.swimming) element.classList.add('swimming');
                element.dataset.type = type;
                if (type === 'trash') element.dataset.points = config.points;
                element.innerHTML = `<span>${config.emoji}</span>`;
                element.style.top = Math.random() * 70 + 15 + '%';
                element.style.left = Math.random() * 85 + 5 + '%';
                const baseDuration = element.classList.contains('swimming') ? 20 : 6;
                const speedFactor = cleanupLevelConfig[gameLevel]?.speedMultiplier || 1;
                element.style.animationDuration = (baseDuration / speedFactor) + 's';
                 if (!element.classList.contains('swimming')) { element.style.animationDelay = `-${Math.random() * 6}s`; }

                if (type === 'trash') {
                    element.addEventListener('click', collectTrashCleanup);
                } else {
                    element.addEventListener('click', clickAnimalCleanup);
                }

                gameArea.appendChild(element);
                gameElements.push(element);
            }
        }

        function generateBubblesCleanup(count) {
             if (!bubblesContainer) return;
             bubblesContainer.innerHTML = '';
             for (let i = 0; i < count; i++) {
                 const bubble = document.createElement('div');
                 bubble.classList.add('bubble');
                 const sizeClass = Math.random() < 0.2 ? 'large' : (Math.random() < 0.6 ? 'medium' : 'small');
                 bubble.classList.add(sizeClass);
                 bubble.style.left = Math.random() * 100 + '%';
                 const delay = Math.random() * 8;
                 const duration = Math.random() * 5 + 8;
                 bubble.style.animation = `bubble-rise ${duration}s linear ${delay}s infinite`;
                 bubblesContainer.appendChild(bubble);
             }
         }

        function collectTrashCleanup(event) {
            console.log("Fonction collectTrashCleanup appelée !");
            console.log(`collectTrashCleanup: Vérification état - gameStarted = ${gameStarted}, gamePaused = ${gamePaused}`);

            if (!gameStarted || gamePaused) {
                console.log("collectTrashCleanup: Jeu non démarré ou en pause.");
                return;
            }
            const trash = event.currentTarget;
            console.log("Déchet cliqué:", trash.querySelector('span')?.textContent);
            if (trash.classList.contains('collected')) {
                console.log("collectTrashCleanup: Déchet déjà collecté.");
                return;
            }

            console.log("Ajout de la classe 'collected'...");
            trash.classList.add('collected');
            trash.style.pointerEvents = 'none';

            const points = parseInt(trash.dataset.points, 10) || 10;
            score += points;
            scoreEl.textContent = score;
            console.log("Score mis à jour:", score);
            showFeedbackCleanup(`+${points}`, trash, '#4caf50');

            console.log("Programmation de la suppression de l'élément...");
            setTimeout(() => {
                console.log("Suppression de l'élément:", trash.querySelector('span')?.textContent);
                gameElements = gameElements.filter(el => el !== trash);
                trash.remove();
            }, 700);
        }

        function clickAnimalCleanup(event) {
             console.log(`clickAnimalCleanup: Vérification état - gameStarted = ${gameStarted}, gamePaused = ${gamePaused}`);
             if (!gameStarted || gamePaused) {
                 console.log("clickAnimalCleanup: Jeu non démarré ou en pause.");
                 return;
             }
            const animal = event.currentTarget;
            animal.style.filter = 'hue-rotate(90deg)';
            const penalty = cleanupLevelConfig[gameLevel]?.penalty || 5;
            score = Math.max(0, score - penalty);
            scoreEl.textContent = score;
            showFeedbackCleanup(`-${penalty}`, animal, '#f44336');
            lives--;
            livesEl.textContent = lives;
            if (lives <= 0) { console.log("Plus de vies."); endGameCleanup(false); }
            setTimeout(() => { animal.style.filter = ''; }, 300);
        }

        function showFeedbackCleanup(text, element, color) {
            const feedback = document.createElement('div');
            feedback.classList.add('feedback-message');
            feedback.textContent = text;
            feedback.style.color = color;
            const rect = element.getBoundingClientRect();
            const gameRect = gameArea.getBoundingClientRect();
            feedback.style.top = (rect.top - gameRect.top - 20) + 'px';
            feedback.style.left = (rect.left - gameRect.top + rect.width / 2 - 15) + 'px';
            gameArea.appendChild(feedback);
            setTimeout(() => feedback.remove(), 1500);
        }

        function endGameCleanup(isWin) {
            console.log("Fonction endGameCleanup appelée. Victoire:", isWin);
            gameStarted = false;
            gamePaused = true;
            console.log(`endGameCleanup: gameStarted = ${gameStarted}, gamePaused = ${gamePaused}`);
            clearInterval(gameTimerInterval);
            gameTimerInterval = null;
            if (gameArea.querySelector('.game-modal')) return;
            const modal = document.createElement('div');
            modal.classList.add('game-modal');
            const message = isWin ? `Bravo ! Vous avez nettoyé l'océan !` : `Partie terminée !`;
            const scoreMessage = `Score final : ${score} points`;
            modal.innerHTML = ` <h4 style="color: ${isWin ? '#4caf50' : '#f44336'}; margin-top: 0;">${message}</h4> <p>${scoreMessage}</p> <button class="game-button" id="close-cleanup-modal">Rejouer</button> `;
            gameArea.appendChild(modal);
            modal.querySelector('#close-cleanup-modal').addEventListener('click', () => { console.log("Clic sur bouton Rejouer (Modal)"); modal.remove(); resetGameCleanup(true); });
        }
    }

    // 13. Quiz Espèces Marines
    function initializeSpeciesQuiz() { const gameContainer = document.querySelector('#species-game')?.closest('.game-container'); if (!gameContainer) { return; } const optionsContainer = gameContainer.querySelector('#species-options'); const nextBtn = gameContainer.querySelector('#next-species'); const feedbackEl = gameContainer.querySelector('#species-feedback'); const scoreEl = gameContainer.querySelector('#species-score'); const questionEl = gameContainer.querySelector('#species-question'); let imageEl = gameContainer.querySelector('#species-image'); if (!optionsContainer || !nextBtn || !feedbackEl || !scoreEl || !questionEl || !imageEl) { console.warn("Éléments manquants pour le quiz espèces."); return; } let currentQuestionIndex = 0; let speciesScoreCount = 0; const speciesQuizQuestions = [ { image: "https://plus.unsplash.com/premium_photo-1664303935648-9920c7dc9307?q=80&w=800&auto=format&fit=crop", options: [ { text: "Requin-baleine - Eau profonde", correct: false }, { text: "Tortue de mer - Récifs coralliens", correct: true }, { text: "Mérou - Mangroves", correct: false }, { text: "Dauphin - Zone pélagique", correct: false } ] }, { image: "https://plus.unsplash.com/premium_photo-1673561556364-ba874a4876eb?q=80&w=800&auto=format&fit=crop", options: [ { text: "Méduse - Zone pélagique", correct: true }, { text: "Anémone - Récifs coralliens", correct: false }, { text: "Pieuvre - Fonds rocheux", correct: false }, { text: "Corail - Récifs", correct: false } ] }, { image: "https://images.unsplash.com/photo-1709494335621-f05358303a63?q=80&w=800&auto=format&fit=crop", options: [ { text: "Requin tigre - Récifs coralliens", correct: false }, { text: "Grand requin blanc - Eaux côtières", correct: false }, { text: "Requin-marteau - Zones pélagiques", correct: true }, { text: "Requin-baleine - Eaux tropicales", correct: false } ] }, { image: "https://plus.unsplash.com/premium_photo-1661882273401-7d01bcf23fbf?q=80&w=800&auto=format&fit=crop", options: [ { text: "Phoque - Eaux arctiques", correct: false }, { text: "Otarie - Côtes rocheuses", correct: true }, { text: "Morse - Banquise", correct: false }, { text: "Lamantin - Estuaires", correct: false } ] }, { image: "https://images.unsplash.com/photo-1595503240812-7286dafaddc1?q=80&w=800&auto=format&fit=crop", options: [ { text: "Poisson-clown - Récifs coralliens", correct: true }, { text: "Poisson-papillon - Eaux profondes", correct: false }, { text: "Poisson-coffre - Herbiers marins", correct: false }, { text: "Poisson-lion - Mangroves", correct: false } ] } ]; function loadSpeciesQuestion(index) { if (index >= speciesQuizQuestions.length) { showSpeciesQuizEnd(); return; } const question = speciesQuizQuestions[index]; if (imageEl) { imageEl.src = question.image; imageEl.alt = `Espèce marine ${index + 1} à identifier`; } else { console.error("L'élément image du quiz espèces n'a pas été trouvé après réinitialisation."); } optionsContainer.innerHTML = ''; question.options.forEach(opt => { const optionDiv = document.createElement('div'); optionDiv.classList.add('quiz-option'); optionDiv.textContent = opt.text; optionDiv.dataset.correct = opt.correct; optionDiv.addEventListener('click', handleSpeciesAnswer); optionsContainer.appendChild(optionDiv); }); feedbackEl.classList.remove('show', 'correct', 'incorrect'); nextBtn.style.display = 'none'; } function handleSpeciesAnswer(event) { const selectedOption = event.currentTarget; const questionOptions = optionsContainer.querySelectorAll('.quiz-option'); const alreadyAnswered = Array.from(questionOptions).some(opt => opt.classList.contains('correct') || opt.classList.contains('incorrect')); if (alreadyAnswered) return; const isCorrect = selectedOption.dataset.correct === 'true'; questionOptions.forEach(opt => { opt.style.cursor = 'default'; opt.setAttribute('aria-disabled', 'true'); if (opt.dataset.correct === 'true') { opt.classList.add('correct'); } else if (opt === selectedOption) { opt.classList.add('incorrect'); } }); if (isCorrect) { speciesScoreCount++; feedbackEl.textContent = "Correct !"; feedbackEl.className = 'quiz-feedback show correct'; } else { feedbackEl.textContent = "Incorrect."; feedbackEl.className = 'quiz-feedback show incorrect'; } scoreEl.textContent = `${speciesScoreCount}/${speciesQuizQuestions.length}`; feedbackEl.setAttribute('aria-live', 'polite'); nextBtn.style.display = 'block'; } function showSpeciesQuizEnd() { questionEl.innerHTML = ` <h3>Quiz terminé !</h3> <p>Votre score : ${speciesScoreCount} sur ${speciesQuizQuestions.length}.</p> `; optionsContainer.innerHTML = ''; feedbackEl.style.display = 'none'; nextBtn.textContent = 'Recommencer le Quiz'; nextBtn.removeEventListener('click', nextSpeciesQuestionHandler); nextBtn.addEventListener('click', resetSpeciesQuiz); nextBtn.style.display = 'block'; } function nextSpeciesQuestionHandler() { currentQuestionIndex++; loadSpeciesQuestion(currentQuestionIndex); } function resetSpeciesQuiz() { currentQuestionIndex = 0; speciesScoreCount = 0; scoreEl.textContent = `0/${speciesQuizQuestions.length}`; questionEl.innerHTML = ` <p>Identifiez cette espèce marine et son habitat :</p> <figure class="image-container"> <img id="species-image" src="" alt="Espèce marine à identifier" class="game-image"> </figure>`; imageEl = gameContainer.querySelector('#species-image'); loadSpeciesQuestion(currentQuestionIndex); nextBtn.textContent = 'Question suivante'; nextBtn.removeEventListener('click', resetSpeciesQuiz); nextBtn.addEventListener('click', nextSpeciesQuestionHandler); nextBtn.style.display = 'none'; } nextBtn.addEventListener('click', nextSpeciesQuestionHandler); loadSpeciesQuestion(currentQuestionIndex); }
    // 14. Jeu de Mémoire
    function initializeMemoryGame() { const gameBoard = document.getElementById('memory-game'); const startBtn = document.getElementById('start-memory'); const resetBtn = document.getElementById('reset-memory'); const pairsFoundEl = document.getElementById('pairs-found'); if (!gameBoard || !startBtn || !resetBtn || !pairsFoundEl) { console.warn("Éléments manquants pour le jeu de mémoire."); return; } let cards = []; let flippedCards = []; let matchedPairs = 0; let lockBoard = false; const memoryCardPairs = [ { id: 1, name: 'Requin', emoji: '🦈', pair: 'Poisson', pairEmoji: '🐟' }, { id: 2, name: 'Orque', emoji: '🐋', pair: 'Phoque', pairEmoji: '🦭' }, { id: 3, name: 'Pélican', emoji: '🦢', pair: 'Petit poisson', pairEmoji: '🐠' }, { id: 4, name: 'Loutre', emoji: '🦦', pair: 'Oursin', pairEmoji: '🌟' }, { id: 5, name: 'Pieuvre', emoji: '🐙', pair: 'Crabe', pairEmoji: '🦀' }, { id: 6, name: 'Humain (Pêche)', emoji: '🎣', pair: 'Poissons', pairEmoji: '🐟' } ]; function setupMemoryGame() { gameBoard.innerHTML = ''; cards = []; flippedCards = []; matchedPairs = 0; lockBoard = false; pairsFoundEl.textContent = matchedPairs; let gameCardsData = []; memoryCardPairs.forEach(pair => { gameCardsData.push({ id: pair.id, name: pair.name, emoji: pair.emoji, pairId: pair.id }); gameCardsData.push({ id: pair.id + 100, name: pair.pair, emoji: pair.pairEmoji, pairId: pair.id }); }); gameCardsData = shuffleArray(gameCardsData); gameCardsData.forEach(cardData => { const cardElement = document.createElement('div'); cardElement.classList.add('card'); cardElement.dataset.pairId = cardData.pairId; cardElement.setAttribute('role', 'button'); cardElement.setAttribute('aria-label', `Carte ${cardData.name}`); cardElement.innerHTML = ` <div class="card-inner"> <div class="card-front" aria-hidden="true"> ${cardData.emoji} <span>${cardData.name}</span> </div> <div class="card-back" aria-hidden="false"></div> </div> `; cardElement.addEventListener('click', flipMemoryCard); cardElement.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { flipMemoryCard.call(cardElement); } }); gameBoard.appendChild(cardElement); cards.push(cardElement); }); } function flipMemoryCard() { if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) return; this.classList.add('flipped'); this.querySelector('.card-front').setAttribute('aria-hidden', 'false'); this.querySelector('.card-back').setAttribute('aria-hidden', 'true'); flippedCards.push(this); if (flippedCards.length === 2) { lockBoard = true; checkForMemoryMatch(); } } function checkForMemoryMatch() { const [card1, card2] = flippedCards; const isMatch = card1.dataset.pairId === card2.dataset.pairId; if (isMatch) { disableCards(); } else { unflipCards(); } } function disableCards() { flippedCards.forEach(card => { card.classList.add('matched'); card.removeEventListener('click', flipMemoryCard); card.removeEventListener('keydown', flipMemoryCard); card.setAttribute('aria-disabled', 'true'); }); matchedPairs++; pairsFoundEl.textContent = matchedPairs; resetBoard(); if (matchedPairs === memoryCardPairs.length) { setTimeout(() => { announceScreenReader('Félicitations ! Vous avez trouvé toutes les paires !'); alert('Félicitations ! Vous avez trouvé toutes les paires !'); }, 500); } } function unflipCards() { setTimeout(() => { flippedCards.forEach(card => { card.classList.remove('flipped'); card.querySelector('.card-front').setAttribute('aria-hidden', 'true'); card.querySelector('.card-back').setAttribute('aria-hidden', 'false'); }); resetBoard(); }, 1200); } function resetBoard() { [flippedCards, lockBoard] = [[], false]; } function shuffleArray(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } return array; } startBtn.addEventListener('click', setupMemoryGame); resetBtn.addEventListener('click', setupMemoryGame); }
    // 15. Synthèse Vocale
    function initializeSpeechSynthesis() { populateVoiceList(); if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) { speechSynthesis.onvoiceschanged = populateVoiceList; } } function populateVoiceList() { if (typeof speechSynthesis === 'undefined') return; voices = speechSynthesis.getVoices(); setTimeout(initializeAudioButtons, 500); } function initializeAudioButtons() { document.querySelectorAll('.audio-btn').forEach(btn => btn.remove()); const elementsToRead = document.querySelectorAll( '.chapter > h2, .chapter > h3, .chapter > p, .highlight-box > h4, .highlight-box > p, .tab-content.active > h4, .tab-content.active > p, .tab-content.active li, .interactive-element.active .content p, .interactive-element.active .content li' ); elementsToRead.forEach((element, index) => { if (element.offsetParent === null || element.textContent.trim() === '') { return; } if (element.matches('p, li') && element.parentElement.querySelector(':scope > h4 > .audio-btn')) { return; } if (element.matches('li') && element.parentElement.closest('ul, ol')?.querySelector(':scope > .audio-btn')) { return; } const audioBtn = document.createElement('button'); audioBtn.className = 'audio-btn'; audioBtn.innerHTML = '🔊'; const sectionTitle = element.tagName.startsWith('H') ? element.textContent.trim().substring(0, 30) + '...' : 'cette section'; audioBtn.setAttribute('aria-label', `Lire ${sectionTitle}`); audioBtn.dataset.audioId = `audio-${element.tagName.toLowerCase()}-${index}`; audioBtn.dataset.initialLabel = `Lire ${sectionTitle}`; if (element.tagName.startsWith('H')) { if (window.getComputedStyle(element).display !== 'flex') { element.style.display = 'flex'; element.style.alignItems = 'center'; } element.appendChild(audioBtn); } else { element.style.position = 'relative'; element.insertBefore(audioBtn, element.firstChild); } audioBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); let textToRead = getTextFromElementAudio(element); readTextAudio(textToRead, audioBtn); }); }); } function getTextFromElementAudio(element) { let text = ''; const childNodes = element.childNodes; for (let i = 0; i < childNodes.length; i++) { const node = childNodes[i]; if (node.nodeType === Node.TEXT_NODE) { text += node.textContent.trim() + ' '; } else if (node.nodeType === Node.ELEMENT_NODE) { if (!node.classList.contains('audio-btn') && !node.classList.contains('toggle-icon')) { if (node.tagName === 'LI') { text += getTextFromElementAudio(node).trim() + '. '; } else { text += getTextFromElementAudio(node); } } } } return text.replace(/\s+/g, ' ').trim(); } function readTextAudio(textToRead, button) { if (!textToRead || typeof speechSynthesis === 'undefined') return; if (speechSynthesis.speaking) { const wasSpeakingThis = (currentUtterance && currentUtterance.text === textToRead); speechSynthesis.cancel(); if (activeAudioButton && activeAudioButton !== button) { activeAudioButton.classList.remove('playing'); activeAudioButton.innerHTML = '🔊'; activeAudioButton.setAttribute('aria-label', activeAudioButton.dataset.initialLabel || 'Lire'); } if (activeAudioButton === button || wasSpeakingThis) { activeAudioButton = null; currentUtterance = null; button.classList.remove('playing'); button.innerHTML = '🔊'; button.setAttribute('aria-label', button.dataset.initialLabel || 'Lire'); return; } } currentUtterance = new SpeechSynthesisUtterance(textToRead); currentUtterance.lang = 'fr-FR'; const frenchVoices = voices.filter(voice => voice.lang.startsWith('fr')); const highQualityVoice = frenchVoices.find(voice => voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.quality === 'enhanced') || frenchVoices[0]; if (highQualityVoice) currentUtterance.voice = highQualityVoice; currentUtterance.onstart = () => { button.classList.add('playing'); button.innerHTML = '⏸️'; button.setAttribute('aria-label', 'Arrêter la lecture'); activeAudioButton = button; }; currentUtterance.onend = () => { if (activeAudioButton === button) { button.classList.remove('playing'); button.innerHTML = '🔊'; button.setAttribute('aria-label', button.dataset.initialLabel || 'Lire'); activeAudioButton = null; currentUtterance = null; } }; currentUtterance.onerror = (event) => { console.error('Erreur de synthèse vocale:', event.error); if (activeAudioButton === button) { button.classList.remove('playing'); button.innerHTML = '🔊'; button.setAttribute('aria-label', button.dataset.initialLabel || 'Lire'); activeAudioButton = null; currentUtterance = null; } }; speechSynthesis.speak(currentUtterance); }
    // 16. Popup Jeu Arcade
    function openArcadeGamePopup() { const popupWidth = 900; const popupHeight = 650; const left = (screen.width / 2) - (popupWidth / 2); const top = (screen.height / 2) - (popupHeight / 2); const popupName = 'JeuArcade_' + Date.now(); const popup = window.open('arcade-game.html', popupName, `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`); if (popup) { popup.focus(); } else { alert('Impossible d\'ouvrir le jeu. Veuillez vérifier si votre navigateur bloque les popups pour ce site.'); } }
    // --- Fonctions Utilitaires ---
    function announceScreenReader(message) { let announcer = document.getElementById('screen-reader-announcer'); if (!announcer) { announcer = document.createElement('div'); announcer.id = 'screen-reader-announcer'; announcer.setAttribute('aria-live', 'polite'); announcer.setAttribute('role', 'status'); announcer.style.position = 'absolute'; announcer.style.width = '1px'; announcer.style.height = '1px'; announcer.style.padding = '0'; announcer.style.margin = '-1px'; announcer.style.overflow = 'hidden'; announcer.style.clip = 'rect(0, 0, 0, 0)'; announcer.style.whiteSpace = 'nowrap'; announcer.style.border = '0'; document.body.appendChild(announcer); } announcer.textContent = message; }


}); // Fin de DOMContentLoaded
