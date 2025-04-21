document.addEventListener('DOMContentLoaded', () => {

    const exerciseData = {
        materiel: {
            qcm: [ { q: "Quel est le 'cerveau' de l'ordinateur ?", o: ["La mémoire RAM", "Le disque dur", "Le processeur (CPU)", "La carte mère"], a: 2 }, { q: "Lequel de ces éléments est un périphérique d'ENTRÉE ?", o: ["L'écran", "L'imprimante", "Le clavier", "Les haut-parleurs"], a: 2 }, { q: "Quelle mémoire perd ses données quand l'ordinateur est éteint ?", o: ["Le disque SSD", "La mémoire RAM", "La clé USB", "Le disque dur HDD"], a: 1 }, { q: "À quoi sert principalement une imprimante ?", o: ["Afficher des images à l'écran", "Produire une version papier des documents", "Enregistrer du son", "Se connecter à Internet"], a: 1 }, { q: "Quel est le rôle principal de l'Unité Centrale (UC) ?", o: ["Afficher des vidéos", "Contenir les composants essentiels et traiter l'information", "Stocker des fichiers temporairement comme la RAM", "Imprimer des documents"], a: 1 } ],
            assoc: [ { term: "Souris", def: "Pointer, cliquer, sélectionner" }, { term: "Écran", def: "Afficher les informations visuelles" }, { term: "Disque Dur / SSD", def: "Stocker les données durablement" } ],
            pendu: [ { word: "PERIPHERIQUE", help: "Appareil connecté à l'unité centrale pour ajouter des fonctions" }, { word: "PROCESSEUR", help: "Composant qui effectue tous les calculs, le 'cerveau'" } ],
            memory1: [ { q: "Clavier", a: "Périphérique d'entrée" }, { q: "Écran", a: "Périphérique de sortie" }, { q: "RAM", a: "Mémoire vive (volatile)" }, { q: "SSD", a: "Stockage permanent rapide" }, { q: "Webcam", a: "Périphérique d'entrée" }, { q: "Imprimante", a: "Périphérique de sortie" }, { q: "Microphone", a: "Périphérique d'entrée" }, { q: "Clé USB", a: "Périphérique Entrée/Sortie" } ],
            memory2: [ { q: "CPU", a: "Cerveau de l'ordinateur" }, { q: "RAM", a: "Mémoire à court terme" }, { q: "SSD", a: "Disque sans pièces mobiles" }, { q: "HDD", a: "Disque dur mécanique" }, { q: "OS", a: "Système d'exploitation" }, { q: "UC", a: "Unité Centrale (boîtier)" }, { q: "Ko", a: "Kilo-octet (~1000 octets)" }, { q: "Go", a: "Giga-octet (~1 milliard octets)" } ]
        },
        fichiers: {
             qcm: [ { q: "Comment appelle-t-on une 'boîte' virtuelle pour ranger ses fichiers ?", o: ["Un fichier", "Une icône", "Un dossier", "Une extension"], a: 2 }, { q: "L'extension `.docx` correspond généralement à quel type de fichier ?", o: ["Image", "Musique", "Document texte (Word)", "Vidéo"], a: 2 }, { q: "Qu'est-ce que l'arborescence ?", o: ["Le nom d'un fichier", "La structure hiérarchique des dossiers", "La corbeille de l'ordinateur", "Un type de mémoire"], a: 1 }, { q: "Que signifie 'supprimer' un fichier (avant de vider la corbeille) ?", o: ["Le renommer", "Le déplacer dans la corbeille", "Le copier sur une clé USB", "L'effacer définitivement"], a: 1 }, { q: "Quel terme désigne le stockage de fichiers sur des serveurs distants via Internet ?", o: ["Disque local", "Cloud Computing", "Périphérique externe", "Arborescence"], a: 1 } ],
            assoc: [ { term: "Fichier", def: "Unité d'information numérique (texte, image...)" }, { term: "Extension", def: "Suffixe qui indique le type de fichier (.jpg, .txt...)" }, { term: "Corbeille", def: "Emplacement temporaire des fichiers supprimés" } ],
            pendu: [ { word: "ARBORESCENCE", help: "Structure des dossiers comme les branches d'un arbre" }, { word: "EXTENSION", help: "Les lettres après le point dans un nom de fichier" } ],
            memory1: [ { q: ".jpg", a: "Image" }, { q: ".mp3", a: "Audio (Musique)" }, { q: ".txt", a: "Texte simple" }, { q: ".pdf", a: "Document (Portable)" }, { q: ".xlsx", a: "Tableur (Excel)" }, { q: ".pptx", a: "Présentation (PowerPoint)" }, { q: ".zip", a: "Archive compressée" }, { q: ".exe", a: "Programme (Windows)" } ],
            memory2: [ { q: "Renommer", a: "Changer le nom" }, { q: "Copier", a: "Créer un double" }, { q: "Couper", a: "Déplacer (préparation)" }, { q: "Coller", a: "Finaliser déplacement/copie" }, { q: "Dossier", a: "Conteneur de fichiers" }, { q: "Cloud", a: "Stockage en ligne" }, { q: "Sauvegarde", a: "Copie de sécurité" }, { q: "Chemin", a: "Adresse complète du fichier" } ]
        },
        internet: {
             qcm: [ { q: "Comment s'appelle le logiciel utilisé pour consulter les sites web ?", o: ["Moteur de recherche", "Navigateur", "Serveur", "Protocole"], a: 1 }, { q: "Qu'est-ce qu'une URL ?", o: ["Un type de virus", "L'adresse unique d'une page web", "Un langage de programmation", "Le nom du fournisseur d'accès"], a: 1 }, { q: "Qui est considéré comme l'inventeur principal du World Wide Web ?", o: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Vint Cerf"], a: 2 }, { q: "Quel est le rôle principal d'un moteur de recherche ?", o: ["Héberger des sites web", "Fournir la connexion Internet", "Trouver des informations sur le Web", "Afficher les pages web"], a: 2 }, { q: "Internet et le World Wide Web sont :", o: ["Exactement la même chose", "Différents : Internet est le réseau, le Web est un service dessus", "Deux navigateurs concurrents", "Des types de câbles réseau"], a: 1 } ],
            assoc: [ { term: "Adresse IP", def: "Numéro unique d'un appareil sur le réseau" }, { term: "Hyperlien", def: "Élément cliquable reliant des pages" }, { term: "Serveur", def: "Ordinateur qui héberge un site web" } ],
            pendu: [ { word: "NAVIGATEUR", help: "Logiciel pour surfer sur le Web (Chrome, Firefox...)" }, { word: "HYPERLIEN", help: "Texte ou image sur lequel on clique pour aller ailleurs" } ],
            memory1: [ { q: "Navigateur", a: "Afficher pages web" }, { q: "Moteur Recherche", a: "Trouver sites" }, { q: "URL", a: "Adresse web (http...)" }, { q: "Serveur", a: "Stocker site web" }, { q: "FAI", a: "Fournisseur Accès Internet" }, { q: "Email", a: "Courrier électronique" }, { q: "Wifi", a: "Réseau sans fil" }, { q: "HTML", a: "Langage pages web" } ],
            memory2: [ { q: "HTTP/HTTPS", a: "Protocole du Web" }, { q: "Adresse IP", a: "Identification numérique" }, { q: "DNS", a: "Annuaire du Web (nom <-> IP)" }, { q: "Paquet", a: "Unité de donnée réseau" }, { q: "Routeur", a: "Aiguilleur de données" }, { q: "ARPANET", a: "Ancêtre d'Internet" }, { q: "WWW", a: "World Wide Web" }, { q: "Tim Berners-Lee", a: "Inventeur du Web" } ]
        },
        securite: {
             qcm: [ { q: "Quelle est la caractéristique la plus importante d'un bon mot de passe ?", o: ["Être court et facile à retenir", "Contenir son nom ou sa date de naissance", "Être complexe et unique pour chaque site", "Être écrit sur un post-it"], a: 2 }, { q: "Que signifie le cadenas dans la barre d'adresse ?", o: ["Le site est très populaire", "La connexion est chiffrée (HTTPS)", "Le site nécessite un mot de passe", "Le site contient des jeux"], a: 1 }, { q: "Le 'Phishing' (ou hameçonnage) vise à :", o: ["Installer un antivirus", "Réparer les bugs", "Voler des informations personnelles par ruse", "Accélérer la connexion"], a: 2 }, { q: "Quel type de logiciel malveillant peut se copier lui-même ?", o: ["Un Cookie", "Un Pare-feu", "Un Virus", "Un Pseudonyme"], a: 2 }, { q: "Pourquoi limiter le partage d'infos personnelles ?", o: ["Pour ne pas rendre jaloux", "Car ça prend trop de place", "Pour éviter l'usurpation d'identité ou le harcèlement", "Pour que les sites web fonctionnent plus vite"], a: 2 } ],
            assoc: [ { term: "Antivirus", def: "Protège contre les malwares" }, { term: "HTTPS", def: "Connexion web sécurisée (chiffrée)" }, { term: "Pseudonyme", def: "Protéger son identité réelle" } ],
            pendu: [ { word: "ANTIVIRUS", help: "Logiciel qui détecte et supprime les programmes nuisibles" }, { word: "PHISHING", help: "Arnaque en ligne pour récupérer mots de passe ou infos bancaires" } ],
            memory1: [ { q: "Mot de passe", a: "Unique et complexe" }, { q: "Données perso", a: "Réfléchir avant publier" }, { q: "Email suspect", a: "Ne pas cliquer liens" }, { q: "Wifi Public", a: "Utiliser avec méfiance" }, { q: "Téléchargement", a: "Vérifier la source" }, { q: "Antivirus", a: "Mettre à jour" }, { q: "HTTPS", a: "Vérifier cadenas" }, { q: "Harcèlement", a: "Bloquer et signaler" } ],
            memory2: [ { q: "Malware", a: "Logiciel malveillant" }, { q: "Virus", a: "S'auto-réplique" }, { q: "Phishing", a: "Hameçonnage (vol d'infos)" }, { q: "Pare-feu", a: "Filtre le réseau" }, { q: "Cookie", a: "Petit fichier traceur" }, { q: "Pseudonyme", a: "Faux nom" }, { q: "Chiffrement", a: "Rendre illisible sans clé" }, { q: "Spam", a: "Courrier indésirable" } ]
        }
    };

    let totalScore = 0;
    const themeScores = {
        materiel: 0,
        fichiers: 0,
        internet: 0,
        securite: 0
    };

    // --- Utility Functions ---
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function updateScores() {
        for (const theme in themeScores) {
            const scoreSpan = document.getElementById(`score-${theme}`);
            if (scoreSpan) {
                scoreSpan.textContent = themeScores[theme];
            }
        }
        const globalScoreSpan = document.getElementById('score-global');
        if (globalScoreSpan) {
            globalScoreSpan.textContent = totalScore;
        }
    }

    // --- QCM Logic ---
    function initQCM(theme) {
        const qcmData = exerciseData[theme]?.qcm;
        const containerId = `${theme}-qcm`;
        const container = document.getElementById(containerId);
        if (!qcmData || !container) return;

        const contentDiv = container.querySelector('.qcm-content');
        const submitButton = container.querySelector('.qcm-submit');
        const feedbackDiv = container.querySelector('.qcm-feedback');
        contentDiv.innerHTML = ''; // Clear previous content
        const correctAnswers = []; // Store correct answer indices for checking

        qcmData.forEach((qData, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('qcm-question');
            questionDiv.setAttribute('data-question-index', index);

            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${qData.q}`;
            questionDiv.appendChild(questionText);

            // Shuffle options and keep track of the correct answer's new index
            const optionsWithIndices = qData.o.map((option, i) => ({ text: option, originalIndex: i }));
            const shuffledOptions = shuffleArray([...optionsWithIndices]);

            const correctAnswerOriginalIndex = qData.a;
            let correctAnswerNewIndex = -1;

            shuffledOptions.forEach((optionData, optionIndex) => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `${theme}-q${index}`;
                input.value = optionData.originalIndex; // Use original index as value
                input.id = `${theme}-q${index}-o${optionIndex}`;

                label.htmlFor = input.id;
                label.appendChild(input);
                label.appendChild(document.createTextNode(` ${optionData.text}`));
                questionDiv.appendChild(label);

                if (optionData.originalIndex === correctAnswerOriginalIndex) {
                    correctAnswerNewIndex = optionIndex; // Store the shuffled index
                }
            });

            correctAnswers.push(correctAnswerOriginalIndex); // Store the ORIGINAL index of the correct answer
            contentDiv.appendChild(questionDiv);
        });

        submitButton.onclick = () => checkQCM(theme, correctAnswers);
        submitButton.disabled = false;
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'qcm-feedback feedback'; // Reset feedback class
    }

    function checkQCM(theme, correctAnswers) {
        const containerId = `${theme}-qcm`;
        const container = document.getElementById(containerId);
        const contentDiv = container.querySelector('.qcm-content');
        const feedbackDiv = container.querySelector('.qcm-feedback');
        const submitButton = container.querySelector('.qcm-submit');
        const questions = contentDiv.querySelectorAll('.qcm-question');
        let score = 0;
        let answeredCount = 0;

        questions.forEach((questionDiv, index) => {
            const selectedInput = questionDiv.querySelector(`input[name="${theme}-q${index}"]:checked`);
            const labels = questionDiv.querySelectorAll('label');
            const inputs = questionDiv.querySelectorAll('input[type="radio"]');
            const correctAnswerValue = correctAnswers[index];

            inputs.forEach(input => input.disabled = true); // Disable all inputs for this question

            if (selectedInput) {
                answeredCount++;
                const selectedValue = parseInt(selectedInput.value, 10);
                const selectedLabel = selectedInput.parentElement; // Get the label containing the selected input
                 selectedLabel.classList.add('user-selected');

                if (selectedValue === correctAnswerValue) {
                    score++;
                    selectedLabel.classList.add('correct-answer');
                } else {
                    selectedLabel.classList.add('incorrect-answer');
                    // Also highlight the correct answer if the user was wrong
                    labels.forEach(label => {
                        const input = label.querySelector('input');
                        if (parseInt(input.value, 10) === correctAnswerValue) {
                            label.classList.add('correct-answer');
                        }
                    });
                }
            } else {
                 // No answer selected, highlight the correct one
                 labels.forEach(label => {
                        const input = label.querySelector('input');
                        if (parseInt(input.value, 10) === correctAnswerValue) {
                            label.classList.add('correct-answer');
                        }
                    });
            }
        });

        themeScores[theme] += score;
        totalScore += score;
        updateScores();

        feedbackDiv.textContent = `Vous avez obtenu ${score} sur ${correctAnswers.length} points pour ce QCM.`;
        feedbackDiv.classList.add(score === correctAnswers.length ? 'correct' : 'incorrect');
        submitButton.disabled = true;
    }


    // --- Association Logic (Click-based) ---
    const assocState = {}; // Store state for each association game

    function initAssoc(theme) {
        const assocData = exerciseData[theme]?.assoc;
        const containerId = `${theme}-assoc`;
        const container = document.getElementById(containerId);
        if (!assocData || !container) return;

        const col1 = document.getElementById(`${theme}-assoc-col1`);
        const col2 = document.getElementById(`${theme}-assoc-col2`);
        const submitButton = container.querySelector('.assoc-submit');
        const feedbackDiv = container.querySelector('.assoc-feedback');

        col1.innerHTML = '';
        col2.innerHTML = '';

        const terms = assocData.map((item, index) => ({ text: item.term, id: index, type: 'term' }));
        const defs = assocData.map((item, index) => ({ text: item.def, id: index, type: 'def' }));

        shuffleArray(terms).forEach(item => createAssocItem(item, col1, theme));
        shuffleArray(defs).forEach(item => createAssocItem(item, col2, theme));

        // Initialize state for this theme
        assocState[theme] = {
            selectedItem: null,
            associations: {} // Stores attempted pairs { termId: defId }
        };

        submitButton.onclick = () => checkAssoc(theme);
        submitButton.disabled = false;
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'assoc-feedback feedback'; // Reset feedback class
        container.querySelectorAll('.assoc-item').forEach(item => item.classList.remove('disabled', 'selected', 'associated-correct', 'associated-incorrect'));
    }

    function createAssocItem(itemData, column, theme) {
        const div = document.createElement('div');
        div.classList.add('assoc-item');
        div.textContent = itemData.text;
        div.dataset.id = itemData.id;
        div.dataset.type = itemData.type; // 'term' or 'def'
        div.onclick = (event) => handleAssocClick(event, theme);
        column.appendChild(div);
    }

    function handleAssocClick(event, theme) {
        const clickedItem = event.target;
        if (clickedItem.classList.contains('disabled')) return; // Ignore clicks if disabled

        const state = assocState[theme];
        const clickedId = clickedItem.dataset.id;
        const clickedType = clickedItem.dataset.type;

        if (!state.selectedItem) {
            // Nothing selected, select this item
            clickedItem.classList.add('selected');
            state.selectedItem = clickedItem;
        } else {
            // Something is already selected
            const selectedType = state.selectedItem.dataset.type;

            if (selectedType === clickedType) {
                // Clicked same type, deselect old and select new
                state.selectedItem.classList.remove('selected');
                clickedItem.classList.add('selected');
                state.selectedItem = clickedItem;
            } else {
                // Clicked different type, attempt association
                const termItem = (clickedType === 'term') ? clickedItem : state.selectedItem;
                const defItem = (clickedType === 'def') ? clickedItem : state.selectedItem;
                const termId = termItem.dataset.id;
                const defId = defItem.dataset.id;

                // Store the association attempt
                state.associations[termId] = defId;

                // Provide visual feedback (optional: could add temporary link class)
                console.log(`Associated: Term ${termId} with Def ${defId}`);

                // Deselect both
                state.selectedItem.classList.remove('selected');
                clickedItem.classList.remove('selected');
                state.selectedItem = null;

                 // Optional: Visually disable paired items until validation?
                 // termItem.classList.add('paired'); // Add custom class if needed
                 // defItem.classList.add('paired');
            }
        }
    }

    function checkAssoc(theme) {
        const assocData = exerciseData[theme].assoc;
        const containerId = `${theme}-assoc`;
        const container = document.getElementById(containerId);
        const feedbackDiv = container.querySelector('.assoc-feedback');
        const submitButton = container.querySelector('.assoc-submit');
        const items = container.querySelectorAll('.assoc-item');
        const state = assocState[theme];
        let score = 0;

        // Disable all items and remove selection
        items.forEach(item => {
            item.classList.add('disabled');
            item.classList.remove('selected');
            item.onclick = null; // Remove click handler
        });

        // Check associations
        for (const termId in state.associations) {
            const associatedDefId = state.associations[termId];
            // The correct definition ID is the same as the term ID in the original data
            if (parseInt(associatedDefId, 10) === parseInt(termId, 10)) {
                score++;
                // Mark both correct items
                container.querySelector(`.assoc-item[data-type="term"][data-id="${termId}"]`).classList.add('associated-correct');
                container.querySelector(`.assoc-item[data-type="def"][data-id="${associatedDefId}"]`).classList.add('associated-correct');
            } else {
                 // Mark both incorrect items
                container.querySelector(`.assoc-item[data-type="term"][data-id="${termId}"]`).classList.add('associated-incorrect');
                container.querySelector(`.assoc-item[data-type="def"][data-id="${associatedDefId}"]`).classList.add('associated-incorrect');
            }
        }

         // Mark unassociated items as incorrect (optional, depends on desired feedback)
        assocData.forEach((_, index) => {
            if (!(index in state.associations)) {
                 const termItem = container.querySelector(`.assoc-item[data-type="term"][data-id="${index}"]`);
                 const defItem = container.querySelector(`.assoc-item[data-type="def"][data-id="${index}"]`); // Find the correct def
                 if (termItem && !termItem.classList.contains('associated-correct')) termItem.classList.add('associated-incorrect');
                 if (defItem && !defItem.classList.contains('associated-correct')) defItem.classList.add('associated-incorrect'); // Mark the correct def if it wasn't matched
            }
        });


        themeScores[theme] += score;
        totalScore += score;
        updateScores();

        feedbackDiv.textContent = `Vous avez obtenu ${score} sur ${assocData.length} points pour cette association.`;
        feedbackDiv.classList.add(score === assocData.length ? 'correct' : 'incorrect');
        submitButton.disabled = true;
    }


    // --- Pendu Logic ---
    const penduState = {}; // Store state for each hangman game

    function initPendu(theme, gameNum) {
        const penduData = exerciseData[theme]?.pendu[gameNum - 1];
        const containerId = `${theme}-pendu${gameNum}`;
        const container = document.getElementById(containerId);
        if (!penduData || !container) return;

        const wordDiv = container.querySelector('.pendu-word');
        const lettersDiv = container.querySelector('.pendu-letters');
        const attemptsSpan = container.querySelector('.pendu-attempts span');
        const feedbackDiv = container.querySelector('.pendu-feedback');
        const helpButton = container.querySelector('.pendu-help-button');
        const helpTextDiv = container.querySelector('.pendu-help-text');

        const wordToGuess = penduData.word.toUpperCase();
        const helpText = penduData.help;

        // Initialize state
        penduState[containerId] = {
            word: wordToGuess,
            guessedLetters: new Set(),
            attemptsLeft: 5,
            wordState: Array(wordToGuess.length).fill('_'),
            gameOver: false
        };

        wordDiv.textContent = penduState[containerId].wordState.join(' ');
        attemptsSpan.textContent = penduState[containerId].attemptsLeft;
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'pendu-feedback feedback'; // Reset feedback class
        helpTextDiv.textContent = `Indice : ${helpText}`;
        helpTextDiv.style.display = 'none'; // Hide help initially
        helpButton.disabled = false;
        helpButton.onclick = () => showPenduHelp(containerId);

        // Generate letter buttons
        lettersDiv.innerHTML = ''; // Clear previous buttons
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (const letter of alphabet) {
            const button = document.createElement('button');
            button.classList.add('pendu-letter-button');
            button.textContent = letter;
            button.onclick = () => handlePenduGuess(containerId, letter, button);
            lettersDiv.appendChild(button);
        }
    }

    function handlePenduGuess(containerId, letter, btnElement) {
        const state = penduState[containerId];
        if (state.gameOver || state.guessedLetters.has(letter)) {
            return; // Ignore if game over or letter already guessed
        }

        state.guessedLetters.add(letter);
        btnElement.disabled = true; // Disable the clicked button

        if (state.word.includes(letter)) {
            // Correct guess
            let correctGuess = false;
            for (let i = 0; i < state.word.length; i++) {
                if (state.word[i] === letter) {
                    state.wordState[i] = letter;
                    correctGuess = true;
                }
            }
            // Update word display
            const wordDiv = document.querySelector(`#${containerId} .pendu-word`);
            wordDiv.textContent = state.wordState.join(' ');

            // Check for win
            if (!state.wordState.includes('_')) {
                endPenduGame(containerId, true);
            }
        } else {
            // Incorrect guess
            state.attemptsLeft--;
            const attemptsSpan = document.querySelector(`#${containerId} .pendu-attempts span`);
            attemptsSpan.textContent = state.attemptsLeft;

            // Check for loss
            if (state.attemptsLeft <= 0) {
                endPenduGame(containerId, false);
            }
        }
    }

    function showPenduHelp(containerId) {
        const container = document.getElementById(containerId);
        const helpTextDiv = container.querySelector('.pendu-help-text');
        const helpButton = container.querySelector('.pendu-help-button');
        helpTextDiv.style.display = 'block';
        helpButton.disabled = true; // Disable after showing
    }

    function endPenduGame(containerId, isWin) {
        const state = penduState[containerId];
        state.gameOver = true;

        const container = document.getElementById(containerId);
        const feedbackDiv = container.querySelector('.pendu-feedback');
        const letterButtons = container.querySelectorAll('.pendu-letter-button');
        const helpButton = container.querySelector('.pendu-help-button');
        const wordDiv = container.querySelector('.pendu-word');

        letterButtons.forEach(button => button.disabled = true); // Disable all letter buttons
        helpButton.disabled = true; // Disable help button

        const theme = containerId.split('-')[0]; // Extract theme name
        let score = 0;

        if (isWin) {
            score = 3;
            feedbackDiv.textContent = `Gagné ! Le mot était bien "${state.word}". (+${score} points)`;
            feedbackDiv.classList.add('correct');
        } else {
            score = 0;
            feedbackDiv.textContent = `Perdu... Le mot était "${state.word}".`;
            feedbackDiv.classList.add('incorrect');
            wordDiv.textContent = state.word.split('').join(' '); // Reveal the word
        }

        themeScores[theme] += score;
        totalScore += score;
        updateScores();
    }


    // --- Memory Logic ---
    const memoryState = {}; // Store state for each memory game

    function initMemory(theme, gameNum) {
        const memoryData = exerciseData[theme]?.[`memory${gameNum}`];
        const containerId = `${theme}-memory${gameNum}`;
        const container = document.getElementById(containerId);
        if (!memoryData || !container) return;

        const grid = container.querySelector('.memory-grid');
        const timerSpan = container.querySelector('.time-value');
        const feedbackDiv = container.querySelector('.memory-feedback');

        grid.innerHTML = ''; // Clear previous grid
        timerSpan.textContent = '0s';
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'memory-feedback feedback'; // Reset feedback class

        // Create card pairs
        const cards = [];
        memoryData.forEach((pair, index) => {
            cards.push({ content: pair.q, pairId: index, type: 'q' });
            cards.push({ content: pair.a, pairId: index, type: 'a' });
        });

        shuffleArray(cards);

        // Initialize state
        memoryState[containerId] = {
            flippedCards: [],
            matchedPairs: 0,
            totalPairs: memoryData.length,
            timerInterval: null,
            seconds: 0,
            gameActive: false, // Game starts on first flip
            lockBoard: false // Prevent flipping during check/animation
        };

        // Create card elements
        cards.forEach(cardData => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.pairId = cardData.pairId;
            // cardElement.dataset.type = cardData.type; // Optional: if needed

            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-face card-front"></div>
                    <div class="card-face card-back">${cardData.content}</div>
                </div>
            `;
            cardElement.addEventListener('click', () => handleCardFlip(cardElement, containerId));
            grid.appendChild(cardElement);
        });
    }

    function handleCardFlip(cardElement, containerId) {
        const state = memoryState[containerId];

        // Ignore click if board locked, card already flipped, or card already matched
        if (state.lockBoard || cardElement.classList.contains('is-flipped') || cardElement.classList.contains('matched')) {
            return;
        }

        // Start timer on first flip
        if (!state.gameActive) {
            startTimer(containerId);
            state.gameActive = true;
        }

        cardElement.classList.add('is-flipped');
        state.flippedCards.push(cardElement);

        if (state.flippedCards.length === 2) {
            // Two cards flipped, check for match
            checkForMatch(containerId);
        }
    }

     function startTimer(containerId) {
        const state = memoryState[containerId];
        const timerSpan = document.querySelector(`#${containerId} .time-value`);
        if (state.timerInterval) clearInterval(state.timerInterval); // Clear existing timer if any

        state.seconds = 0;
        timerSpan.textContent = `${state.seconds}s`; // Reset display

        state.timerInterval = setInterval(() => {
            state.seconds++;
            timerSpan.textContent = `${state.seconds}s`;
        }, 1000);
    }

    function stopTimer(containerId) {
        const state = memoryState[containerId];
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    function checkForMatch(containerId) {
        const state = memoryState[containerId];
        state.lockBoard = true; // Lock board while checking

        const [card1, card2] = state.flippedCards;
        const isMatch = card1.dataset.pairId === card2.dataset.pairId;

        if (isMatch) {
            // It's a match!
            card1.classList.add('matched');
            card2.classList.add('matched');
            // Optional: Remove event listeners if desired, but 'matched' class check should suffice
            // card1.removeEventListener('click', handleCardFlip);
            // card2.removeEventListener('click', handleCardFlip);

            state.matchedPairs++;
            state.flippedCards = []; // Reset flipped cards
            state.lockBoard = false; // Unlock board

            // Check for win
            if (state.matchedPairs === state.totalPairs) {
                endMemoryGame(containerId);
            }
        } else {
            // Not a match
            card1.classList.add('incorrect-match');
            card2.classList.add('incorrect-match');

            setTimeout(() => {
                card1.classList.remove('is-flipped', 'incorrect-match');
                card2.classList.remove('is-flipped', 'incorrect-match');
                state.flippedCards = []; // Reset flipped cards
                state.lockBoard = false; // Unlock board
            }, 1000); // Wait 1 second before flipping back
        }
    }

    function endMemoryGame(containerId) {
        const state = memoryState[containerId];
        stopTimer(containerId);
        state.gameActive = false; // Mark game as inactive

        const container = document.getElementById(containerId);
        const feedbackDiv = container.querySelector('.memory-feedback');
        const theme = containerId.split('-')[0]; // Extract theme name

        // Calculate score based on time
        let score = 1; // Base point
        if (state.seconds < 90) score++;
        if (state.seconds < 60) score++;

        themeScores[theme] += score;
        totalScore += score;
        updateScores();

        feedbackDiv.textContent = `Terminé en ${state.seconds} secondes ! Score : +${score} point(s).`;
        feedbackDiv.classList.add('correct');

         // Optional: Disable further clicks on the grid (though matched class should prevent flips)
        container.querySelector('.memory-grid').style.pointerEvents = 'none';
    }


    // --- Initialization ---
    function initAllExercises() {
        const themes = Object.keys(exerciseData);
        themes.forEach(theme => {
            initQCM(theme);
            initAssoc(theme);
            initPendu(theme, 1);
            initPendu(theme, 2);
            initMemory(theme, 1);
            initMemory(theme, 2);
        });
        updateScores(); // Initialize score display
    }

    // Start everything
    initAllExercises();

}); // End DOMContentLoaded
