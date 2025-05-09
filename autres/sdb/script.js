// Les segments de la phrase finale, dans l'ordre correct de la phrase
const indicesSecretsCorrectOrder = [
    "Vouloir",      // 0
    "être",         // 1
    "libre,",       // 2
    "c'est",        // 3
    "aussi",        // 4
    "vouloir",      // 5
    "les",          // 6
    "autres",       // 7
    "libres."       // 8
];
const citationFinaleCorrecte = "Vouloir être libre, c'est aussi vouloir les autres libres.";

// Détermine quel segment de `indicesSecretsCorrectOrder` est révélé par quel défi (index 0 = Défi 1, etc.)
const challengeToSecretMapping = [3, 0, 5, 1, 8, 2, 6, 7, 4]; // Ordre mélangé des indices à révéler

const gameState = {
    currentPage: 0,
    totalChallenges: 9,
    collectedIndices: new Array(indicesSecretsCorrectOrder.length).fill(null), 
    citationAttempts: 0, 
    newlyRevealedIndex: -1,
    dyslexiaFontEnabled: false
};

// --- Affichage de la Phrase de Progression ---
function afficherPhraseEnCours() {
    const phraseContainerId = `phrase-a-reconstituer-display-${gameState.currentPage}`;
    const phraseContainer = document.getElementById(phraseContainerId);

    if (phraseContainer) {
        const previouslyAnimated = phraseContainer.querySelector('.animate-mot-revele');
        if (previouslyAnimated) previouslyAnimated.classList.remove('animate-mot-revele');

        let html = "";
        indicesSecretsCorrectOrder.forEach((segment, correctSentenceIndex) => {
            if (gameState.collectedIndices[correctSentenceIndex]) { 
                html += `<span class="mot-revele">${gameState.collectedIndices[correctSentenceIndex]}</span>`;
            } else {
                let tirets = segment.split('').map(char => {
                    if (char === ',' || char === '.' || char === "'") return char; 
                    return '_';
                }).join('');
                html += `<span class="placeholder-tiret">${tirets}</span>`;
            }
            if (correctSentenceIndex < indicesSecretsCorrectOrder.length - 1) {
                html += ' ';
            }
        });
        phraseContainer.innerHTML = html;

        if (gameState.newlyRevealedIndex !== -1 && gameState.collectedIndices[gameState.newlyRevealedIndex]) {
            const revealedSpans = phraseContainer.querySelectorAll('.mot-revele');
            let currentRevealedCount = 0;
            let spanToAnimate = null;
            for(let i = 0; i < indicesSecretsCorrectOrder.length; i++) {
                if (gameState.collectedIndices[i]) {
                    if (i === gameState.newlyRevealedIndex) {
                        spanToAnimate = revealedSpans[currentRevealedCount]; 
                        break; 
                    }
                    currentRevealedCount++;
                }
            }
            if (spanToAnimate) {
                void spanToAnimate.offsetWidth; 
                spanToAnimate.classList.add('animate-mot-revele');
            }
            gameState.newlyRevealedIndex = -1; 
        }
    }

    if (gameState.currentPage === gameState.totalChallenges + 1) { 
        const indicesCollectesSpan = document.getElementById('indices-collectes');
        if (indicesCollectesSpan) {
            indicesCollectesSpan.textContent = gameState.collectedIndices.filter(Boolean).join(' ');
        }
    }
}

// --- Barre de Progression ---
function updateProgressBar() {
    const completedChallenges = gameState.collectedIndices.filter(Boolean).length;
    const percentage = (completedChallenges / gameState.totalChallenges) * 100;
    
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressBarContainer = document.getElementById('progress-bar-container');

    if (progressBarFill) {
        progressBarFill.style.width = percentage + '%';
    }
    if (progressBarContainer) { 
        progressBarContainer.setAttribute('aria-valuenow', completedChallenges);
    }

    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.textContent = `${completedChallenges} / ${gameState.totalChallenges} Défis`;
    }
}

// --- Navigation ---
function showPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active-page');
        gameState.currentPage = pageNumber;
        
        if (pageNumber === 2) initPendu(); 
        if (pageNumber === 7) initMotsMeles(); 

        afficherPhraseEnCours(); 
        updateProgressBar();

        const pageContentElements = targetPage.querySelectorAll(
            '.page-content > p, .page-content > ul, .page-content > form, .page-content > div:not(#motsmeles-grille-container):not(.accessibility-options), .page-content > .actions-defi, .page-content > .actions-defi > button, .page-content > input[type="text"], .page-content > select, .page-content .motsmeles-instructions, .blanks-defi6, .accessibility-options'
        );
        
        pageContentElements.forEach(el => {
            el.style.opacity = '0'; 
            el.style.transform = 'translateY(10px)'; 
            el.style.animation = 'none'; 
        });

        void targetPage.offsetWidth;

        setTimeout(() => { 
            pageContentElements.forEach((el, index) => {
                if (el.tagName && el.tagName.toLowerCase() === 'br') {
                    el.style.opacity = '1'; 
                    el.style.transform = 'translateY(0)';
                } else {
                    el.style.animation = `fadeInElement 0.4s ease-out ${index * 0.05}s forwards`;
                }
            });
        }, 10); 

    } else {
        console.error("Page not found: " + pageNumber);
    }
}

function startGame() {
    const progressBarContainer = document.getElementById('progress-bar-container');
    if (progressBarContainer) {
        progressBarContainer.setAttribute('aria-valuenow', 0);
        progressBarContainer.setAttribute('aria-valuemin', 0);
        progressBarContainer.setAttribute('aria-valuemax', gameState.totalChallenges);
    }
    updateProgressBar(); 
    const introPhraseContainer = document.getElementById('phrase-a-reconstituer-display-0');
    if (introPhraseContainer) { 
        let html = "";
        indicesSecretsCorrectOrder.forEach((segment, index) => {
            let tirets = segment.split('').map(char => (char === ',' || char === '.' || char === "'") ? char : '_').join('');
            html += `<span class="placeholder-tiret">${tirets}</span>`;
            if (index < indicesSecretsCorrectOrder.length - 1) html += ' ';
        });
        introPhraseContainer.innerHTML = html;
    }
    // Appliquer la police DYS si elle était activée (depuis localStorage par exemple)
    applyDyslexiaFontPreference();
    showPage(1); 
}

function nextChallenge(nextPageNumber) {
    if (nextPageNumber <= gameState.totalChallenges) {
        showPage(nextPageNumber);
    } else {
        showFinalEnigmaPage();
    }
}

function showFinalEnigmaPage() {
    showPage(gameState.totalChallenges + 1); 
    const citationCorrecteFinaleSpan = document.getElementById('citation-correcte-finale');
    gameState.citationAttempts = 0; 
    if (citationCorrecteFinaleSpan) {
        citationCorrecteFinaleSpan.textContent = citationFinaleCorrecte;
    }
    // Assurer que les messages d'erreur/succès précédents sont cachés
    document.getElementById('message-reussite-final').style.display = 'none';
    document.getElementById('message-echec-final').style.display = 'none';
    document.getElementById('feedback-attempts-exhausted').style.display = 'none';
    document.getElementById('seeEpilogueBtn').style.display = 'none';
    document.getElementById('citation-finale-input').disabled = false;
    document.getElementById('validateCitationFinaleBtn').disabled = false;
    document.getElementById('citation-finale-input').value = '';


}

function handleSuccessfulChallenge(challengeIndex) {
    const secretIndexInCorrectOrder = challengeToSecretMapping[challengeIndex - 1];

    if (!gameState.collectedIndices[secretIndexInCorrectOrder]) {
        gameState.collectedIndices[secretIndexInCorrectOrder] = indicesSecretsCorrectOrder[secretIndexInCorrectOrder];
        gameState.newlyRevealedIndex = secretIndexInCorrectOrder; 
    }
    afficherPhraseEnCours();
    updateProgressBar();

    const pageElement = document.getElementById(`page-${challengeIndex}`);
    if (pageElement) {
        const skipButton = pageElement.querySelector(`.skip-button[data-challenge-index="${challengeIndex}"]`);
        if (skipButton) skipButton.disabled = true;
        
        let nextButton; 
        if (challengeIndex === gameState.totalChallenges) { 
            nextButton = document.getElementById('showFinalPageBtn'); 
        } else {
            nextButton = document.getElementById(`next-defi${challengeIndex}`);
        }
        if (nextButton) nextButton.style.display = 'inline-block';
    }
}


// Défi 1: QCM
function validerDefi1() {
    const form = document.getElementById('defi1-form');
    const selectedOption = form.querySelector('input[name="defi1"]:checked');
    const feedback = document.getElementById('feedback-defi1');
    
    if (selectedOption) {
        disableForm('defi1-form');
        if (selectedOption.value === 'B') {
            feedback.textContent = "Bonne réponse ! 'Le Deuxième Sexe' est en effet l'œuvre majeure de Simone de Beauvoir sur la condition féminine.";
            feedback.className = 'feedback success';
            handleSuccessfulChallenge(1);
        } else {
            feedback.textContent = "Mauvaise réponse. L'œuvre majeure est 'Le Deuxième Sexe'.";
            feedback.className = 'feedback error';
            const nextButton = document.getElementById('next-defi1');
            if (nextButton) nextButton.style.display = 'inline-block';
            const skipButton = document.querySelector(`#page-1 .skip-button[data-challenge-index="1"]`);
            if (skipButton) skipButton.disabled = true;
        }
    } else {
        feedback.textContent = "Veuillez sélectionner une réponse.";
        feedback.className = 'feedback error';
    }
}

// Défi 3: NOUVELLE ÉNIGME 1 - Destinée Biologique (QCM)
function validerDefi3() {
    const form = document.getElementById('defi3-form');
    const selectedOption = form.querySelector('input[name="defi3-answer"]:checked');
    const feedback = document.getElementById('feedback-defi3');

    if (selectedOption) {
        disableForm('defi3-form'); 
        document.getElementById('validateDefi3Btn').disabled = true;

        if (selectedOption.value === 'B') { 
            feedback.textContent = "Correct ! Notre sexe à la naissance ne décide pas de tout.";
            feedback.className = 'feedback success';
            handleSuccessfulChallenge(3); 
        } else {
            feedback.textContent = "Incorrect. Relisez bien la citation et les options.";
            feedback.className = 'feedback error';
            const nextButton = document.getElementById('next-defi3');
            if (nextButton) nextButton.style.display = 'inline-block';
            const skipButton = document.querySelector(`#page-3 .skip-button[data-challenge-index="3"]`);
            if (skipButton) skipButton.disabled = true;
        }
    } else {
        feedback.textContent = "Veuillez sélectionner une option.";
        feedback.className = 'feedback error';
    }
}


// Défi 2: Pendu
const motADevinerPendu = "GENRE";
let motAffichePenduArr = "_".repeat(motADevinerPendu.length).split("");
let essaisRestantsPendu = 5;
let lettresProposeesPendu = [];
let penduReussi = false;

function initPendu() {
    motAffichePenduArr = "_".repeat(motADevinerPendu.length).split("");
    essaisRestantsPendu = 5;
    lettresProposeesPendu = [];
    penduReussi = false;
    document.getElementById('mot-pendu').textContent = motAffichePenduArr.join(" ");
    document.getElementById('essais-pendu').textContent = essaisRestantsPendu;
    document.getElementById('lettres-proposees').textContent = "";
    const inputPendu = document.getElementById('input-pendu');
    if(inputPendu) { inputPendu.value = ""; inputPendu.disabled = false; }
    const proposerButton = document.getElementById('proposeLetterBtnPendu');
    if(proposerButton) proposerButton.disabled = false;
    const skipButton = document.querySelector(`#page-2 .skip-button[data-challenge-index="2"]`);
    if(skipButton) skipButton.disabled = false;
    document.getElementById('indice-pendu').style.display = 'none';
    document.getElementById('feedback-defi2').textContent = "";
    document.getElementById('feedback-defi2').className = 'feedback';
    document.getElementById('reflexion-defi2').style.display = 'none';
    document.getElementById('next-defi2').style.display = 'none';
}

function proposerLettrePendu() {
    if (penduReussi || essaisRestantsPendu <= 0) return;
    const input = document.getElementById('input-pendu');
    const lettre = input.value.toUpperCase();
    input.value = ""; 
    const feedback = document.getElementById('feedback-defi2');
    if (!lettre.match(/^[A-Z]$/)) { 
        feedback.textContent = "Veuillez entrer une seule lettre (A-Z).";
        feedback.className = 'feedback error'; return;
    }
    if (lettresProposeesPendu.includes(lettre)) {
        feedback.textContent = `Lettre '${lettre}' déjà proposée.`;
        feedback.className = 'feedback error'; return;
    }
    lettresProposeesPendu.push(lettre);
    document.getElementById('lettres-proposees').textContent = lettresProposeesPendu.join(", ");
    if (motADevinerPendu.includes(lettre)) {
        for (let i = 0; i < motADevinerPendu.length; i++) {
            if (motADevinerPendu[i] === lettre) motAffichePenduArr[i] = lettre;
        }
        document.getElementById('mot-pendu').textContent = motAffichePenduArr.join(" ");
        feedback.textContent = `Lettre '${lettre}' correcte !`;
        feedback.className = 'feedback success';
        if (!motAffichePenduArr.includes("_")) {
            penduReussi = true;
            feedback.textContent = "Bravo ! Vous avez trouvé le mot : " + motADevinerPendu;
            handleSuccessfulChallenge(2);
            document.getElementById('reflexion-defi2').style.display = 'block';
            input.disabled = true;
            document.getElementById('proposeLetterBtnPendu').disabled = true;
        }
    } else {
        essaisRestantsPendu--;
        document.getElementById('essais-pendu').textContent = essaisRestantsPendu;
        feedback.textContent = `Lettre '${lettre}' incorrecte.`;
        feedback.className = 'feedback error';
        if (essaisRestantsPendu <= 3) document.getElementById('indice-pendu').style.display = 'block';
        if (essaisRestantsPendu <= 0) {
            feedback.textContent = "Perdu ! Le mot était : " + motADevinerPendu;
            input.disabled = true;
            document.getElementById('proposeLetterBtnPendu').disabled = true;
            const nextButton = document.getElementById('next-defi2');
            if (nextButton) nextButton.style.display = 'inline-block';
            const skipButton = document.querySelector(`#page-2 .skip-button[data-challenge-index="2"]`);
            if (skipButton) skipButton.disabled = true;
        }
    }
}

// Défi 4: Partenaires de Pensée (Ancien Défi 3)
function validerDefi4() { 
    const reponse = document.getElementById('input-defi4').value.trim(); 
    const feedback = document.getElementById('feedback-defi4'); 
    const inputElement = document.getElementById('input-defi4');
    const validerButton = document.getElementById('validateDefi4Btn');
    inputElement.disabled = true;
    validerButton.disabled = true;
    if (reponse.toLowerCase().includes("sartre")) {
        feedback.textContent = "Exactement ! Jean-Paul Sartre était son compagnon de vie et de pensée.";
        feedback.className = 'feedback success'; 
        handleSuccessfulChallenge(4); 
    } else {
        feedback.textContent = `Ce n'est pas la bonne personne. La réponse attendue était Jean-Paul Sartre.`;
        feedback.className = 'feedback error';
        const nextButton = document.getElementById('next-defi4'); 
        if (nextButton) nextButton.style.display = 'inline-block'; 
        const skipButton = document.querySelector(`#page-4 .skip-button[data-challenge-index="4"]`); 
        if (skipButton) skipButton.disabled = true;
    }
}

// Défi 5: Association (Ancien Défi 4)
function validerDefi5() { 
    const reponsesAttendues = { 'select-assoc-1-defi5': 'A', 'select-assoc-2-defi5': 'C', 'select-assoc-3-defi5': 'B' }; 
    let correctes = 0;
    const feedback = document.getElementById('feedback-defi5'); 
    const validerButton = document.getElementById('validateDefi5Btn'); 
    Object.keys(reponsesAttendues).forEach(id => { const el = document.getElementById(id); if(el) el.disabled = true; });
    validerButton.disabled = true;
    for (const id in reponsesAttendues) {
        const selectEl = document.getElementById(id);
        if (selectEl && selectEl.value === reponsesAttendues[id]) correctes++;
    }
    if (correctes === 3) {
        feedback.textContent = "Parfait ! Vos associations sont correctes.";
        feedback.className = 'feedback success'; 
        handleSuccessfulChallenge(5); 
    } else {
        feedback.textContent = `Vous avez ${correctes} association(s) correcte(s) sur 3. Les bonnes associations étaient 1-A, 2-C, 3-B.`;
        feedback.className = 'feedback error';
        const nextButton = document.getElementById('next-defi5'); 
        if (nextButton) nextButton.style.display = 'inline-block'; 
        const skipButton = document.querySelector(`#page-5 .skip-button[data-challenge-index="5"]`); 
        if (skipButton) skipButton.disabled = true;
    }
}

// Défi 6: NOUVELLE ÉNIGME 2 - Mots Manquants
function validerDefi6() {
    const word1Input = document.getElementById('defi6-word1');
    const word2Input = document.getElementById('defi6-word2');
    const feedback = document.getElementById('feedback-defi6');
    const validerButton = document.getElementById('validateDefi6Btn');

    const word1 = word1Input.value.trim().toLowerCase();
    const word2 = word2Input.value.trim().toLowerCase();

    word1Input.disabled = true;
    word2Input.disabled = true;
    validerButton.disabled = true;

    if (word1 === 'libre' && word2 === 'choisir') {
        feedback.textContent = "Correct ! La citation est : 'Je suis libre, je peux me choisir.'";
        feedback.className = 'feedback success';
        handleSuccessfulChallenge(6); 
    } else {
        feedback.textContent = "Incorrect. Vérifiez les mots. Pensez à la liberté et à la décision.";
        feedback.className = 'feedback error';
        const nextButton = document.getElementById('next-defi6');
        if (nextButton) nextButton.style.display = 'inline-block';
        const skipButton = document.querySelector(`#page-6 .skip-button[data-challenge-index="6"]`);
        if (skipButton) skipButton.disabled = true;
    }
}


// --- Défi 7: Mots Mêlés (Ancien Défi 5) ---
const motsMelesParams = {
    gridSize: 15,
    words: ["BEAUVOIR", "ÉGALITÉ", "FÉMINISME", "CHOIX", "AUTONOMIE", "DROITS", "SEXISME", "LIBERTÉ"],
    wordsNormalized: [], targetWordsToFind: 4, timeLeft: 120, timerInterval: null,
    grid: [], wordObjects: [], foundWordsCount: 0, currentSelectionCells: [], gameActive: false
};
function normalizeWord(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}
function initMotsMeles() {
    motsMelesParams.wordsNormalized = motsMelesParams.words.map(w => normalizeWord(w));
    motsMelesParams.foundWordsCount = 0; motsMelesParams.currentSelectionCells = [];
    motsMelesParams.timeLeft = 120; motsMelesParams.gameActive = true; motsMelesParams.wordObjects = [];
    document.getElementById('motsmeles-trouves-count').textContent = '0';
    document.getElementById('motsmeles-total-count').textContent = motsMelesParams.words.length;
    document.getElementById('feedback-defi7-motsmeles').textContent = ""; 
    document.getElementById('feedback-defi7-motsmeles').className = 'feedback';
    document.getElementById('next-defi7').style.display = 'none'; 
    const validerButton = document.getElementById('validateMotsMelesBtn');
    if (validerButton) validerButton.disabled = false;
    const skipButton = document.querySelector(`#page-7 .skip-button[data-challenge-index="7"]`); 
    if(skipButton) skipButton.disabled = false;
    generateMotsMelesGrid(); renderMotsMelesGrid(); startMotsMelesTimer();
}
function generateMotsMelesGrid() {
    motsMelesParams.grid = Array(motsMelesParams.gridSize).fill(null).map(() => Array(motsMelesParams.gridSize).fill(''));
    motsMelesParams.wordObjects = [];
    const wordsToPlace = [...motsMelesParams.words].sort((a,b) => b.length - a.length);
    for (const word of wordsToPlace) placeWordInMotsMelesGrid(word);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r=0; r<motsMelesParams.gridSize; r++) {
        for (let c=0; c<motsMelesParams.gridSize; c++) {
            if (motsMelesParams.grid[r][c] === '') motsMelesParams.grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
    }
}
function placeWordInMotsMelesGrid(word) {
    const directions = [{dr:0,dc:1},{dr:1,dc:0}]; let placed=false; const maxAttempts=100;
    for(let attempt=0; attempt<maxAttempts && !placed; attempt++){
        const dir=directions[Math.floor(Math.random()*directions.length)]; const len=word.length;
        let r0,c0;
        if(dir.dr===0){r0=Math.floor(Math.random()*motsMelesParams.gridSize);c0=Math.floor(Math.random()*(motsMelesParams.gridSize-len+1));}
        else{r0=Math.floor(Math.random()*(motsMelesParams.gridSize-len+1));c0=Math.floor(Math.random()*motsMelesParams.gridSize);}
        let canPlace=true;
        for(let i=0;i<len;i++){
            const r=r0+i*dir.dr; const c=c0+i*dir.dc;
            if(r<0||r>=motsMelesParams.gridSize||c<0||c>=motsMelesParams.gridSize){canPlace=false;break;}
            if(motsMelesParams.grid[r][c]!==''&&motsMelesParams.grid[r][c]!==word[i]){canPlace=false;break;}
        }
        if(canPlace){
            const currentWordObj={text:word,normalizedText:normalizeWord(word),cells:[],found:false};
            for(let i=0;i<len;i++){
                const r=r0+i*dir.dr; const c=c0+i*dir.dc;
                motsMelesParams.grid[r][c]=word[i]; currentWordObj.cells.push({r,c});
            }
            motsMelesParams.wordObjects.push(currentWordObj); placed=true;
        }
    }
    if(!placed) console.warn("Impossible de placer:",word);
}
function renderMotsMelesGrid() {
    const cont=document.getElementById('motsmeles-grille-container'); if(!cont)return; cont.innerHTML='';
    const table=document.createElement('table'); table.className='motsmeles-table';
    for(let r=0;r<motsMelesParams.gridSize;r++){
        const tr=document.createElement('tr');
        for(let c=0;c<motsMelesParams.gridSize;c++){
            const td=document.createElement('td');
            td.textContent=motsMelesParams.grid[r]&&motsMelesParams.grid[r][c]?motsMelesParams.grid[r][c]:'';
            td.dataset.r=r;td.dataset.c=c; td.setAttribute('role','gridcell'); td.setAttribute('tabindex','-1'); 
            td.addEventListener('click',handleMotsMelesCellClick);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    cont.appendChild(table);
}
function handleMotsMelesCellClick(event) {
    if(!motsMelesParams.gameActive)return; const td=event.target; const r=parseInt(td.dataset.r); const c=parseInt(td.dataset.c);
    const isFound=motsMelesParams.wordObjects.some(wo=>wo.found&&wo.cells.some(cell=>cell.r===r&&cell.c===c));
    if(isFound)return;
    const selIdx=motsMelesParams.currentSelectionCells.findIndex(sel=>sel.r===r&&sel.c===c);
    if(selIdx>-1){td.classList.remove('selected');motsMelesParams.currentSelectionCells.splice(selIdx,1);}
    else if(motsMelesParams.currentSelectionCells.length<2){td.classList.add('selected');motsMelesParams.currentSelectionCells.push({r,c,element:td});}
    else{motsMelesParams.currentSelectionCells.forEach(sel=>sel.element.classList.remove('selected'));motsMelesParams.currentSelectionCells=[{r,c,element:td}];td.classList.add('selected');}
    document.querySelectorAll('.motsmeles-table td.path-highlight').forEach(cell=>cell.classList.remove('path-highlight'));
    if(motsMelesParams.currentSelectionCells.length===2)highlightMotsMelesPath();
}
function highlightMotsMelesPath() {
    if(motsMelesParams.currentSelectionCells.length!==2)return;
    const[start,end]=motsMelesParams.currentSelectionCells;
    const cellsInPath=getCellsBetweenMotsMeles(start,end,false); if(!cellsInPath)return;
    cellsInPath.forEach(pos=>{
        const cellEl=document.querySelector(`.motsmeles-table td[data-r="${pos.r}"][data-c="${pos.c}"]`);
        if(cellEl&&!cellEl.classList.contains('selected')&&!cellEl.classList.contains('found'))cellEl.classList.add('path-highlight');
    });
}
function getCellsBetweenMotsMeles(start,end,checkContent=true) {
    const cells=[]; const dr=Math.sign(end.r-start.r); const dc=Math.sign(end.c-start.c);
    if(start.r!==end.r&&start.c!==end.c)return null; 
    let r=start.r; let c=start.c; let currentWord="";
    while(true){
        if(r<0||r>=motsMelesParams.gridSize||c<0||c>=motsMelesParams.gridSize)return null;
        cells.push({r,c}); if(checkContent)currentWord+=motsMelesParams.grid[r][c];
        if(r===end.r&&c===end.c)break;
        if(cells.length>motsMelesParams.gridSize*2)return null;
        r+=dr;c+=dc;
    }
    return checkContent?{cells,word:currentWord}:cells;
}
function validerSelectionMotsMeles() {
    if(!motsMelesParams.gameActive||motsMelesParams.currentSelectionCells.length!==2){
        motsMelesParams.currentSelectionCells.forEach(sel=>sel.element.classList.remove('selected'));
        motsMelesParams.currentSelectionCells=[];
        document.querySelectorAll('.motsmeles-table td.path-highlight').forEach(cell=>cell.classList.remove('path-highlight'));
        return;
    }
    const[start,end]=motsMelesParams.currentSelectionCells;
    const pathData=getCellsBetweenMotsMeles(start,end,true);
    if(!pathData){
        motsMelesParams.currentSelectionCells.forEach(sel=>sel.element.classList.remove('selected'));
        motsMelesParams.currentSelectionCells=[];
        document.querySelectorAll('.motsmeles-table td.path-highlight').forEach(cell=>cell.classList.remove('path-highlight'));
        return;
    }
    const selectedPathCells=pathData.cells; const selectedWordString=pathData.word;
    const normalizedSelWord=normalizeWord(selectedWordString);
    const normalizedSelWordRev=normalizeWord(selectedWordString.split('').reverse().join(''));
    let matchFound=false;
    for(const wordObj of motsMelesParams.wordObjects){
        if(!wordObj.found&&(wordObj.normalizedText===normalizedSelWord||wordObj.normalizedText===normalizedSelWordRev)){
            let cellsMatch=selectedPathCells.length===wordObj.cells.length;
            if(cellsMatch){
                for(let i=0;i<selectedPathCells.length;i++){
                    const spCell=selectedPathCells[i];
                    const woCell=(wordObj.normalizedText===normalizedSelWord)?wordObj.cells[i]:wordObj.cells[selectedPathCells.length-1-i];
                    if(spCell.r!==woCell.r||spCell.c!==woCell.c){cellsMatch=false;break;}
                }
            }
            if(cellsMatch){
                wordObj.found=true;motsMelesParams.foundWordsCount++;
                document.getElementById('motsmeles-trouves-count').textContent=motsMelesParams.foundWordsCount;
                selectedPathCells.forEach(pos=>{
                    const td=document.querySelector(`.motsmeles-table td[data-r="${pos.r}"][data-c="${pos.c}"]`);
                    if(td){td.classList.remove('selected','path-highlight');td.classList.add('found');}
                });
                matchFound=true;break;
            }
        }
    }
    motsMelesParams.currentSelectionCells.forEach(sel=>sel.element.classList.remove('selected'));
    motsMelesParams.currentSelectionCells=[];
    document.querySelectorAll('.motsmeles-table td.path-highlight').forEach(cell=>cell.classList.remove('path-highlight'));
    if(matchFound&&motsMelesParams.foundWordsCount>=motsMelesParams.targetWordsToFind)endMotsMelesGame(true);
}
function startMotsMelesTimer() {
    const timerDisp=document.getElementById('timer-motsmeles'); clearInterval(motsMelesParams.timerInterval);
    timerDisp.textContent=`${Math.floor(motsMelesParams.timeLeft/60)}:${(motsMelesParams.timeLeft%60)<10?'0':''}${motsMelesParams.timeLeft%60}`;
    motsMelesParams.timerInterval=setInterval(()=>{
        if(!motsMelesParams.gameActive){clearInterval(motsMelesParams.timerInterval);return;}
        motsMelesParams.timeLeft--;
        const min=Math.floor(motsMelesParams.timeLeft/60); const sec=motsMelesParams.timeLeft%60;
        timerDisp.textContent=`${min}:${sec<10?'0':''}${sec}`;
        if(motsMelesParams.timeLeft<=0){timerDisp.textContent="0:00";endMotsMelesGame(false);}
    },1000);
}
function endMotsMelesGame(success) {
    motsMelesParams.gameActive=false; clearInterval(motsMelesParams.timerInterval);
    const feedback=document.getElementById('feedback-defi7-motsmeles'); const nextBtn=document.getElementById('next-defi7'); 
    const valBtn=document.getElementById('validateMotsMelesBtn'); if(valBtn)valBtn.disabled=true;
    const skipBtn=document.querySelector(`#page-7 .skip-button[data-challenge-index="7"]`); if(skipBtn)skipBtn.disabled=true; 
    const actualFound=motsMelesParams.foundWordsCount;
    if(success||actualFound>=motsMelesParams.targetWordsToFind){
        feedback.textContent=`Bravo ! Vous avez trouvé ${actualFound} mot(s) à temps.`;
        feedback.className='feedback success'; handleSuccessfulChallenge(7); 
    }else{
        feedback.textContent=(motsMelesParams.timeLeft<=0?`Temps écoulé ! `:` `) + `Vous avez trouvé ${actualFound} mot(s). Il en fallait ${motsMelesParams.targetWordsToFind}.`;
        feedback.className='feedback error'; if(nextBtn)nextBtn.style.display='inline-block';
    }
}

// Défi 8: QCM (Ancien Défi 6)
function validerDefi8() { 
    const form = document.getElementById('defi8-form'); 
    const selectedOption = form.querySelector('input[name="defi8"]:checked'); 
    const feedback = document.getElementById('feedback-defi8'); 
    if (selectedOption) {
        disableForm('defi8-form');
        if (selectedOption.value === 'C') {
            feedback.textContent = "Excellente réponse ! La loi Veil de 1975 sur l'IVG fut une avancée majeure.";
            feedback.className = 'feedback success'; 
            handleSuccessfulChallenge(8); 
        } else {
            feedback.textContent = "Ce n'est pas la bonne loi. La loi de 1975 concernait l'IVG.";
            feedback.className = 'feedback error';
            const nextButton = document.getElementById('next-defi8'); 
            if (nextButton) nextButton.style.display = 'inline-block';
            const skipButton = document.querySelector(`#page-8 .skip-button[data-challenge-index="8"]`); 
            if (skipButton) skipButton.disabled = true;
        }
    } else {
        feedback.textContent = "Veuillez sélectionner une réponse.";
        feedback.className = 'feedback error';
    }
}

// Défi 9: Question Simple (Ancien Défi 7)
function validerDefi9() { 
    const reponse = document.getElementById('input-defi9').value.trim().toLowerCase(); 
    const feedback = document.getElementById('feedback-defi9'); 
    const inputElement = document.getElementById('input-defi9');
    const validerButton = document.getElementById('validateDefi9Btn'); 
    inputElement.disabled = true;
    validerButton.disabled = true;
    if (reponse.includes("sa capacité à agir") || reponse.includes("capacité à agir") || reponse.includes("capacité d'agir")) {
        feedback.textContent = "Très bien ! Simone de Beauvoir met l'accent sur notre capacité à nous définir par nos choix.";
        feedback.className = 'feedback success'; 
        handleSuccessfulChallenge(9); 
    } else {
        feedback.textContent = `Relisez bien la citation. La bonne réponse mettait en avant la capacité à agir.`;
        feedback.className = 'feedback error';
        const nextButton = document.getElementById('showFinalPageBtn'); 
        if (nextButton) nextButton.style.display = 'inline-block';
        const skipButton = document.querySelector(`#page-9 .skip-button[data-challenge-index="9"]`); 
        if (skipButton) skipButton.disabled = true;
    }
}

// --- Énigme Finale ---
function validerCitationFinale() {
    const saisieUtilisateur = document.getElementById('citation-finale-input').value.trim();
    const messageReussite = document.getElementById('message-reussite-final');
    const messageEchec = document.getElementById('message-echec-final');
    const echecCitationText = document.getElementById('echec-citation-text');
    const attemptsLeftText = document.getElementById('attempts-left-text');
    const inputElement = document.getElementById('citation-finale-input');
    const validerButton = document.getElementById('validateCitationFinaleBtn');
    const seeEpilogueBtn = document.getElementById('seeEpilogueBtn');
    const feedbackAttemptsExhausted = document.getElementById('feedback-attempts-exhausted');

    const normalize = (str) => str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()']/g,"").replace(/\s+/g, ' ').trim();

    gameState.citationAttempts++;

    if (normalize(saisieUtilisateur) === normalize(citationFinaleCorrecte)) {
        messageReussite.style.display = 'block'; messageEchec.style.display = 'none';
        feedbackAttemptsExhausted.style.display = 'none';
        inputElement.disabled = true; validerButton.disabled = true;
        seeEpilogueBtn.style.display = 'inline-block';
    } else {
        messageReussite.style.display = 'none'; messageEchec.style.display = 'block'; 
        if (gameState.citationAttempts < 3) {
            const attemptsRemaining = 3 - gameState.citationAttempts;
            echecCitationText.textContent = "Ce n’est pas tout à fait ça. Vérifiez bien l’ordre des mots et la citation exacte.";
            attemptsLeftText.textContent = `Il vous reste ${attemptsRemaining} essai(s).`;
            feedbackAttemptsExhausted.style.display = 'none';
            inputElement.focus(); 
        } else {
            echecCitationText.textContent = "Dernière tentative échouée.";
            attemptsLeftText.textContent = "";
            messageEchec.style.display = 'none'; 
            feedbackAttemptsExhausted.style.display = 'block';
            inputElement.disabled = true; validerButton.disabled = true;
            seeEpilogueBtn.style.display = 'inline-block';
        }
    }
}

// --- Fonction pour passer un défi ---
function skipChallenge(challengeIndex) { 
    const feedback = document.getElementById(`feedback-defi${challengeIndex}`);
    const feedbackMotsMeles = document.getElementById(`feedback-defi${challengeIndex}-motsmeles`);
    const actualFeedbackElement = feedbackMotsMeles || feedback;

    const pageElement = document.getElementById(`page-${challengeIndex}`);
    let nextButton;
    if (challengeIndex === gameState.totalChallenges) {
        nextButton = document.getElementById('showFinalPageBtn');
    } else {
        nextButton = document.getElementById(`next-defi${challengeIndex}`);
    }

    if (pageElement) {
        if (challengeIndex === 1 || challengeIndex === 3 || challengeIndex === 8) disableForm(`defi${challengeIndex}-form`); 
        else if (challengeIndex === 2) { 
            document.getElementById('input-pendu').disabled = true;
            document.getElementById('proposeLetterBtnPendu').disabled = true;
        } else if (challengeIndex === 4 || challengeIndex === 9) { 
            const ti = document.getElementById(`input-defi${challengeIndex}`); if(ti)ti.disabled=true;
            const valBtn = document.getElementById(`validateDefi${challengeIndex}Btn`); if(valBtn)valBtn.disabled=true;
        } else if (challengeIndex === 5) { 
            pageElement.querySelectorAll('select').forEach(s=>s.disabled=true);
            const valBtn = document.getElementById(`validateDefi${challengeIndex}Btn`); if(valBtn)valBtn.disabled=true;
        } else if (challengeIndex === 6) { 
            const w1 = document.getElementById('defi6-word1'); if(w1) w1.disabled = true;
            const w2 = document.getElementById('defi6-word2'); if(w2) w2.disabled = true;
            const valBtn = document.getElementById(`validateDefi${challengeIndex}Btn`); if(valBtn)valBtn.disabled=true;
        } else if (challengeIndex === 7) { 
            motsMelesParams.gameActive = false; clearInterval(motsMelesParams.timerInterval);
            document.getElementById('validateMotsMelesBtn').disabled = true;
            document.querySelectorAll(`#page-${challengeIndex} .motsmeles-table td`).forEach(cell=>{ 
                cell.style.cursor='default'; 
            });
        }
        const currentSkipButton = pageElement.querySelector(`.skip-button[data-challenge-index="${challengeIndex}"]`);
        if(currentSkipButton) currentSkipButton.disabled = true;
    }

    let message = `Défi passé. `;
    const skippedSecretIndex = challengeToSecretMapping[challengeIndex - 1];
    const skippedWord = indicesSecretsCorrectOrder[skippedSecretIndex];

    if (challengeIndex === 1) message += "L'œuvre fondatrice est 'Le Deuxième Sexe'.";    
    else if (challengeIndex === 2) message += `Le mot à deviner était '${motADevinerPendu}'.`;
    else if (challengeIndex === 3) message += "La bonne réponse était : 'Que notre sexe à la naissance ne décide pas de tout ce que nous serons ou ferons.'";
    else if (challengeIndex === 4) message += "Le partenaire de pensée était Jean-Paul Sartre."; 
    else if (challengeIndex === 5) message += "Assoc.: 1-A, 2-C, 3-B."; 
    else if (challengeIndex === 6) message += "Les mots manquants étaient 'libre' et 'choisir'.";
    else if (challengeIndex === 7) message += "Les mots mêlés demandaient de la concentration !"; 
    else if (challengeIndex === 8) message += "La loi de 1975 concernait l'IVG."; 
    else if (challengeIndex === 9) message += "La citation souligne l'importance de la capacité à agir."; 
    message += ` L'indice qui aurait été révélé est : '${skippedWord}'`;
    if (actualFeedbackElement) { actualFeedbackElement.textContent = message; actualFeedbackElement.className = 'feedback info'; }
    if (nextButton) nextButton.style.display = 'inline-block';
}

// --- Utilitaires ---
function disableForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        Array.from(form.elements).forEach(el => el.disabled = true);
    }
}

// --- Police DYS ---
function toggleDyslexiaFont() {
    const body = document.body;
    const toggleButton = document.getElementById('toggleDysFontBtn');
    body.classList.toggle('dyslexia-friendly');
    gameState.dyslexiaFontEnabled = body.classList.contains('dyslexia-friendly');
    if (gameState.dyslexiaFontEnabled) {
        toggleButton.textContent = 'Police DYS (Activée)';
        toggleButton.classList.add('active');
        localStorage.setItem('dyslexiaFontEnabled', 'true');
    } else {
        toggleButton.textContent = 'Police DYS';
        toggleButton.classList.remove('active');
        localStorage.setItem('dyslexiaFontEnabled', 'false');
    }
}

function applyDyslexiaFontPreference() {
    const dyslexiaEnabled = localStorage.getItem('dyslexiaFontEnabled') === 'true';
    const body = document.body;
    const toggleButton = document.getElementById('toggleDysFontBtn');
    if (dyslexiaEnabled) {
        body.classList.add('dyslexia-friendly');
        toggleButton.textContent = 'Police DYS (Activée)';
        toggleButton.classList.add('active');
        gameState.dyslexiaFontEnabled = true;
    } else {
        body.classList.remove('dyslexia-friendly');
        toggleButton.textContent = 'Police DYS';
        toggleButton.classList.remove('active');
        gameState.dyslexiaFontEnabled = false;
    }
}


function initEventListeners() {
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    document.getElementById('toggleDysFontBtn').addEventListener('click', toggleDyslexiaFont);

    document.getElementById('validateDefi1Btn').addEventListener('click', validerDefi1); 
    document.getElementById('proposeLetterBtnPendu').addEventListener('click', proposerLettrePendu); 
    document.getElementById('validateDefi3Btn').addEventListener('click', validerDefi3); 
    document.getElementById('validateDefi4Btn').addEventListener('click', validerDefi4); 
    document.getElementById('validateDefi5Btn').addEventListener('click', validerDefi5); 
    document.getElementById('validateDefi6Btn').addEventListener('click', validerDefi6); 
    document.getElementById('validateMotsMelesBtn').addEventListener('click', validerSelectionMotsMeles); 
    document.getElementById('validateDefi8Btn').addEventListener('click', validerDefi8); 
    document.getElementById('validateDefi9Btn').addEventListener('click', validerDefi9); 


    document.getElementById('validateCitationFinaleBtn').addEventListener('click', validerCitationFinale);
    document.getElementById('seeEpilogueBtn').addEventListener('click', () => showPage(11));

    document.getElementById('showFinalPageBtn').addEventListener('click', showFinalEnigmaPage);

    document.querySelectorAll('.skip-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const challengeIndex = parseInt(event.target.dataset.challengeIndex);
            if (challengeIndex) {
                skipChallenge(challengeIndex);
            }
        });
    });

    document.querySelectorAll('.next-challenge-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const nextPage = parseInt(event.target.dataset.nextPage);
            if (nextPage) {
                nextChallenge(nextPage);
            }
        });
    });
    
    const inputPendu = document.getElementById('input-pendu');
    if (inputPendu) {
        inputPendu.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); 
                proposerLettrePendu();
            }
        });
    }
}

// Initialisation au chargement de la page
window.onload = () => {
    showPage(0); 
    initEventListeners(); 
    applyDyslexiaFontPreference(); // Appliquer la préférence au chargement
};
