document.addEventListener('DOMContentLoaded', function() {

    // --- VARIABLES GLOBALES ---
    let totalScore = 0;
    let exerciseScore = 0;
    let decryptionChallengePoints = 0; // <-- NOUVEAU: Score pour le défi
    const pointsPerDecryption = 30; // <-- NOUVEAU: Points pour le défi
    const exercisePoints = {};
    const sectionVisits = {};
    const totalExercises = 6;
    let totalNavLinks = document.querySelectorAll('.menu-link').length; // Sera mis à jour si on ajoute dynamiquement
    let currentQuizDifficulty = null;
    let currentQuestionIndex = 0;
    let quizQuestions = {};

    // --- ELEMENTS DU DOM ---
    const binaryBackground = document.getElementById('binaryBackground');
    const progressBar = document.getElementById('progressBar');
    const contentSections = document.querySelectorAll('.content-section');
    const menuLinks = document.querySelectorAll('.menu-link');
    const exerciseScoreDisplay = document.getElementById('exerciseScoreDisplay');
    const quizScoreDisplay = document.getElementById('quizScoreDisplay');
    const finalTotalScoreDisplay = document.getElementById('finalTotalScoreDisplay');
    const completionMessage = document.getElementById('completionMessage');

    // --- INITIALISATION ---
    totalNavLinks = menuLinks.length; // Met à jour le nombre total de liens après ajout du défi
    if (binaryBackground) createBinaryBackground();
    loadQuizQuestions();
    setupEventListeners();
    handleInitialHash();
    updateProgress();
    updateScoreDisplays();

    // --- FONCTIONS ---

    function createBinaryBackground() { /* ... (inchangée) ... */
        const bitCount = Math.min(50, Math.floor(window.innerWidth / 30));
        for (let i = 0; i < bitCount; i++) {
            const bit = document.createElement('div'); bit.textContent = Math.random() > 0.5 ? '1' : '0'; bit.className = 'bit';
            bit.style.left = `${Math.random() * 100}%`; bit.style.animationDuration = `${Math.random() * 8 + 6}s`; bit.style.animationDelay = `${Math.random() * 6}s`;
            binaryBackground.appendChild(bit);
        }
    }

    function setupEventListeners() {
        // Navigation par menu
        menuLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('data-section');
                showSection(targetId);
            });
        });

        // Navigation par boutons Précédent/Suivant et Commencer (délégation)
        document.querySelector('.container').addEventListener('click', function(event) {
             const navButton = event.target.closest('.nav-button');
             const actionButton = event.target.closest('.action-button');
             const inlineLink = event.target.closest('.inline-link'); // NOUVEAU: pour liens intra-page

             if (navButton || actionButton || inlineLink) {
                 event.preventDefault();
                 const button = navButton || actionButton || inlineLink;
                 const href = button.getAttribute('href');
                 if(href && href.startsWith('#')){
                     const targetId = href.substring(1);
                     showSection(targetId);
                 }
             }
        });

        // Gestion des clics sur les tuiles (Délégation)
        const tileGrid = document.querySelector('.tile-grid');
        if (tileGrid) {
            tileGrid.addEventListener('click', function(event) {
                const clickedTile = event.target.closest('.tile-link[data-section]');
                if (clickedTile) {
                    const targetId = clickedTile.getAttribute('data-section');
                    showSection(targetId);
                }
            });
        }

        // Gestion hash URL
        window.addEventListener('hashchange', handleHashChange);

        // Convertisseurs
        const binToDecBtn = document.getElementById('binary-to-decimal-btn');
        const decToBinBtn = document.getElementById('decimal-to-binary-btn');
        const textToAsciiBtn = document.getElementById('text-to-ascii-btn');
        const asciiToTextBtn = document.getElementById('ascii-to-text-btn');
        if(binToDecBtn) binToDecBtn.addEventListener('click', convertBinaryToDecimal);
        if(decToBinBtn) decToBinBtn.addEventListener('click', convertDecimalToBinary);
        if(textToAsciiBtn) textToAsciiBtn.addEventListener('click', convertTextToAscii);
        if(asciiToTextBtn) asciiToTextBtn.addEventListener('click', convertAsciiToText);

        // --- NOUVEAU : Listener pour le bouton du défi décryptage ---
        const verifyDecryptionBtn = document.getElementById('verify-decryption-btn');
        if (verifyDecryptionBtn) {
            verifyDecryptionBtn.addEventListener('click', verifyDecryption); // Appel à la nouvelle fonction
        }

        // Note : Les fonctions appelées par onclick (verifyAnswer, setQuizDifficulty, checkQuizAnswer, resetProgress)
        // sont exposées globalement à la fin de ce script.
    }

    function handleInitialHash() { /* ... (inchangée) ... */
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
             const accueilSection = document.getElementById('accueil');
             if(accueilSection) accueilSection.classList.remove('active');
            setTimeout(() => { showSection(hash, true); }, 100);
        } else {
            showSection('accueil', true);
        }
    }

    function handleHashChange() { /* ... (inchangée) ... */
        const hash = window.location.hash.substring(1);
        const targetSection = document.getElementById(hash);
        if (hash && targetSection && !targetSection.classList.contains('active')) {
            showSection(hash);
        } else if (!hash) {
             showSection('accueil');
        }
    }

    function showSection(sectionId, isInitialLoad = false) { /* ... (logique inchangée, mais sectionVisits inclut le défi) ... */
        let sectionFound = false;
        contentSections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
            if(section.id === sectionId) sectionFound = true;
        });

        if (!sectionFound && sectionId !== 'accueil') {
             if(!isInitialLoad) window.location.hash = '';
             showSection('accueil');
             return;
         }

        menuLinks.forEach(link => {
            const linkSection = link.getAttribute('data-section');
            const isCurrent = linkSection === sectionId;
            link.classList.toggle('current', isCurrent);

             if(isCurrent && sectionId !== 'accueil'){
                 sectionVisits[sectionId] = true;
                 link.classList.add('visited');
                 if (!link.querySelector('.fa-check')) {
                    const icon = document.createElement('i'); icon.className = 'fas fa-check'; link.appendChild(icon);
                 }
             }
             // Vérifie si déjà visité pour afficher coche même si pas courant
             if(sectionVisits[linkSection] && linkSection !== 'accueil' && !link.querySelector('.fa-check')){
                 const icon = document.createElement('i'); icon.className = 'fas fa-check'; link.appendChild(icon);
                 link.classList.add('visited');
             } else if (!sectionVisits[linkSection] && link.querySelector('.fa-check')) {
                 // Retire la coche si la visite est annulée (par reset par ex.)
                 link.querySelector('.fa-check').remove();
                 link.classList.remove('visited');
             }
        });

        if (!isInitialLoad && window.location.hash !== `#${sectionId}`) {
            window.location.hash = sectionId;
        }
        if (!isInitialLoad) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        updateProgress();
        checkCompletion();
    }

    function updateProgress() { /* ... (logique inchangée, mais totalNavLinks est à jour) ... */
        const visitedCount = Object.keys(sectionVisits).length;
        const totalRelevantSections = totalNavLinks > 0 ? totalNavLinks - 1 : 0;
        const progressPercent = totalRelevantSections > 0 ? (visitedCount / totalRelevantSections) * 100 : 0;
        if (progressBar) progressBar.style.width = `${Math.min(progressPercent, 100)}%`;
    }

    // --- MODIFIÉ : Mise à jour affichage score ---
    function updateScoreDisplays() {
        const currentTotal = calculateTotalScore(); // Utilise la fonction qui inclut tout
        if (exerciseScoreDisplay) exerciseScoreDisplay.textContent = `${exerciseScore}`;

        // Calcul score quiz seul (total - exos - défi)
        const quizScore = currentTotal - exerciseScore - decryptionChallengePoints;
        if (quizScoreDisplay) quizScoreDisplay.textContent = `${quizScore} points`;

        // Score total final dans le message de complétion
        if (finalTotalScoreDisplay) finalTotalScoreDisplay.textContent = `${currentTotal}`;
    }

    // --- MODIFIÉ : Calcul score total ---
    function calculateTotalScore() {
        // totalScore est la somme de exerciseScore + points quiz + decryptionChallengePoints
        // La variable globale totalScore est mise à jour au fur et à mesure
        return totalScore;
    }


    function applyFeedback(element, isCorrect) { /* ... (inchangée) ... */
         element.classList.add('visible');
         element.classList.toggle('correct-feedback', isCorrect);
         element.classList.toggle('incorrect-feedback', !isCorrect);
         element.classList.remove('feedback-shake', 'feedback-pop');
         void element.offsetWidth;
         element.classList.add(isCorrect ? 'feedback-pop' : 'feedback-shake');
         setTimeout(() => { element.classList.remove('feedback-shake', 'feedback-pop'); }, 500);
     }

     // --- Logique des Convertisseurs (inchangée) ---
     function convertBinaryToDecimal() { /* ... */
         const binaryInput = document.getElementById('binary-input').value.trim();
         const binaryOutput = document.getElementById('binary-output');
         if (!/^[01]+$/.test(binaryInput) || binaryInput.length === 0) { binaryOutput.innerHTML = "<span class='converter-error'>Entrée invalide (0 ou 1 uniquement).</span>"; return; }
         const decimal = parseInt(binaryInput, 2);
         binaryOutput.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success-color);"></i> ${binaryInput}<sub>(2)</sub> = <strong>${decimal}</strong><sub>(10)</sub>`;
      }
     function convertDecimalToBinary() { /* ... */
         const decimalInput = document.getElementById('decimal-input').value.trim();
         const decimalOutput = document.getElementById('decimal-output');
         if (!/^\d+$/.test(decimalInput) || decimalInput.length === 0) { decimalOutput.innerHTML = "<span class='converter-error'>Entrée invalide (entier positif requis).</span>"; return; }
         const decimalValue = parseInt(decimalInput, 10);
         if(decimalValue > 1000000) { decimalOutput.innerHTML = "<span class='converter-error'>Nombre trop grand.</span>"; return; }
         const binary = decimalValue.toString(2);
         decimalOutput.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success-color);"></i> ${decimalInput}<sub>(10)</sub> = <strong>${binary}</strong><sub>(2)</sub>`;
      }
    function convertTextToAscii() { /* ... */
        const textInput = document.getElementById('text-input').value;
        const textOutput = document.getElementById('text-output');
        if (textInput.length === 0) { textOutput.innerHTML = "<span class='converter-error'>Veuillez entrer du texte.</span>"; return; }
        let asciiCodes = [];
        for (let i = 0; i < textInput.length; i++) { asciiCodes.push(textInput.charCodeAt(i)); }
        textOutput.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success-color);"></i> ${asciiCodes.join(' ')}`;
     }
    function convertAsciiToText() { /* ... */
        const asciiInput = document.getElementById('ascii-input').value.trim();
        const asciiOutput = document.getElementById('ascii-output');
        if (!/^(\d+\s*)+$/.test(asciiInput) && asciiInput !== '') { asciiOutput.innerHTML = "<span class='converter-error'>Entrez des nombres séparés par des espaces.</span>"; return; }
        if (asciiInput === '') { asciiOutput.innerHTML = ""; return; }
        try {
            const codes = asciiInput.split(/\s+/).filter(code => code !== ''); let text = '', error = false;
            for (let i = 0; i < codes.length; i++) { const codeNum = parseInt(codes[i]); if(isNaN(codeNum) || codeNum < 0 || codeNum > 255) { error = true; break; } text += String.fromCharCode(codeNum); }
            if(error) { asciiOutput.innerHTML = "<span class='converter-error'>Code(s) ASCII invalide(s) (0-255).</span>"; } else { asciiOutput.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success-color);"></i> <strong>${text}</strong>`; }
        } catch (e) { asciiOutput.innerHTML = "<span class='converter-error'>Erreur de conversion.</span>"; }
     }

    // --- Logique des Exercices ---
    function verifyAnswerInternal(exerciseId, correctAnswer, points, buttonElement) { /* ... (inchangée) ... */
        const answerInput = document.getElementById(`answer-${exerciseId}`);
        const feedbackDiv = document.getElementById(`feedback-${exerciseId}`);
        if (!answerInput || !feedbackDiv) return;
        const userAnswer = answerInput.value.trim().toLowerCase(); correctAnswer = correctAnswer.toLowerCase();
        const alreadyAnsweredCorrectly = exercisePoints[exerciseId] > 0;
        if (userAnswer === correctAnswer) {
             feedbackDiv.textContent = "Correct !"; applyFeedback(feedbackDiv, true);
             answerInput.disabled = true; buttonElement.disabled = true; buttonElement.style.opacity = '0.6';
            if (!alreadyAnsweredCorrectly) { exercisePoints[exerciseId] = points; exerciseScore += points; totalScore += points; updateScoreDisplays(); }
        } else {
             feedbackDiv.textContent = `Incorrect. La bonne réponse était : ${correctAnswer}`; applyFeedback(feedbackDiv, false);
        }
    }

    // --- Logique du Quiz ---
    function loadQuizQuestions() { /* ... (inchangée) ... */
         quizQuestions = {
             easy: [ { question: "Que signifie 'bit' ?", options: ["Binary Digit", "Binary Integer", "Basic Input"], correct: 0, points: 5 }, { question: "Combien y a-t-il de chiffres dans le système binaire ?", options: ["1", "2", "8", "10"], correct: 1, points: 5 }, { question: "Convertir 10 (décimal) en binaire :", options: ["1000", "1010", "0010", "1110"], correct: 1, points: 5 } ],
             medium: [ { question: "Combien d'octets dans un kilooctet (informatique) ?", options: ["1000", "1024", "8", "2048"], correct: 1, points: 10 }, { question: "Code ASCII (décimal) pour 'a' minuscule ?", options: ["65", "97", "48", "32"], correct: 1, points: 10 }, { question: "1100 ET 1010 = ?", options: ["1000", "1110", "0110", "1010"], correct: 0, points: 10 } ],
             hard: [ { question: "Combien de couleurs distinctes avec 4 bits ?", options: ["8", "16", "4", "24"], correct: 1, points: 15 }, { question: "1011 XOR 0110 = ?", options: ["1101", "1001", "0110", "1111"], correct: 0, points: 15 }, { question: "Convertir 42 (décimal) en binaire ?", options: ["101010", "110010", "101001", "100101"], correct: 0, points: 15 } ]
         };
     }
    function setQuizDifficultyInternal(difficulty) { /* ... (inchangée) ... */
        currentQuizDifficulty = difficulty; currentQuestionIndex = 0;
        document.querySelectorAll('.difficulty-btn').forEach(btn => { btn.classList.toggle('active', btn.getAttribute('data-difficulty') === difficulty); });
        displayCurrentQuestion();
    }
    function displayCurrentQuestion() { /* ... (inchangée) ... */
        const quizContainer = document.getElementById('quiz-container');
        if (!currentQuizDifficulty || !quizQuestions[currentQuizDifficulty]) { quizContainer.innerHTML = '<p class="placeholder-text"><i class="fas fa-arrow-up"></i> Sélectionnez un niveau ci-dessus.</p>'; return; }
        const questions = quizQuestions[currentQuizDifficulty];
        if (currentQuestionIndex >= questions.length) { quizContainer.innerHTML = `<div class="quiz-complete"><h3><i class="fas fa-check-double"></i> Quiz ${getLevelName(currentQuizDifficulty)} Terminé !</h3><p>Bravo !</p><button class="difficulty-btn" onclick="setQuizDifficulty('${currentQuizDifficulty}')">Recommencer</button></div>`; checkCompletion(); return; }
        const currentQuestion = questions[currentQuestionIndex]; let optionsHTML = '';
        currentQuestion.options.forEach((option, index) => { optionsHTML += `<div class="quiz-option"><input type="radio" id="option-${index}" name="quiz-answer" value="${index}"><label for="option-${index}">${option}</label></div>`; });
        quizContainer.innerHTML = `<h3>Question ${currentQuestionIndex + 1} / ${questions.length}</h3><p class="question-text">${currentQuestion.question}</p><div class="options-container">${optionsHTML}</div><button onclick="checkQuizAnswer()"><i class="fas fa-check"></i> Valider</button><div id="quiz-feedback" class="answer-feedback"></div>`;
        quizContainer.classList.remove('quiz-complete');
    }
    function getLevelName(difficulty) { /* ... (inchangée) ... */
        switch(difficulty) { case 'easy': return 'Débutant'; case 'medium': return 'Intermédiaire'; case 'hard': return 'Expert'; default: return difficulty; }
    }
    function checkQuizAnswerInternal() { /* ... (inchangée) ... */
        const selectedOption = document.querySelector('#quiz-container input[name="quiz-answer"]:checked'); const feedbackDiv = document.getElementById('quiz-feedback'); const validateButton = feedbackDiv?.previousElementSibling;
        if (!selectedOption) { feedbackDiv.textContent = "Veuillez sélectionner une réponse."; applyFeedback(feedbackDiv, false); return; }
        document.querySelectorAll('#quiz-container input[name="quiz-answer"]').forEach(input => input.disabled = true); if(validateButton && validateButton.tagName === 'BUTTON') validateButton.disabled = true;
        const userAnswer = parseInt(selectedOption.value); const questionData = quizQuestions[currentQuizDifficulty][currentQuestionIndex]; const correctAnswer = questionData.correct; const points = questionData.points;
        if (userAnswer === correctAnswer) {
            feedbackDiv.textContent = `Correct ! (+${points} points)`; applyFeedback(feedbackDiv, true);
            totalScore += points; updateScoreDisplays();
            setTimeout(() => { currentQuestionIndex++; displayCurrentQuestion(); }, 1200);
        } else {
            const correctAnswerText = questionData.options[correctAnswer]; feedbackDiv.textContent = `Incorrect. La bonne réponse était : "${correctAnswerText}"`; applyFeedback(feedbackDiv, false);
            setTimeout(() => { currentQuestionIndex++; displayCurrentQuestion(); }, 2000);
        }
    }


    // --- NOUVEAU : Logique pour Mission Décryptage ---
    function verifyDecryption() {
        const correctPhrase = "BRAVO LE CODE";
        const userInput = document.getElementById('decrypted-phrase');
        const feedbackDiv = document.getElementById('decryption-feedback');
        const button = document.getElementById('verify-decryption-btn');
        if (!userInput || !feedbackDiv || !button) return;

        const userAnswer = userInput.value.trim().toUpperCase();
        const alreadyDecrypted = decryptionChallengePoints > 0;

        if (userAnswer === correctPhrase) {
            feedbackDiv.innerHTML = `<i class="fas fa-check-circle"></i> Excellent ! Vous avez décrypté le message : "<strong>${correctPhrase}</strong>" (+${pointsPerDecryption} points)`;
            applyFeedback(feedbackDiv, true);
            userInput.disabled = true;
            button.disabled = true;
            button.style.opacity = '0.6';

            if (!alreadyDecrypted) {
                decryptionChallengePoints = pointsPerDecryption;
                totalScore += pointsPerDecryption;
                updateScoreDisplays();
            }
             checkCompletion(); // Vérifie si le parcours est terminé

        } else {
            feedbackDiv.textContent = "Ce n'est pas tout à fait ça. Vérifiez bien chaque conversion Binaire > Décimal > Lettre ASCII.";
            applyFeedback(feedbackDiv, false);
            userInput.focus();
        }
    }


     // --- Complétion et Reset ---
     // --- MODIFIÉ : Logique de complétion et Reset ---
     function checkCompletion() {
         const totalRelevantSections = (totalNavLinks > 0 ? totalNavLinks - 1 : 0) ; // Moins l'accueil
         const allSectionsVisited = Object.keys(sectionVisits).length >= totalRelevantSections;
         const challengeCompleted = decryptionChallengePoints > 0; // Défi réussi

         // Condition simplifiée: toutes sections visitées ET défi réussi
         if (allSectionsVisited && challengeCompleted) {
             if(completionMessage) {
                 updateScoreDisplays(); // Met à jour le score final affiché
                 completionMessage.style.display = 'block';
                 // Optionnel: Masquer la section défi si on affiche le message final?
                 // const missionSection = document.getElementById('mission-decryptage');
                 // if(missionSection) missionSection.classList.remove('active');

                 completionMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
             }
         } else {
             if(completionMessage) completionMessage.style.display = 'none';
         }
     }

    function resetProgressInternal() {
        totalScore = 0; exerciseScore = 0; decryptionChallengePoints = 0; // <-- Reset défi
        Object.keys(exercisePoints).forEach(key => exercisePoints[key] = 0);
        Object.keys(sectionVisits).forEach(key => delete sectionVisits[key]);
        currentQuizDifficulty = null; currentQuestionIndex = 0;

        // Reset UI
        document.querySelectorAll('.answer-feedback').forEach(fb => { fb.textContent = ''; fb.className = 'answer-feedback'; });
        document.querySelectorAll('.question-container input[type="text"], #decrypted-phrase').forEach(input => { input.value = ''; input.disabled = false; });
        document.querySelectorAll('.question-container button, #verify-decryption-btn').forEach(btn => { btn.disabled = false; btn.style.opacity = '1'; });
        document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
        if(document.getElementById('quiz-container')) document.getElementById('quiz-container').innerHTML = '<p class="placeholder-text"><i class="fas fa-info-circle"></i> Sélectionnez un niveau de difficulté pour commencer.</p>';
        menuLinks.forEach(link => { link.classList.remove('visited', 'current'); const icon = link.querySelector('.fa-check'); if(icon) icon.remove(); });
        if(completionMessage) completionMessage.style.display = 'none';

        updateScoreDisplays();
        updateProgress();
        showSection('accueil', true);
        window.location.hash = '';
    }


    // --- Exposition Globale des Fonctions pour les `onclick` restants ---
    window.verifyAnswer = verifyAnswerInternal;
    window.setQuizDifficulty = setQuizDifficultyInternal;
    window.checkQuizAnswer = checkQuizAnswerInternal;
    window.resetProgress = resetProgressInternal;
    // showSection n'a PAS besoin d'être global car géré par listeners internes (menu, tuiles, boutons nav/action)

}); // Fin de DOMContentLoaded