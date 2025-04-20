document.addEventListener('DOMContentLoaded', () => {
    console.log("Script.js : DOM entièrement chargé.");

    // --- DOM Elements ---
    console.log("Script.js : Sélection DOM...");
    const cardGrid = document.getElementById('card-grid');
    const courseCards = document.querySelectorAll('.course-card');
    const contentViewer = document.getElementById('content-viewer');
    const contentSections = contentViewer?.querySelectorAll('.content-section:not(#exercices-section)');
    const backButton = document.getElementById('back-to-grid');
    const importantWords = document.querySelectorAll('.important-word');
    const definitionModal = document.getElementById('definition-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDefinition = document.getElementById('modal-definition');
    const definitionCloseButton = document.getElementById('definition-close');
    const exercisesSection = document.getElementById('exercices-section');
    const themeButtonsContainer = document.getElementById('theme-buttons');
    const themeButtons = themeButtonsContainer?.querySelectorAll('.theme-button');
    const exerciseContentArea = document.getElementById('exercise-content-area');
    const validateExerciseButton = document.getElementById('validate-exercise-button');
    const exerciseFeedback = document.getElementById('exercise-feedback');
    const constraintInfoBox = document.getElementById('constraint-info-box'); // Sélectionné ici

    // Vérification éléments essentiels
    if (!cardGrid || !contentViewer || !exercisesSection || courseCards.length === 0 || !backButton || !definitionModal || !constraintInfoBox) {
         console.error("ERREUR : Un ou plusieurs éléments DOM essentiels sont manquants ! Vérifiez les IDs et classes dans index.html.");
    }

    // --- State ---
    let visitedSections = JSON.parse(sessionStorage.getItem('visitedSections')) || {};
    let currentTheme = null;
    let penduStates = {};
    let memoryStates = {};

    // --- Data: Definitions ---
    const definitions = {
        "besoin": "Un manque, une nécessité ou un désir que l'homme cherche à satisfaire.",
        "objet-technique": "Un objet créé ou modifié par l'homme pour répondre à un besoin spécifique.",
        "fonction-usage": "Le service principal rendu par l'objet technique, sa raison d'être.",
        "contraintes": "Limites ou exigences (sécurité, coût, esthétique, etc.) à respecter lors de la conception.",
        "cahier-des-charges": "Document qui spécifie les besoins, fonctions et contraintes d'un projet.",
        "croquis": "Dessin rapide fait à la main pour explorer des idées.",
        "schema": "Dessin simplifié qui montre le fonctionnement (symboles).",
        "dessin-technique": "Dessin précis (normes, vues, échelle) pour la fabrication.",
        "cao": "CAO : Conception Assistée par Ordinateur (modélisation 3D virtuelle).",
        "materiaux": "Substances (métaux, plastiques...) utilisées pour fabriquer un objet.",
        "proprietes": "Caractéristiques d'un matériau (résistance, légèreté...) qui déterminent son utilisation.",
        "composites": "Matériaux créés en mélangeant plusieurs matériaux différents pour combiner leurs avantages.",
        "fabrication": "Ensemble des techniques pour donner forme aux matériaux.",
        "procedes-fabrication": "Techniques spécifiques : enlèvement matière, déformation, moulage, impression 3D...",
        "assemblage-vissage": "Technique d'assemblage démontable utilisant des vis.",
        "assemblage-collage": "Technique d'assemblage permanent utilisant de la colle.",
        "assemblage-soudage": "Technique d'assemblage permanent pour les métaux par fusion.",
        "programme": "Série d'instructions pour une machine.",
        "algorithme": "Suite d'instructions précises et ordonnées pour résoudre un problème.",
        "microcontroleur": "Mini-ordinateur sur puce, cerveau d'objets programmables (Arduino, Micro:bit...).",
        "capteurs": "Composants 'sens' de l'objet (lumière, température...) - ENTRÉES.",
        "actionneurs": "Composants 'action' de l'objet (LED, moteur...) - SORTIES."
    };

    // --- Data: Exercises (avec 9 paires pour Memory) ---
    const exercisesData = {
        besoin: {
            quiz: [ { q: "Fonction d'usage = ?", o: ["Règle sécurité", "Raison d'être", "Matériau", "Coût"], a: 1 }, { q: "Lequel N'EST PAS une contrainte ?", o: ["Poids max", "Couleur", "# Vis", "Manuel Utilisateur"], a: 3 }, { q: "Doc (besoin, fct, contraintes) = ?", o: ["Schéma", "Dessin Tech", "CDCF", "Commande"], a: 2 } ],
            association: [ { term: "Fonction d'Usage", definition: "Service principal rendu" }, { term: "Contrainte", definition: "Limite/Règle" }, { term: "CDCF", definition: "Doc guide projet" } ],
            pendu: [ { word: "FONCTION", hint: "Rôle de l'objet." }, { word: "ESTHETIQUE", hint: "Contrainte: apparence." } ],
            memory: [
                [ { id: 1, content: 'Besoin' }, { id: 1, content: 'Manque / Désir' }, { id: 2, content: 'Contrainte' }, { id: 2, content: 'Limite' }, { id: 3, content: 'CDCF' }, { id: 3, content: 'Doc Projet' }, { id: 4, content: 'Sécurité' }, { id: 4, content: 'Pas dangereux' }, { id: 5, content: 'Coût' }, { id: 5, content: 'Prix' }, { id: 6, content: 'Ergonomie' }, { id: 6, content: 'Usage facile' }, { id: 7, content: 'Esthétique' }, { id: 7, content: 'Apparence' }, { id: 8, content: 'Utilisateur' }, { id: 8, content: 'A qui ça sert?' }, { id: 9, content: 'Fct Usage' }, { id: 9, content: 'Service Principal' } ],
                [ { id: 10, content: 'Env.' }, { id: 10, content: 'Recyclable' }, { id: 11, content: 'Dimensions' }, { id: 11, content: 'Taille/Vol.' }, { id: 12, content: 'Règlement' }, { id: 12, content: 'Norme CE' }, { id: 13, content: 'Poids' }, { id: 13, content: 'Masse (Kg)' }, { id: 14, content: 'Objet Tech.' }, { id: 14, content: 'Fait /Homme' }, { id: 15, content: 'Bête Cornes' }, { id: 15, content: 'Outil Besoin' }, { id: 16, content: 'Fct Second.' }, { id: 16, content: 'Rôle + ' }, { id: 17, content: 'Formaliser' }, { id: 17, content: 'Définir écrit' }, { id: 18, content: 'Analyse Fonc.' }, { id: 18, content: 'Étude fonctions' } ]
            ]
        },
        solution: {
             quiz: [ { q: "Dessin rapide idées ?", o: ["Schéma", "Dessin Technique", "Croquis", "Plan"], a: 2 }, { q: "CAO = ?", o: ["Conception Assistée Ordinateur", "Circuit Agréé Ouvert", "Contrôle Auto Objet", "Croquis Animé Ordinateur"], a: 0 }, { q: "Avantage assemblage virtuel CAO ?", o: ["Choisir couleurs", "Vérifier emboîtement", "Calculer poids", "Dessiner vite"], a: 1 } ],
             association: [ { term: "Croquis", definition: "Dessin main levée rapide" }, { term: "Schéma", definition: "Représentation fonctionnelle" }, { term: "CAO 3D", definition: "Modélisation volume" } ],
             pendu: [ { word: "ECHELLE", hint: "Rapport taille dessin/réel." }, { word: "PROTOTYPE", hint: "1er exemplaire test." } ],
             memory: [
                 [ { id: 1, content: 'Croquis' }, { id: 1, content: 'Idée rapide' }, { id: 2, content: 'Schéma' }, { id: 2, content: 'Fonctionnement' }, { id: 3, content: 'CAO' }, { id: 3, content: 'Modèle 3D' }, { id: 4, content: 'Vue Face' }, { id: 4, content: 'Vu Devant' }, { id: 5, content: 'Échelle' }, { id: 5, content: 'Rapport Taille' }, { id: 6, content: 'Tinkercad' }, { id: 6, content: 'Logiciel Simple' }, { id: 7, content: 'Plan' }, { id: 7, content: 'Dessin Tech.' }, { id: 8, content: 'Symbole' }, { id: 8, content: 'Utilisé Schéma' }, { id: 9, content: 'Virtuel' }, { id: 9, content: 'Sur Ordinateur' } ],
                 [ { id: 10, content: 'Modéliser' }, { id: 10, content: 'Créer 3D' }, { id: 11, content: 'Assembler' }, { id: 11, content: 'Joindre (Virtuel)' }, { id: 12, content: 'Pivoter Vue' }, { id: 12, content: 'Voir Angles' }, { id: 13, content: 'Mesurer' }, { id: 13, content: 'Vérif. Dims' }, { id: 14, content: 'Exporter STL' }, { id: 14, content: 'Fichier Impr. 3D' }, { id: 15, content: 'Modifier' }, { id: 15, content: 'Changer Forme' }, { id: 16, content: 'Forme Prim.' }, { id: 16, content: 'Cube/Sphère...' }, { id: 17, content: 'Grouper' }, { id: 17, content: 'Combiner formes' }, { id: 18, content: 'Percer (CAO)' }, { id: 18, content: 'Faire trou virtuel' } ]
            ]
        },
         materiaux: {
             quiz: [ { q: "Matériau composite ?", o: ["Acier", "PVC", "Fibre Carbone", "Verre"], a: 2 }, { q: "Procédé enlève matière ?", o: ["Moulage", "Pliage", "Perçage", "Collage"], a: 2 }, { q: "Assemblage démontable ?", o: ["Soudage", "Vissage", "Collage", "Rivetage"], a: 1 } ],
             association: [ { term: "Métal", definition: "Conducteur, résistant" }, { term: "Plastique", definition: "Léger, isolant" }, { term: "Impression 3D", definition: "Fabrication additive" } ],
             pendu: [ { word: "ALUMINIUM", hint: "Métal léger (vélos, avions)." }, { word: "MOULAGE", hint: "Technique plastique/métal fondu." } ],
             memory: [
                 [ { id: 1, content: 'Métal' }, { id: 1, content: 'Ex: Acier' }, { id: 2, content: 'Plastique' }, { id: 2, content: 'Ex: PET' }, { id: 3, content: 'Bois' }, { id: 3, content: 'Mat. Organique' }, { id: 4, content: 'Sciage' }, { id: 4, content: 'Enlève matière' }, { id: 5, content: 'Moulage' }, { id: 5, content: 'Injecter matière' }, { id: 6, content: 'Impr. 3D' }, { id: 6, content: 'Ajoute matière' }, { id: 7, content: 'Composite' }, { id: 7, content: 'Mélange Mat.' }, { id: 8, content: 'Céramique' }, { id: 8, content: 'Ex: Brique' }, { id: 9, content: 'Perçage' }, { id: 9, content: 'Faire trou' } ],
                 [ { id: 10, content: 'Léger' }, { id: 10, content: 'Prop. Masse' }, { id: 11, content: 'Conducteur' }, { id: 11, content: 'Prop. Élec.' }, { id: 12, content: 'Isolant' }, { id: 12, content: 'Prop. Therm.' }, { id: 13, content: 'Vissage' }, { id: 13, content: 'Assembl. Démont.' }, { id: 14, content: 'Soudage' }, { id: 14, content: 'Assembl. Perm.' }, { id: 15, content: 'Recyclable' }, { id: 15, content: 'Prop. Env.' }, { id: 16, content: 'Pliage' }, { id: 16, content: 'Déformation' }, { id: 17, content: 'Collage' }, { id: 17, content: 'Assembl. (Colle)' }, { id: 18, content: 'Résistant' }, { id: 18, content: 'Prop. Méca.' } ]
             ]
         },
         programme: {
              quiz: [ { q: "Rôle capteur ?", o: ["Agir", "Exécuter", "Mesurer", "Afficher"], a: 2 }, { q: "'Recette' instructions = ?", o: ["Microcontrôleur", "Algorithme", "Actionneur", "Variable"], a: 1 }, { q: "Lequel est actionneur ?", o: ["Capt. lumière", "Bouton", "Moteur élec.", "Capt. temp."], a: 2 } ],
              association: [ { term: "Algorithme", definition: "Suite instructions" }, { term: "Capteur", definition: "Mesure (Entrée)" }, { term: "Actionneur", definition: "Agit (Sortie)" } ],
              pendu: [ { word: "CAPTEUR", hint: "'Sens' objet prog." }, { word: "MOTEUR", hint: "Actionneur: mouvement." } ],
              memory: [
                  [ { id: 1, content: 'Micro:bit' }, { id: 1, content: 'Carte prog.' }, { id: 2, content: 'Capt. Lumière' }, { id: 2, content: 'Entrée (Lux)' }, { id: 3, content: 'LED' }, { id: 3, content: 'Sortie (Lumière)' }, { id: 4, content: 'Buzzer' }, { id: 4, content: 'Sortie (Son)' }, { id: 5, content: 'Moteur' }, { id: 5, content: 'Sortie (Mouv.)' }, { id: 6, content: 'Bouton' }, { id: 6, content: 'Entrée (Clic)' }, { id: 7, content: 'Algorithme' }, { id: 7, content: 'Étapes logiques' }, { id: 8, content: 'Condition' }, { id: 8, content: 'Test (Si...)' }, { id: 9, content: 'Boucle' }, { id: 9, content: 'Répétition' } ],
                  [ { id: 10, content: 'Entrée' }, { id: 10, content: 'Info Reçue' }, { id: 11, content: 'Sortie' }, { id: 11, content: 'Action Faite' }, { id: 12, content: 'MakeCode' }, { id: 12, content: 'Prog. Blocs' }, { id: 13, content: 'Arduino' }, { id: 13, content: 'Autre Carte' }, { id: 14, content: 'Capt. Dist.' }, { id: 14, content: 'Mesure Éloign.' }, { id: 15, content: 'Servomoteur' }, { id: 15, content: 'Moteur Précis' }, { id: 16, content: 'Variable' }, { id: 16, content: 'Stocke Info' }, { id: 17, content: 'Déboguer' }, { id: 17, content: 'Corriger Erreur' }, { id: 18, content: 'Fonction JS' }, { id: 18, content: 'Bloc Code JS' } ]
             ]
         }
    };
    // --- FIN Data ---

    // --- Utility Functions ---
    function shuffleArray(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } return array; }
    function formatTime(seconds) { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`; }

    // --- Navigation Functions ---
    function showSection(sectionId) {
        console.log(`showSection pour: ${sectionId}`);
        if (!cardGrid || !contentViewer) { console.error("showSection: Grille ou conteneur introuvable."); return; }
        const targetSection = document.getElementById(sectionId + '-section');
        const isExerciceSection = (sectionId === 'exercices');

        // Masquer la grille (rend invisible mais garde l'espace pour l'instant)
        cardGrid.style.display = 'none';

        // Masquer toutes les sections DANS le contentViewer
        const allSections = contentViewer.querySelectorAll('.content-section');
        allSections.forEach(sec => {
            sec.style.display = 'none';
            sec.classList.remove('is-visible');
        });

        // Afficher le conteneur de contenu parent
        contentViewer.style.display = 'block';
        contentViewer.classList.add('visible'); // Pour animation CSS

        if (targetSection) {
            targetSection.style.display = 'block'; // Rendre la section cible visible
            targetSection.classList.add('is-visible');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log(`Section ${sectionId} affichée.`);

            // Gestion de l'état visité et reset exercices
            if (!isExerciceSection) {
                visitedSections[sectionId] = true;
                sessionStorage.setItem('visitedSections', JSON.stringify(visitedSections));
                updateCardVisitedStatus();
                if (currentTheme) resetExerciseArea();
                if (backButton) backButton.textContent = '← Retour';
            } else {
                resetExerciseArea();
                if (backButton) backButton.textContent = '← Retour';
            }
        } else {
            console.warn('Section introuvable:', sectionId + '-section');
            showCardGrid(); // Fallback
        }
    }

    function showCardGrid() {
        console.log("showCardGrid");
        if (!cardGrid || !contentViewer) { console.error("showCardGrid: Grille ou conteneur introuvable."); return; }
        if (backButton) backButton.textContent = '← Retour';
        currentTheme = null;

        contentViewer.style.display = 'none'; // Masquer le conteneur
        contentViewer.classList.remove('visible');
        const allSections = contentViewer.querySelectorAll('.content-section');
         allSections.forEach(sec => {
            sec.style.display = 'none';
            sec.classList.remove('is-visible');
        });

        cardGrid.style.display = 'grid'; // Afficher la grille
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateCardVisitedStatus() { courseCards.forEach(card => { const sectionId = card.getAttribute('data-section'); if (sectionId !== 'exercices') { if (visitedSections[sectionId]) { card.classList.add('visited'); } else { card.classList.remove('visited'); } } }); }

    // --- Modal Functions ---
    function openModal(modalElement) { if (modalElement) { console.log("Ouverture modale"); modalElement.style.display = 'flex'; setTimeout(() => { modalElement.classList.add('is-visible'); }, 10); const closeButton = modalElement.querySelector('.close-button'); if (closeButton) { setTimeout(() => closeButton.focus(), 50); } } }
    function closeModal(modalElement) { if (modalElement) { console.log("Fermeture modale"); modalElement.classList.remove('is-visible'); setTimeout(() => { modalElement.style.display = 'none'; }, 300); } }
    function showDefinition(wordElement) { const term = wordElement?.dataset.term; const definition = term ? definitions[term] : null; if (definition && modalTitle && modalDefinition && definitionModal) { modalTitle.textContent = wordElement.textContent; modalDefinition.textContent = definition; openModal(definitionModal); } else { console.warn(`Définition non trouvée pour : ${term}`); } }

    // --- Constraint Info Box Function ---
    function showConstraintInfo() { if (!constraintInfoBox) { console.error("#constraint-info-box introuvable!"); return; } const info = this.getAttribute('data-info'); constraintInfoBox.textContent = info || 'Info non disponible.'; constraintInfoBox.classList.add('visible'); }

    // --- Exercise Loading and Logic ---
    function resetExerciseArea() {
        if (!exerciseContentArea || !exerciseFeedback || !validateExerciseButton || !themeButtons) return;
        console.log("Resetting exercise area");
        Object.keys(memoryStates).forEach(gameId => { if (memoryStates[gameId]?.timerIntervalId) { clearInterval(memoryStates[gameId].timerIntervalId); } });
        exerciseContentArea.innerHTML = '<p class="placeholder-text">Sélectionne un thème ci-dessus.</p>';
        exerciseFeedback.classList.add('is-hidden'); exerciseFeedback.textContent = '';
        validateExerciseButton.classList.add('is-hidden');
        themeButtons.forEach(btn => btn.classList.remove('active'));
        currentTheme = null; penduStates = {}; memoryStates = {};
        if (backButton) backButton.textContent = '← Retour';
    }

    function loadExercises(theme) {
        if (!exercisesData[theme] || !exerciseContentArea || !validateExerciseButton || !exerciseFeedback) { console.error("Elements exercices manquants pour:", theme); return; }
        console.log("Chargement exercices pour:", theme);
        resetExerciseArea(); currentTheme = theme;
        const data = exercisesData[theme];
        let html = '';
        // Génération Quiz HTML
        if (data.quiz?.length > 0) { html += '<h3><i class="icon">❓</i> Quiz</h3>'; data.quiz.forEach((q, index) => { html += `<div class="quiz-exercise" data-quiz-index="${index}"><p class="question">${index + 1}. ${q.q}</p><div class="quiz-options">`; const options = q.o.map((opt, optIndex) => ({ text: opt, correct: optIndex === q.a })); shuffleArray(options); options.forEach((optData, shuffledIndex) => { html += `<label><input type="radio" name="quiz-${theme}-${index}" value="${shuffledIndex}" ${optData.correct ? 'data-correct="true"' : ''}> ${optData.text}</label>`; }); html += `</div></div>`; }); }
        // Génération Association HTML
        if (data.association?.length > 0) { html += '<h3><i class="icon">🔗</i> Association</h3>'; html += `<div class="association-exercise" data-assoc-index="0">`; const allDefinitions = data.association.map(item => item.definition); shuffleArray(allDefinitions); data.association.forEach((item, index) => { html += `<div class="association-group"><label for="assoc-${theme}-${index}">${item.term} :</label><select id="assoc-${theme}-${index}" data-correct-value="${item.definition.replace(/"/g, '&quot;')}"><option value="">-- Choisir --</option>`; allDefinitions.forEach(def => { html += `<option value="${def.replace(/"/g, '&quot;')}">${def}</option>`; }); html += `</select></div>`; }); html += `</div>`; }
        // Génération Pendu HTML
        if (data.pendu?.length > 0) { html += '<h3><i class="icon">🔠</i> Jeu du Pendu</h3>'; data.pendu.forEach((p, index) => { const gameId = `pendu-${theme}-${index}`; html += `<div class="pendu-container" data-pendu-id="${gameId}"><h4>Pendu ${index + 1}</h4><div class="pendu-drawing"><svg class="pendu-dessin" viewBox="0 0 100 120"><line class="pendu-part pendu-part-1" x1="10" y1="110" x2="90" y2="110"/><line class="pendu-part pendu-part-2" x1="30" y1="110" x2="30" y2="10"/><line class="pendu-part pendu-part-3" x1="30" y1="10" x2="70" y2="10"/><line class="pendu-part pendu-part-4" x1="70" y1="10" x2="70" y2="30"/><circle class="pendu-part pendu-part-5" cx="70" cy="40" r="10"/><line class="pendu-part pendu-part-6" x1="70" y1="50" x2="70" y2="80"/> </svg></div><div class="pendu-game-area"><p class="hint">Indice : ${p.hint}</p><div class="pendu-mot" id="${gameId}-mot"></div><div class="alphabet-keyboard" id="${gameId}-keyboard"></div><div class="pendu-info"><div class="pendu-guesses-left" id="${gameId}-guesses"></div><div class="pendu-lettres-proposees" id="${gameId}-lettres"></div><div class="pendu-message-fin" id="${gameId}-message"></div><button id="${gameId}-retry" class="retry-button is-hidden">Rejouer</button></div></div></div>`; }); }
        // Génération Memory HTML
        if (data.memory?.length > 0) { html += '<h3><i class="icon">🧠</i> Jeu de Mémoire</h3>'; data.memory.forEach((pairs, index) => { const gameId = `memory-${theme}-${index}`; html += `<div class="memory-container"><h4>Memory ${index + 1}</h4><div class="memory-timer" id="timer-${gameId}">00:00</div><div class="memory-game" id="${gameId}-game" data-memory-id="${gameId}"></div></div>`; }); }
        exerciseContentArea.innerHTML = html;
        // Initialisation des Jeux
        data.pendu?.forEach((p, index) => { const gameId = `pendu-${theme}-${index}`; initPendu(gameId, p.word); createAlphabetKeyboard(gameId); });
        data.memory?.forEach((pairs, index) => { createMemoryGame(`memory-${theme}-${index}`, pairs); });
        // setupAlphabetListeners(); // Le listener délégué est déjà actif
        validateExerciseButton.classList.remove('is-hidden');
        exerciseFeedback.classList.add('is-hidden'); exerciseFeedback.textContent = '';
        if (backButton) backButton.textContent = '← Retour aux thèmes';
    }

    // --- Pendu Game Logic ---
    function createAlphabetKeyboard(gameId) { const keyboardContainer = document.getElementById(`${gameId}-keyboard`); if (!keyboardContainer) {console.error("Conteneur clavier introuvable:", gameId); return;} keyboardContainer.innerHTML = ''; const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; alphabet.split('').forEach(letter => { const button = document.createElement('button'); button.classList.add('letter-button'); button.textContent = letter; button.dataset.letter = letter; keyboardContainer.appendChild(button); }); console.log("Clavier créé pour", gameId); }
    function setupAlphabetListeners() { if(exerciseContentArea){ exerciseContentArea.addEventListener('click', (event) => { if (event.target.classList.contains('letter-button')) { const button = event.target; const container = button.closest('.pendu-container'); if (container) { const gameId = container.dataset.penduId; handleAlphabetClick(gameId, button); } } }); console.log("Listener délégué pour clavier OK."); } else { console.error("exerciseContentArea non trouvé pour listeners clavier");}}
    function handleAlphabetClick(gameId, buttonElement) { if (!buttonElement.disabled) { const letter = buttonElement.dataset.letter; console.log(`Lettre cliquée (${gameId}): ${letter}`); devinerPendu(gameId, letter); buttonElement.disabled = true; } }
    function initPendu(gameId, word) { console.log("Init Pendu:", gameId, word); penduStates[gameId] = { word: word.toUpperCase(), guessedLetters: new Set(), mistakes: 0, maxMistakes: 5, gameOver: false, win: false }; const drawingContainer = document.querySelector(`.pendu-container[data-pendu-id="${gameId}"]`); if(drawingContainer) { drawingContainer.className = 'pendu-container mistakes-0'; } const keyboard = document.getElementById(`${gameId}-keyboard`); keyboard?.querySelectorAll('.letter-button').forEach(btn => btn.disabled = false); displayPendu(gameId); const retryButton = document.getElementById(`${gameId}-retry`); if(retryButton) retryButton.classList.add('is-hidden'); }
    function displayPendu(gameId) { const state = penduStates[gameId]; if (!state) return; const wordElement = document.getElementById(`${gameId}-mot`); const guessesElement = document.getElementById(`${gameId}-guesses`); const lettersElement = document.getElementById(`${gameId}-lettres`); const messageElement = document.getElementById(`${gameId}-message`); const drawingContainer = document.querySelector(`.pendu-container[data-pendu-id="${gameId}"]`); if (!wordElement || !guessesElement || !lettersElement || !messageElement || !drawingContainer) { console.error("Éléments Pendu manquants pour display:", gameId); return;} wordElement.textContent = state.word.split('').map(letter => (state.guessedLetters.has(letter) || state.gameOver ? letter : '_')).join(' '); const guessesLeft = state.maxMistakes - state.mistakes; guessesElement.textContent = `Essais restants : ${guessesLeft}`; guessesElement.style.color = guessesLeft <= 1 ? 'var(--error-color)' : 'inherit'; lettersElement.textContent = `Essayées : ${[...state.guessedLetters].sort().join(', ')}`; drawingContainer.className = `pendu-container mistakes-${state.mistakes + 1}`; /* Incrémenter pour CSS (mistakes-1 = 1 erreur) */ messageElement.textContent = ''; messageElement.className = 'pendu-message-fin'; if (state.gameOver) { if (state.win) { messageElement.textContent = "Gagné ! 🎉"; messageElement.classList.add('win'); } else { messageElement.textContent = `Perdu... Mot: ${state.word}`; messageElement.classList.add('lose'); wordElement.textContent = state.word.split('').join(' '); } const retryButton = document.getElementById(`${gameId}-retry`); if(retryButton) retryButton.classList.remove('is-hidden'); const keyboard = document.getElementById(`${gameId}-keyboard`); keyboard?.querySelectorAll('button:not(:disabled)').forEach(btn => btn.disabled = true); } }
    function devinerPendu(gameId, guess) { const state = penduStates[gameId]; if (!state || state.gameOver || !guess) return; guess = guess.toUpperCase(); if (state.guessedLetters.has(guess)) return; state.guessedLetters.add(guess); let found = false; for(let i=0; i < state.word.length; i++){ if(state.word[i] === guess){ found = true; break; } } if (!found) { state.mistakes++; } const wordGuessed = state.word.split('').every(letter => state.guessedLetters.has(letter)); if (wordGuessed) { state.gameOver = true; state.win = true; } if (state.mistakes >= state.maxMistakes) { state.gameOver = true; state.win = false; } displayPendu(gameId); }

    // --- Logique Memory (Améliorée avec Timer) ---
    function createMemoryGame(gameId, pairsData) { const gameContainer = document.getElementById(`${gameId}-game`); const timerDisplay = document.getElementById(`timer-${gameId}`); if (!gameContainer || !timerDisplay) { console.error("Memory container/timer manquant:", gameId); return;} if (memoryStates[gameId]?.timerIntervalId) { clearInterval(memoryStates[gameId].timerIntervalId); } memoryStates[gameId] = { flippedCards: [], matchedPairs: 0, totalPairs: pairsData.length / 2, lockBoard: false, timerIntervalId: null, startTime: null, elapsedSeconds: 0, unflipTimeoutId: null }; gameContainer.innerHTML = ''; timerDisplay.textContent = '00:00'; timerDisplay.style.border = 'none'; const cardItems = pairsData.map(item => ({ ...item, type: item.content.length > 15 ? 'def' : 'term' })); const shuffledCards = shuffleArray(cardItems); shuffledCards.forEach(cardData => { const cardElement = document.createElement('div'); cardElement.classList.add('memory-card'); cardElement.dataset.pairId = cardData.id; cardElement.dataset.cardType = cardData.type; cardElement.innerHTML = `<div class="card-face card-front">?</div><div class="card-face card-back">${cardData.content}</div>`; cardElement.addEventListener('click', () => flipCard(gameId, cardElement)); gameContainer.appendChild(cardElement); }); console.log("Memory créé:", gameId); }
    function flipCard(gameId, cardElement) { const state = memoryStates[gameId]; if (!state || state.lockBoard || cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) { return; } if (state.startTime === null) { state.startTime = Date.now(); state.timerIntervalId = setInterval(() => updateTimerDisplay(gameId), 1000); console.log("Timer démarré pour", gameId); } if (state.unflipTimeoutId) { clearTimeout(state.unflipTimeoutId); state.unflipTimeoutId = null; unflipCards(gameId, state.flippedCards[0], state.flippedCards[1], true); } cardElement.classList.add('flipped'); state.flippedCards.push(cardElement); if (state.flippedCards.length === 2) { state.lockBoard = true; checkForMatch(gameId); } }
    function checkForMatch(gameId) { const state = memoryStates[gameId]; if (!state || state.flippedCards.length !== 2) return; const [firstCard, secondCard] = state.flippedCards; if (firstCard.dataset.pairId === secondCard.dataset.pairId) { disableCards(gameId, firstCard, secondCard); } else { state.unflipTimeoutId = setTimeout(() => { unflipCards(gameId, firstCard, secondCard); state.unflipTimeoutId = null; }, 1200); } }
    function disableCards(gameId, card1, card2) { const state = memoryStates[gameId]; if(!state) return; card1.classList.add('matched'); card2.classList.add('matched'); state.matchedPairs++; resetBoardState(gameId); if (state.matchedPairs === state.totalPairs) { if (state.timerIntervalId) { clearInterval(state.timerIntervalId); state.timerIntervalId = null; } console.log(`Memory ${gameId} terminé en ${state.elapsedSeconds}s!`); const timerDisplay = document.getElementById(`timer-${gameId}`); if(timerDisplay) timerDisplay.style.border = '2px solid var(--success-color)'; } }
    function unflipCards(gameId, card1, card2, immediate = false) { const state = memoryStates[gameId]; if (!state || !card1 || !card2) return; const delay = immediate ? 0 : 0; state.unflipTimeoutId = setTimeout(() => { if (!card1.classList.contains('matched')) card1.classList.remove('flipped'); if (!card2.classList.contains('matched')) card2.classList.remove('flipped'); resetBoardState(gameId); }, delay); }
    function resetBoardState(gameId) { const state = memoryStates[gameId]; if (!state) return; state.flippedCards = []; state.lockBoard = false; }
    function updateTimerDisplay(gameId) { const state = memoryStates[gameId]; const timerDisplay = document.getElementById(`timer-${gameId}`); if (!state || !state.startTime || !timerDisplay || state.timerIntervalId === null) return; const now = Date.now(); state.elapsedSeconds = Math.floor((now - state.startTime) / 1000); timerDisplay.textContent = formatTime(state.elapsedSeconds); }

    // --- Validation and Scoring Logic ---
    function checkQuiz(theme) { let score = 0; let maxScore = 0; const quizExercises = exerciseContentArea?.querySelectorAll(`.quiz-exercise[data-quiz-index]`); if (!quizExercises) return { score: 0, maxScore: 0 }; quizExercises.forEach(quizDiv => { maxScore++; const index = quizDiv.dataset.quizIndex; const selectedInput = quizDiv.querySelector(`input[name="quiz-${theme}-${index}"]:checked`); if (selectedInput && selectedInput.hasAttribute('data-correct')) { score++; } }); console.log(`Quiz check: ${score}/${maxScore}`); return { score: score, maxScore: maxScore }; }
    function checkAssociation(theme) { let score = 0; let maxScore = 0; const associationSelects = exerciseContentArea?.querySelectorAll(`.association-exercise[data-assoc-index="0"] select`); if (!associationSelects) return { score: 0, maxScore: 0 }; associationSelects.forEach(select => { maxScore++; const selectedValue = select.value; const correctValue = select.dataset.correctValue; if (selectedValue && selectedValue === correctValue) { score++; } }); console.log(`Assoc check: ${score}/${maxScore}`); return { score: score, maxScore: maxScore }; }
    function checkPendu(theme) { let score = 0; let maxScore = 0; const penduContainers = exerciseContentArea?.querySelectorAll(`.pendu-container[data-pendu-id^="pendu-${theme}-"]`); if (!penduContainers) return { score: 0, maxScore: 0 }; penduContainers.forEach(container => { maxScore++; const gameId = container.dataset.penduId; if(penduStates[gameId] && penduStates[gameId].win) { score++; } }); console.log(`Pendu check: ${score}/${maxScore}`); return { score: score, maxScore: maxScore }; }
    function checkMemoryGame(theme) { let score = 0; let maxScore = 0; const memoryContainers = exerciseContentArea?.querySelectorAll(`.memory-game[data-memory-id^="memory-${theme}-"]`); if (!memoryContainers) return { score: 0, maxScore: 0 }; memoryContainers.forEach(container => { const gameId = container.dataset.memoryId; if(memoryStates[gameId]) { score += memoryStates[gameId].matchedPairs; maxScore += memoryStates[gameId].totalPairs; } }); console.log(`Memory check: ${score}/${maxScore}`); return { score: score, maxScore: maxScore }; }
    function validateExercises() { if (!currentTheme || !exerciseFeedback || !exercisesData[currentTheme]) { console.error("Impossible de valider: thème courant ou éléments manquants"); return; } console.log("Validation exercices pour:", currentTheme); let totalScore = 0; let totalMaxScore = 0; let resultsText = []; const themeData = exercisesData[currentTheme]; if(themeData.quiz?.length > 0){ const quizResult = checkQuiz(currentTheme); totalScore += quizResult.score; totalMaxScore += quizResult.maxScore; resultsText.push(`Quiz: ${quizResult.score}/${quizResult.maxScore}`); } if(themeData.association?.length > 0){ const assocResult = checkAssociation(currentTheme); totalScore += assocResult.score; totalMaxScore += assocResult.maxScore; resultsText.push(`Association: ${assocResult.score}/${assocResult.maxScore}`); } if(themeData.pendu?.length > 0){ const penduResult = checkPendu(currentTheme); totalScore += penduResult.score; totalMaxScore += penduResult.maxScore; resultsText.push(`Pendu: ${penduResult.score}/${penduResult.maxScore}`); } if(themeData.memory?.length > 0){ const memoryResult = checkMemoryGame(currentTheme); totalScore += memoryResult.score; totalMaxScore += memoryResult.maxScore; resultsText.push(`Memory: ${memoryResult.score}/${memoryResult.maxScore}`); } exerciseFeedback.classList.remove('is-hidden'); if (totalMaxScore > 0) { const percentage = Math.round((totalScore / totalMaxScore) * 100); exerciseFeedback.innerHTML = `Résultat (${currentTheme}) : <span>${totalScore} / ${totalMaxScore} (${percentage}%)</span><br><small>${resultsText.join(' | ')}</small>`; } else { exerciseFeedback.textContent = "Aucun exercice à valider pour ce thème."; } console.log(`Score Final ${currentTheme}: ${totalScore}/${totalMaxScore}`); }

    // --- Event Listeners Setup ---
    function setupEventListeners() {
        console.log("Script.js : Ajout écouteurs...");
        // Cartes de cours/exercices
        if (courseCards?.length > 0) { courseCards.forEach(card => { card.addEventListener('click', () => { const sectionId = card.getAttribute('data-section'); console.log(`Clic carte: ${sectionId}`); if (sectionId) { showSection(sectionId); } }); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); const sectionId = card.getAttribute('data-section'); if (sectionId) { showSection(sectionId); } } }); }); } else { console.error("Aucune .course-card trouvée"); }
        // Bouton Retour
        if (backButton) { backButton.addEventListener('click', showCardGrid); } else { console.error("#back-to-grid non trouvé"); }
        // Boutons Thème Exercices
        if (themeButtons) { themeButtons.forEach(button => { button.addEventListener('click', () => { const theme = button.getAttribute('data-theme'); if (theme) { console.log("Clic thème:", theme); themeButtons.forEach(btn => btn.classList.remove('active')); button.classList.add('active'); loadExercises(theme); } }); }); } else { console.warn("#theme-buttons non trouvé"); }
        // Bouton Valider Exercices
        if (validateExerciseButton) { validateExerciseButton.addEventListener('click', validateExercises); } else { console.warn("#validate-exercise-button non trouvé"); }
        // Mots importants (Définitions)
        if(importantWords?.length > 0) { importantWords.forEach(word => { word.addEventListener('click', () => showDefinition(word)); word.setAttribute('tabindex', '0'); word.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showDefinition(word); } }); }); }
        // Contraintes Cliquables (Listener Délégué)
        const besoinSectionElement = document.getElementById('besoin-section');
        if (besoinSectionElement && constraintInfoBox) { besoinSectionElement.addEventListener('click', (event) => { const listItem = event.target.closest('.clickable-list li[data-info]'); if (listItem) { showConstraintInfo.call(listItem); } }); besoinSectionElement.addEventListener('keydown', (event) => { const listItem = event.target.closest('.clickable-list li[data-info]'); if (listItem && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); showConstraintInfo.call(listItem); } }); console.log("Listener contraintes OK."); } else { console.warn("Section Besoin ou info-box non trouvée pour listener contraintes.");}
        // Modale Définition Fermeture
        if (definitionModal) { if (definitionCloseButton) { definitionCloseButton.addEventListener('click', () => closeModal(definitionModal)); } definitionModal.addEventListener('click', (event) => { if (event.target === definitionModal) { closeModal(definitionModal); } }); window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && definitionModal.classList.contains('is-visible')) { closeModal(definitionModal); } }); } else { console.warn("#definition-modal non trouvé !");}
        // Setup delegated listener for alphabet keys
         setupAlphabetListeners();
        console.log("Script.js : Fin Setup Listeners.");
    }

    // --- Initialisation ---
    console.log("Script.js : Initialisation...");
    if (typeof definitions !== 'object' || Object.keys(definitions).length === 0) { console.error("ERREUR: Données définitions manquantes!"); }
    if (typeof exercisesData !== 'object' || Object.keys(exercisesData).length === 0) { console.error("ERREUR: Données exercices manquantes!"); }
    updateCardVisitedStatus();
    if (contentViewer) contentViewer.style.display = 'none'; // Caché au départ
    if (cardGrid) cardGrid.style.display = 'grid'; // Visible au départ
    setupEventListeners(); // Attacher tous les écouteurs
    console.log("Script.js : Initialisation terminée.");

}); // Fin DOMContentLoaded