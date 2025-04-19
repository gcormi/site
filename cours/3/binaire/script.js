document.addEventListener('DOMContentLoaded', function() {

    // --- VARIABLES GLOBALES ---
    let totalScore = 0;
    let exerciseScore = 0;
    const exercisePoints = {}; // Pour suivre les points par exercice
    const sectionVisits = {}; // Pour suivre les sections visitées pour la progression
    const totalExercises = 6; // Nombre total d'exercices pour le score
    const totalNavLinks = document.querySelectorAll('.menu-link').length;
    let currentQuizDifficulty = null;
    let currentQuestionIndex = 0;
    let quizQuestions = {}; // Sera chargé plus tard

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

    // Création animation binaire (si l'élément existe)
    if (binaryBackground) {
        createBinaryBackground();
    }

    // Chargement des questions du quiz
    loadQuizQuestions();

    // Ajout écouteurs d'événements menu + boutons
    setupEventListeners();

    // Gérer l'URL au chargement initial (avec hash)
    handleInitialHash();

    // Mise à jour initiale UI
    updateProgress();
    updateScoreDisplays();


    // --- FONCTIONS ---

    function createBinaryBackground() {
        // Optimisé pour créer moins d'éléments si besoin
        const bitCount = Math.min(50, Math.floor(window.innerWidth / 30)); // Adapte le nombre à la largeur
        for (let i = 0; i < bitCount; i++) {
            const bit = document.createElement('div');
            bit.textContent = Math.random() > 0.5 ? '1' : '0';
            bit.className = 'bit';
            bit.style.left = `${Math.random() * 100}%`;
            bit.style.animationDuration = `${Math.random() * 8 + 6}s`; // Durée 6-14s
            bit.style.animationDelay = `${Math.random() * 6}s`;
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

         // Navigation par boutons Précédent/Suivant (délégation d'événements)
        document.querySelector('.container').addEventListener('click', function(event) {
            if (event.target.classList.contains('nav-button') || event.target.closest('.nav-button')) {
                event.preventDefault();
                const button = event.target.closest('.nav-button');
                const targetId = button.getAttribute('href').substring(1); // Prend l'ID de l'attribut href
                showSection(targetId);
            }
             // Boutons de conversion, etc. pourraient être ajoutés ici par délégation aussi
        });

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

         // Boutons de difficulté du Quiz (délégation)
        const difficultyContainer = document.querySelector('.difficulty-selection');
        if(difficultyContainer) {
            difficultyContainer.addEventListener('click', function(event){
                if(event.target.classList.contains('difficulty-btn')){
                    setQuizDifficulty(event.target.getAttribute('data-difficulty'));
                }
            });
        }

        // Bouton Valider Quiz (délégation car il est recréé)
        const quizSection = document.getElementById('quiz-interactif');
        if(quizSection){
            quizSection.addEventListener('click', function(event){
                if(event.target.id === 'validate-quiz-btn'){
                    checkQuizAnswer();
                }
            });
        }

        // Boutons Vérifier Exercices (délégation)
        const exercisesSection = document.getElementById('exercices-en-binaire');
        if (exercisesSection) {
            exercisesSection.addEventListener('click', function(event) {
                if (event.target.tagName === 'BUTTON' && event.target.onclick) {
                    // Extrait les arguments de l'attribut onclick (un peu fragile mais fonctionne pour ce cas)
                    const onclickAttr = event.target.getAttribute('onclick');
                    const match = onclickAttr.match(/verifyAnswer\((\d+),\s*'([^']*)',\s*(\d+)\)/);
                    if (match) {
                        verifyAnswer(parseInt(match[1]), match[2], parseInt(match[3]), event.target);
                    }
                }
            });
        }

        // Bouton Recommencer (si le message de complétion est affiché)
        const resetButton = completionMessage.querySelector('button');
        if(resetButton) {
            resetButton.onclick = resetProgress; // Attribue la fonction directement
        }
    }

    function handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            // Retarde légèrement pour s'assurer que tout est bien chargé
            setTimeout(() => {
                 showSection(hash, true); // true pour indiquer chargement initial
            }, 100);
        } else {
            showSection('accueil', true); // Affiche l'accueil par défaut
        }
    }

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        }
    }

    function showSection(sectionId, isInitialLoad = false) {
        let sectionFound = false;
        contentSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
                sectionFound = true;
            } else {
                section.classList.remove('active');
            }
        });

        // Si la section demandée n'existe pas, afficher l'accueil
        if (!sectionFound && sectionId !== 'accueil') {
            showSection('accueil');
            return; // Sortir pour éviter les erreurs suivantes
        }

        // Mise à jour des liens du menu
        menuLinks.forEach(link => {
            const linkSection = link.getAttribute('data-section');
            if (linkSection === sectionId) {
                link.classList.add('current');
                // Marquer comme visité uniquement si ce n'est pas l'accueil
                 if(sectionId !== 'accueil'){
                     sectionVisits[sectionId] = true;
                     link.classList.add('visited');
                     // Ajouter l'icône check dynamiquement si pas déjà là
                    if (!link.querySelector('.fa-check')) {
                        const icon = document.createElement('i');
                        icon.className = 'fas fa-check';
                        link.appendChild(icon);
                    }
                 }
            } else {
                link.classList.remove('current');
            }
            // Assurer que l'icône est présente si visité, même si non courant
             if(sectionVisits[linkSection] && linkSection !== 'accueil' && !link.querySelector('.fa-check')){
                 const icon = document.createElement('i');
                 icon.className = 'fas fa-check';
                 link.appendChild(icon);
                 link.classList.add('visited');
             }
        });

        // Mettre à jour l'URL seulement si ce n'est pas le chargement initial (pour éviter boucle hashchange)
        if (!isInitialLoad && window.location.hash !== `#${sectionId}`) {
             window.location.hash = sectionId;
        }

        // Scroll vers le haut (sauf si c'est juste un changement de hash sans changement de page)
        if (!isInitialLoad) { // Optionnel: ne scroller que si la section change réellement
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        updateProgress();
        checkCompletion(); // Vérifier si le parcours est terminé
    }

    function updateProgress() {
        const visitedCount = Object.keys(sectionVisits).length;
        // Exclure l'accueil du calcul de progression si on veut
        const totalRelevantSections = totalNavLinks - 1; // Moins l'accueil
        const progressPercent = totalRelevantSections > 0 ? (visitedCount / totalRelevantSections) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${Math.min(progressPercent, 100)}%`; // Plafonne à 100%
        }
    }

    function updateScoreDisplays() {
        const currentTotal = calculateTotalScore();
        if (exerciseScoreDisplay) {
            exerciseScoreDisplay.textContent = `${exerciseScore}`;
        }
        if (quizScoreDisplay) {
            // Le score du quiz est mis à jour dans la logique du quiz
        }
        if (finalTotalScoreDisplay) {
             finalTotalScoreDisplay.textContent = `${currentTotal}`;
        }
        // Mettre à jour aussi le score affiché dans le quiz si la section est active
        const quizScoreSpan = document.getElementById('quizScoreDisplay');
         if(quizScoreSpan) {
             quizScoreSpan.textContent = `${currentTotal - exerciseScore} points`; // Affiche score quiz seul
         }
    }

    function calculateTotalScore() {
        // Le score total est la somme du score des exercices et du score du quiz (qui est dans totalScore - exerciseScore)
        // Pour simplifier, on garde une seule variable `totalScore` globale mise à jour partout
         return totalScore;
    }

     function applyFeedback(element, isCorrect) {
         element.classList.add('visible');
         if (isCorrect) {
             element.classList.remove('incorrect-feedback');
             element.classList.add('correct-feedback');
             element.classList.remove('feedback-shake'); // Retire l'ancienne animation si présente
             element.classList.add('feedback-pop');
         } else {
             element.classList.remove('correct-feedback');
             element.classList.add('incorrect-feedback');
             element.classList.remove('feedback-pop'); // Retire l'ancienne animation si présente
             element.classList.add('feedback-shake');
         }
         // Retire les classes d'animation après un délai
         setTimeout(() => {
             element.classList.remove('feedback-shake', 'feedback-pop');
         }, 500); // Durée de l'animation
     }

     // --- Logique des Convertisseurs ---
     function convertBinaryToDecimal() {
         const binaryInput = document.getElementById('binary-input').value.trim();
         const binaryOutput = document.getElementById('binary-output');
         if (!/^[01]+$/.test(binaryInput) || binaryInput.length === 0) {
             binaryOutput.innerHTML = "<span class='converter-error'>Entrée invalide (0 ou 1 uniquement).</span>";
             return;
         }
         const decimal = parseInt(binaryInput, 2);
         binaryOutput.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-dark);"></i> ${binaryInput}<sub>(2)</sub> = <strong>${decimal}</strong><sub>(10)</sub>`;
     }

     function convertDecimalToBinary() {
         const decimalInput = document.getElementById('decimal-input').value.trim();
         const decimalOutput = document.getElementById('decimal-output');
         if (!/^\d+$/.test(decimalInput) || decimalInput.length === 0) {
             decimalOutput.innerHTML = "<span class='converter-error'>Entrée invalide (entier positif requis).</span>";
             return;
         }
         const decimalValue = parseInt(decimalInput, 10);
         if(decimalValue > 1000000) { // Ajoute une limite raisonnable
              decimalOutput.innerHTML = "<span class='converter-error'>Nombre trop grand pour cet outil.</span>";
             return;
         }
         const binary = decimalValue.toString(2);
         decimalOutput.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-dark);"></i> ${decimalInput}<sub>(10)</sub> = <strong>${binary}</strong><sub>(2)</sub>`;
     }

    function convertTextToAscii() {
        const textInput = document.getElementById('text-input').value;
        const textOutput = document.getElementById('text-output');
        if (textInput.length === 0) {
            textOutput.innerHTML = "<span class='converter-error'>Veuillez entrer du texte.</span>";
            return;
        }
        let asciiCodes = [];
        for (let i = 0; i < textInput.length; i++) {
            asciiCodes.push(textInput.charCodeAt(i));
        }
        textOutput.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-dark);"></i> ${asciiCodes.join(' ')}`;
    }

    function convertAsciiToText() {
        const asciiInput = document.getElementById('ascii-input').value.trim();
        const asciiOutput = document.getElementById('ascii-output');
        if (!/^(\d+\s*)+$/.test(asciiInput) && asciiInput !== '') {
            asciiOutput.innerHTML = "<span class='converter-error'>Entrez des nombres (codes ASCII) séparés par des espaces.</span>";
            return;
        }
         if (asciiInput === '') {
             asciiOutput.innerHTML = ""; // Vide si l'entrée est vide
             return;
         }
        try {
            const codes = asciiInput.split(/\s+/).filter(code => code !== ''); // Filtre les espaces vides
            let text = '';
            let error = false;
            for (let i = 0; i < codes.length; i++) {
                 const codeNum = parseInt(codes[i]);
                 if(isNaN(codeNum) || codeNum < 0 || codeNum > 255) { // Validation plus stricte
                     error = true;
                     break;
                 }
                text += String.fromCharCode(codeNum);
            }
             if(error) {
                  asciiOutput.innerHTML = "<span class='converter-error'>Code(s) ASCII invalide(s) (0-255).</span>";
             } else {
                 asciiOutput.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-dark);"></i> <strong>${text}</strong>`;
             }
        } catch (e) {
            asciiOutput.innerHTML = "<span class='converter-error'>Erreur de conversion.</span>";
        }
    }

    // --- Logique des Exercices ---
    window.verifyAnswer = function(exerciseId, correctAnswer, points, buttonElement) {
        const answerInput = document.getElementById(`answer-${exerciseId}`);
        const feedbackDiv = document.getElementById(`feedback-${exerciseId}`);
        const userAnswer = answerInput.value.trim().toLowerCase(); // Ignore la casse
        correctAnswer = correctAnswer.toLowerCase();

        const alreadyAnsweredCorrectly = exercisePoints[exerciseId] > 0;

        if (userAnswer === correctAnswer) {
             feedbackDiv.textContent = "Correct !";
             applyFeedback(feedbackDiv, true);
             answerInput.disabled = true; // Désactive l'input après bonne réponse
            buttonElement.disabled = true; // Désactive le bouton
            buttonElement.style.opacity = '0.6';
             // Ajoute les points seulement si pas déjà répondu correctement
            if (!alreadyAnsweredCorrectly) {
                exercisePoints[exerciseId] = points;
                exerciseScore += points;
                totalScore += points; // Met à jour le score global
                updateScoreDisplays();
            }
        } else {
             feedbackDiv.textContent = `Incorrect. La bonne réponse était : ${correctAnswer}`;
             applyFeedback(feedbackDiv, false);
             // Ne désactive pas, permet de réessayer (mais les points ne sont gagnés qu'à la première bonne réponse)
        }
    }

    // --- Logique du Quiz ---
     function loadQuizQuestions() {
          // Définit les questions ici (au lieu de les mettre directement dans le HTML initial)
         quizQuestions = {
             easy: [
                 { question: "Que signifie 'bit' ?", options: ["Binary Digit", "Binary Integer", "Basic Input"], correct: 0, points: 5 },
                 { question: "Combien y a-t-il de chiffres dans le système binaire ?", options: ["1", "2", "8", "10"], correct: 1, points: 5 },
                 { question: "Convertir 10 (décimal) en binaire :", options: ["1000", "1010", "0010", "1110"], correct: 1, points: 5 }
             ],
             medium: [
                  { question: "Combien d'octets dans un kilooctet (informatique) ?", options: ["1000", "1024", "8", "2048"], correct: 1, points: 10 },
                  { question: "Code ASCII (décimal) pour 'a' minuscule ?", options: ["65", "97", "48", "32"], correct: 1, points: 10 },
                  { question: "1100 ET 1010 = ?", options: ["1000", "1110", "0110", "1010"], correct: 0, points: 10 }
             ],
             hard: [
                 { question: "Combien de couleurs distinctes avec 4 bits ?", options: ["8", "16", "4", "24"], correct: 1, points: 15 },
                 { question: "1011 XOR 0110 = ?", options: ["1101", "1001", "0110", "1111"], correct: 0, points: 15 },
                 { question: "Convertir 42 (décimal) en binaire ?", options: ["101010", "110010", "101001", "100101"], correct: 0, points: 15 }
             ]
         };
     }

    window.setQuizDifficulty = function(difficulty) {
        currentQuizDifficulty = difficulty;
        currentQuestionIndex = 0;

        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-difficulty') === difficulty);
        });

        displayCurrentQuestion();
    }

    function displayCurrentQuestion() {
        const quizContainer = document.getElementById('quiz-container');
        if (!currentQuizDifficulty || !quizQuestions[currentQuizDifficulty]) {
            quizContainer.innerHTML = '<p class="placeholder-text"><i class="fas fa-arrow-up"></i> Sélectionnez un niveau ci-dessus.</p>';
            return;
        }

        const questions = quizQuestions[currentQuizDifficulty];

        if (currentQuestionIndex >= questions.length) {
            quizContainer.innerHTML = `
                <div class="quiz-complete">
                    <h3><i class="fas fa-check-double"></i> Quiz ${getLevelName(currentQuizDifficulty)} Terminé !</h3>
                    <p>Bravo ! Vous avez répondu à toutes les questions de ce niveau.</p>
                    <button class="difficulty-btn" onclick="window.setQuizDifficulty('${currentQuizDifficulty}')">Recommencer ce niveau</button>
                </div>`;
             checkCompletion(); // Vérifie si tout est terminé
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        let optionsHTML = '';
        currentQuestion.options.forEach((option, index) => {
            optionsHTML += `
                <div class="quiz-option">
                    <input type="radio" id="option-${index}" name="quiz-answer" value="${index}">
                    <label for="option-${index}">${option}</label>
                </div>
            `;
        });

        quizContainer.innerHTML = `
            <h3>Question ${currentQuestionIndex + 1} / ${questions.length}</h3>
            <p class="question-text">${currentQuestion.question}</p>
            <div class="options-container">
                ${optionsHTML}
            </div>
            <button id="validate-quiz-btn"><i class="fas fa-check"></i> Valider</button>
            <div id="quiz-feedback" class="answer-feedback"></div>
        `;
        quizContainer.classList.remove('quiz-complete'); // Assure que la classe est retirée
    }

    function getLevelName(difficulty) {
        switch(difficulty) {
            case 'easy': return 'Débutant';
            case 'medium': return 'Intermédiaire';
            case 'hard': return 'Expert';
            default: return difficulty;
        }
    }

    window.checkQuizAnswer = function() {
        const selectedOption = document.querySelector('#quiz-container input[name="quiz-answer"]:checked');
        const feedbackDiv = document.getElementById('quiz-feedback');
        const validateButton = document.getElementById('validate-quiz-btn');

        if (!selectedOption) {
            feedbackDiv.textContent = "Veuillez sélectionner une réponse.";
            applyFeedback(feedbackDiv, false);
            return;
        }

         // Désactiver les options et le bouton pendant la vérification
         document.querySelectorAll('#quiz-container input[name="quiz-answer"]').forEach(input => input.disabled = true);
         if(validateButton) validateButton.disabled = true;


        const userAnswer = parseInt(selectedOption.value);
        const questionData = quizQuestions[currentQuizDifficulty][currentQuestionIndex];
        const correctAnswer = questionData.correct;
        const points = questionData.points;


        if (userAnswer === correctAnswer) {
            feedbackDiv.textContent = `Correct ! (+${points} points)`;
            applyFeedback(feedbackDiv, true);
            totalScore += points;
            updateScoreDisplays();

            // Passer à la question suivante
            setTimeout(() => {
                currentQuestionIndex++;
                displayCurrentQuestion();
            }, 1200); // Délai plus court pour bonne réponse

        } else {
            const correctAnswerText = questionData.options[correctAnswer];
             feedbackDiv.textContent = `Incorrect. La bonne réponse était : "${correctAnswerText}"`;
             applyFeedback(feedbackDiv, false);
             // Réactiver pour permettre de réessayer la même question ? Ou passer à la suivante ?
             // Pour l'instant, on passe à la suivante même si c'est faux après un délai
             setTimeout(() => {
                currentQuestionIndex++;
                displayCurrentQuestion();
            }, 2000); // Délai plus long pour mauvaise réponse
        }
    }

     // --- Complétion et Reset ---

     function checkCompletion() {
         const allSectionsVisited = Object.keys(sectionVisits).length >= totalRelevantSections;
         // On pourrait ajouter une condition sur le score ou la réussite du quiz si nécessaire
         if (allSectionsVisited && document.getElementById('quiz-interactif').classList.contains('active') && currentQuestionIndex >= quizQuestions[currentQuizDifficulty]?.length) {
             if(completionMessage) {
                 updateScoreDisplays(); // Assure que le score final est à jour
                 completionMessage.style.display = 'block';
                 completionMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
             }
         } else {
             if(completionMessage) completionMessage.style.display = 'none';
         }
     }

    window.resetProgress = function() {
        totalScore = 0;
        exerciseScore = 0;
        Object.keys(exercisePoints).forEach(key => exercisePoints[key] = 0); // Réinitialise points par exo
        Object.keys(sectionVisits).forEach(key => delete sectionVisits[key]); // Réinitialise visites
        currentQuizDifficulty = null;
        currentQuestionIndex = 0;

         // Réinitialiser l'UI
        document.querySelectorAll('.answer-feedback').forEach(fb => {
            fb.textContent = '';
            fb.className = 'answer-feedback'; // Retire classes correct/incorrect/visible
        });
        document.querySelectorAll('.question-container input[type="text"]').forEach(input => {
             input.value = '';
             input.disabled = false;
        });
        document.querySelectorAll('.question-container button').forEach(btn => {
             btn.disabled = false;
             btn.style.opacity = '1';
        });
        document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
         if(document.getElementById('quiz-container')) {
             document.getElementById('quiz-container').innerHTML = '<p class="placeholder-text"><i class="fas fa-info-circle"></i> Sélectionnez un niveau de difficulté pour commencer.</p>';
         }
         menuLinks.forEach(link => {
             link.classList.remove('visited', 'current');
             const icon = link.querySelector('.fa-check');
             if(icon) icon.remove();
         });
         if(completionMessage) completionMessage.style.display = 'none';

         updateScoreDisplays();
         updateProgress();
         showSection('accueil', true); // Retour à l'accueil
         window.location.hash = ''; // Nettoie le hash
    }


}); // Fin de DOMContentLoaded