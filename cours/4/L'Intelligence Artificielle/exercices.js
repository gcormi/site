document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // --- Global State ---
    let currentSectionId = 'accueil-exercices';
    let scores = {
        quiz: 0,
        association: 0,
        hangman: 0,
        memory1: 0,
        memory2: 0,
        crossword: 0,
    };
    let totalScore = 0;
    const MAX_SCORES = {
        quiz: 10,
        association: 10,
        hangman: 4, // 1 point per word
        memory1: 3,
        memory2: 3,
        crossword: 4,
    };
    const TOTAL_MAX_SCORE = Object.values(MAX_SCORES).reduce((sum, val) => sum + val, 0);

    // --- DOM Elements ---
    const sections = document.querySelectorAll('.exercise-section');
    const scoreDisplay = document.getElementById('score-display');
    const navButtons = document.querySelectorAll('.nav-button');
    const checkButtons = document.querySelectorAll('.check-button');
    const restartButton = document.getElementById('restart-all-button');

    // --- Exercise Data ---
    const quizData = [
        { question: "Dans la chaîne d'information d'un système technique, quel est le rôle principal de l'Intelligence Artificielle (IA) ?", options: ["Acquérir l'information", "Traiter l'information", "Communiquer l'information", "Transformer l'énergie"], answer: "Traiter l'information" },
        { question: "Quelle étape de la chaîne d'information utilise des composants comme les caméras ou les microphones ?", options: ["Traitement", "Communication", "Acquisition", "Action"], answer: "Acquisition" },
        { question: "Comment une IA moderne \"apprend\"-elle souvent à réaliser une tâche (comme reconnaître un chat sur une photo) ?", options: ["En recevant une liste exacte d'instructions pour chaque cas possible.", "En analysant de nombreux exemples (données) pour trouver des modèles.", "En posant des questions à un humain.", "En utilisant uniquement de l'énergie solaire."], answer: "En analysant de nombreux exemples (données) pour trouver des modèles." },
        { question: "Qu'est-ce qu'un algorithme pour une IA ?", options: ["Un type de capteur.", "Une sorte de robot.", "La batterie qui l'alimente.", "Une suite d'instructions ou une \"recette\" pour qu'elle fonctionne ou apprenne."], answer: "Une suite d'instructions ou une \"recette\" pour qu'elle fonctionne ou apprenne." },
        { question: "Dans quel domaine l'IA aide-t-elle les voitures en leur permettant de \"voir\" et réagir à leur environnement ?", options: ["Industrie", "Agriculture", "Santé", "Transports"], answer: "Transports" },
        { question: "Quel terme désigne un programme basé sur l'IA capable de comprendre des questions en langage naturel et de dialoguer ?", options: ["Un actionneur", "Un capteur", "Un algorithme", "Un chatbot / Assistant vocal"], answer: "Un chatbot / Assistant vocal" },
        { question: "Quel est un danger potentiel lié à l'utilisation massive de données pour entraîner des IA ?", options: ["Les IA deviennent trop lentes.", "Le risque pour la vie privée des utilisateurs.", "Elles consomment moins d'énergie.", "Elles deviennent moins intelligentes."], answer: "Le risque pour la vie privée des utilisateurs." },
        { question: "Comment appelle-t-on un faux contenu numérique (vidéo, audio, image) très réaliste créé par Intelligence Artificielle ?", options: ["Un algorithme", "Un capteur", "Un deepfake", "Un chatbot"], answer: "Un deepfake" },
        { question: "Quel concept lié à l'utilisation du numérique (y compris l'IA) vise à réduire son impact négatif sur l'environnement ?", options: ["La puissance de calcul.", "Le Machine Learning.", "La sobriété numérique.", "La Modélisation 3D."], answer: "La sobriété numérique." },
        { question: "Parmi ces compétences, laquelle est considérée comme difficile à remplacer par l'IA et reste essentielle pour l'humain ?", options: ["Le calcul rapide", "L'analyse de grandes quantités de données", "La créativité", "La reconnaissance de formes"], answer: "La créativité" }
    ];

    const associationData = [
        { term: "Capteur", definition: "Acquiert des informations de l'environnement", id: 1 },
        { term: "Actionneur", definition: "Réalise une action physique (mouvement, lumière, son...)", id: 2 },
        { term: "Traitement", definition: "Analyse l'information et prend des décisions (rôle de l'IA)", id: 3 },
        { term: "Apprentissage Automatique", definition: "Méthode où l'IA apprend par l'exemple à partir de données", id: 4 },
        { term: "Sobriété Numérique", definition: "Utilisation raisonnée du numérique pour réduire l'impact environnemental", id: 5 },
        { term: "Deepfake", definition: "Faux contenu réaliste généré par IA (vidéo, audio...)", id: 6 },
        { term: "Data Center", definition: "Bâtiment regroupant les serveurs qui consomment beaucoup d'énergie", id: 7 },
        { term: "Cybersécurité", definition: "Protection contre les attaques informatiques", id: 8 },
        { term: "Modélisation", definition: "Créer une représentation simplifiée d'un système pour l'étudier", id: 9 },
        { term: "Puissance de calcul", definition: "Capacité très rapide des ordinateurs, essentielle pour l'IA", id: 10 }
    ];

    const hangmanData = [
        { word: "ALGORITHME", hint: "C'est la \"recette\" de calcul que l'IA suit." },
        { word: "CAPTEUR", hint: "Permet à une machine de \"sentir\" son environnement (lumière, son, présence...)." },
        { word: "BIAIS", hint: "Peut rendre une IA injuste si ses données d'apprentissage sont déséquilibrées." },
        { word: "DONNEES", hint: "Le \"carburant\" principal utilisé par l'IA pour apprendre." }
    ];

    const memoryData1 = [
        { term: "IA", definition: "Abréviation ou nom court pour Intelligence Artificielle", id: 1 },
        { term: "Traitement", definition: "Étape de la chaîne d'information où l'IA agit et décide", id: 2 },
        { term: "Acquisition", definition: "Étape de la chaîne d'information qui utilise les capteurs", id: 3 },
        { term: "Actionneur", definition: "Composant qui réalise une action physique (moteur, lumière...)", id: 4 },
        { term: "Sobriété Numérique", definition: "Utiliser le numérique de manière responsable pour l'écologie", id: 5 },
        { term: "Deep Learning", definition: "Technique avancée pour l'IA basée sur des \"réseaux de neurones\"", id: 6 },
        { term: "Vie Privée", definition: "Ce qui est menacé par la collecte massive de données pour l'IA", id: 7 },
        { term: "Véhicule Autonome", definition: "Voiture qui se conduit toute seule grâce à l'IA", id: 8 }
    ];
    const memoryData2 = [
        { term: "Robotique", definition: "Domaine combinant mécanique, électronique et informatique", id: 9 },
        { term: "Cybersécurité", definition: "Protection des systèmes informatiques et des données", id: 10 },
        { term: "Modélisation", definition: "Créer une représentation simplifiée d'un système", id: 11 },
        { term: "Simulation", definition: "Tester virtuellement le comportement d'un système", id: 12 },
        { term: "Puissance de calcul", definition: "Capacité rapide des ordinateurs pour les calculs complexes", id: 13 },
        { term: "Data Center", definition: "Grand bâtiment regroupant de nombreux serveurs", id: 14 },
        { term: "IA Générative", definition: "IA capable de créer de nouveaux contenus (texte, images...)", id: 15 },
        { term: "Esprit Critique", definition: "Analyser l'info et ne pas accepter sans réfléchir", id: 16 }
    ];

    const crosswordData = {
        // Simple representation: rows, cols, and word placements
        // A more robust generator would be needed for complex layouts
        // This is a placeholder structure - actual grid generation is complex
        clues: [
            { number: 1, direction: "horizontal", clue: "Ce qu'une IA utilise pour apprendre ou fonctionner.", answer: "DONNEES", row: 1, col: 1 },
            { number: 2, direction: "horizontal", clue: "Suite d'instructions pour résoudre un problème ou qu'une IA exécute.", answer: "ALGORITHME", row: 3, col: 0 },
            { number: 3, direction: "vertical", clue: "Composant qui permet à un système de \"sentir\" son environnement.", answer: "CAPTEUR", row: 0, col: 6 },
            { number: 4, direction: "horizontal", clue: "Partie de la chaîne d'info où l'IA analyse et décide.", answer: "TRAITEMENT", row: 5, col: 2 },
            { number: 5, direction: "vertical", clue: "Technique d'IA où la machine apprend par l'exemple.", answer: "APPRENTISSAGE", row: 0, col: 0 },
            { number: 6, direction: "vertical", clue: "Domaine technique créant des machines automatisées.", answer: "ROBOTIQUE", row: 1, col: 9 },
            { number: 7, direction: "horizontal", clue: "Un risque lié aux données d'apprentissage déséquilibrées.", answer: "BIAIS", row: 7, col: 5 },
            { number: 8, direction: "vertical", clue: "Faux contenu (vidéo, audio) créé par IA très réaliste.", answer: "DEEPFAKE", row: 2, col: 4 },
            { number: 9, direction: "horizontal", clue: "Action de contrôler son utilisation du numérique pour l'environnement.", answer: "SOBRIETE", row: 9, col: 1 },
            { number: 10, direction: "vertical", clue: "Système technique capable de se déplacer sans conducteur.", answer: "VEHICULE", row: 4, col: 7 }
        ],
        // Grid size and black squares would be determined by placement
        // For simplicity, we'll focus on checking inputs against answers later
        size: 11 // Example size (adjust based on actual layout)
    };


    // --- Utility Functions ---
    const updateScoreDisplay = () => {
        totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
        scoreDisplay.textContent = `Score: ${totalScore}`;
    };

    const showFeedback = (elementId, message, type = 'info') => {
        const feedbackEl = document.getElementById(elementId);
        if (feedbackEl) {
            feedbackEl.textContent = message;
            feedbackEl.className = `feedback ${type}`; // Reset classes and add type
            feedbackEl.style.display = 'block';
        }
    };

    // Fisher-Yates Shuffle Algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }


    // --- SPA Navigation ---
    const animationDuration = 400; // Shorter duration for exercises

    const showExerciseSection = (targetId) => {
        const currentSection = document.getElementById(currentSectionId);
        const targetSection = document.getElementById(targetId);

        if (!targetSection || targetSection === currentSection) return;

        if (currentSection) {
            currentSection.style.animation = `sectionFadeOut ${animationDuration / 1000}s ease-out forwards`;
            setTimeout(() => {
                currentSection.classList.remove('active-section');
                currentSection.style.animation = '';
                currentSection.style.display = 'none'; // Ensure it's hidden
            }, animationDuration);
        }

        targetSection.style.display = 'block'; // Set display before animation
        targetSection.style.opacity = '0';
        targetSection.style.animation = '';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                targetSection.style.opacity = '1';
                targetSection.style.animation = `sectionFadeIn ${animationDuration / 1000}s ease-out forwards`;
                targetSection.classList.add('active-section');
            });
        });

        currentSectionId = targetId;
        window.scrollTo(0, 0);

        // Initialize exercise if needed (e.g., start timer for memory)
        if (targetId.startsWith('memory')) {
            // Reset timer display visually when showing section
            const timerDisplay = document.querySelector(`#${targetId} .timer`);
            if (timerDisplay) timerDisplay.textContent = '0s';
            // Stop previous timer if any, before starting new one potentially
            stopMemoryTimer(targetId);
            // Timer will start on first card click via handleMemoryCardClick
        }
        if (targetId === 'hangman') {
             // Reset or start hangman game if needed
             if (!document.getElementById('hangman-word-display').textContent.includes('_')) {
                 setupHangman(); // Only setup if not already started or finished
             }
        }
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            if (targetId) {
                // Special handling for summary target to ensure calculation happens
                if (targetId === 'summary') {
                    showSummary(); // Calculate and display summary first
                }
                showExerciseSection(targetId); // Then navigate
            }
        });
    });

    // --- Quiz Logic ---
    const quizContainer = document.getElementById('quiz-container');
    const checkQuizButton = document.getElementById('check-quiz-button');
    const quizFeedback = document.getElementById('quiz-feedback');
    let quizChecked = false;

    function setupQuiz() {
        quizContainer.innerHTML = ''; // Clear previous
        quizChecked = false;
        quizData.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('quiz-question');
            questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

            const optionsList = document.createElement('ul');
            optionsList.classList.add('quiz-options');
            optionsList.dataset.questionIndex = index;

            // Shuffle options for variety (optional)
            const shuffledOptions = shuffleArray([...q.options]);

            shuffledOptions.forEach(option => {
                const li = document.createElement('li');
                const optionId = `q${index}_${option.replace(/\s+/g, '-')}`;
                li.innerHTML = `
                    <label for="${optionId}">
                        <input type="radio" name="question${index}" id="${optionId}" value="${option}">
                        <span>${option}</span>
                    </label>
                `;
                optionsList.appendChild(li);
            });
            questionDiv.appendChild(optionsList);
            quizContainer.appendChild(questionDiv);
        });
        checkQuizButton.style.display = 'inline-block';
        checkQuizButton.disabled = false; // Ensure enabled on setup
        quizContainer.closest('.exercise-section').querySelector('.next-button').style.display = 'none';
        showFeedback('quiz-feedback', '', 'info'); // Clear feedback
    }

    function checkQuizAnswers() {
        if (quizChecked) return;
        quizChecked = true;
        let correctAnswers = 0;
        const questionContainers = quizContainer.querySelectorAll('.quiz-options');

        questionContainers.forEach((optionsList) => {
            const questionIndex = parseInt(optionsList.dataset.questionIndex);
            const correctAnswer = quizData[questionIndex].answer;
            const selectedInput = optionsList.querySelector('input[type="radio"]:checked');
            const listItems = optionsList.querySelectorAll('li');

            listItems.forEach(li => {
                const input = li.querySelector('input[type="radio"]');
                const label = li.querySelector('label');
                input.disabled = true; // Disable all options
                label.classList.add('disabled');

                if (input.value === correctAnswer) {
                    li.classList.add('correct-answer'); // Highlight correct answer
                }
                if (selectedInput && input === selectedInput && input.value !== correctAnswer) {
                    li.classList.add('incorrect-selection'); // Highlight incorrect selection
                }
            });

            if (selectedInput && selectedInput.value === correctAnswer) {
                correctAnswers++;
            }
        });

        scores.quiz = correctAnswers;
        updateScoreDisplay();
        showFeedback('quiz-feedback', `Tu as obtenu ${correctAnswers} / ${MAX_SCORES.quiz} points.`, correctAnswers > 5 ? 'correct' : 'incorrect');
        checkQuizButton.style.display = 'none';
        quizContainer.closest('.exercise-section').querySelector('.next-button').style.display = 'inline-block';
    }

    checkQuizButton.addEventListener('click', checkQuizAnswers);

    // --- Association Logic ---
    const termsContainer = document.getElementById('association-terms');
    const definitionsContainer = document.getElementById('association-definitions');
    let selectedTerm = null;
    let matchedPairs = 0;
    let associationAttempts = 0; // Track attempts for feedback

    function setupAssociation() {
        termsContainer.innerHTML = '';
        definitionsContainer.innerHTML = '';
        selectedTerm = null;
        matchedPairs = 0;
        associationAttempts = 0;
        showFeedback('association-feedback', '', 'info'); // Clear feedback

        // Make the 'Next' button visible immediately for the association section
        definitionsContainer.closest('.exercise-section').querySelector('.next-button').style.display = 'inline-block';

        const terms = shuffleArray([...associationData]);
        const definitions = shuffleArray([...associationData]);

        terms.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('association-item', 'term');
            div.textContent = item.term;
            div.dataset.matchId = item.id;
            div.addEventListener('click', handleAssociationClick);
            termsContainer.appendChild(div);
        });

        definitions.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('association-item', 'definition');
            div.textContent = item.definition;
            div.dataset.matchId = item.id;
            div.addEventListener('click', handleAssociationClick);
            definitionsContainer.appendChild(div);
        });
    }

    function handleAssociationClick(event) {
        const clickedItem = event.target;
        // Ensure click is on an item, not the container itself
        if (!clickedItem.classList.contains('association-item')) return;
        if (clickedItem.classList.contains('matched')) return; // Ignore already matched items

        if (clickedItem.classList.contains('term')) {
            // If selecting a term
            if (selectedTerm) {
                selectedTerm.classList.remove('selected'); // Deselect previous term
            }
            selectedTerm = clickedItem;
            selectedTerm.classList.add('selected');
        } else if (clickedItem.classList.contains('definition') && selectedTerm) {
            // If selecting a definition AND a term is already selected
            associationAttempts++;
            const termId = selectedTerm.dataset.matchId;
            const definitionId = clickedItem.dataset.matchId;

            // Remove potential incorrect animation classes
            selectedTerm.classList.remove('incorrect-match');
            clickedItem.classList.remove('incorrect-match');

            if (termId === definitionId) {
                // Correct Match
                selectedTerm.classList.add('matched');
                clickedItem.classList.add('matched');
                selectedTerm.classList.remove('selected');
                matchedPairs++;
                selectedTerm = null; // Reset selection

                if (matchedPairs === associationData.length) {
                    // Only assign score if all pairs are matched
                    scores.association = MAX_SCORES.association;
                    updateScoreDisplay();
                    showFeedback('association-feedback', `Bravo ! Tu as associé toutes les paires ! +${MAX_SCORES.association} points.`, 'correct');
                    // Button is already visible, no need to show it again
                }
            } else {
                // Incorrect Match - Add shake animation
                selectedTerm.classList.add('incorrect-match');
                clickedItem.classList.add('incorrect-match');
                // Remove selection and animation class after a short delay
                const currentSelectedTerm = selectedTerm; // Capture current term
                setTimeout(() => {
                    // Check if the term still exists and has the class before removing
                    if (currentSelectedTerm && currentSelectedTerm.classList.contains('incorrect-match')) {
                        currentSelectedTerm.classList.remove('selected', 'incorrect-match');
                    }
                    if (clickedItem && clickedItem.classList.contains('incorrect-match')) {
                       clickedItem.classList.remove('incorrect-match');
                    }
                }, 500); // Duration of the shake animation
                selectedTerm = null; // Reset selection
            }
        }
    }


    // --- Hangman Logic ---
    const hangmanWordDisplay = document.getElementById('hangman-word-display');
    const hangmanAttemptsDisplay = document.getElementById('hangman-attempts');
    const hangmanLettersContainer = document.getElementById('hangman-letters');
    const hangmanHintButton = document.getElementById('hangman-hint-button');
    const hangmanHintText = document.getElementById('hangman-hint-text');
    const hangmanFeedback = document.getElementById('hangman-feedback');
    let hangmanCurrentWordIndex = 0;
    let hangmanCurrentWord = '';
    let hangmanGuessedLetters = [];
    let hangmanAttemptsLeft = 5;
    let hangmanWordsCompleted = 0;

    function setupHangman() {
        // Clear any previous "Next Word" button
        const existingNextWordButton = hangmanFeedback.querySelector('.nav-button');
        if (existingNextWordButton && existingNextWordButton.textContent === 'Mot Suivant') {
            existingNextWordButton.remove();
        }

        if (hangmanCurrentWordIndex >= hangmanData.length) {
             showFeedback('hangman-feedback', `Fin du pendu. Score Pendu: ${scores.hangman}/${MAX_SCORES.hangman}.`, 'info');
             hangmanLettersContainer.closest('.exercise-section').querySelector('.next-button').style.display = 'inline-block';
             return; // All words done
        }


        const wordData = hangmanData[hangmanCurrentWordIndex];
        hangmanCurrentWord = wordData.word.toUpperCase();
        hangmanGuessedLetters = [];
        hangmanAttemptsLeft = 5;

        hangmanWordDisplay.textContent = hangmanCurrentWord.split('').map(() => '_').join('');
        hangmanAttemptsDisplay.textContent = hangmanAttemptsLeft;
        hangmanHintText.textContent = `Indice : ${wordData.hint}`;
        hangmanHintText.style.display = 'none';
        hangmanHintButton.style.display = 'inline-block';
        hangmanHintButton.disabled = false;
        showFeedback('hangman-feedback', '', 'info'); // Clear feedback
        hangmanLettersContainer.closest('.exercise-section').querySelector('.next-button').style.display = 'none';


        // Generate letter buttons if not already present
        if (hangmanLettersContainer.children.length === 0) {
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            alphabet.split('').forEach(letter => {
                const button = document.createElement('button');
                button.textContent = letter;
                button.addEventListener('click', handleHangmanLetterClick);
                hangmanLettersContainer.appendChild(button);
            });
        } else {
            // Reset existing buttons
            hangmanLettersContainer.querySelectorAll('button').forEach(btn => {
                btn.disabled = false;
            });
        }
    }

    function handleHangmanLetterClick(event) {
        const button = event.target;
        const letter = button.textContent;
        button.disabled = true; // Disable clicked button

        if (hangmanCurrentWord.includes(letter)) {
            hangmanGuessedLetters.push(letter);
            updateHangmanWordDisplay();
            checkHangmanWin();
        } else {
            hangmanAttemptsLeft--;
            hangmanAttemptsDisplay.textContent = hangmanAttemptsLeft;
            checkHangmanLoss();
        }
    }

    function updateHangmanWordDisplay() {
        hangmanWordDisplay.textContent = hangmanCurrentWord
            .split('')
            .map(letter => (hangmanGuessedLetters.includes(letter) ? letter : '_'))
            .join('');
    }

    function checkHangmanWin() {
        if (!hangmanWordDisplay.textContent.includes('_')) {
            scores.hangman++; // Add 1 point per word guessed
            updateScoreDisplay();
            hangmanWordsCompleted++;
            showFeedback('hangman-feedback', `Bravo ! Tu as trouvé le mot "${hangmanCurrentWord}". +1 point.`, 'correct');
            disableHangmanLetters();
            hangmanHintButton.disabled = true;
            hangmanCurrentWordIndex++;
            if (hangmanCurrentWordIndex < hangmanData.length) {
                // Add a button to go to the next word
                const nextWordButton = document.createElement('button');
                nextWordButton.textContent = 'Mot Suivant';
                nextWordButton.classList.add('nav-button');
                nextWordButton.style.marginLeft = '10px';
                nextWordButton.onclick = () => {
                    setupHangman(); // This will remove the button in its setup
                };
                hangmanFeedback.appendChild(nextWordButton);
            } else {
                // All words completed
                 showFeedback('hangman-feedback', `Bravo ! Tu as trouvé tous les mots ! Score Pendu: ${scores.hangman}/${MAX_SCORES.hangman}.`, 'correct');
                hangmanLettersContainer.closest('.exercise-section').querySelector('.next-button').style.display = 'inline-block';
            }
        }
    }

    function checkHangmanLoss() {
        if (hangmanAttemptsLeft <= 0) {
            showFeedback('hangman-feedback', `Dommage ! Le mot était "${hangmanCurrentWord}".`, 'incorrect');
            disableHangmanLetters();
            hangmanHintButton.disabled = true;
            hangmanCurrentWordIndex++;
             if (hangmanCurrentWordIndex < hangmanData.length) {
                // Add a button to go to the next word
                const nextWordButton = document.createElement('button');
                nextWordButton.textContent = 'Mot Suivant';
                nextWordButton.classList.add('nav-button');
                 nextWordButton.style.marginLeft = '10px';
                nextWordButton.onclick = () => {
                    setupHangman(); // This will remove the button in its setup
                };
                hangmanFeedback.appendChild(nextWordButton);
            } else {
                 showFeedback('hangman-feedback', `Fin du pendu. Score Pendu: ${scores.hangman}/${MAX_SCORES.hangman}.`, 'info');
                hangmanLettersContainer.closest('.exercise-section').querySelector('.next-button').style.display = 'inline-block';
            }
        }
    }

    function disableHangmanLetters() {
        hangmanLettersContainer.querySelectorAll('button').forEach(btn => {
            btn.disabled = true;
        });
    }

    hangmanHintButton.addEventListener('click', () => {
        hangmanHintText.style.display = 'block';
        hangmanHintButton.style.display = 'none'; // Hide after use
    });


    // --- Memory Game Logic ---
    let memoryTimers = {}; // { memory1: { intervalId: null, startTime: 0, elapsed: 0 }, memory2: ... }
    let flippedCards = [];
    let lockBoard = false; // Prevent clicking more than 2 cards
    let pairsFound = { memory1: 0, memory2: 0 };

    function createMemoryCards(gameId, data) {
        const grid = document.getElementById(`memory-grid-${gameId === 'memory1' ? '1' : '2'}`);
        grid.innerHTML = ''; // Clear previous cards
        pairsFound[gameId] = 0; // Reset pairs found for this game
        document.querySelector(`#${gameId} .pairs-found`).textContent = `0 / ${data.length}`;
        document.querySelector(`#${gameId} .timer`).textContent = '0s';
        showFeedback(`${gameId}-feedback`, '', 'info'); // Clear feedback
        grid.closest('.exercise-section').querySelector('.next-button').style.display = 'none';
        // Reset timer state for the game
        stopMemoryTimer(gameId);
        memoryTimers[gameId] = { intervalId: null, startTime: 0, elapsed: 0 };


        const cardsData = [];
        data.forEach(pair => {
            cardsData.push({ content: pair.term, pairId: pair.id });
            cardsData.push({ content: pair.definition, pairId: pair.id });
        });

        shuffleArray(cardsData);

        cardsData.forEach(cardData => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.pairId = cardData.pairId;
            cardElement.dataset.gameId = gameId; // Store game ID

            cardElement.innerHTML = `
                <div class="card-face card-front">
                    <i class="fa-solid fa-question"></i>
                </div>
                <div class="card-face card-back">
                    ${cardData.content}
                </div>
            `;
            cardElement.addEventListener('click', handleMemoryCardClick);
            grid.appendChild(cardElement);
        });
    }

    function handleMemoryCardClick(event) {
        if (lockBoard) return;
        const clickedCard = event.currentTarget;
        const gameId = clickedCard.dataset.gameId;

        if (clickedCard === flippedCards[0] || clickedCard.classList.contains('is-flipped') || clickedCard.classList.contains('is-matched')) return;

        // Start timer on first click of the game IF NOT ALREADY STARTED
        if (!memoryTimers[gameId] || memoryTimers[gameId].startTime === 0) {
            startMemoryTimer(gameId);
        }

        clickedCard.classList.add('is-flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            lockBoard = true; // Lock board while checking
            checkForMemoryMatch(gameId);
        }
    }

    function checkForMemoryMatch(gameId) {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.pairId === card2.dataset.pairId;

        if (isMatch) {
            disableCards();
            pairsFound[gameId]++;
            document.querySelector(`#${gameId} .pairs-found`).textContent = `${pairsFound[gameId]} / ${gameId === 'memory1' ? memoryData1.length : memoryData2.length}`;
            if (pairsFound[gameId] === (gameId === 'memory1' ? memoryData1.length : memoryData2.length)) {
                // Game finished
                stopMemoryTimer(gameId);
                const timeTaken = memoryTimers[gameId].elapsed;
                let points = 1; // Point par défaut
                let feedbackMsg = `Bravo ! Tu as trouvé toutes les paires en ${timeTaken} secondes.`;

                // --- MODIFICATION START ---
                if (timeTaken <= 90) { // Nouveau seuil pour 3 points
                    points = 3;
                    feedbackMsg += ` Moins de 90s, super ! +3 points.`;
                } else if (timeTaken <= 120) { // Nouveau seuil pour 2 points
                    points = 2;
                    feedbackMsg += ` Moins de 120s, bien joué ! +2 points.`;
                } else {
                    // 1 point est déjà la valeur par défaut
                    feedbackMsg += ` +1 point.`;
                }
                // --- MODIFICATION END ---

                scores[gameId] = points;
                updateScoreDisplay();
                showFeedback(`${gameId}-feedback`, feedbackMsg, 'correct');
                document.querySelector(`#${gameId} .next-button`).style.display = 'inline-block';
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        flippedCards.forEach(card => {
            card.classList.add('is-matched');
            // card.removeEventListener('click', handleMemoryCardClick); // Keep listener but check for matched class
        });
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('is-flipped'));
            resetBoard();
        }, 1000); // Wait 1 second before flipping back
    }

    function resetBoard() {
        [flippedCards, lockBoard] = [[], false];
    }

    function startMemoryTimer(gameId) {
        // Ensure timer doesn't restart if already running or game finished
        if (!memoryTimers[gameId] || memoryTimers[gameId].intervalId || memoryTimers[gameId].startTime !== 0) return;

        memoryTimers[gameId].startTime = Date.now(); // Set start time
        const timerDisplay = document.querySelector(`#${gameId} .timer`);

        memoryTimers[gameId].intervalId = setInterval(() => {
            // Check if timer should still be running
            if (!memoryTimers[gameId] || !memoryTimers[gameId].intervalId) {
                clearInterval(memoryTimers[gameId].intervalId); // Defensive clear
                return;
            }
            const now = Date.now();
            memoryTimers[gameId].elapsed = Math.floor((now - memoryTimers[gameId].startTime) / 1000);
            if (timerDisplay) { // Check if display exists
                 timerDisplay.textContent = `${memoryTimers[gameId].elapsed}s`;
            }
        }, 1000);
    }

    function stopMemoryTimer(gameId) {
        if (memoryTimers[gameId] && memoryTimers[gameId].intervalId) {
            clearInterval(memoryTimers[gameId].intervalId);
            memoryTimers[gameId].intervalId = null; // Mark as stopped but keep elapsed time
        }
         // Also ensure startTime is reset if we want the timer to be restartable on next game entry
         // if (memoryTimers[gameId]) {
         //     memoryTimers[gameId].startTime = 0;
         // }
    }


    // --- Crossword Logic ---
    // NOTE: This is a simplified implementation focusing on setup and checking.
    // A full interactive crossword requires more complex grid generation and navigation.
    const crosswordGridContainer = document.getElementById('crossword-grid-container');
    const crosswordCluesList = document.getElementById('crossword-clues-list');
    const checkCrosswordButton = document.getElementById('check-crossword-button');
    let crosswordCells = {}; // Store references to input cells by row/col

    function setupCrossword() {
        crosswordGridContainer.innerHTML = ''; // Clear previous
        crosswordCluesList.innerHTML = '';
        crosswordCells = {};
        showFeedback('crossword-feedback', '', 'info');
        checkCrosswordButton.style.display = 'inline-block';
        checkCrosswordButton.disabled = false;
        crosswordGridContainer.closest('.exercise-section').querySelector('.next-button').style.display = 'none';


        // --- Basic Grid Generation (Example - Needs proper algorithm for real use) ---
        // This part is highly simplified. A real crossword generator is complex.
        // We'll create a grid and place inputs based on clue data.
        const size = crosswordData.size;
        const gridTable = document.createElement('table');
        gridTable.classList.add('crossword-grid');
        const blackCells = new Set(); // Store coordinates of black cells

        // Create basic grid structure
        for (let r = 0; r < size; r++) {
            const row = gridTable.insertRow();
            for (let c = 0; c < size; c++) {
                const cell = row.insertCell();
                cell.dataset.row = r;
                cell.dataset.col = c;
                // Mark cells as black initially (will be replaced by inputs)
                blackCells.add(`${r}-${c}`);
            }
        }

        // Place words and clues
        crosswordData.clues.forEach(clue => {
            // Add clue to list
            const clueLi = document.createElement('li');
            clueLi.textContent = `${clue.number}. ${clue.direction === 'horizontal' ? 'Horiz.' : 'Vert.'} : ${clue.clue}`;
            crosswordCluesList.appendChild(clueLi);

            // Place inputs in the grid
            for (let i = 0; i < clue.answer.length; i++) {
                let r = clue.row;
                let c = clue.col;
                if (clue.direction === 'horizontal') {
                    c += i;
                } else {
                    r += i;
                }

                if (r < size && c < size) {
                    const cellKey = `${r}-${c}`;
                    const cell = gridTable.rows[r].cells[c];
                    blackCells.delete(cellKey); // This cell is not black

                    if (!cell.querySelector('input')) { // Only add input if cell is empty
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.maxLength = 1;
                        input.dataset.row = r;
                        input.dataset.col = c;
                        input.dataset.correct = clue.answer[i]; // Store correct letter
                        input.addEventListener('input', handleCrosswordInput);
                        input.addEventListener('keydown', handleCrosswordKeydown); // Add keydown listener
                        cell.appendChild(input);
                        crosswordCells[cellKey] = input; // Store reference

                        // Add clue number to the first cell of the word
                        if (i === 0) {
                            const clueNumSpan = document.createElement('span');
                            clueNumSpan.classList.add('clue-number');
                            clueNumSpan.textContent = clue.number;
                            cell.appendChild(clueNumSpan);
                        }
                    } else {
                         // If input exists, ensure it knows the correct letter for checking later
                         // (Handles intersections - simplistic approach)
                         const existingInput = cell.querySelector('input');
                         if (!existingInput.dataset.correct.includes(clue.answer[i])) {
                             existingInput.dataset.correct += clue.answer[i];
                         }
                    }
                }
            }
        });

        // Fill remaining black cells
        blackCells.forEach(cellKey => {
            const [r, c] = cellKey.split('-').map(Number);
            if (r < size && c < size && gridTable.rows[r] && gridTable.rows[r].cells[c]) {
                gridTable.rows[r].cells[c].classList.add('black');
            }
        });

        crosswordGridContainer.appendChild(gridTable);
    }

    function handleCrosswordInput(event) {
        const input = event.target;
        input.value = input.value.toUpperCase();
        // Auto-tab to next input in the grid (simple right/down)
        if (input.value.length === 1 && input.maxLength === 1) {
            const r = parseInt(input.dataset.row);
            const c = parseInt(input.dataset.col);
            // Try moving right first
            let nextInput = crosswordCells[`${r}-${c + 1}`];
            if (nextInput) {
                nextInput.focus();
            } else {
                // Try moving down to the start of the next row (very basic)
                nextInput = crosswordCells[`${r + 1}-0`]; // Adjust starting column if needed
                 if (nextInput) {
                     nextInput.focus();
                 }
            }
        }
    }

     // Handle Backspace and Arrow keys for better navigation
    function handleCrosswordKeydown(event) {
        const input = event.target;
        const r = parseInt(input.dataset.row);
        const c = parseInt(input.dataset.col);
        let targetInput = null;

        switch (event.key) {
            case 'Backspace':
                if (input.value.length === 0) {
                    // Move left if backspacing on empty cell
                    targetInput = crosswordCells[`${r}-${c - 1}`];
                }
                break;
            case 'ArrowLeft':
                targetInput = crosswordCells[`${r}-${c - 1}`];
                break;
            case 'ArrowRight':
                targetInput = crosswordCells[`${r}-${c + 1}`];
                break;
            case 'ArrowUp':
                targetInput = crosswordCells[`${r - 1}-${c}`];
                break;
            case 'ArrowDown':
                targetInput = crosswordCells[`${r + 1}-${c}`];
                break;
            default:
                // Allow typing letters/numbers
                if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
                   // Potentially clear the input before typing new letter
                   // input.value = ''; // Uncomment if you want overwrite behavior
                }
                return; // Don't prevent default for typing
        }

        if (targetInput) {
            event.preventDefault(); // Prevent default arrow key scroll / backspace navigation
            targetInput.focus();
            // Optional: Select text in target input for easy overwrite
            // targetInput.select();
        } else if (event.key === 'Backspace' && input.value.length === 0) {
             // If backspace on empty and no cell to the left, prevent default browser back navigation
             event.preventDefault();
        }
    }


    function checkCrossword() {
        let allCorrect = true;
        let filledCount = 0;
        let correctCount = 0; // Count correctly filled cells

        Object.values(crosswordCells).forEach(input => {
            const correctLetters = input.dataset.correct; // Can contain multiple letters for intersections
            const enteredValue = input.value.toUpperCase();
            input.classList.remove('correct', 'incorrect'); // Clear previous feedback

            if (enteredValue) {
                filledCount++;
                if (correctLetters.includes(enteredValue)) {
                    input.classList.add('correct');
                    correctCount++; // Increment correct count
                } else {
                    input.classList.add('incorrect');
                    allCorrect = false;
                }
            } else {
                // Empty cell where there should be a letter
                allCorrect = false;
            }
             input.disabled = true; // Disable after checking
        });

        const totalCells = Object.keys(crosswordCells).length;

        if (allCorrect && filledCount === totalCells) {
            scores.crossword = MAX_SCORES.crossword;
            showFeedback('crossword-feedback', `Félicitations ! Grille parfaite ! +${MAX_SCORES.crossword} points.`, 'correct');
        } else if (filledCount > 0) {
             scores.crossword = 0; // No partial points for crossword in this setup
             showFeedback('crossword-feedback', `Grille vérifiée. ${correctCount} lettres correctes sur ${totalCells}. Score: 0/${MAX_SCORES.crossword}.`, 'incorrect');
        } else {
             scores.crossword = 0;
             showFeedback('crossword-feedback', `La grille est vide. Score: 0/${MAX_SCORES.crossword}.`, 'info');
        }
        updateScoreDisplay();
        checkCrosswordButton.disabled = true;
        crosswordGridContainer.closest('.exercise-section').querySelector('.next-button').style.display = 'inline-block';
    }

    checkCrosswordButton.addEventListener('click', checkCrossword);


    // --- Summary Logic ---
    function showSummary() {
        // Ensure totalScore is up-to-date before displaying
        updateScoreDisplay(); // Call this to recalculate totalScore just in case

        // --- MODIFICATION START ---
        // Update only the total score display
        const summaryTotalSpan = document.getElementById('summary-total');
        if (summaryTotalSpan) {
             summaryTotalSpan.textContent = `${totalScore} / ${TOTAL_MAX_SCORE}`;
        }
        // --- MODIFICATION END ---

        let finalMessage = "";
        if (totalScore >= TOTAL_MAX_SCORE * 0.8) {
            finalMessage = "Excellent travail ! Tu maîtrises le sujet ! 🚀";
        } else if (totalScore >= TOTAL_MAX_SCORE * 0.5) {
            finalMessage = "Bon score ! Continue comme ça ! 👍";
        } else {
            finalMessage = "Pas mal, mais tu peux encore t'améliorer. N'hésite pas à revoir le cours ! 😉";
        }
        showFeedback('summary-feedback', finalMessage, 'info');
    }

    // Listener for the summary button moved inside DOMContentLoaded to ensure button exists
    // const summaryNavButton = document.querySelector('.nav-button[data-target="summary"]');
    // if (summaryNavButton) {
    //     summaryNavButton.addEventListener('click', showSummary); // showSummary is called within the generic navButton listener now
    // }


    // --- Restart Logic ---
    function restartAllExercises() {
        // Reset scores
        scores = { quiz: 0, association: 0, hangman: 0, memory1: 0, memory2: 0, crossword: 0 };
        totalScore = 0;
        updateScoreDisplay();

        // Reset Hangman state
        hangmanCurrentWordIndex = 0;
        hangmanWordsCompleted = 0;

        // Stop and reset memory timers state
        Object.keys(memoryTimers).forEach(gameId => {
             stopMemoryTimer(gameId);
             memoryTimers[gameId] = { intervalId: null, startTime: 0, elapsed: 0 };
        });
        // Reset internal memory game state
        flippedCards = [];
        lockBoard = false;
        pairsFound = { memory1: 0, memory2: 0 };


        // Reset feedback areas
        document.querySelectorAll('.feedback').forEach(fb => {
            fb.textContent = '';
            fb.style.display = 'none';
            fb.className = 'feedback'; // Reset class
        });

        // Re-setup exercises (this will also reset their internal states and UI)
        setupQuiz();
        setupAssociation();
        setupHangman();
        createMemoryCards('memory1', memoryData1);
        createMemoryCards('memory2', memoryData2);
        setupCrossword();

        // Hide all 'next' buttons initially after setup
        document.querySelectorAll('.next-button').forEach(btn => btn.style.display = 'none');
        // Special case for association 'next' button which should be visible after setup
        const associationNextButton = document.querySelector('#association .next-button');
        if (associationNextButton) associationNextButton.style.display = 'inline-block';

        // Ensure check buttons are visible and enabled
        checkQuizButton.style.display = 'inline-block';
        checkQuizButton.disabled = false;
        checkCrosswordButton.style.display = 'inline-block';
        checkCrosswordButton.disabled = false;

        // Reset hangman buttons state (done within setupHangman now)
        // hangmanLettersContainer.querySelectorAll('button').forEach(btn => btn.disabled = false);
        // hangmanHintButton.disabled = false;
        // hangmanHintButton.style.display = 'inline-block';


        // Show the first section
        showExerciseSection('accueil-exercices');
    }

    restartButton.addEventListener('click', restartAllExercises);


    // --- Dark Mode & Dyslexia Mode Logic ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const dyslexiaFontToggle = document.getElementById('dyslexiaFontToggle');
    const moonIcon = 'fa-moon';
    const sunIcon = 'fa-sun';

    // Apply Dark Mode
    const applyMode = (mode) => {
        const iconElement = darkModeToggle.querySelector('i');
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            if(iconElement) { iconElement.classList.remove(moonIcon); iconElement.classList.add(sunIcon); }
            localStorage.setItem('themeMode', 'dark');
        } else {
            body.classList.remove('dark-mode');
             if(iconElement) { iconElement.classList.remove(sunIcon); iconElement.classList.add(moonIcon); }
            localStorage.setItem('themeMode', 'light');
        }
    };
    darkModeToggle.addEventListener('click', () => {
        const currentMode = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyMode(currentMode);
    });
    const savedMode = localStorage.getItem('themeMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedMode) { applyMode(savedMode); }
    else if (prefersDark) { applyMode('dark'); }
    else { applyMode('light'); }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('themeMode')) { applyMode(event.matches ? 'dark' : 'light'); }
    });

    // Apply Dyslexia Font
    const applyDyslexiaFont = (enable) => {
        if (enable) {
            body.classList.add('dyslexia-mode');
            dyslexiaFontToggle.classList.add('active');
            localStorage.setItem('dyslexiaFontEnabled', 'true');
        } else {
            body.classList.remove('dyslexia-mode');
            dyslexiaFontToggle.classList.remove('active');
            localStorage.setItem('dyslexiaFontEnabled', 'false');
        }
    };
    dyslexiaFontToggle.addEventListener('click', () => {
        const isEnabled = body.classList.contains('dyslexia-mode');
        applyDyslexiaFont(!isEnabled);
    });
    const savedDyslexiaPref = localStorage.getItem('dyslexiaFontEnabled');
    if (savedDyslexiaPref === 'true') { applyDyslexiaFont(true); }
    else { applyDyslexiaFont(false); }
    // --- End Dark/Dyslexia Logic ---


    // --- Initial Setup ---
    setupQuiz();
    setupAssociation();
    setupHangman(); // Setup first hangman word
    createMemoryCards('memory1', memoryData1);
    createMemoryCards('memory2', memoryData2);
    setupCrossword();
    updateScoreDisplay(); // Initialize score display

}); // End DOMContentLoaded
