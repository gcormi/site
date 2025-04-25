document.addEventListener('DOMContentLoaded', () => {
    console.log("Exercices Réparabilité JS Loaded");

    // --- Données des Exercices sur la Réparabilité ---
    // Clé 'pratique' renommée en 'impact' pour correspondre au contenu Partie 3 et HTML
    const exercisesDataReparabilite = {
        bases: { // Partie 1
            qcm: [ { question: "Quel est l'un des principaux problèmes causés par le fait de jeter beaucoup d'objets techniques ?", options: ["On manque de place pour stocker les nouveaux objets.", "Cela consomme des ressources naturelles limitées et crée de la pollution par les déchets.", "Les magasins n'arrivent plus à vendre d'objets neufs.", "Les objets deviennent de plus en plus complexes à utiliser."], correctAnswer: "Cela consomme des ressources naturelles limitées et crée de la pollution par les déchets." }, { question: "Dans un objet technique, quel terme décrit le chemin que suit l'électricité ou l'énergie pour le faire fonctionner ?", options: ["La chaîne de fabrication", "La chaîne d'information", "La chaîne d'énergie", "Le protocole de réparation"], correctAnswer: "La chaîne d'énergie" }, { question: "Quelle est la raison principale pour laquelle la batterie d'un vieux smartphone tient moins la charge qu'au début ?", options: ["Un défaut de fabrication caché.", "L'usure normale due à l'utilisation et au temps.", "Un accident (le téléphone est tombé).", "Le téléphone n'est plus à la mode."], correctAnswer: "L'usure normale due à l'utilisation et au temps." }, { question: "Qu'appelle-t-on les différentes parties qui assemblées forment un objet technique (comme l'écran, la batterie, les boutons d'un smartphone) ?", options: ["Des accessoires", "Des constituants", "Des fonctions d'usage", "Des symptômes de panne"], correctAnswer: "Des constituants" }, { question: "L'obsolescence programmée est l'idée qu'un objet est conçu pour :", options: ["Être facilement réparable.", "Durer très longtemps sans entretien.", "Tomber en panne ou devenir vite démodé volontairement.", "Être fabriqué avec des matériaux recyclés."], correctAnswer: "Tomber en panne ou devenir vite démodé volontairement." } ],
            assoc: [ { term: "Réparabilité", definition: "Capacité d'un objet à être facilement réparé." }, { term: "Déchets électroniques", definition: "Appareils électriques ou électroniques jetés, souvent polluants." }, { term: "Chaîne d'énergie", definition: "Circuit par lequel l'objet reçoit, transforme et utilise l'énergie." }, { term: "Constituant", definition: "Une des différentes pièces qui forment un objet technique." }, { term: "Usure normale", definition: "Dégradation naturelle des pièces due à l'utilisation dans le temps." }, { term: "Garantie", definition: "Engagement du fabricant ou vendeur à réparer un défaut pendant un temps donné." }, { term: "Obsolescence programmée", definition: "Conception d'un objet pour qu'il ait une durée de vie limitée volontairement." }, { term: "Fonction d'usage", definition: "Rôle principal de l'objet pour l'utilisateur (ex: éclairer pour une lampe)." } ],
            pendu1: { word: "ÉNERGIE", hint: "Ce qui est nécessaire pour faire fonctionner un objet technique (lumière, mouvement, chaleur...)." },
            pendu2: { word: "USURE", hint: "Phénomène qui abîme les pièces avec le temps et l'utilisation normale." },
            memory1: [ "Réparer", "Donner une seconde vie", "Planète", "Impact environnemental", "Porte-monnaie", "Économiser", "Comprendre", "Découvrir fonctionnement", "Smartphone", "Exemple objet courant", "Batterie", "Constituant qui s'use", "Pétrole", "Ressource plastique", "Métaux rares", "Ressource électronique" ],
            memory2: [ "Chaîne d'information", "Commande de l'objet", "Bouton", "Entrée information", "Moteur", "Énergie -> Mouvement", "Accident", "Cause panne imprévue", "Défaut", "Problème d'origine", "Logicielle", "Obsolescence MàJ", "Esthétique", "Obsolescence mode", "Démonter", "Accéder à l'intérieur" ]
        },
        pannes: { // Partie 2
             qcm: [ { question: "Quelle est la toute première étape lorsque l'on observe qu'un objet technique ne fonctionne pas correctement ?", options: ["Le démonter entièrement.", "Le jeter et en racheter un autre.", "Identifier et décrire précisément les symptômes de la panne.", "Appeler un réparateur professionnel."], correctAnswer: "Identifier et décrire précisément les symptômes de la panne." }, { question: "Que trouve-t-on souvent dans la section \"Dépannage\" d'une notice d'utilisation ?", options: ["La liste complète de toutes les pièces de rechange.", "Des solutions pour les problèmes les plus courants et simples à résoudre.", "L'histoire de l'entreprise qui a fabriqué l'objet.", "Un formulaire pour commander un nouvel appareil."], correctAnswer: "Des solutions pour les problèmes les plus courants et simples à résoudre." }, { question: "Selon le cours, quel type d'objet est considéré comme \"facile à démonter\" ?", options: ["Un objet où toutes les pièces sont collées entre elles.", "Un objet qui nécessite des outils très spécifiques et coûteux.", "Un objet que l'on peut ouvrir avec des outils courants comme des tournevis standard.", "Un objet qui ne contient aucune vis."], correctAnswer: "Un objet que l'on peut ouvrir avec des outils courants comme des tournevis standard." }, { question: "Quelle est la différence principale entre la \"Fiabilité\" et la \"Réparabilité\" d'un objet ?", options: ["La fiabilité concerne sa durée de vie totale, la réparabilité sa capacité à fonctionner.", "La fiabilité concerne sa capacité à ne pas tomber en panne souvent, la réparabilité sa facilité à être réparé si une panne arrive.", "La fiabilité et la réparabilité sont exactement la même chose.", "La fiabilité est une note officielle, la réparabilité est juste une opinion."], correctAnswer: "La fiabilité concerne sa capacité à ne pas tomber en panne souvent, la réparabilité sa facilité à être réparé si une panne arrive." }, { question: "En France, que représente l'Indice de Réparabilité affiché sur certains produits ?", options: ["Une note sur 20 indiquant la qualité de fabrication.", "Une note sur 10 indiquant si le produit est facile ou difficile à réparer.", "Le prix moyen des pièces de rechange.", "La durée de vie minimale garantie de l'appareil."], correctAnswer: "Une note sur 10 indiquant si le produit est facile ou difficile à réparer." } ],
             assoc: [ { term: "Diagnostiquer", definition: "Identifier la cause d'une panne en observant les symptômes." }, { term: "Symptômes", definition: "Les manifestations d'une panne (bruit, absence de lumière...)." }, { term: "Dépannage", definition: "Premières vérifications simples pour résoudre un problème." }, { term: "Documentation", definition: "Manuels d'utilisation, schémas techniques utiles pour réparer." }, { term: "iFixit", definition: "Exemple de site web proposant des guides de réparation gratuits." }, { term: "Pièces de rechange", definition: "Composants que l'on peut acheter pour remplacer une pièce cassée." }, { term: "Indice de réparabilité", definition: "Note officielle évaluant la facilité de réparation d'un produit." }, { term: "Outils standards", definition: "Outils courants comme un tournevis classique, non spécifiques." } ],
             pendu1: { word: "DIAGNOSTIC", hint: "L'étape pour trouver la raison d'une panne." },
             pendu2: { word: "DOCUMENTATION", hint: "Elle inclut les manuels et schémas qui aident à réparer." },
             memory1: [ "Symptôme", "Signe visible panne", "Panne", "Ne fonctionne plus", "Vérifications simples", "Dépannage", "Notice", "Doc. utilisation", "Fiabilité", "Tombe rarement en panne", "Durabilité", "Dure longtemps", "Réparable", "Facile à réparer", "Note sur 10", "Indice réparabilité" ],
             memory2: [ "Démontage facile", "Critère réparabilité", "Pièces abordables", "Critère réparabilité", "Outils spéciaux", "Rend difficile", "Accès informations", "Essentiel pour réparer", "Redémarrer", "Action dépannage", "Bruit bizarre", "Un symptôme", "Écran cassé", "Type de panne", "Prix des pièces", "Critère indice" ]
        },
        impact: { // Partie 3 (anciennement 'pratique')
             qcm: [ { question: "Quelle est la règle de sécurité la plus importante avant de commencer à démonter un appareil électrique ?", options: ["Avoir une boîte pour ranger les vis.", "Regarder une vidéo de réparation.", "S'assurer que l'appareil est bien débranché de toute source d'énergie.", "Porter des gants de jardinage."], correctAnswer: "S'assurer que l'appareil est bien débranché de toute source d'énergie." }, { question: "Pourquoi est-il conseillé de prendre des photos pendant le démontage d'un objet ?", options: ["Pour les publier sur les réseaux sociaux.", "Pour se souvenir où vont les différentes pièces et vis lors du remontage.", "Pour prouver que l'objet était cassé.", "Pour effacer les données personnelles."], correctAnswer: "Pour se souvenir où vont les différentes pièces et vis lors du remontage." }, { question: "Selon le cours, en plus de réduire les dépenses, réparer un objet est un bon geste pour l'environnement car :", options: ["Cela permet de recycler plus de matériaux rares.", "Cela réduit la quantité de déchets et le besoin d'extraire de nouvelles ressources pour fabriquer un neuf.", "Cela crée de l'énergie propre.", "Cela améliore la qualité de l'air."], correctAnswer: "Cela réduit la quantité de déchets et le besoin d'extraire de nouvelles ressources pour fabriquer un neuf." }, { question: "Quel terme désigne le modèle où l'on essaie de faire durer les produits (par la réparation, le réemploi, le recyclage) au lieu de simplement fabriquer, utiliser et jeter ?", options: ["L'économie linéaire.", "L'économie de marché.", "L'économie circulaire.", "L'économie souterraine."], correctAnswer: "L'économie circulaire." }, { question: "Que signifie le \"Droit à la Réparation\" ?", options: ["Le droit pour les fabricants de ne pas réparer leurs produits.", "Le droit pour le consommateur de réparer lui-même ou de faire réparer son objet facilement.", "Le droit de jeter son objet sans payer.", "Le droit d'obtenir un objet neuf gratuitement en cas de panne."], correctAnswer: "Le droit pour le consommateur de réparer lui-même ou de faire réparer son objet facilement." } ],
             assoc: [ { term: "Sécurité", definition: "Règle primordiale avant de toucher à un appareil électrique." }, { term: "Protocole de réparation", definition: "Liste d'étapes à suivre pour réparer méthodiquement." }, { term: "Démontage", definition: "Action d'ouvrir l'objet pour accéder à l'intérieur." }, { term: "Remontage", definition: "Action de refermer l'objet après réparation." }, { term: "Impression 3D", definition: "Technologie permettant de fabriquer des pièces de rechange en plastique." }, { term: "Repair Cafés", definition: "Lieux où des bénévoles aident à réparer gratuitement." }, { term: "Économie circulaire", definition: "Modèle visant à faire durer les produits le plus longtemps possible." }, { term: "Droit à la réparation", definition: "Mouvement pour faciliter la réparation des objets." } ],
             pendu1: { word: "SECURITE", hint: "Ce qu'il ne faut jamais oublier avant de réparer un appareil électrique." },
             pendu2: { word: "RECYCLER", hint: "Ce qu'on fait des matériaux en fin de vie d'un objet dans l'économie circulaire." },
             memory1: [ "Débrancher", "Action sécurité", "Photos", "Aide remontage", "Pièces détachées", "Pièces rechange", "Test", "Vérifier à la fin", "Moins de déchets", "Bénéfice environ.", "Moins de ressources", "Autre bénéfice", "DEEE", "Déchets électroniques", "Ressources naturelles", "Matières premières" ],
             memory2: [ "Repair Café", "Aide gratuite", "Impression 3D", "Fabriquer pièce", "Internet", "Tutoriels / Guides", "Diagnostic assisté", "Aide trouver panne", "Conception modulaire", "Comme des \"Lego\"", "Métiers réparation", "Professions avenir", "Indice durabilité", "Évolution indice", "Éco-conception", "Penser dès fabrication" ]
        },
        motsCroises: { // Exercice final
            crossword: {
                words: [
                    { clue: "Capacité d'un objet à être réparé facilement.", answer: "REPARABILITE", direction: "horizontal", row: 1, col: 1, number: 1 },
                    { clue: "Modèle où l'on fait durer les produits (réparation, réemploi...).", answer: "CIRCULAIRE", direction: "horizontal", row: 3, col: 3, number: 2 },
                    { clue: "L'étape pour trouver l'origine d'une panne.", answer: "DIAGNOSTIC", direction: "horizontal", row: 5, col: 1, number: 3 },
                    { clue: "Déchets issus des appareils électriques et électroniques.", answer: "DEEE", direction: "horizontal", row: 11, col: 1, number: 4 },
                    { clue: "Phénomène qui abîme les pièces avec l'usage et le temps.", answer: "USURE", direction: "horizontal", row: 12, col: 5, number: 5 },
                    { clue: "Ce qu'il faut toujours assurer avant de réparer un appareil électrique.", answer: "SECURITE", direction: "vertical", row: 1, col: 9, number: 6 },
                    { clue: "Les différentes parties qui forment un objet technique.", answer: "CONSTITUANT", direction: "vertical", row: 1, col: 5, number: 7 },
                    { clue: "Conception d'un objet pour qu'il ne dure pas volontairement.", answer: "OBSOLESCENCE", direction: "vertical", row: 2, col: 7, number: 8 },
                    { clue: "Lieux où des bénévoles aident gratuitement à réparer.", answer: "REPAIR", direction: "vertical", row: 7, col: 11, number: 9 },
                    { clue: "Technologie pour fabriquer des pièces en plastique en 3 dimensions.", answer: "IMPRESSION", direction: "vertical", row: 5, col: 3, number: 10 }
                ],
                rows: 13, // Ajusté pour la grille
                cols: 12  // Ajusté pour la grille
            }
        }
    };
    const TOTAL_POINTS_POSSIBLE = 110; // (5+8+6+6)*3 + 10 = 75 + 10 = 85 // Recalcul: (5+8+6+6)*3 + 10 = 85

    // --- État Global des Exercices et Scores ---
    let exerciseState = {};
    let scores = { global: 0 };

    // --- Sélection des éléments du DOM ---
    const themeToggle = document.getElementById('theme-toggle');
    const fontIncreaseBtn = document.getElementById('font-increase');
    const body = document.body;
    let currentTooltip = null;

    // --- Fonctions Utilitaires ---
    function updateScoreDisplay() {
        scores = { global: 0 };
        Object.keys(exerciseState).forEach(exerciseId => {
            const state = exerciseState[exerciseId];
            if (state.completed && state.pointsAwarded > 0) {
                const theme = state.theme;
                if (!scores[theme]) scores[theme] = 0;
                scores[theme] += state.pointsAwarded;
                scores.global += state.pointsAwarded;
            }
        });
        // Met à jour l'affichage pour chaque thème + mots croisés
        Object.keys(exercisesDataReparabilite).forEach(themeKey => {
             const scoreSpan = document.getElementById(`score-${themeKey}`);
             if (scoreSpan) {
                 scoreSpan.textContent = scores[themeKey] || 0;
             }
        });
        const totalScoreSpan = document.querySelector('#total-score span#score-global');
        if (totalScoreSpan) {
            totalScoreSpan.textContent = scores.global;
        }
        console.log("Scores updated:", scores);
    }

    function markExerciseCompleted(exerciseId, points) {
        if (!exerciseState[exerciseId]) {
             const theme = exerciseId.includes('-') ? exerciseId.split('-')[0] : exerciseId; // Gère 'mots-croises'
             exerciseState[exerciseId] = { theme: theme, completed: false, pointsAwarded: 0 };
        }
        if (!exerciseState[exerciseId].completed) {
            exerciseState[exerciseId].completed = true;
            exerciseState[exerciseId].pointsAwarded = points;
            console.log(`Exercise ${exerciseId} completed. Points: ${points}`);
            updateScoreDisplay();
            return true;
        }
        console.log(`Exercise ${exerciseId} already completed.`);
        return false;
    }

    function displayFeedback(element, message, isCorrect) {
        if (!element) return;
        element.innerHTML = message;
        element.classList.remove('correct', 'incorrect');
        if (message) {
            element.classList.add(isCorrect ? 'correct' : 'incorrect');
            const iconClass = isCorrect ? 'fa-check-circle' : 'fa-times-circle';
            element.innerHTML = `<i class="fas ${iconClass}"></i> ${message}`;
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // --- Initialisation des Exercices ---
    function initAllExercises() {
        exerciseState = {}; scores = { global: 0 };
        Object.keys(exercisesDataReparabilite).forEach(theme => {
            console.log(`Initializing exercises for theme/section: ${theme}`);
            scores[theme] = 0;
            const themeData = exercisesDataReparabilite[theme];

            // Gère les exercices standards par thème (bases, pannes, impact)
            if (theme !== 'motsCroises') {
                if (themeData.qcm && document.getElementById(`${theme}-qcm`)) initQCM(theme, themeData.qcm); else hideBlock(`${theme}-qcm`);
                if (themeData.assoc && document.getElementById(`${theme}-assoc`)) initAssociation(theme, themeData.assoc); else hideBlock(`${theme}-assoc`);
                if (themeData.pendu1 && document.getElementById(`${theme}-pendu1`)) initPendu(theme, 1, themeData.pendu1); else hideBlock(`${theme}-pendu1`);
                if (themeData.pendu2 && document.getElementById(`${theme}-pendu2`)) initPendu(theme, 2, themeData.pendu2); else hideBlock(`${theme}-pendu2`);
                if (themeData.memory1 && document.getElementById(`${theme}-memory1`)) initMemory(theme, 1, themeData.memory1); else hideBlock(`${theme}-memory1`);
                if (themeData.memory2 && document.getElementById(`${theme}-memory2`)) initMemory(theme, 2, themeData.memory2); else hideBlock(`${theme}-memory2`);
            }
            // Gère les mots croisés spécifiquement
            else if (theme === 'motsCroises' && themeData.crossword && document.getElementById('mots-croises')) {
                initCrossword('mots-croises', themeData.crossword);
            }
        });
        updateScoreDisplay();
        const totalMaxSpan = document.querySelector('#total-score');
        if(totalMaxSpan) totalMaxSpan.innerHTML = `Score Total : <span id="score-global">0</span> / ${TOTAL_POINTS_POSSIBLE}`;
    }
    function hideBlock(blockId) { const block = document.getElementById(blockId); if (block) block.style.display = 'none'; console.warn(`Hiding block ${blockId} due to missing data or element.`); }

    // --- Logique QCM ---
    function initQCM(theme, qcmData) {
        const exerciseId = `${theme}-qcm`;
        const container = document.getElementById(exerciseId);
        if (!container) { console.warn(`QCM container ${exerciseId} not found.`); return; }
        const contentDiv = container.querySelector('.qcm-content');
        const submitButton = container.querySelector('.qcm-submit');
        const feedbackDiv = container.querySelector('.qcm-feedback');
        if (!contentDiv || !submitButton || !feedbackDiv) { console.error(`Missing elements within QCM container ${exerciseId}`); hideBlock(exerciseId); return; }

        contentDiv.innerHTML = ''; feedbackDiv.innerHTML = ''; submitButton.disabled = false;
        exerciseState[exerciseId] = { theme: theme, type: 'qcm', completed: false, pointsAwarded: 0, totalQuestions: qcmData.length, pointsPerCorrect: 1 };

        qcmData.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('qcm-question');
            questionDiv.setAttribute('data-q-index', index);
            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionText);
            const shuffledOptions = shuffleArray([...q.options]);
            shuffledOptions.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio'; input.name = `qcm-${theme}-${index}`; input.value = option; input.required = true;
                label.appendChild(input); label.appendChild(document.createTextNode(` ${option}`));
                questionDiv.appendChild(label);
            });
            contentDiv.appendChild(questionDiv);
        });
        submitButton.onclick = () => validateQCM(exerciseId, qcmData);
    }

    function validateQCM(exerciseId, qcmData) {
        const container = document.getElementById(exerciseId);
        if (!container || exerciseState[exerciseId]?.completed) return;
        const contentDiv = container.querySelector('.qcm-content');
        const feedbackDiv = container.querySelector('.qcm-feedback');
        const submitButton = container.querySelector('.qcm-submit');
        let score = 0; let allAnswered = true;
        const state = exerciseState[exerciseId];

        qcmData.forEach((q, index) => {
            const questionDiv = contentDiv.querySelector(`[data-q-index="${index}"]`);
            if (!questionDiv) return;
            const selectedInput = questionDiv.querySelector('input[type="radio"]:checked');
            const labels = questionDiv.querySelectorAll('label');
            labels.forEach(lbl => lbl.classList.remove('correct-answer', 'incorrect-answer', 'user-selected'));

            if (!selectedInput) {
                allAnswered = false;
            } else {
                const userAnswer = selectedInput.value;
                const correctAnswer = q.correctAnswer;
                const correctLabel = Array.from(labels).find(lbl => lbl.textContent.trim() === correctAnswer);
                const selectedLabel = selectedInput.closest('label');

                if(selectedLabel) selectedLabel.classList.add('user-selected');

                if (userAnswer === correctAnswer) {
                    score++;
                    if (correctLabel) correctLabel.classList.add('correct-answer');
                } else {
                    if (selectedLabel) selectedLabel.classList.add('incorrect-answer');
                    if (correctLabel) correctLabel.classList.add('correct-answer');
                }
            }
             questionDiv.querySelectorAll('input[type="radio"]').forEach(inp => inp.disabled = true);
        });

        if (!allAnswered) {
            displayFeedback(feedbackDiv, "Veuillez répondre à toutes les questions.", false);
            contentDiv.querySelectorAll('input[type="radio"]').forEach(inp => inp.disabled = false); // Réactiver
            return;
        }

        const pointsEarned = score * state.pointsPerCorrect;
        markExerciseCompleted(exerciseId, pointsEarned);
        displayFeedback(feedbackDiv, `Résultat QCM : ${score} / ${state.totalQuestions} correct(s). Vous gagnez ${pointsEarned} point(s).`, score === state.totalQuestions);
        submitButton.disabled = true;
    }


    // --- Logique Association ---
    let currentAssocState = {};
    function initAssociation(theme, assocData) {
        const exerciseId = `${theme}-assoc`; const container = document.getElementById(exerciseId); if (!container) return;
        const col1 = container.querySelector(`#${theme}-assoc-col1`); const col2 = container.querySelector(`#${theme}-assoc-col2`); const feedbackDiv = container.querySelector('.assoc-feedback');
        if (!col1 || !col2 || !feedbackDiv) { console.error(`Missing elements within Assoc container ${exerciseId}`); hideBlock(exerciseId); return; }
        col1.innerHTML = ''; col2.innerHTML = ''; feedbackDiv.innerHTML = '';
        exerciseState[exerciseId] = { theme: theme, type: 'assoc', completed: false, pointsAwarded: 0, matchedPairs: 0, totalPairs: assocData.length, pointsPerPair: 1 };
        currentAssocState[exerciseId] = { selectedItem: null };
        const terms = assocData.map(item => item.term); const definitions = assocData.map(item => item.definition);
        shuffleArray(terms); shuffleArray(definitions);
        terms.forEach(term => createAssocItem(term, col1, exerciseId, 'term'));
        definitions.forEach(def => createAssocItem(def, col2, exerciseId, 'definition'));
    }
    function createAssocItem(text, column, exerciseId, type) { const item = document.createElement('div'); item.classList.add('assoc-item'); item.textContent = text; item.setAttribute('data-exercise-id', exerciseId); item.setAttribute('data-type', type); item.onclick = handleAssocItemClick; column.appendChild(item); }
    function handleAssocItemClick(event) {
        const clickedItem = event.target; const exerciseId = clickedItem.getAttribute('data-exercise-id'); const state = exerciseState[exerciseId]; const localState = currentAssocState[exerciseId]; const theme = state?.theme;
        const assocData = exercisesDataReparabilite[theme]?.assoc;
        if (!state || state.completed || !localState || !theme || !assocData || clickedItem.classList.contains('disabled') || clickedItem.classList.contains('associated-correct')) return;

        const type = clickedItem.getAttribute('data-type');
        if (clickedItem === localState.selectedItem) { clickedItem.classList.remove('selected'); localState.selectedItem = null; return; }
        if (!localState.selectedItem || localState.selectedItem.getAttribute('data-type') === type) { if (localState.selectedItem) localState.selectedItem.classList.remove('selected'); clickedItem.classList.add('selected'); localState.selectedItem = clickedItem; }
        else {
            const termItem = type === 'term' ? clickedItem : localState.selectedItem; const defItem = type === 'definition' ? clickedItem : localState.selectedItem;
            localState.selectedItem = null;
            const correctDef = assocData.find(pair => pair.term === termItem.textContent)?.definition;
            termItem.classList.remove('selected'); defItem.classList.remove('selected');
            if (correctDef === defItem.textContent) { termItem.classList.add('associated-correct', 'disabled'); defItem.classList.add('associated-correct', 'disabled'); state.matchedPairs++; checkAssociationCompletion(exerciseId); }
            else { termItem.classList.add('associated-incorrect'); defItem.classList.add('associated-incorrect'); setTimeout(() => { termItem.classList.remove('associated-incorrect'); defItem.classList.remove('associated-incorrect'); }, 600); }
        }
    }
    function checkAssociationCompletion(exerciseId) {
        const state = exerciseState[exerciseId]; if (!state || state.completed) return;
        if (state.matchedPairs === state.totalPairs) { const feedbackDiv = document.getElementById(exerciseId)?.querySelector('.assoc-feedback'); const points = state.totalPairs * state.pointsPerPair; markExerciseCompleted(exerciseId, points); displayFeedback(feedbackDiv, `Association terminée ! ${state.totalPairs} paires correctes. Vous gagnez ${points} point(s).`, true); }
    }

    // --- Logique Pendu ---
    function initPendu(theme, gameNumber, wordData) { const exerciseId = `${theme}-pendu${gameNumber}`; const container = document.getElementById(exerciseId); if (!container) return; const wordDiv = container.querySelector('.pendu-word'); const lettersDiv = container.querySelector('.pendu-letters'); const attemptsSpan = container.querySelector('.pendu-attempts span'); const feedbackDiv = container.querySelector('.pendu-feedback'); const helpButton = container.querySelector('.pendu-help-button'); const helpTextDiv = container.querySelector('.pendu-help-text'); if (!wordDiv || !lettersDiv || !attemptsSpan || !feedbackDiv || !helpButton || !helpTextDiv) { console.error(`Missing elements in Pendu ${exerciseId}`); hideBlock(exerciseId); return; } exerciseState[exerciseId] = { theme: theme, type: `pendu${gameNumber}`, completed: false, pointsAwarded: 0, word: wordData.word.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""), hint: wordData.hint, guessedLetters: new Set(), attemptsLeft: 6, pointsValue: 3 }; const state = exerciseState[exerciseId]; feedbackDiv.textContent = ''; feedbackDiv.className = 'pendu-feedback feedback'; attemptsSpan.textContent = state.attemptsLeft; helpTextDiv.textContent = `Indice : ${state.hint}`; helpTextDiv.style.display = 'none'; helpButton.disabled = false; helpButton.onclick = () => { helpTextDiv.style.display = 'block'; helpButton.disabled = true; }; displayPenduWord(exerciseId); createPenduLetters(exerciseId); }
    function displayPenduWord(exerciseId) { const state = exerciseState[exerciseId]; const wordDiv = document.getElementById(exerciseId)?.querySelector('.pendu-word'); if (!state || !wordDiv) return; wordDiv.textContent = state.word.split('').map(letter => (state.guessedLetters.has(letter) || !letter.match(/[A-Z]/i) ? letter : '_')).join(''); }
    function createPenduLetters(exerciseId) { const lettersDiv = document.getElementById(exerciseId)?.querySelector('.pendu-letters'); if (!lettersDiv) return; lettersDiv.innerHTML = ''; 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => { const button = document.createElement('button'); button.classList.add('pendu-letter-button'); button.textContent = letter; button.onclick = () => handlePenduGuess(exerciseId, letter); lettersDiv.appendChild(button); }); }
    function handlePenduGuess(exerciseId, letter) { const state = exerciseState[exerciseId]; if (!state || state.completed) return; const container = document.getElementById(exerciseId); const feedbackDiv = container.querySelector('.pendu-feedback'); const attemptsSpan = container.querySelector('.pendu-attempts span'); const letterButton = Array.from(container.querySelectorAll('.pendu-letter-button')).find(btn => btn.textContent === letter); if (state.guessedLetters.has(letter) || !letterButton || letterButton.disabled) return; state.guessedLetters.add(letter); letterButton.disabled = true; if (state.word.includes(letter)) { displayPenduWord(exerciseId); const wordLetters = new Set(state.word.replace(/[^A-Z]/gi, '').split('')); const guessedWordLetters = new Set(Array.from(state.guessedLetters).filter(l => wordLetters.has(l))); if (guessedWordLetters.size === wordLetters.size) { const points = state.pointsValue; markExerciseCompleted(exerciseId, points); displayFeedback(feedbackDiv, `Gagné ! Le mot était "${state.word}". Vous gagnez ${points} points.`, true); disableAllPenduLetters(exerciseId); } else { displayFeedback(feedbackDiv, '', true); } } else { state.attemptsLeft--; attemptsSpan.textContent = state.attemptsLeft; displayFeedback(feedbackDiv, `Lettre "${letter}" incorrecte.`, false); if (state.attemptsLeft <= 0) { markExerciseCompleted(exerciseId, 0); displayFeedback(feedbackDiv, `Perdu... Le mot était "${state.word}".`, false); document.getElementById(exerciseId).querySelector('.pendu-word').textContent = state.word; disableAllPenduLetters(exerciseId); } } }
    function disableAllPenduLetters(exerciseId) { document.querySelectorAll(`#${exerciseId} .pendu-letter-button`).forEach(btn => btn.disabled = true); const helpButton = document.getElementById(exerciseId)?.querySelector('.pendu-help-button'); if(helpButton) helpButton.disabled = true; }

    // --- Logique Memory ---
    let currentMemoryState = {};
    function initMemory(theme, gameNumber, memoryData) { const exerciseId = `${theme}-memory${gameNumber}`; const container = document.getElementById(exerciseId); if (!container) return; const grid = container.querySelector('.memory-grid'); const feedbackDiv = container.querySelector('.memory-feedback'); const timerSpan = container.querySelector('.time-value'); if (!grid || !feedbackDiv || !timerSpan || memoryData.length % 2 !== 0) { console.error(`Missing elements or invalid data for Memory ${exerciseId}`); hideBlock(exerciseId); return; } exerciseState[exerciseId] = { theme: theme, type: `memory${gameNumber}`, completed: false, pointsAwarded: 0, totalPairs: memoryData.length / 2, pointsBase: 1, pointsBonusTime1: 90, pointsBonusTime2: 60 }; currentMemoryState[exerciseId] = { cardsData: shuffleArray([...memoryData]), flippedCards: [], matchedPairs: 0, timerInterval: null, startTime: null, lockBoard: false }; const localState = currentMemoryState[exerciseId]; grid.innerHTML = ''; feedbackDiv.textContent = ''; feedbackDiv.className = 'memory-feedback feedback'; timerSpan.textContent = '0s'; if (localState.timerInterval) clearInterval(localState.timerInterval); localState.cardsData.forEach((value) => { const card = document.createElement('div'); card.classList.add('memory-card'); card.setAttribute('data-exercise-id', exerciseId); card.setAttribute('data-value', value); card.innerHTML = `<div class="card-inner"><div class="card-face card-front"></div><div class="card-face card-back">${value}</div></div>`; card.addEventListener('click', handleMemoryCardClick); grid.appendChild(card); }); }
    function handleMemoryCardClick(event) { const card = event.currentTarget; const exerciseId = card.getAttribute('data-exercise-id'); const state = exerciseState[exerciseId]; const localState = currentMemoryState[exerciseId]; if (!state || state.completed || !localState || localState.lockBoard || card.classList.contains('is-flipped') || card.classList.contains('matched') || localState.flippedCards.length >= 2) return; if (!localState.startTime) startMemoryTimer(exerciseId); card.classList.add('is-flipped'); localState.flippedCards.push(card); if (localState.flippedCards.length === 2) { localState.lockBoard = true; checkForMemoryMatch(exerciseId); } }
    function checkForMemoryMatch(exerciseId) { const state = exerciseState[exerciseId]; const localState = currentMemoryState[exerciseId]; const [card1, card2] = localState.flippedCards; const value1 = card1.getAttribute('data-value'); const value2 = card2.getAttribute('data-value'); const theme = state.theme; const gameNumber = state.type.slice(-1); const originalData = exercisesDataReparabilite[theme]?.[`memory${gameNumber}`]; if (!originalData) { console.error(`Original data not found for ${exerciseId}`); resetMemoryBoard(exerciseId); return; } let isMatch = false; for (let i = 0; i < originalData.length; i += 2) { if ((originalData[i] === value1 && originalData[i+1] === value2) || (originalData[i] === value2 && originalData[i+1] === value1)) { isMatch = true; break; } } if (isMatch) { card1.classList.add('matched'); card2.classList.add('matched'); card1.removeEventListener('click', handleMemoryCardClick); card2.removeEventListener('click', handleMemoryCardClick); localState.matchedPairs++; resetMemoryBoard(exerciseId); if (localState.matchedPairs === state.totalPairs) { stopMemoryTimer(exerciseId); const timeTaken = Math.floor((Date.now() - localState.startTime) / 1000); let points = state.pointsBase; if (timeTaken < state.pointsBonusTime1) points++; if (timeTaken < state.pointsBonusTime2) points++; markExerciseCompleted(exerciseId, points); const feedbackDiv = document.getElementById(exerciseId)?.querySelector('.memory-feedback'); displayFeedback(feedbackDiv, `Bravo ! Toutes les paires trouvées en ${timeTaken}s. Vous gagnez ${points} point(s).`, true); } } else { card1.classList.add('incorrect-match'); card2.classList.add('incorrect-match'); setTimeout(() => { card1.classList.remove('is-flipped', 'incorrect-match'); card2.classList.remove('is-flipped', 'incorrect-match'); resetMemoryBoard(exerciseId); }, 1000); } }
    function resetMemoryBoard(exerciseId) { const localState = currentMemoryState[exerciseId]; if (!localState) return; localState.flippedCards = []; localState.lockBoard = false; }
    function startMemoryTimer(exerciseId) { const state = exerciseState[exerciseId]; const localState = currentMemoryState[exerciseId]; const timerSpan = document.getElementById(exerciseId)?.querySelector('.time-value'); if (!state || !localState || !timerSpan || localState.timerInterval) return; localState.startTime = Date.now(); timerSpan.textContent = '0s'; localState.timerInterval = setInterval(() => { const currentState = exerciseState[exerciseId]; if (!currentState || currentState.completed) { stopMemoryTimer(exerciseId); return; } const seconds = Math.floor((Date.now() - localState.startTime) / 1000); timerSpan.textContent = `${seconds}s`; }, 1000); }
    function stopMemoryTimer(exerciseId) { const localState = currentMemoryState[exerciseId]; if (localState && localState.timerInterval) { clearInterval(localState.timerInterval); localState.timerInterval = null; } }

    // --- Logique Mots Croisés ---
    function initCrossword(exerciseId, crosswordData) {
        const container = document.getElementById(exerciseId);
        if (!container) { console.error(`Crossword container ${exerciseId} not found.`); return; }
        const gridTable = container.querySelector('.crossword-grid');
        const cluesHorizontal = container.querySelector('#crossword-clues-horizontal');
        const cluesVertical = container.querySelector('#crossword-clues-vertical');
        const checkButton = container.querySelector('.crossword-check');
        const feedbackDiv = container.querySelector('.crossword-feedback');

        if (!gridTable || !cluesHorizontal || !cluesVertical || !checkButton || !feedbackDiv) {
            console.error(`Missing elements within Crossword container ${exerciseId}`);
            hideBlock(exerciseId); return;
        }

        exerciseState[exerciseId] = {
            theme: 'motsCroises', type: 'crossword', completed: false, pointsAwarded: 0,
            wordsData: crosswordData.words, gridState: [], pointsPerWord: 1, totalWords: crosswordData.words.length
        };
        const state = exerciseState[exerciseId];

        gridTable.innerHTML = ''; cluesHorizontal.innerHTML = ''; cluesVertical.innerHTML = '';
        feedbackDiv.innerHTML = ''; checkButton.disabled = false;

        let maxRow = 0, maxCol = 0;
        state.wordsData.forEach(word => {
            const r = word.row - 1; const c = word.col - 1;
            const len = word.answer.length;
            if (word.direction === 'horizontal') { maxRow = Math.max(maxRow, r); maxCol = Math.max(maxCol, c + len - 1); }
            else { maxRow = Math.max(maxRow, r + len - 1); maxCol = Math.max(maxCol, c); }
        });
        const rows = maxRow + 1; const cols = maxCol + 1;

        state.gridState = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({ active: false, letter: null, number: null, element: null, input: null }))
        );

        state.wordsData.forEach(word => {
            const answer = word.answer.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            for (let i = 0; i < answer.length; i++) {
                const r = word.row - 1 + (word.direction === 'vertical' ? i : 0);
                const c = word.col - 1 + (word.direction === 'horizontal' ? i : 0);
                if (r < rows && c < cols) {
                    state.gridState[r][c].active = true;
                    state.gridState[r][c].letter = answer[i];
                    if (i === 0) state.gridState[r][c].number = word.number;
                } else console.error(`Word "${word.answer}" out of bounds`);
            }
            const clueList = word.direction === 'horizontal' ? cluesHorizontal : cluesVertical;
            const li = document.createElement('li');
            li.innerHTML = `<strong>${word.number}.</strong> ${word.clue}`;
            clueList.appendChild(li);
        });

        for (let r = 0; r < rows; r++) {
            const tr = gridTable.insertRow();
            for (let c = 0; c < cols; c++) {
                const cellData = state.gridState[r][c];
                const td = tr.insertCell();
                cellData.element = td;
                if (cellData.active) {
                    td.classList.add('active-cell');
                    const input = document.createElement('input');
                    input.type = 'text'; input.maxLength = 1; input.dataset.row = r; input.dataset.col = c;
                    input.addEventListener('input', handleCrosswordInput);
                    td.appendChild(input);
                    cellData.input = input;
                    if (cellData.number) {
                        const numSpan = document.createElement('span');
                        numSpan.classList.add('clue-number'); numSpan.textContent = cellData.number;
                        td.appendChild(numSpan);
                    }
                } else td.classList.add('blacked-out');
            }
        }
        checkButton.onclick = () => checkCrossword(exerciseId);
    }

    function handleCrosswordInput(event) {
        const input = event.target;
        input.value = input.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // Basic auto-focus (optional, can be improved)
        // const row = parseInt(input.dataset.row);
        // const col = parseInt(input.dataset.col);
        // if (input.value.length === 1) {
        //     const nextInput = document.querySelector(`input[data-row="${row}"][data-col="${col + 1}"]`) || document.querySelector(`input[data-row="${row + 1}"][data-col="0"]`);
        //     if (nextInput) nextInput.focus();
        // }
    }

    function checkCrossword(exerciseId) {
        const state = exerciseState[exerciseId];
        if (!state || state.completed) return;
        const feedbackDiv = document.getElementById(exerciseId)?.querySelector('.crossword-feedback');
        let correctWordsCount = 0;
        let allCellsFilled = true;

        // Vérifier si toutes les cases sont remplies
        for (let r = 0; r < state.gridState.length; r++) {
            for (let c = 0; c < state.gridState[r].length; c++) {
                const cellData = state.gridState[r][c];
                if (cellData.active && (!cellData.input || cellData.input.value === '')) {
                    allCellsFilled = false; break;
                }
            } if (!allCellsFilled) break;
        }

        if (!allCellsFilled) {
             displayFeedback(feedbackDiv, "Veuillez remplir toutes les cases avant de vérifier.", false);
             return;
        }

        // Vérifier chaque mot et cellule
        state.wordsData.forEach(wordInfo => {
            let wordCorrect = true;
            const answer = wordInfo.answer.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            for (let i = 0; i < answer.length; i++) {
                const r = wordInfo.row - 1 + (wordInfo.direction === 'vertical' ? i : 0);
                const c = wordInfo.col - 1 + (wordInfo.direction === 'horizontal' ? i : 0);
                const cellData = state.gridState[r]?.[c];
                if (cellData && cellData.input) {
                    cellData.element.classList.remove('correct', 'incorrect'); // Nettoyer
                    if (cellData.input.value === answer[i]) {
                        cellData.element.classList.add('correct');
                    } else {
                        cellData.element.classList.add('incorrect');
                        wordCorrect = false;
                    }
                    cellData.input.disabled = true; // Désactiver
                } else wordCorrect = false;
            }
            if (wordCorrect) correctWordsCount++;
        });

        const pointsEarned = correctWordsCount * state.pointsPerWord;
        markExerciseCompleted(exerciseId, pointsEarned);
        displayFeedback(feedbackDiv, `Résultat Mots Croisés : ${correctWordsCount} / ${state.totalWords} mot(s) correct(s). Vous gagnez ${pointsEarned} point(s).`, correctWordsCount === state.totalWords);
        const checkButton = document.getElementById(exerciseId)?.querySelector('.crossword-check');
        if (checkButton) checkButton.disabled = true;
    }

    // --- Gestion du thème sombre ---
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.querySelector('i')?.classList.replace('fa-moon', 'fa-sun');
        }
    } else { console.warn("Theme toggle button not found"); }

    // --- Gestion de la taille de police ---
    let fontSizeMultiplier = 1;
    if (fontIncreaseBtn) {
        fontIncreaseBtn.addEventListener('click', () => {
            fontSizeMultiplier = fontSizeMultiplier === 1 ? 1.15 : 1;
            document.documentElement.style.fontSize = `${fontSizeMultiplier}rem`;
            fontIncreaseBtn.querySelector('i').style.transform = fontSizeMultiplier > 1 ? 'scale(1.1)' : 'scale(1)';
        });
    } else { console.warn("Font increase button not found"); }

    // --- Effet sonore au survol ---
    const hoverSound = document.getElementById('hover-sound');
    function playHoverSound(event) {
         const element = event.currentTarget;
         if (hoverSound && !element.disabled && !element.classList.contains('matched') && !element.closest('.matched')) {
             hoverSound.currentTime = 0;
             hoverSound.play().catch(e => {});
         }
    }
    document.querySelectorAll('button, .assoc-item, .pendu-letter-button, .memory-card').forEach(element => {
         element.addEventListener('mouseenter', playHoverSound);
    });

    // --- Gestion des Tooltips ---
    function removeCurrentTooltip() { if (currentTooltip) { currentTooltip.classList.remove('visible'); setTimeout(() => { if(currentTooltip) currentTooltip.remove(); currentTooltip = null; }, 300); } }
    function showTooltip(triggerElement) { if (currentTooltip && currentTooltip.dataset.triggerId === triggerElement.dataset.tooltip) { removeCurrentTooltip(); return; } removeCurrentTooltip(); const tooltipText = triggerElement.dataset.tooltip; if (!tooltipText) return; const popup = document.createElement('div'); popup.classList.add('tooltip-popup'); popup.innerHTML = tooltipText; popup.dataset.triggerId = tooltipText; document.body.appendChild(popup); currentTooltip = popup; const triggerRect = triggerElement.getBoundingClientRect(); const popupRect = popup.getBoundingClientRect(); let top = triggerRect.bottom + window.scrollY + 10; let left = triggerRect.left + window.scrollX + (triggerRect.width / 2) - (popupRect.width / 2); if (left + popupRect.width > window.innerWidth - 15) left = window.innerWidth - popupRect.width - 15; if (top + popupRect.height > window.innerHeight + window.scrollY - 15) top = triggerRect.top + window.scrollY - popupRect.height - 10; if (left < 15) left = 15; popup.style.top = `${top}px`; popup.style.left = `${left}px`; requestAnimationFrame(() => { requestAnimationFrame(() => { popup.classList.add('visible'); }); }); }
    function initTooltips() { document.querySelectorAll('.tooltip-trigger').forEach(trigger => { const clonedTrigger = trigger.cloneNode(true); trigger.replaceWith(clonedTrigger); clonedTrigger.addEventListener('click', (event) => { event.stopPropagation(); showTooltip(clonedTrigger); }); }); }
    document.addEventListener('click', (event) => { if (currentTooltip && !event.target.closest('.tooltip-trigger') && !event.target.closest('.tooltip-popup')) { removeCurrentTooltip(); } });
    window.addEventListener('scroll', removeCurrentTooltip, true);
    window.addEventListener('resize', removeCurrentTooltip);

    // --- Appel Initial ---
    initAllExercises();
    initTooltips();

}); // Fin DOMContentLoaded
