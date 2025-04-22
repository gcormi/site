// Nom du fichier : script-exercices-evolution.js

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // --- Global State ---
    let currentSectionId = 'accueil-exercices';
    let scores = { quiz: 0, association: 0, hangman: 0, memory: 0, crossword: 0 };
    let totalScore = 0;
    const MAX_SCORES = { quiz: 5, association: 6, hangman: 4, memory: 3, crossword: 5 };
    const TOTAL_MAX_SCORE = Object.values(MAX_SCORES).reduce((sum, val) => sum + val, 0);

    // --- DOM Elements ---
    const sections = document.querySelectorAll('main section');
    const scoreDisplay = document.getElementById('score-display');
    const navButtons = document.querySelectorAll('.nav-button');
    const checkButtons = document.querySelectorAll('.check-button');
    const restartButton = document.getElementById('restart-all-button');
    const accueilExosSection = document.getElementById('accueil-exercices');

    // --- Exercise Data (Évolution des Objets) ---
    const quizData = [
        { question: "Quelle est la raison principale pour laquelle les objets techniques évoluent ?", options: ["Les ingénieurs aiment changer les choses", "Les besoins des utilisateurs changent", "Les objets s'usent naturellement", "Pour utiliser de nouvelles couleurs"], answer: "Les besoins des utilisateurs changent" },
        { question: "Quel type de matériau moderne est souvent utilisé pour alléger les vélos de course ?", options: ["Acier", "Bois", "Fibre de carbone", "Plastique recyclé"], answer: "Fibre de carbone" },
        { question: "Comment appelle-t-on le fait qu'un objet soit conçu pour ne pas durer longtemps ?", options: ["Innovation", "Obsolescence programmée", "Réparabilité", "Sobriété numérique"], answer: "Obsolescence programmée" },
        { question: "Quel est l'impact environnemental majeur lié à la fin de vie des appareils électroniques ?", options: ["Consommation d'eau", "Bruit", "Production de DEEE", "Émission de lumière"], answer: "Production de DEEE" },
        { question: "Quelle technologie permet de créer des objets couche par couche à partir d'un modèle numérique ?", options: ["Usinage", "Moulage", "Fabrication additive (Impression 3D)", "Assemblage manuel"], answer: "Fabrication additive (Impression 3D)" }
    ];
    const associationData = [
        { term: "Besoin", definition: "Ce qui pousse à créer ou améliorer un objet", id: 1 },
        { term: "Innovation", definition: "Introduction d'une nouveauté technique ou d'usage", id: 2 },
        { term: "Matériau", definition: "Substance utilisée pour fabriquer (plastique, métal...)", id: 3 },
        { term: "DEEE", definition: "Déchet d'un appareil électrique ou électronique", id: 4 },
        { term: "Frise chronologique", definition: "Outil pour visualiser l'évolution dans le temps", id: 5 },
        { term: "Solution technique", definition: "Choix de composants/principes pour réaliser une fonction", id: 6 }
    ];
    const hangmanData = [
        { word: "EVOLUTION", hint: "Changement des objets au fil du temps." },
        { word: "IMPACT", hint: "Conséquence d'un changement (sur l'environnement, la société...)." },
        { word: "ENERGIE", hint: "Ce qui alimente un objet (électricité, batterie...)." },
        { word: "NORME", hint: "Règle technique (souvent pour la sécurité)." }
    ];
    const memoryData = [
        { term: "Obsolescence", definition: "Objet plus utilisé ou conçu pour ne pas durer", id: 1 },
        { term: "LED", definition: "Composant lumineux à faible consommation", id: 2 },
        { term: "IA", definition: "Permet aux objets de traiter l'info et 'décider'", id: 3 },
        { term: "Sobriété", definition: "Utilisation raisonnée du numérique", id: 4 },
        { term: "Capteur", definition: "Acquiert une information (lumière, son...)", id: 5 },
        { term: "Réparabilité", definition: "Facilité à réparer un objet", id: 6 },
        { term: "Smartphone", definition: "Exemple d'objet technique multifonction", id: 7 },
        { term: "Impression 3D", definition: "Synonyme de fabrication additive", id: 8 }
    ];
    const crosswordData = {
        clues: [
            { number: 1, direction: "horizontal", clue: "Ce qui motive l'évolution des objets.", answer: "BESOIN", row: 0, col: 2 },
            { number: 2, direction: "vertical", clue: "Déchet électronique.", answer: "DEEE", row: 0, col: 4 },
            { number: 3, direction: "horizontal", clue: "Introduction d'une nouveauté technique.", answer: "INNOVATION", row: 2, col: 0 },
            { number: 4, direction: "vertical", clue: "Substance pour fabriquer un objet.", answer: "MATERIAU", row: 2, col: 0 },
            { number: 5, direction: "horizontal", clue: "Conséquence sur l'environnement ou la société.", answer: "IMPACT", row: 4, col: 3 },
            { number: 6, direction: "vertical", clue: "Source d'alimentation (électrique, batterie...).", answer: "ENERGIE", row: 4, col: 7 },
            { number: 7, direction: "horizontal", clue: "Règle technique, souvent pour la sécurité.", answer: "NORME", row: 6, col: 1 },
            { number: 8, direction: "vertical", clue: "Facilité à remettre en état un objet.", answer: "REPARABLE", row: 1, col: 9 },
            { number: 9, direction: "horizontal", clue: "Fin de vie volontairement accélérée.", answer: "OBSOLESCENCE", row: 8, col: 0 },
            { number: 10, direction: "vertical", clue: "Fabrication couche par couche.", answer: "ADDITIVE", row: 3, col: 5 }
        ],
        size: 11
    };

    // --- Utility Functions ---
    const updateScoreDisplay = () => {
        totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
        if (scoreDisplay) scoreDisplay.textContent = `Score: ${totalScore}`;
    };
    const showFeedback = (elementId, message, type = 'info') => {
        const feedbackEl = document.getElementById(elementId);
        if (feedbackEl) { feedbackEl.textContent = message; feedbackEl.className = `feedback ${type}`; feedbackEl.style.display = 'block'; }
    };
    function shuffleArray(array) { /* ... (code inchangé) ... */
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // --- SPA Navigation ---
    const animationDuration = 500;
    const showExerciseSection = (targetId) => { /* ... (code inchangé) ... */
        const currentSection = document.getElementById(currentSectionId);
        const targetSection = document.getElementById(targetId);

        if (!targetSection || targetSection === currentSection) return;

        if (currentSection) {
            currentSection.classList.remove('active-section', 'section-fade-in');
            currentSection.style.display = 'none';
            currentSection.style.opacity = '0';
        }

        if (targetId === 'accueil-exercices') {
            targetSection.style.display = 'flex';
        } else {
            targetSection.style.display = 'block';
        }

        void targetSection.offsetWidth;
        targetSection.classList.add('active-section', 'section-fade-in');
        currentSectionId = targetId;

        setTimeout(() => {
             targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);

        if (targetId === 'memory-evol') {
            const timerDisplay = document.querySelector(`#${targetId} .timer`);
            if (timerDisplay) timerDisplay.textContent = '0s';
            stopMemoryTimer('memory');
        }
        if (targetId === 'hangman-evol') {
             if (!document.getElementById('hangman-word-display')?.textContent.includes('_')) {
                 setupHangman();
             }
        }
        if (targetId === 'summary-evol') {
             showSummary();
        }
    };
    navButtons.forEach(button => { /* ... (code inchangé) ... */
        button.addEventListener('click', (event) => {
            if (button.tagName === 'A') event.preventDefault();
            const targetId = button.dataset.target;
            if (targetId) {
                showExerciseSection(targetId);
            } else if (button.classList.contains('back-to-top')) {
                showExerciseSection('accueil-exercices');
            }
        });
    });

    // --- Quiz Logic ---
    const quizContainer = document.getElementById('quiz-container');
    const checkQuizButton = document.getElementById('check-quiz-button');
    let quizChecked = false;
    function setupQuiz() { /* ... (code inchangé) ... */
        if (!quizContainer) return;
        quizContainer.innerHTML = '';
        quizChecked = false;
        quizData.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('quiz-question');
            questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
            const optionsList = document.createElement('ul');
            optionsList.classList.add('quiz-options');
            optionsList.dataset.questionIndex = index;
            const shuffledOptions = shuffleArray([...q.options]);
            shuffledOptions.forEach(option => {
                const li = document.createElement('li');
                const optionId = `q${index}_${option.replace(/[^a-zA-Z0-9]/g, '-')}`;
                li.innerHTML = `<label for="${optionId}"><input type="radio" name="question${index}" id="${optionId}" value="${option}"><span>${option}</span></label>`;
                optionsList.appendChild(li);
            });
            questionDiv.appendChild(optionsList);
            quizContainer.appendChild(questionDiv);
        });
        if (checkQuizButton) { checkQuizButton.style.display = 'inline-block'; checkQuizButton.disabled = false; }
        const nextButton = document.querySelector('#quiz-evol .next-button');
        if (nextButton) nextButton.style.display = 'none';
        showFeedback('quiz-feedback', '', 'info');
    }
    function checkQuizAnswers() { /* ... (code inchangé) ... */
        if (quizChecked || !quizContainer) return;
        quizChecked = true;
        let correctAnswers = 0;
        const questionOptionLists = quizContainer.querySelectorAll('.quiz-options');
        questionOptionLists.forEach((optionsList) => {
            const questionIndex = parseInt(optionsList.dataset.questionIndex);
            const correctAnswer = quizData[questionIndex].answer;
            const selectedInput = optionsList.querySelector('input[type="radio"]:checked');
            const listItems = optionsList.querySelectorAll('li');
            listItems.forEach(li => {
                const input = li.querySelector('input[type="radio"]');
                const label = li.querySelector('label');
                input.disabled = true;
                label.classList.add('disabled');
                if (input.value === correctAnswer) li.classList.add('correct-answer');
                if (selectedInput && input === selectedInput && input.value !== correctAnswer) li.classList.add('incorrect-selection');
            });
            if (selectedInput && selectedInput.value === correctAnswer) correctAnswers++;
        });
        scores.quiz = correctAnswers;
        updateScoreDisplay();
        showFeedback('quiz-feedback', `Tu as obtenu ${correctAnswers} / ${MAX_SCORES.quiz} points.`, correctAnswers >= MAX_SCORES.quiz / 2 ? 'correct' : 'incorrect');
        if (checkQuizButton) checkQuizButton.style.display = 'none';
        const nextButton = document.querySelector('#quiz-evol .next-button');
        if (nextButton) nextButton.style.display = 'inline-block';
    }
    if (checkQuizButton) checkQuizButton.addEventListener('click', checkQuizAnswers);

    // --- Association Logic ---
    const termsContainer = document.getElementById('association-terms');
    const definitionsContainer = document.getElementById('association-definitions');
    let selectedTerm = null;
    let matchedPairs = 0;
    function setupAssociation() { /* ... (code inchangé) ... */
        if (!termsContainer || !definitionsContainer) return;
        termsContainer.innerHTML = '';
        definitionsContainer.innerHTML = '';
        selectedTerm = null;
        matchedPairs = 0;
        showFeedback('association-feedback', '', 'info');
        const nextButton = document.querySelector('#association-evol .next-button');
        if (nextButton) nextButton.style.display = 'inline-block';
        const terms = shuffleArray([...associationData]);
        const definitions = shuffleArray([...associationData]);
        terms.forEach(item => { /* ... */
            const div = document.createElement('div');
            div.classList.add('association-item', 'term');
            div.textContent = item.term;
            div.dataset.matchId = item.id;
            div.addEventListener('click', handleAssociationClick);
            termsContainer.appendChild(div);
        });
        definitions.forEach(item => { /* ... */
            const div = document.createElement('div');
            div.classList.add('association-item', 'definition');
            div.textContent = item.definition;
            div.dataset.matchId = item.id;
            div.addEventListener('click', handleAssociationClick);
            definitionsContainer.appendChild(div);
        });
    }
    function handleAssociationClick(event) { /* ... (code inchangé) ... */
        const clickedItem = event.target;
        if (!clickedItem.classList.contains('association-item') || clickedItem.classList.contains('matched')) return;
        if (clickedItem.classList.contains('term')) {
            if (selectedTerm) selectedTerm.classList.remove('selected');
            selectedTerm = clickedItem;
            selectedTerm.classList.add('selected');
        } else if (clickedItem.classList.contains('definition') && selectedTerm) {
            const termId = selectedTerm.dataset.matchId;
            const definitionId = clickedItem.dataset.matchId;
            selectedTerm.classList.remove('incorrect-match');
            clickedItem.classList.remove('incorrect-match');
            if (termId === definitionId) {
                selectedTerm.classList.add('matched');
                clickedItem.classList.add('matched');
                selectedTerm.classList.remove('selected');
                matchedPairs++;
                selectedTerm = null;
                if (matchedPairs === associationData.length) {
                    scores.association = MAX_SCORES.association;
                    updateScoreDisplay();
                    showFeedback('association-feedback', `Bravo ! Toutes les paires associées ! +${MAX_SCORES.association} points.`, 'correct');
                }
            } else {
                selectedTerm.classList.add('incorrect-match');
                clickedItem.classList.add('incorrect-match');
                const currentSelectedTerm = selectedTerm;
                setTimeout(() => {
                    if (currentSelectedTerm) currentSelectedTerm.classList.remove('selected', 'incorrect-match');
                    if (clickedItem) clickedItem.classList.remove('incorrect-match');
                }, 500);
                selectedTerm = null;
            }
        }
    }

    // --- Hangman Logic ---
    const hangmanWordDisplay = document.getElementById('hangman-word-display');
    const hangmanAttemptsDisplay = document.getElementById('hangman-attempts');
    const hangmanLettersContainer = document.getElementById('hangman-letters');
    const hangmanHintButton = document.getElementById('hangman-hint-button');
    const hangmanHintText = document.getElementById('hangman-hint-text');
    let hangmanCurrentWordIndex = 0;
    let hangmanCurrentWord = '';
    let hangmanGuessedLetters = [];
    let hangmanAttemptsLeft = 5;
    let hangmanWordsCompleted = 0;
    function setupHangman() { /* ... (code inchangé) ... */
        if (!hangmanWordDisplay) return;
        const feedbackContainer = document.getElementById('hangman-feedback');
        const existingNextWordButton = feedbackContainer?.querySelector('.next-word-button');
        if (existingNextWordButton) existingNextWordButton.remove();
        if (hangmanCurrentWordIndex >= hangmanData.length) {
             showFeedback('hangman-feedback', `Fin du pendu. Score Pendu: ${scores.hangman}/${MAX_SCORES.hangman}.`, 'info');
             const nextButton = document.querySelector('#hangman-evol .next-button');
             if (nextButton) nextButton.style.display = 'inline-block';
             return;
        }
        const wordData = hangmanData[hangmanCurrentWordIndex];
        hangmanCurrentWord = wordData.word.toUpperCase();
        hangmanGuessedLetters = [];
        hangmanAttemptsLeft = 5;
        hangmanWordDisplay.textContent = hangmanCurrentWord.split('').map(() => '_').join('');
        if (hangmanAttemptsDisplay) hangmanAttemptsDisplay.textContent = hangmanAttemptsLeft;
        if (hangmanHintText) { hangmanHintText.textContent = `Indice : ${wordData.hint}`; hangmanHintText.style.display = 'none'; }
        if (hangmanHintButton) { hangmanHintButton.style.display = 'inline-block'; hangmanHintButton.disabled = false; }
        showFeedback('hangman-feedback', '', 'info');
        const nextButton = document.querySelector('#hangman-evol .next-button');
        if (nextButton) nextButton.style.display = 'none';
        if (hangmanLettersContainer && hangmanLettersContainer.children.length === 0) {
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            alphabet.split('').forEach(letter => { /* ... */
                const button = document.createElement('button');
                button.textContent = letter;
                button.addEventListener('click', handleHangmanLetterClick);
                hangmanLettersContainer.appendChild(button);
            });
        } else if (hangmanLettersContainer) {
            hangmanLettersContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
        }
    }
    function handleHangmanLetterClick(event) { /* ... (code inchangé) ... */
        const button = event.target;
        const letter = button.textContent;
        button.disabled = true;
        if (hangmanCurrentWord.includes(letter)) {
            hangmanGuessedLetters.push(letter);
            updateHangmanWordDisplay();
            checkHangmanWin();
        } else {
            hangmanAttemptsLeft--;
            if (hangmanAttemptsDisplay) hangmanAttemptsDisplay.textContent = hangmanAttemptsLeft;
            checkHangmanLoss();
        }
    }
    function updateHangmanWordDisplay() { /* ... (code inchangé) ... */
        if (hangmanWordDisplay) { hangmanWordDisplay.textContent = hangmanCurrentWord.split('').map(letter => (hangmanGuessedLetters.includes(letter) ? letter : '_')).join(''); }
    }
    function checkHangmanWin() { /* ... (code inchangé) ... */
        if (hangmanWordDisplay && !hangmanWordDisplay.textContent.includes('_')) {
            scores.hangman++; updateScoreDisplay(); hangmanWordsCompleted++;
            showFeedback('hangman-feedback', `Bravo ! Mot "${hangmanCurrentWord}" trouvé ! +1 point.`, 'correct');
            disableHangmanLetters(); if (hangmanHintButton) hangmanHintButton.disabled = true;
            hangmanCurrentWordIndex++; addNextWordButtonOrShowNextExercise('hangman-evol');
        }
    }
    function checkHangmanLoss() { /* ... (code inchangé) ... */
        if (hangmanAttemptsLeft <= 0) {
            showFeedback('hangman-feedback', `Dommage ! Le mot était "${hangmanCurrentWord}".`, 'incorrect');
            disableHangmanLetters(); if (hangmanHintButton) hangmanHintButton.disabled = true;
            hangmanCurrentWordIndex++; addNextWordButtonOrShowNextExercise('hangman-evol');
        }
    }
    function disableHangmanLetters() { /* ... (code inchangé) ... */
        if (hangmanLettersContainer) { hangmanLettersContainer.querySelectorAll('button').forEach(btn => btn.disabled = true); }
    }
    function addNextWordButtonOrShowNextExercise(sectionId) { /* ... (code inchangé) ... */
         const feedbackContainer = document.getElementById(`${sectionId.split('-')[0]}-feedback`);
         const nextExerciseButton = document.querySelector(`#${sectionId} .next-button`);
         const existingNextWordButton = feedbackContainer?.querySelector('.next-word-button');
         if (existingNextWordButton) existingNextWordButton.remove();
        if (hangmanCurrentWordIndex < hangmanData.length) {
            const nextWordButton = document.createElement('button');
            nextWordButton.textContent = 'Mot Suivant';
            nextWordButton.classList.add('exercise-button', 'next-word-button');
            nextWordButton.style.marginLeft = '10px';
            nextWordButton.onclick = () => { setupHangman(); };
            if (feedbackContainer) feedbackContainer.appendChild(nextWordButton);
        } else {
            if (nextExerciseButton) nextExerciseButton.style.display = 'inline-block';
             if (feedbackContainer && !feedbackContainer.textContent.includes("Fin du pendu")) {
                 showFeedback(`${sectionId.split('-')[0]}-feedback`, `Fin du pendu. Score Pendu: ${scores.hangman}/${MAX_SCORES.hangman}.`, 'info');
             }
        }
    }
    if (hangmanHintButton) { /* ... (code inchangé) ... */
        hangmanHintButton.addEventListener('click', () => {
            if (hangmanHintText) hangmanHintText.style.display = 'block';
            hangmanHintButton.style.display = 'none';
        });
    }

    // --- Memory Game Logic ---
    let memoryTimers = {};
    let flippedCards = [];
    let lockBoard = false;
    let pairsFound = { memory: 0 };
    const memoryGameId = 'memory';
    function createMemoryCards(gameElementId, data) { /* ... (code inchangé) ... */
        const grid = document.getElementById(gameElementId);
        if (!grid) return;
        grid.innerHTML = '';
        pairsFound[memoryGameId] = 0;
        const infoContainer = grid.closest('.memory-game');
        if (infoContainer) {
            const pairsDisplay = infoContainer.querySelector('.pairs-found');
            const timerDisplay = infoContainer.querySelector('.timer');
            if (pairsDisplay) pairsDisplay.textContent = `0 / ${data.length}`;
            if (timerDisplay) timerDisplay.textContent = '0s';
        }
        showFeedback('memory-feedback', '', 'info');
        const nextButton = document.querySelector('#memory-evol .next-button');
        if (nextButton) nextButton.style.display = 'none';
        stopMemoryTimer(memoryGameId);
        memoryTimers[memoryGameId] = { intervalId: null, startTime: 0, elapsed: 0 };
        const cardsData = [];
        data.forEach(pair => { cardsData.push({ content: pair.term, pairId: pair.id }); cardsData.push({ content: pair.definition, pairId: pair.id }); });
        shuffleArray(cardsData);
        cardsData.forEach(cardData => { /* ... */
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.pairId = cardData.pairId;
            cardElement.dataset.gameId = memoryGameId;
            cardElement.innerHTML = `<div class="card-face card-front"><i class="fa-solid fa-question"></i></div><div class="card-face card-back">${cardData.content}</div>`;
            cardElement.addEventListener('click', handleMemoryCardClick);
            grid.appendChild(cardElement);
        });
    }
    function handleMemoryCardClick(event) { /* ... (code inchangé) ... */
        if (lockBoard) return;
        const clickedCard = event.currentTarget;
        const gameId = clickedCard.dataset.gameId;
        if (clickedCard === flippedCards[0] || clickedCard.classList.contains('is-flipped') || clickedCard.classList.contains('is-matched')) return;
        if (!memoryTimers[gameId] || memoryTimers[gameId].startTime === 0) startMemoryTimer(gameId);
        clickedCard.classList.add('is-flipped');
        flippedCards.push(clickedCard);
        if (flippedCards.length === 2) { lockBoard = true; checkForMemoryMatch(gameId); }
    }
    function checkForMemoryMatch(gameId) { /* ... (code inchangé) ... */
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.pairId === card2.dataset.pairId;
        if (isMatch) {
            disableCards(); pairsFound[gameId]++;
             const infoContainer = document.getElementById(`${gameId}-evol`);
             if (infoContainer) { const pairsDisplay = infoContainer.querySelector('.pairs-found'); if (pairsDisplay) pairsDisplay.textContent = `${pairsFound[gameId]} / ${memoryData.length}`; }
            if (pairsFound[gameId] === memoryData.length) {
                stopMemoryTimer(gameId); const timeTaken = memoryTimers[gameId].elapsed; let points = 1; let feedbackMsg = `Bravo ! Paires trouvées en ${timeTaken}s.`;
                if (timeTaken <= 45) { points = 3; feedbackMsg += ` Moins de 45s, excellent ! +3 points.`; }
                else if (timeTaken <= 75) { points = 2; feedbackMsg += ` Moins de 75s, bien joué ! +2 points.`; }
                else { feedbackMsg += ` +1 point.`; }
                scores[gameId] = points; updateScoreDisplay(); showFeedback('memory-feedback', feedbackMsg, 'correct');
                const nextButton = document.querySelector('#memory-evol .next-button'); if (nextButton) nextButton.style.display = 'inline-block';
            }
        } else { unflipCards(); }
    }
    function disableCards() { /* ... (code inchangé) ... */ flippedCards.forEach(card => card.classList.add('is-matched')); resetBoard(); }
    function unflipCards() { /* ... (code inchangé) ... */ setTimeout(() => { flippedCards.forEach(card => card.classList.remove('is-flipped')); resetBoard(); }, 1000); }
    function resetBoard() { /* ... (code inchangé) ... */ [flippedCards, lockBoard] = [[], false]; }
    function startMemoryTimer(gameId) { /* ... (code inchangé) ... */
        if (!memoryTimers[gameId] || memoryTimers[gameId].intervalId || memoryTimers[gameId].startTime !== 0) return;
        memoryTimers[gameId].startTime = Date.now();
        const infoContainer = document.getElementById(`${gameId}-evol`);
        const timerDisplay = infoContainer?.querySelector('.timer');
        memoryTimers[gameId].intervalId = setInterval(() => {
            if (!memoryTimers[gameId] || !memoryTimers[gameId].intervalId) { clearInterval(memoryTimers[gameId].intervalId); return; }
            const now = Date.now(); memoryTimers[gameId].elapsed = Math.floor((now - memoryTimers[gameId].startTime) / 1000);
            if (timerDisplay) timerDisplay.textContent = `${memoryTimers[gameId].elapsed}s`;
        }, 1000);
    }
    function stopMemoryTimer(gameId) { /* ... (code inchangé) ... */ if (memoryTimers[gameId] && memoryTimers[gameId].intervalId) { clearInterval(memoryTimers[gameId].intervalId); memoryTimers[gameId].intervalId = null; } }

    // --- Crossword Logic ---
    const crosswordGridContainer = document.getElementById('crossword-grid-container');
    const crosswordCluesList = document.getElementById('crossword-clues-list');
    const checkCrosswordButton = document.getElementById('check-crossword-button');
    let crosswordCells = {};
    function setupCrossword() { /* ... (code inchangé) ... */
        if (!crosswordGridContainer || !crosswordCluesList) return;
        crosswordGridContainer.innerHTML = '<p>Génération de la grille...</p>';
        crosswordCluesList.innerHTML = ''; crosswordCells = {}; showFeedback('crossword-feedback', '', 'info');
        if (checkCrosswordButton) { checkCrosswordButton.style.display = 'inline-block'; checkCrosswordButton.disabled = false; }
        const nextButton = document.querySelector('#crossword-evol .next-button'); if (nextButton) nextButton.style.display = 'none';
        const size = crosswordData.size; const gridTable = document.createElement('table'); gridTable.classList.add('crossword-grid'); const blackCells = new Set();
        for (let r = 0; r < size; r++) { const row = gridTable.insertRow(); for (let c = 0; c < size; c++) { const cell = row.insertCell(); cell.dataset.row = r; cell.dataset.col = c; blackCells.add(`${r}-${c}`); } }
        crosswordData.clues.forEach(clue => { /* ... */
            const clueLi = document.createElement('li'); clueLi.textContent = `${clue.number}. ${clue.direction === 'horizontal' ? 'Horiz.' : 'Vert.'} : ${clue.clue}`; crosswordCluesList.appendChild(clueLi);
            for (let i = 0; i < clue.answer.length; i++) { let r = clue.row; let c = clue.col; if (clue.direction === 'horizontal') c += i; else r += i; if (r < size && c < size) { const cellKey = `${r}-${c}`; const cell = gridTable.rows[r]?.cells[c]; if (!cell) continue; blackCells.delete(cellKey); if (!cell.querySelector('input')) { const input = document.createElement('input'); input.type = 'text'; input.maxLength = 1; input.dataset.row = r; input.dataset.col = c; input.dataset.correct = clue.answer[i]; input.addEventListener('input', handleCrosswordInput); input.addEventListener('keydown', handleCrosswordKeydown); cell.appendChild(input); crosswordCells[cellKey] = input; if (i === 0) { const clueNumSpan = document.createElement('span'); clueNumSpan.classList.add('clue-number'); clueNumSpan.textContent = clue.number; cell.appendChild(clueNumSpan); } } else { const existingInput = cell.querySelector('input'); if (!existingInput.dataset.correct.includes(clue.answer[i])) existingInput.dataset.correct += clue.answer[i]; } } }
        });
        blackCells.forEach(cellKey => { const [r, c] = cellKey.split('-').map(Number); if (r < size && c < size && gridTable.rows[r]?.cells[c]) gridTable.rows[r].cells[c].classList.add('black'); });
        crosswordGridContainer.innerHTML = ''; crosswordGridContainer.appendChild(gridTable);
    }
    function handleCrosswordInput(event) { /* ... (code inchangé) ... */
        const input = event.target; input.value = input.value.toUpperCase();
        if (input.value.length === 1 && input.maxLength === 1) { const r = parseInt(input.dataset.row); const c = parseInt(input.dataset.col); let nextInput = crosswordCells[`${r}-${c + 1}`] || crosswordCells[`${r + 1}-${0}`]; if (nextInput) nextInput.focus(); }
    }
    function handleCrosswordKeydown(event) { /* ... (code inchangé) ... */
        const input = event.target; const r = parseInt(input.dataset.row); const c = parseInt(input.dataset.col); let targetInput = null;
        switch (event.key) { case 'Backspace': if (input.value.length === 0) targetInput = crosswordCells[`${r}-${c - 1}`]; break; case 'ArrowLeft': targetInput = crosswordCells[`${r}-${c - 1}`]; break; case 'ArrowRight': targetInput = crosswordCells[`${r}-${c + 1}`]; break; case 'ArrowUp': targetInput = crosswordCells[`${r - 1}-${c}`]; break; case 'ArrowDown': targetInput = crosswordCells[`${r + 1}-${c}`]; break; default: return; }
        if (targetInput) { event.preventDefault(); targetInput.focus(); } else if (event.key === 'Backspace' && input.value.length === 0) { event.preventDefault(); }
    }
    function checkCrossword() { /* ... (code inchangé) ... */
        let allCorrect = true; let filledCount = 0; let correctCount = 0; const totalCells = Object.keys(crosswordCells).length;
        Object.values(crosswordCells).forEach(input => { const correctLetters = input.dataset.correct; const enteredValue = input.value.toUpperCase(); input.classList.remove('correct', 'incorrect'); if (enteredValue) { filledCount++; if (correctLetters.includes(enteredValue)) { input.classList.add('correct'); correctCount++; } else { input.classList.add('incorrect'); allCorrect = false; } } else { allCorrect = false; } input.disabled = true; });
        if (allCorrect && filledCount === totalCells) { scores.crossword = MAX_SCORES.crossword; showFeedback('crossword-feedback', `Félicitations ! Grille parfaite ! +${MAX_SCORES.crossword} points.`, 'correct'); }
        else { scores.crossword = 0; showFeedback('crossword-feedback', `Grille vérifiée. ${correctCount} lettres correctes sur ${totalCells}. Score: 0/${MAX_SCORES.crossword}.`, 'incorrect'); }
        updateScoreDisplay(); if (checkCrosswordButton) checkCrosswordButton.disabled = true; const nextButton = document.querySelector('#crossword-evol .next-button'); if (nextButton) nextButton.style.display = 'inline-block';
    }
    if (checkCrosswordButton) checkCrosswordButton.addEventListener('click', checkCrossword);

    // --- Summary Logic ---
    function showSummary() { /* ... (code inchangé) ... */
        updateScoreDisplay();
        const summaryTotalSpan = document.getElementById('summary-total');
        if (summaryTotalSpan) { const parentP = summaryTotalSpan.closest('p'); if (parentP) parentP.innerHTML = `<strong>Score Total : <span id="summary-total">${totalScore}</span> / ${TOTAL_MAX_SCORE} points</strong>`; }
        let finalMessage = "";
        if (totalScore >= TOTAL_MAX_SCORE * 0.8) finalMessage = "Excellent travail ! Tu connais bien l'évolution des objets ! 🚀";
        else if (totalScore >= TOTAL_MAX_SCORE * 0.5) finalMessage = "Bon score ! Tu as bien compris l'essentiel. 👍";
        else finalMessage = "Pas mal, mais revoir le cours pourrait aider. 😉";
        showFeedback('summary-feedback', finalMessage, 'info');
    }

    // --- Restart Logic ---
    function restartAllExercises() { /* ... (code inchangé) ... */
        scores = { quiz: 0, association: 0, hangman: 0, memory: 0, crossword: 0 }; totalScore = 0; updateScoreDisplay();
        hangmanCurrentWordIndex = 0; hangmanWordsCompleted = 0;
        stopMemoryTimer(memoryGameId); memoryTimers[memoryGameId] = { intervalId: null, startTime: 0, elapsed: 0 }; flippedCards = []; lockBoard = false; pairsFound = { memory: 0 };
        document.querySelectorAll('.feedback').forEach(fb => { fb.textContent = ''; fb.style.display = 'none'; fb.className = 'feedback'; });
        setupQuiz(); setupAssociation(); setupHangman(); createMemoryCards('memory-grid-evol', memoryData); setupCrossword();
        document.querySelectorAll('.next-button').forEach(btn => btn.style.display = 'none');
        const associationNextButton = document.querySelector('#association-evol .next-button'); if (associationNextButton) associationNextButton.style.display = 'inline-block';
        if (checkQuizButton) { checkQuizButton.style.display = 'inline-block'; checkQuizButton.disabled = false; }
        if (checkCrosswordButton) { checkCrosswordButton.style.display = 'inline-block'; checkCrosswordButton.disabled = false; }
        showExerciseSection('accueil-exercices');
    }
    if (restartButton) restartButton.addEventListener('click', restartAllExercises);

    // --- Dark Mode & Dyslexia Mode Logic ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const dyslexiaModeToggle = document.getElementById('dyslexiaModeToggle');
    function applyTheme(theme) { /* ... (code inchangé) ... */
        body.dataset.theme = theme; localStorage.setItem('theme', theme);
        if (darkModeToggle) darkModeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i> Mode Clair' : '<i class="fas fa-moon"></i> Mode Sombre';
    }
    function applyDyslexiaMode(isDyslexia) { /* ... (code inchangé) ... */
        const mode = isDyslexia ? 'true' : 'false'; body.dataset.dyslexia = mode; localStorage.setItem('dyslexiaMode', mode);
        if (dyslexiaModeToggle) dyslexiaModeToggle.innerHTML = isDyslexia ? '<i class="fas fa-eye"></i> Mode Normal' : '<i class="fas fa-low-vision"></i> Mode Dys';
    }
    if (darkModeToggle) darkModeToggle.addEventListener('click', () => { const currentTheme = body.dataset.theme === 'dark' ? 'light' : 'dark'; applyTheme(currentTheme); });
    if (dyslexiaModeToggle) dyslexiaModeToggle.addEventListener('click', () => { const isDyslexia = body.dataset.dyslexia !== 'true'; applyDyslexiaMode(isDyslexia); });
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedDyslexia = localStorage.getItem('dyslexiaMode') === 'true';
    applyTheme(savedTheme); applyDyslexiaMode(savedDyslexia);

    // --- Initial Setup ---
    setupQuiz(); setupAssociation(); setupHangman(); createMemoryCards('memory-grid-evol', memoryData); setupCrossword(); updateScoreDisplay();
    showExerciseSection('accueil-exercices');
    sections.forEach(section => { if (section.id !== 'accueil-exercices') { section.style.display = 'none'; section.classList.remove('active-section', 'section-fade-in'); section.style.opacity = '0'; } else { section.style.display = 'flex'; section.classList.add('active-section'); section.style.opacity = '1'; } });

}); // End DOMContentLoaded
