document.addEventListener('DOMContentLoaded', () => {
    console.log("Exercices JS Loaded (Standalone, Final Content)");

    // --- Données Complètes des Exercices ---
    const exercisesData = {
        solaire: {
            qcm: [
                {
                    question: "Quel composant principal d'un panneau solaire convertit la lumière en électricité ?",
                    options: ["Onduleur", "Cellule photovoltaïque", "Batterie de stockage", "Cadre en aluminium"],
                    correctAnswer: "Cellule photovoltaïque"
                },
                {
                    question: "Quel type d'énergie solaire utilise des miroirs pour concentrer la chaleur du soleil afin de produire de la vapeur ?",
                    options: ["Solaire photovoltaïque", "Solaire thermique à concentration", "Solaire passif", "Chauffage solaire de piscine"],
                    correctAnswer: "Solaire thermique à concentration"
                },
                {
                    question: "Quel est l'avantage principal de l'énergie solaire par rapport aux énergies fossiles en termes d'émissions ?",
                    options: ["Elle est totalement gratuite", "Elle fonctionne aussi la nuit", "Ne produit pas de CO2 en fonctionnement", "Les panneaux durent éternellement"],
                    correctAnswer: "Ne produit pas de CO2 en fonctionnement"
                }
            ],
            assoc: [ // 8 paires
                { term: "Photovoltaïque", definition: "Conversion lumière -> électricité" },
                { term: "Onduleur", definition: "Conversion DC -> AC" },
                { term: "Capteur thermique", definition: "Chauffe un fluide" },
                { term: "Silicium", definition: "Matériau semi-conducteur" },
                { term: "Tracker solaire", definition: "Suit la course du soleil" },
                { term: "kWh (kilowattheure)", definition: "Unité d'énergie" },
                { term: "kWc (kilowatt-crête)", definition: "Unité de puissance PV max" },
                { term: "Autoconsommation", definition: "Usage local de l'électricité PV" }
            ],
            pendu1: { word: "ONDULEUR", hint: "Appareil essentiel pour utiliser l'électricité solaire à la maison." },
            pendu2: { word: "SILICIUM", hint: "Élément chimique de base des panneaux solaires." },
            memory1: [ // 8 paires
                "Cellule PV", "Lumière -> DC", "Onduleur", "DC -> AC",
                "Thermique", "Chaleur", "Tracker", "Orientation",
                "Panneau", "Module PV", "Toiture", "Intégration Bâti",
                "Rendement", "% Efficacité", "Photon", "Particule lumière"
            ],
            memory2: [ // 8 autres paires
                "Soleil", "Source primaire", "Grille", "Réseau élec.",
                "Maintenance", "Entretien", "Installation", "Pose PV",
                "Recyclage", "Fin de vie", "Ombrage", "Perte production",
                "ADEME", "Agence transition", "Calepinage", "Disposition panneaux"
            ]
        },
        eolien: { // *** CONTENU ÉOLIEN COMPLET ***
             qcm: [
                 { question: "Quelle partie de l'éolienne capte l'énergie du vent ?", options: ["Le mât", "La nacelle", "Les pales", "La fondation"], correctAnswer: "Les pales" },
                 { question: "Que contient principalement la nacelle d'une éolienne ?", options: ["Uniquement le système d'orientation", "Le générateur et le multiplicateur", "Des batteries de stockage", "Le transformateur principal"], correctAnswer: "Le générateur et le multiplicateur" },
                 { question: "Où trouve-t-on généralement les vents les plus forts et réguliers pour l'éolien ?", options: ["En haute montagne", "Dans les centres-villes", "En mer (Offshore)", "Dans les forêts denses"], correctAnswer: "En mer (Offshore)" }
             ],
             assoc: [ // 8 paires
                 { term: "Pale", definition: "Capte la force du vent" },
                 { term: "Rotor", definition: "Ensemble pales + moyeu" },
                 { term: "Nacelle", definition: "Abrite le générateur" },
                 { term: "Mât", definition: "Support vertical" },
                 { term: "Générateur", definition: "Mécanique -> Électrique" },
                 { term: "Éolien offshore", definition: "Installé en mer" },
                 { term: "Parc éolien", definition: "Groupe d'éoliennes" },
                 { term: "Anémomètre", definition: "Mesure vitesse vent" }
             ],
             pendu1: { word: "NACELLE", hint: "La 'tête' de l'éolienne." },
             pendu2: { word: "GENERATEUR", hint: "Produit l'électricité à partir du mouvement." },
             memory1: [ // 8 paires
                 "Pale", "Force du vent", "Rotor", "Rotation",
                 "Nacelle", "Générateur", "Mât", "Hauteur",
                 "Offshore", "En mer", "Onshore", "Sur terre",
                 "Vent", "Énergie cinétique", "Fondation", "Base"
             ],
             memory2: [ // 8 paires
                 "Vitesse vent", "Anémomètre", "Direction vent", "Girouette",
                 "Multiplicateur", "Augmente vitesse", "Frein", "Arrêt sécurité",
                 "Bruit", "Impact sonore", "Paysage", "Impact visuel",
                 "Maintenance", "Inspection", "Réseau", "Injection élec."
             ]
        },
        stockage: { // *** CONTENU STOCKAGE COMPLET ***
             qcm: [
                 { question: "Quelle technologie de batterie est la plus courante pour le stockage stationnaire ?", options: ["Plomb-acide", "Nickel-Cadmium", "Lithium-ion", "Flux redox"], correctAnswer: "Lithium-ion" },
                 { question: "Comment fonctionne une STEP (Station de Transfert d'Énergie par Pompage) ?", options: ["En chauffant de l'eau", "En comprimant de l'air", "En pompant/turbinant de l'eau entre 2 réservoirs", "En faisant tourner un volant"], correctAnswer: "En pompant/turbinant de l'eau entre 2 réservoirs" },
                 { question: "Quel gaz peut être produit par électrolyse de l'eau pour stocker de l'énergie ?", options: ["Méthane", "Azote", "Hydrogène", "Oxygène"], correctAnswer: "Hydrogène" }
             ],
             assoc: [ // 8 paires
                 { term: "Batterie Li-ion", definition: "Stockage électrochimique" },
                 { term: "STEP", definition: "Stockage hydraulique" },
                 { term: "Hydrogène vert", definition: "Stockage chimique (H2)" },
                 { term: "Volant d'inertie", definition: "Stockage cinétique" },
                 { term: "Air comprimé (CAES)", definition: "Stockage mécanique" },
                 { term: "Pile à combustible", definition: "H2 -> Électricité" },
                 { term: "Intermittence", definition: "Variabilité production" },
                 { term: "Smart Grid", definition: "Réseau intelligent" }
             ],
             pendu1: { word: "BATTERIE", hint: "Dispositif de stockage électrochimique." },
             pendu2: { word: "HYDROGENE", hint: "Gaz léger, vecteur énergétique." },
             memory1: [ // 8 paires
                 "Lithium-ion", "Batterie", "STEP", "Eau / Barrage",
                 "Hydrogène", "H2 / Électrolyse", "Volant d'inertie", "Rotation",
                 "Air comprimé", "Pression", "Pile à combustible", "H2 -> Élec.",
                 "Intermittence", "Variabilité", "Réseau", "Stabilité"
             ],
             memory2: [ // 8 paires
                 "Charge", "Stocker énergie", "Décharge", "Libérer énergie",
                 "Capacité", "Quantité (kWh)", "Puissance", "Vitesse (kW)",
                 "Cycle", "Charge+Décharge", "Durée de vie", "Nb Cycles",
                 "Rendement", "% Restitué", "Sécurité", "Gestion Risques"
             ]
        }
    };

    // --- État Global des Exercices et Scores ---
    let exerciseState = {};
    let scores = { global: 0 };

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
        Object.keys(scores).forEach(key => {
            const scoreSpan = document.getElementById(`score-${key}`);
            if (scoreSpan) scoreSpan.textContent = scores[key];
        });
        // Met à jour aussi le total dans le footer
        const totalScoreSpan = document.querySelector('#total-score span#score-global');
        if (totalScoreSpan) {
            totalScoreSpan.textContent = scores.global;
        }
        console.log("Scores updated:", scores);
    }

    function markExerciseCompleted(exerciseId, points) {
        if (!exerciseState[exerciseId] || !exerciseState[exerciseId].completed) {
             const theme = exerciseId.split('-')[0];
             if (!theme) { console.error(`Cannot determine theme from exerciseId: ${exerciseId}`); return false; }
            exerciseState[exerciseId] = { ...exerciseState[exerciseId], completed: true, pointsAwarded: points };
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
        if (message) element.classList.add(isCorrect ? 'correct' : 'incorrect');
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
        Object.keys(exercisesData).forEach(theme => {
            console.log(`Initializing exercises for theme: ${theme}`);
            scores[theme] = 0; const themeData = exercisesData[theme];
            if (themeData.qcm) initQCM(theme, themeData.qcm); else hideBlock(`${theme}-qcm`);
            if (themeData.assoc) initAssociation(theme, themeData.assoc); else hideBlock(`${theme}-assoc`);
            if (themeData.pendu1) initPendu(theme, 1, themeData.pendu1); else hideBlock(`${theme}-pendu1`);
            if (themeData.pendu2) initPendu(theme, 2, themeData.pendu2); else hideBlock(`${theme}-pendu2`);
            if (themeData.memory1) initMemory(theme, 1, themeData.memory1); else hideBlock(`${theme}-memory1`);
            if (themeData.memory2) initMemory(theme, 2, themeData.memory2); else hideBlock(`${theme}-memory2`);
        });
        updateScoreDisplay(); // Affiche les scores initiaux (0)
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
        exerciseState[exerciseId] = { theme: theme, type: 'qcm', completed: false, pointsAwarded: 0 };

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
        let score = 0; let allAnswered = true; const pointsPerCorrect = 1;

        qcmData.forEach((q, index) => {
            const questionDiv = contentDiv.querySelector(`[data-q-index="${index}"]`);
            if (!questionDiv) return;
            const selectedInput = questionDiv.querySelector('input[type="radio"]:checked');
            const labels = questionDiv.querySelectorAll('label');
            labels.forEach(lbl => lbl.classList.remove('correct-answer', 'incorrect-answer', 'user-selected'));
            if (!selectedInput) { allAnswered = false; }
            else {
                const userAnswer = selectedInput.value; const correctAnswer = q.correctAnswer;
                const correctLabel = Array.from(labels).find(lbl => lbl.textContent.trim() === correctAnswer);
                const selectedLabel = selectedInput.closest('label');
                if(selectedLabel) selectedLabel.classList.add('user-selected');
                if (userAnswer === correctAnswer) { score++; if (correctLabel) correctLabel.classList.add('correct-answer'); }
                else { if (selectedLabel) selectedLabel.classList.add('incorrect-answer'); if (correctLabel) correctLabel.classList.add('correct-answer'); }
            }
            questionDiv.querySelectorAll('input[type="radio"]').forEach(inp => inp.disabled = true);
        });

        if (!allAnswered) { displayFeedback(feedbackDiv, "Veuillez répondre à toutes les questions.", false); submitButton.disabled = true; return; } // Désactive si incomplet

        const pointsEarned = score * pointsPerCorrect;
        markExerciseCompleted(exerciseId, pointsEarned);
        displayFeedback(feedbackDiv, `Résultat QCM : ${score} / ${qcmData.length} correct(s). Vous gagnez ${pointsEarned} point(s).`, score === qcmData.length);
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
        if (!state || state.completed || !localState || !theme || clickedItem.classList.contains('disabled') || clickedItem.classList.contains('associated-correct')) return;
        const type = clickedItem.getAttribute('data-type');
        if (clickedItem === localState.selectedItem) { clickedItem.classList.remove('selected'); localState.selectedItem = null; return; }
        if (!localState.selectedItem || localState.selectedItem.getAttribute('data-type') === type) { if (localState.selectedItem) localState.selectedItem.classList.remove('selected'); clickedItem.classList.add('selected'); localState.selectedItem = clickedItem; }
        else {
            const termItem = type === 'term' ? clickedItem : localState.selectedItem; const defItem = type === 'definition' ? clickedItem : localState.selectedItem; const assocData = exercisesData[theme]?.assoc;
            localState.selectedItem = null; const correctDef = assocData.find(pair => pair.term === termItem.textContent)?.definition;
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
    function initPendu(theme, gameNumber, wordData) { const exerciseId = `${theme}-pendu${gameNumber}`; const container = document.getElementById(exerciseId); if (!container) return; const wordDiv = container.querySelector('.pendu-word'); const lettersDiv = container.querySelector('.pendu-letters'); const attemptsSpan = container.querySelector('.pendu-attempts span'); const feedbackDiv = container.querySelector('.pendu-feedback'); const helpButton = container.querySelector('.pendu-help-button'); const helpTextDiv = container.querySelector('.pendu-help-text'); if (!wordDiv || !lettersDiv || !attemptsSpan || !feedbackDiv || !helpButton || !helpTextDiv) { console.error(`Missing elements in Pendu ${exerciseId}`); hideBlock(exerciseId); return; } exerciseState[exerciseId] = { theme: theme, type: `pendu${gameNumber}`, completed: false, pointsAwarded: 0, word: wordData.word.toUpperCase(), hint: wordData.hint, guessedLetters: new Set(), attemptsLeft: 6, pointsValue: 3 }; const state = exerciseState[exerciseId]; feedbackDiv.textContent = ''; feedbackDiv.className = 'pendu-feedback feedback'; attemptsSpan.textContent = state.attemptsLeft; helpTextDiv.textContent = `Indice : ${state.hint}`; helpTextDiv.style.display = 'none'; helpButton.disabled = false; helpButton.onclick = () => { helpTextDiv.style.display = 'block'; helpButton.disabled = true; }; displayPenduWord(exerciseId); createPenduLetters(exerciseId); }
    function displayPenduWord(exerciseId) { const state = exerciseState[exerciseId]; const wordDiv = document.getElementById(exerciseId)?.querySelector('.pendu-word'); if (!state || !wordDiv) return; wordDiv.textContent = state.word.split('').map(letter => (state.guessedLetters.has(letter) || !letter.match(/[A-Z]/i) ? letter : '_')).join(''); }
    function createPenduLetters(exerciseId) { const lettersDiv = document.getElementById(exerciseId)?.querySelector('.pendu-letters'); if (!lettersDiv) return; lettersDiv.innerHTML = ''; 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => { const button = document.createElement('button'); button.classList.add('pendu-letter-button'); button.textContent = letter; button.onclick = () => handlePenduGuess(exerciseId, letter); lettersDiv.appendChild(button); }); }
    function handlePenduGuess(exerciseId, letter) { const state = exerciseState[exerciseId]; if (!state || state.completed) return; const container = document.getElementById(exerciseId); const feedbackDiv = container.querySelector('.pendu-feedback'); const attemptsSpan = container.querySelector('.pendu-attempts span'); const letterButton = Array.from(container.querySelectorAll('.pendu-letter-button')).find(btn => btn.textContent === letter); if (state.guessedLetters.has(letter) || !letterButton || letterButton.disabled) return; state.guessedLetters.add(letter); letterButton.disabled = true; if (state.word.includes(letter)) { displayPenduWord(exerciseId); const wordLetters = new Set(state.word.replace(/[^A-Z]/gi, '').split('')); const guessedWordLetters = new Set(Array.from(state.guessedLetters).filter(l => wordLetters.has(l))); if (guessedWordLetters.size === wordLetters.size) { const points = state.pointsValue; markExerciseCompleted(exerciseId, points); displayFeedback(feedbackDiv, `Gagné ! Le mot était "${state.word}". Vous gagnez ${points} points.`, true); disableAllPenduLetters(exerciseId); } else { displayFeedback(feedbackDiv, '', true); } } else { state.attemptsLeft--; attemptsSpan.textContent = state.attemptsLeft; displayFeedback(feedbackDiv, `Lettre "${letter}" incorrecte.`, false); if (state.attemptsLeft <= 0) { markExerciseCompleted(exerciseId, 0); displayFeedback(feedbackDiv, `Perdu... Le mot était "${state.word}".`, false); document.getElementById(exerciseId).querySelector('.pendu-word').textContent = state.word; disableAllPenduLetters(exerciseId); } } }
    function disableAllPenduLetters(exerciseId) { document.querySelectorAll(`#${exerciseId} .pendu-letter-button`).forEach(btn => btn.disabled = true); const helpButton = document.getElementById(exerciseId)?.querySelector('.pendu-help-button'); if(helpButton) helpButton.disabled = true; }

    // --- Logique Memory ---
    let currentMemoryState = {};
    function initMemory(theme, gameNumber, memoryData) { const exerciseId = `${theme}-memory${gameNumber}`; const container = document.getElementById(exerciseId); if (!container) return; const grid = container.querySelector('.memory-grid'); const feedbackDiv = container.querySelector('.memory-feedback'); const timerSpan = container.querySelector('.time-value'); if (!grid || !feedbackDiv || !timerSpan || memoryData.length % 2 !== 0) { console.error(`Missing elements or invalid data for Memory ${exerciseId}`); hideBlock(exerciseId); return; } exerciseState[exerciseId] = { theme: theme, type: `memory${gameNumber}`, completed: false, pointsAwarded: 0, totalPairs: memoryData.length / 2, pointsBase: 1, pointsBonusTime1: 90, pointsBonusTime2: 60 }; currentMemoryState[exerciseId] = { cardsData: shuffleArray([...memoryData]), flippedCards: [], matchedPairs: 0, timerInterval: null, startTime: null, lockBoard: false }; const localState = currentMemoryState[exerciseId]; grid.innerHTML = ''; feedbackDiv.textContent = ''; feedbackDiv.className = 'memory-feedback feedback'; timerSpan.textContent = '0s'; if (localState.timerInterval) clearInterval(localState.timerInterval); localState.cardsData.forEach((value) => { const card = document.createElement('div'); card.classList.add('memory-card'); card.setAttribute('data-exercise-id', exerciseId); card.setAttribute('data-value', value); card.innerHTML = `<div class="card-inner"><div class="card-face card-front"></div><div class="card-face card-back">${value}</div></div>`; card.addEventListener('click', handleMemoryCardClick); grid.appendChild(card); }); }
    function handleMemoryCardClick(event) { const card = event.currentTarget; const exerciseId = card.getAttribute('data-exercise-id'); const state = exerciseState[exerciseId]; const localState = currentMemoryState[exerciseId]; if (!state || state.completed || !localState || localState.lockBoard || card.classList.contains('is-flipped') || localState.flippedCards.length >= 2) return; if (!localState.startTime) startMemoryTimer(exerciseId); card.classList.add('is-flipped'); localState.flippedCards.push(card); if (localState.flippedCards.length === 2) { localState.lockBoard = true; checkForMemoryMatch(exerciseId); } }
    function checkForMemoryMatch(exerciseId) { const state = exerciseState[exerciseId]; const localState = currentMemoryState[exerciseId]; const [card1, card2] = localState.flippedCards; const value1 = card1.getAttribute('data-value'); const value2 = card2.getAttribute('data-value'); const theme = state.theme; const gameNumber = state.type.slice(-1); const originalData = exercisesData[theme]?.[`memory${gameNumber}`]; if (!originalData) { console.error(`Original data not found for ${exerciseId}`); resetMemoryBoard(exerciseId); return; } let isMatch = false; for (let i = 0; i < originalData.length; i += 2) { if ((originalData[i] === value1 && originalData[i+1] === value2) || (originalData[i] === value2 && originalData[i+1] === value1)) { isMatch = true; break; } } if (isMatch) { card1.classList.add('matched'); card2.classList.add('matched'); card1.removeEventListener('click', handleMemoryCardClick); card2.removeEventListener('click', handleMemoryCardClick); localState.matchedPairs++; resetMemoryBoard(exerciseId); if (localState.matchedPairs === state.totalPairs) { stopMemoryTimer(exerciseId); const timeTaken = Math.floor((Date.now() - localState.startTime) / 1000); let points = state.pointsBase; if (timeTaken < state.pointsBonusTime1) points++; if (timeTaken < state.pointsBonusTime2) points++; markExerciseCompleted(exerciseId, points); const feedbackDiv = document.getElementById(exerciseId)?.querySelector('.memory-feedback'); displayFeedback(feedbackDiv, `Bravo ! Toutes les paires trouvées en ${timeTaken}s. Vous gagnez ${points} point(s).`, true); } } else { card1.classList.add('incorrect-match'); card2.classList.add('incorrect-match'); setTimeout(() => { card1.classList.remove('is-flipped', 'incorrect-match'); card2.classList.remove('is-flipped', 'incorrect-match'); resetMemoryBoard(exerciseId); }, 1000); } }
    function resetMemoryBoard(exerciseId) { const localState = currentMemoryState[exerciseId]; if (!localState) return; localState.flippedCards = []; localState.lockBoard = false; }
    function startMemoryTimer(exerciseId) { const state = exerciseState[exerciseId]; const localState = currentMemoryState[exerciseId]; const timerSpan = document.getElementById(exerciseId)?.querySelector('.time-value'); if (!state || !localState || !timerSpan || localState.timerInterval) return; localState.startTime = Date.now(); timerSpan.textContent = '0s'; localState.timerInterval = setInterval(() => { const currentState = exerciseState[exerciseId]; if (!currentState || currentState.completed) { stopMemoryTimer(exerciseId); return; } const seconds = Math.floor((Date.now() - localState.startTime) / 1000); timerSpan.textContent = `${seconds}s`; }, 1000); }
    function stopMemoryTimer(exerciseId) { const localState = currentMemoryState[exerciseId]; if (localState && localState.timerInterval) { clearInterval(localState.timerInterval); localState.timerInterval = null; } }

    // --- Appel Initial ---
    initAllExercises();

}); // Fin DOMContentLoaded
