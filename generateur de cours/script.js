// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("Script.js: DOMContentLoaded - L'événement est déclenché.");

    // --- Tab Navigation Logic ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // console.log(`Script.js: Initialisation des onglets. ${tabLinks.length} liens d'onglets trouvés, ${tabContents.length} contenus d'onglets trouvés.`);
    if (tabLinks.length === 0) console.warn("Script.js: Aucun .tab-link trouvé ! La navigation par onglets ne fonctionnera pas.");
    if (tabContents.length === 0) console.warn("Script.js: Aucun .tab-content trouvé ! Les contenus des onglets ne pourront pas s'afficher.");

    tabLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const targetTab = link.dataset.tab;
            tabLinks.forEach(l => {
                l.classList.remove('active');
                l.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(c => c.classList.remove('active'));

            link.classList.add('active');
            link.setAttribute('aria-selected', 'true');

            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.classList.add('active');
                const buttonId = `btn-tab-${targetTab.replace('tab-','')}`;
                if (!link.id) link.id = buttonId; 
                activeContent.setAttribute('aria-labelledby', link.id);
            } else {
                console.error(`Script.js: Contenu pour l'onglet ${targetTab} non trouvé ! Vérifiez l'ID.`);
            }
        });
    });

    if (tabLinks.length > 0 && tabLinks[0]) {
        tabLinks[0].click(); 
    } else {
        console.warn("Script.js: Aucun onglet à activer initialement.");
    }

    // --- Modal Logic (Global variables for the modal) ---
    const modal = document.getElementById('imagePreviewModal');
    const closeModalBtn = modal ? modal.querySelector('.close-modal-btn') : null;
    const modalUserCloseBtn = modal ? document.getElementById('modalCloseUserButton') : null;
    const modalImageElement = document.getElementById('modalImageElement');
    const modalHtmlContentDiv = document.getElementById('modalHtmlContent');
    const modalImagePlaceholder = document.getElementById('modalImagePlaceholder');
    const modalDownloadLink = document.getElementById('modalDownloadLink');
    const modalTitleElement = document.getElementById('modalTitle');

    if (!modal) console.error("Script.js: La modale (ID: imagePreviewModal) n'a pas été trouvée !");
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    if (modalUserCloseBtn) modalUserCloseBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => { 
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const modulesData = {
        "5e": {
            1: { title: "Introduction aux objets techniques", hook: "Comment les objets techniques répondent-ils à nos besoins quotidiens ?", skills: "Identifier un besoin et énoncer un problème technique", knowledge: "Besoin, contraintes, normalisation" },
            2: { title: "Analyse fonctionnelle", hook: "Pourquoi et comment décomposer un objet en fonctions ?", skills: "S'approprier un cahier des charges", knowledge: "Fonctions techniques, solutions techniques" },
            3: { title: "Matériaux et leurs propriétés", hook: "De quoi sont faits les objets qui nous entourent ?", skills: "Identifier le(s) matériau(x)", knowledge: "Familles de matériaux, propriétés, impacts environnementaux" },
            4: { title: "Évolution des objets techniques", hook: "Comment les objets ont-ils évolué au fil du temps ?", skills: "Comparer et commenter les évolutions des objets", knowledge: "Évolution des objets, impacts sociétaux" },
            5: { title: "Les flux d'énergie", hook: "Comment l'énergie circule-t-elle dans un objet technique ?", skills: "Identifier les flux d'énergie", knowledge: "Sources d'énergie, chaîne d'énergie, conversion" },
            6: { title: "Représentation graphique", hook: "Comment représenter un objet pour le comprendre ?", skills: "Exprimer sa pensée à l'aide d'outils de description adaptés", knowledge: "Croquis, schémas, symboles normalisés" },
            7: { title: "Introduction à la programmation", hook: "Comment donner des ordres à une machine ?", skills: "Appliquer les principes élémentaires de l'algorithmique", knowledge: "Algorithme, programme, séquence d'instructions" },
             18: { title: "Projet collaboratif", hook: "Comment travailler ensemble pour créer un objet ?", skills: "Participer à l'organisation et au déroulement de projets", knowledge: "Gestion de projet, planification, collaboration" }
        },
        "4e": {
            1: { title: "Cahier des charges avancé", hook: "Comment définir précisément les contraintes d'un projet ?", skills: "S'approprier un cahier des charges complexe", knowledge: "Contraintes dimensionnelles, fonctionnelles, esthétiques" },
            18: { title: "Projet pluritechnologique", hook: "Comment combiner différentes technologies dans un même projet ?", skills: "Concevoir un projet qui mobilise plusieurs domaines", knowledge: "Intégration de solutions, optimisation, tests" }
        },
        "3e": {
            1: { title: "Innovation et ruptures technologiques", hook: "Comment les grandes innovations transforment-elles la société ?", skills: "Analyser l'impact des objets et systèmes techniques sur la société", knowledge: "Innovations de rupture, impacts sociétaux, prospective" },
            18: { title: "Projet de synthèse", hook: "Comment mobiliser l'ensemble des connaissances acquises ?", skills: "Mobiliser des outils numériques et des compétences techniques", knowledge: "Projet intégrateur, démarche complète" }
        }
    };

    function getElement(id, description, isCrucial = true) {
        const element = document.getElementById(id);
        if (!element && isCrucial) console.error(`Script.js: ÉLÉMENT CRUCIAL ${description} (ID: ${id}) NON TROUVÉ !`);
        return element;
    }

    const gradeSelect = getElement('gradeSelect', 'Niveau (Classe)');
    const moduleSelect = getElement('moduleSelect', 'Module');
    const studentThemesInput = getElement('studentThemesInput', 'Thèmes Élèves');
    const outputFormatGroup = getElement('outputFormatGroup', 'Groupe Format Sortie');
    const generateButton = getElement('generateButton', 'Bouton Générer Prompt Module');
    const outputPrompt = getElement('outputPrompt', 'Textarea Prompt Module');
    const copyButton = getElement('copyButton', 'Bouton Copier Prompt Module');
    const copyMessage = getElement('copyMessage', 'Message Copie Prompt Module', false);
    const logbookButton = getElement('logbookButton', 'Bouton Cahier de Texte');
    const summaryButton = getElement('summaryButton', 'Bouton Résumé Connaissances');
    const pedagogicalOutput = getElement('pedagogicalOutput', 'Textarea Sortie Pédagogique');
    const pedagogicalOutputLabel = getElement('pedagogicalOutputLabel', 'Label Sortie Pédagogique', false);
    const copyPedagogicalOutputButton = getElement('copyPedagogicalOutputButton', 'Bouton Copier Sortie Pédagogique');
    const copyPedagogicalOutputMessage = getElement('copyPedagogicalOutputMessage', 'Message Copie Sortie Pédagogique', false);
    const courseContentInputForExercises = getElement('courseContentInputForExercises', 'Textarea Contenu Cours pour Exercices');
    const numShortQuestions = getElement('numShortQuestions', 'Input Nombre Questions Courtes');
    const generatePromptShortQuestionsBtn = getElement('generatePromptShortQuestionsBtn', 'Bouton Générer Prompt Questions Courtes');
    const promptShortQuestionsOutput = getElement('promptShortQuestionsOutput', 'Textarea Prompt Questions Courtes');
    const copyPromptShortQuestionsBtn = getElement('copyPromptShortQuestionsBtn', 'Bouton Copier Prompt Questions Courtes');
    const copyPromptShortMessage = getElement('copyPromptShortMessage', 'Message Copie Prompt Questions Courtes', false);
    const numMCQ = getElement('numMCQ', 'Input Nombre QCM');
    const numChoicesMCQ = getElement('numChoicesMCQ', 'Select Nombre Propositions QCM');
    const generatePromptMCQBtn = getElement('generatePromptMCQBtn', 'Bouton Générer Prompt QCM');
    const promptMCQOutput = getElement('promptMCQOutput', 'Textarea Prompt QCM');
    const copyPromptMCQBtn = getElement('copyPromptMCQBtn', 'Bouton Copier Prompt QCM');
    const copyPromptMCQMessage = getElement('copyPromptMCQMessage', 'Message Copie Prompt QCM', false);
    const generatePromptSummaryBtn = getElement('generatePromptSummaryBtn', 'Bouton Générer Prompt Résumé');
    const promptSummaryOutput = getElement('promptSummaryOutput', 'Textarea Prompt Résumé');
    const copyPromptSummaryBtn = getElement('copyPromptSummaryBtn', 'Bouton Copier Prompt Résumé');
    const copyPromptSummaryMessage = getElement('copyPromptSummaryMessage', 'Message Copie Prompt Résumé', false);
    const numRegroupementZones = getElement('numRegroupementZones', 'Input Nombre Zones Regroupement');
    const numRegroupementItems = getElement('numRegroupementItems', 'Input Nombre Éléments Regroupement');
    const generatePromptRegroupementBtn = getElement('generatePromptRegroupementBtn', 'Bouton Générer Prompt Regroupement');
    const promptRegroupementOutput = getElement('promptRegroupementOutput', 'Textarea Prompt Regroupement');
    const copyPromptRegroupementBtn = getElement('copyPromptRegroupementBtn', 'Bouton Copier Prompt Regroupement');
    const copyPromptRegroupementMessage = getElement('copyPromptRegroupementMessage', 'Message Copie Prompt Regroupement', false);
    const textShortQuestionsInput = getElement('textShortQuestionsInput', 'Textarea Input Questions Courtes (Onglet 3)');
    const convertShortToImageWithCorrectionBtn = getElement('convertShortToImageWithCorrectionBtn', 'Bouton Image Courtes AVEC Cor.');
    const convertShortToImageWithoutCorrectionBtn = getElement('convertShortToImageWithoutCorrectionBtn', 'Bouton Image Courtes SANS Cor.');
    const exportShortToDocxWithCorrectionBtn = getElement('exportShortToDocxWithCorrectionBtn', 'Bouton DOCX Courtes AVEC Cor.');
    const exportShortToDocxWithoutCorrectionBtn = getElement('exportShortToDocxWithoutCorrectionBtn', 'Bouton DOCX Courtes SANS Cor.');
    const textMCQInput = getElement('textMCQInput', 'Textarea Input QCM (Onglet 3)');
    const convertMCQTableBtn = getElement('convertMCQTableBtn', 'Bouton Convertir Tableau QCM');
    const mcqConversionMessage = getElement('mcqConversionMessage', 'Message Conversion QCM', false);
    const convertMCQToImageWithCorrectionBtn = getElement('convertMCQToImageWithCorrectionBtn', 'Bouton Image QCM AVEC Cor.');
    const convertMCQToImageWithoutCorrectionBtn = getElement('convertMCQToImageWithoutCorrectionBtn', 'Bouton Image QCM SANS Cor.');
    const exportMCQToDocxWithCorrectionBtn = getElement('exportMCQToDocxWithCorrectionBtn', 'Bouton DOCX QCM AVEC Cor.');
    const exportMCQToDocxWithoutCorrectionBtn = getElement('exportMCQToDocxWithoutCorrectionBtn', 'Bouton DOCX QCM SANS Cor.');
    const convertCombinedToImageWithCorrectionBtn = getElement('convertCombinedToImageWithCorrectionBtn', 'Bouton Image Combinée AVEC Cor.');
    const convertCombinedToImageWithoutCorrectionBtn = getElement('convertCombinedToImageWithoutCorrectionBtn', 'Bouton Image Combinée SANS Cor.');
    const existingHtmlCourseCodeInput = getElement('existingHtmlCourseCodeInput', 'Textarea Code HTML Existant');
    const designColorPrimary = getElement('designColorPrimary', 'Input Couleur Primaire Design');
    const designColorSecondary = getElement('designColorSecondary', 'Input Couleur Secondaire Design');
    const designColorAccent = getElement('designColorAccent', 'Input Couleur Accentuation Design');
    const designGeneralStyle = getElement('designGeneralStyle', 'Select Style Général Design');
    const designIconStyle = getElement('designIconStyle', 'Select Style Icônes Design');
    const designImageInstructions = getElement('designImageInstructions', 'Textarea Instructions Images Design');
    const designOtherImprovements = getElement('designOtherImprovements', 'Textarea Autres Améliorations Design');
    const generateDesignModificationPromptBtn = getElement('generateDesignModificationPromptBtn', 'Bouton Générer Prompt Modification Design');
    const designModificationPromptOutput = getElement('designModificationPromptOutput', 'Textarea Prompt Modification Design');
    const copyDesignModificationPromptBtn = getElement('copyDesignModificationPromptBtn', 'Bouton Copier Prompt Modification Design');
    const copyDesignModificationPromptMessage = getElement('copyDesignModificationPromptMessage', 'Message Copie Prompt Modification Design', false);

    function showFeedback(element, message, type = 'success', duration = 3000) {
        if (!element) { return; }
        element.textContent = message;
        element.className = `feedback-message ${type}`; 
        requestAnimationFrame(() => { 
            element.classList.add('show');
        });
        setTimeout(() => {
            element.classList.remove('show');
            setTimeout(() => { if (element.textContent === message) { element.textContent = ''; element.className = 'feedback-message'; } }, 300);
        }, duration);
    }

    function copyToClipboardUtil(text, messageElement, successText = "Copié avec succès !") {
        if (!text || text.trim() === "") { if (messageElement) showFeedback(messageElement, "Rien à copier.", 'error'); return; }
        navigator.clipboard.writeText(text).then(() => {
            if (messageElement) showFeedback(messageElement, successText, 'success');
        }).catch(err => {
            console.error('Erreur de copie Clipboard API:', err);
            try { 
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed"; textArea.style.left = "-9999px"; 
                document.body.appendChild(textArea);
                textArea.focus(); textArea.select(); document.execCommand('copy');
                document.body.removeChild(textArea);
                if (messageElement) showFeedback(messageElement, successText + " (via fallback)", 'success');
            } catch (fallbackErr) {
                console.error('Erreur de copie fallback execCommand:', fallbackErr);
                if (messageElement) showFeedback(messageElement, 'Erreur de copie.', 'error');
            }
        });
    }

    function updateRadioLabelStyle() {
        const radioContainers = document.querySelectorAll('.radio-group');
        radioContainers.forEach(container => {
            container.querySelectorAll('.radio-label-modern').forEach(label => {
                const input = label.querySelector('input[type="radio"]');
                if (input) {
                    label.classList.toggle('selected', input.checked);
                }
            });
        });
    }

    function cleanUserInputText(htmlOrText) {
        if (typeof htmlOrText !== 'string') return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlOrText; 
        let text = tempDiv.textContent || tempDiv.innerText || "";
        text = text.replace(/\s\s+/g, ' '); 
        text = text.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n'); 
        return text.trim();
    }

    function parseMarkdownTableRow(rowString) {
        if (!rowString || !rowString.trim().startsWith('|') || !rowString.trim().endsWith('|')) return null;
        return rowString.slice(1, -1).split('|').map(cell => cell.trim());
    }

    function parseExerciseText(rawText, exerciseType) {
        const parsedItems = [];
        if (!rawText || typeof rawText !== 'string') {
            // console.warn(`parseExerciseText: rawText est invalide pour le type ${exerciseType}.`);
            return parsedItems; // Retourne un tableau vide si rawText est null, undefined, ou pas une chaîne
        }

        if (exerciseType === 'short') {
            const lines = rawText.split('\n').filter(line => line.trim() !== "");
            lines.forEach((line) => {
                const parts = line.split('::');
                if (parts.length >= 2) { // Accepte plus de '::' mais ne prend que les deux premiers segments
                    parsedItems.push({ type: 'short', data: { question: parts[0].trim(), answer: parts.slice(1).join('::').trim() } });
                } else if (line.trim()) {
                    parsedItems.push({ type: 'short', data: { question: line.trim(), answer: "Format incorrect : Le séparateur '::' est manquant entre la question et la réponse." }, error: true });
                }
            });
        } else if (exerciseType === 'mcq') {
            const qcmBlocks = rawText.split(/\s*\n\s*---\s*\n\s*/gm).map(b => b.trim()).filter(block => block.length > 0);

            if (qcmBlocks.length === 0 && rawText.trim().length > 0 && !rawText.includes("---")) {
                 parsedItems.push({ type: 'mcq', originalBlock: rawText, parsingError: "Format QCM non reconnu. Aucun séparateur '---' valide trouvé entre les QCM. Chaque QCM doit être séparé par une ligne contenant uniquement '---'." });
            } else if (qcmBlocks.length === 0 && rawText.trim().length > 0 && rawText.includes("---") ) {
                 // This case means "---" exists but perhaps no valid content around it.
                 parsedItems.push({ type: 'mcq', originalBlock: rawText, parsingError: "Des séparateurs '---' ont été trouvés, mais aucun bloc QCM valide n'a pu être extrait. Vérifiez le contenu autour des séparateurs."})
            } else {
                qcmBlocks.forEach((block, blockIndex) => {
                    const blockLines = block.trim().split('\n').filter(l => l.trim() !== '');
                    if (blockLines.length < 2) { 
                        parsedItems.push({ type: 'mcq', originalBlock: block, parsingError: `Bloc QCM #${blockIndex + 1} est trop court. Il doit contenir au moins une question et une ligne de correction, ou une question et des options.`});
                        return;
                    }
                    
                    let questionText = blockLines[0].trim().replace(/^\d+[.)]\s*/, ''); // Enlève "1. ", "1) " etc.
                    let options = [];
                    let correctAnswerLetter = null;
                    let correctionLineFound = false;
                    let parsingErrorMessage = null;

                    for (let i = 1; i < blockLines.length; i++) {
                        const currentLine = blockLines[i].trim();
                        const lowerLine = currentLine.toLowerCase();
                        
                        // Regex améliorée pour la ligne de correction
                        const correctionMatch = currentLine.match(/^(?:bonne réponse|réponse|correct(?:ion)?)\s*[:\-\s=]*\s*([A-Z])(?:[.)\s]|$)/i);

                        if (correctionMatch) {
                            correctAnswerLetter = correctionMatch[1].toUpperCase();
                            correctionLineFound = true;
                            // Ne pas faire 'break' ici si la ligne de correction peut être au milieu des options par erreur utilisateur
                            // Cependant, conventionnellement, elle est à la fin. Pour l'instant, on la traite dès qu'on la trouve.
                            // Si on la trouve, on ne devrait plus ajouter de lignes aux options APRÈS elle.
                        } else if (!correctionLineFound && currentLine) { 
                            // Si la ligne de correction n'a pas encore été trouvée et que la ligne n'est pas vide
                            // On essaie de la traiter comme une option
                            options.push(currentLine.replace(/^[A-Z][).:\-]\s*/i, '').trim()); // Enlève "A. ", "B) ", "C:", "D-"
                        } else if (correctionLineFound && currentLine) {
                            // Si la ligne de correction a été trouvée et qu'il y a d'autres lignes non vides,
                            // on pourrait les ignorer ou les considérer comme des notes/explications. Pour l'instant, on les ignore.
                            // console.log(`Ligne ignorée après correction trouvée : "${currentLine}"`);
                        }
                    }
                    
                    if (!correctionLineFound) {
                        parsingErrorMessage = `Ligne de correction (ex: "Bonne réponse : A") non trouvée ou mal formatée pour le QCM #${blockIndex + 1}.`;
                    } else if (options.length === 0) {
                        parsingErrorMessage = `Aucune option de réponse n'a été trouvée pour le QCM #${blockIndex + 1} avant la ligne de correction.`;
                    } else if (correctAnswerLetter && options.length > 0 && (correctAnswerLetter.charCodeAt(0) - 65 >= options.length)) {
                        parsingErrorMessage = `La lettre de la bonne réponse ("${correctAnswerLetter}") est hors de portée pour les ${options.length} options trouvées (QCM #${blockIndex + 1}). Vérifiez la lettre ou le nombre d'options.`;
                        correctAnswerLetter = null; // Invalider la lettre si hors de portée
                    } else if (correctAnswerLetter && !/^[A-Z]$/.test(correctAnswerLetter)) { // Redondant si regex capture bien, mais sécurité
                        parsingErrorMessage = `La lettre de la bonne réponse ("${correctAnswerLetter}") est invalide pour le QCM #${blockIndex + 1}. Elle doit être une seule lettre de A à Z.`;
                        correctAnswerLetter = null;
                    }


                    if (parsingErrorMessage) {
                        parsedItems.push({ type: 'mcq', originalBlock: block, parsingError: parsingErrorMessage, data: { question: questionText, options: options, correctAnswerLetter: null } }); // Garde les options si trouvées
                    } else {
                        parsedItems.push({ type: 'mcq', data: { question: questionText, options: options, correctAnswerLetter: correctAnswerLetter } });
                    }
                });
            }
        }
        return parsedItems;
    }

    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return '';
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    function buildExerciseHtml(parsedItems, showCorrection, exerciseType, title) {
        let sectionHtml = `<div class="questions-render-container"><h3>${escapeHtml(title)}</h3><ul>`;
        let itemCounter = 0;
        if (!parsedItems || parsedItems.length === 0) {
            sectionHtml += `<li><p class="mcq-parsing-error-note">Aucun exercice ${exerciseType === 'short' ? 'à réponse courte' : 'QCM'} n'a été trouvé ou analysé.</p></li>`;
        } else {
            parsedItems.forEach((item) => {
                itemCounter++;
                const li = document.createElement('li'); 
                li.classList.add('question-item');
                let currentItemHtml = "";

                if (item.type === 'short') {
                    const questionText = item.data && item.data.question ? item.data.question : 'Question non définie';
                    const answerText = item.data && item.data.answer ? item.data.answer : 'Réponse non définie';
                    currentItemHtml = `<div class="question-text">${itemCounter}. ${escapeHtml(questionText)}</div>`;
                    if (item.error) { 
                        currentItemHtml += `<div class="mcq-parsing-error-note">${escapeHtml(answerText)}</div>`; // answerText here is the error msg
                    } else if (showCorrection) {
                        currentItemHtml += `<div class="answer-text">Réponse attendue : ${escapeHtml(answerText)}</div>`;
                    }
                } else if (item.type === 'mcq') {
                    const questionText = item.data && item.data.question ? item.data.question : 'Question de QCM non définie';
                    if (item.parsingError) {
                        currentItemHtml = `<div class="mcq-question-block"><div class="mcq-question-text">${itemCounter}. ${escapeHtml(questionText)} (Erreur)</div>`;
                        if (item.originalBlock) {
                            currentItemHtml += `<pre style="white-space:pre-wrap; font-size:0.8em; color: #555;">Bloc concerné (début):\n${escapeHtml(item.originalBlock.substring(0,150))}...</pre>`;
                        }
                        currentItemHtml += `<div class="mcq-parsing-error-note">${escapeHtml(item.parsingError)}</div>`;
                         // Afficher les options même en cas d'erreur de parsing de la réponse, si les options ont été extraites
                        if (item.data && item.data.options && item.data.options.length > 0) {
                            currentItemHtml += `<ul class="mcq-options-list">`;
                            item.data.options.forEach(optText => {
                                currentItemHtml += `<li>${escapeHtml(optText || 'Option non définie')}</li>`;
                            });
                            currentItemHtml += `</ul>`;
                        }
                        currentItemHtml += `</div>`; // Close mcq-question-block
                    } else { // Pas d'erreur de parsing pour ce QCM
                        currentItemHtml = `<div class="mcq-question-block"><div class="mcq-question-text">${itemCounter}. ${escapeHtml(questionText)}</div>`;
                        if (item.data && item.data.options && item.data.options.length > 0) {
                             currentItemHtml += `<ul class="mcq-options-list">`;
                            item.data.options.forEach(optText => {
                                currentItemHtml += `<li>${escapeHtml(optText || 'Option non définie')}</li>`;
                            });
                            currentItemHtml += `</ul>`;
                        } else {
                            currentItemHtml += `<div class="mcq-parsing-error-note">Aucune option n'a été trouvée pour ce QCM.</div>`;
                        }

                        if (showCorrection) {
                            if (item.data && item.data.correctAnswerLetter) {
                                currentItemHtml += `<div class="mcq-correction-text">Bonne réponse : ${escapeHtml(item.data.correctAnswerLetter)}</div>`;
                            } else {
                                currentItemHtml += `<div class="mcq-correction-text" style="color:orange;">(Correction non spécifiée ou non trouvée)</div>`;
                            }
                        }
                        currentItemHtml += `</div>`; 
                    }
                }
                li.innerHTML = currentItemHtml;
                sectionHtml += li.outerHTML; 
            });
        }
        sectionHtml += `</ul></div>`; 
        return sectionHtml;
    }

    function generateDocxHtmlContent(parsedItems, exerciseType, showCorrection, docTitle) {
        let htmlContent = `<!DOCTYPE html><html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>${escapeHtml(docTitle)}</title>`;
        htmlContent += `<style> body{font-family: Calibri, Arial, sans-serif; font-size:11pt; margin: 1in;} h1{font-size:18pt; font-weight:bold; margin-bottom:24px; color:#2E74B5; text-align:center;} p{margin-bottom:6px; line-height:1.3;} ul{margin-top:0px; padding-left:30px;} li{margin-bottom:4px; line-height:1.3;} .question-block{margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #BFBFBF;} .question-block:last-child{border-bottom: none;} .question-text{font-weight:bold; margin-bottom:6px; font-size:12pt;} .answer-text{font-style:italic; color:#38761D; margin-left:20px;} .mcq-option{margin-left:0px;} .correction-text{font-style:italic; font-weight:bold; color:#38761D; margin-left:0px;} .placeholder-line{color:#7F7F7F; font-style:italic;} .error-note{color:red; font-style:italic; font-size:9pt; margin-left:20px; margin-top:5px;} </style></head><body>`;
        htmlContent += `<h1>${escapeHtml(docTitle)}</h1>`;

        let itemCounter = 0;
        if (!parsedItems || parsedItems.length === 0) {
             htmlContent += `<p>Aucun exercice ${exerciseType === 'short' ? 'à réponse courte' : 'QCM'} n'a été trouvé ou analysé pour l'exportation.</p>`;
        } else {
            parsedItems.forEach(item => {
                itemCounter++;
                const questionData = item.data || {}; // Assurer que item.data existe

                htmlContent += `<div class='question-block'>`;
                htmlContent += `<p class='question-text'>${itemCounter}. ${escapeHtml(questionData.question || (item.parsingError || item.error ? 'Erreur d\'analyse de la question' : 'Question non définie'))}</p>`;
                
                if (item.parsingError || item.error) { 
                    htmlContent += `<p class='error-note'>Détail de l'erreur : ${escapeHtml(item.parsingError || questionData.answer)}</p>`; // Pour short q, questionData.answer est l'erreur
                    if (item.originalBlock) { 
                        htmlContent += `<p class='error-note'>Bloc original (début) : ${escapeHtml(item.originalBlock.substring(0,100))}...</p>`;
                    }
                }

                if (item.type === 'short' && !item.error) { // Ne pas afficher réponse/placeholder si erreur de format initial
                    if (showCorrection) {
                        htmlContent += `<p class='answer-text'>Réponse attendue : ${escapeHtml(questionData.answer || 'Réponse non définie')}</p>`;
                    } else {
                        htmlContent += "<p class='placeholder-line'>Réponse : ________________________________________________</p>";
                    }
                } else if (item.type === 'mcq') {
                    // Afficher les options même si une erreur de parsing de la réponse existe, si les options ont été extraites
                    if (questionData.options && questionData.options.length > 0) {
                        htmlContent += "<ul style='list-style-type: none; padding-left: 20px;'>";
                        questionData.options.forEach((optText, index) => {
                            htmlContent += `<li class='mcq-option'>${String.fromCharCode(65 + index)}. ${escapeHtml(optText || 'Option non définie')}</li>`;
                        });
                        htmlContent += "</ul>";
                    } else if (!item.parsingError) { // S'il n'y a pas d'erreur de parsing globale mais pas d'options
                         htmlContent += "<p class='error-note'>Aucune option de réponse trouvée pour ce QCM.</p>";
                    }

                    if (showCorrection && !item.parsingError) { // N'afficher la correction que s'il n'y a pas d'erreur de parsing pour la correction elle-même
                        if (questionData.correctAnswerLetter) {
                            htmlContent += `<p class='correction-text'>Bonne réponse : ${escapeHtml(questionData.correctAnswerLetter)}</p>`;
                        } else {
                             htmlContent += "<p class='correction-text' style='color:orange;'>(Correction non spécifiée ou invalide)</p>";
                        }
                    } else if (!showCorrection && !item.parsingError) { // Placeholder pour la réponse de l'élève
                        htmlContent += "<p class='placeholder-line'>Votre choix : _____</p>";
                    }
                }
                htmlContent += `</div>`;
            });
        }
        if (itemCounter === 0 && parsedItems && parsedItems.length > 0) { // Si des items ont été parsés mais tous avec erreurs bloquantes
             htmlContent += "<p>Tous les exercices contenaient des erreurs et n'ont pas pu être formatés correctement.</p>";
        }
        htmlContent += "</body></html>";
        return htmlContent;
    }

    function triggerDocDownload(htmlContent, filename) {
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(htmlContent);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload); 
        fileDownload.href = source;
        fileDownload.download = filename;
        fileDownload.click();
        document.body.removeChild(fileDownload);
    }

    async function openModalWithHtmlForCanvas(htmlToRender, fileName, modalTitleText) {
        if (!modal || !modalTitleElement || !modalHtmlContentDiv || !modalImageElement || !modalImagePlaceholder || !modalDownloadLink) {
            console.error("Éléments de la modale manquants pour openModalWithHtmlForCanvas.");
            alert("Erreur : Impossible d'ouvrir la modale d'aperçu.");
            return;
        }

        modalTitleElement.textContent = modalTitleText;
        modalHtmlContentDiv.innerHTML = htmlToRender;
        modalHtmlContentDiv.classList.remove('hidden');
        modalImageElement.classList.add('hidden');
        modalImagePlaceholder.classList.add('hidden'); 
        modalDownloadLink.classList.add('hidden');
        modal.style.display = 'block';
        await new Promise(resolve => setTimeout(resolve, 100));

        try {
            const canvas = await html2canvas(modalHtmlContentDiv, {
                scale: 2, 
                backgroundColor: '#ffffff', 
                useCORS: true, 
                logging: false 
            });
            const imageUrl = canvas.toDataURL('image/png');
            modalImageElement.src = imageUrl;
            modalDownloadLink.href = imageUrl;
            modalDownloadLink.download = fileName;
            modalHtmlContentDiv.classList.add('hidden');
            modalImageElement.classList.remove('hidden');
            modalDownloadLink.classList.remove('hidden');
            modalImagePlaceholder.classList.add('hidden'); 
        } catch (error) {
            console.error("Erreur html2canvas:", error);
            modalImagePlaceholder.textContent = "Erreur lors de la génération de l'image.";
            modalImagePlaceholder.classList.remove('hidden');
            modalHtmlContentDiv.classList.add('hidden');
            modalImageElement.classList.add('hidden');
            modalDownloadLink.classList.add('hidden');
        }
    }

    function processAndDisplayImageInModal(textInput, exerciseType, showCorrection, processingButton, baseFileName, modalTitleText) {
        if (!textInput) { console.error("processAndDisplayImageInModal: textInput non fourni."); return; }
        if (!processingButton) { console.error("processAndDisplayImageInModal: processingButton non fourni."); return; }

        const rawText = textInput.value; // Ne pas trimer ici pour que parseExerciseText le fasse au besoin
        if (!rawText.trim()) { // Vérifier si vide après trim
            alert(`Veuillez coller le texte pour "${exerciseType === 'short' ? 'Questions Courtes' : 'QCM'}" avant de convertir.`);
            textInput.focus(); return;
        }
        if (typeof html2canvas === 'undefined') {
            alert("La librairie html2canvas n'est pas chargée. Veuillez vérifier la connexion internet ou l'intégration de la librairie.");
            console.error("processAndDisplayImageInModal: html2canvas non défini.");
            return;
        }

        const originalButtonContent = processingButton.innerHTML;
        processingButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
        processingButton.disabled = true;

        const parsedItems = parseExerciseText(rawText, exerciseType); 
        
        // Pour les images, on ne veut afficher que les items sans erreur de parsing majeure
        const validItemsForImage = parsedItems.filter(item => !item.parsingError || (item.type === 'mcq' && item.data && item.data.question)); // Pour QCM, si question existe mais erreur sur réponse, on peut l'afficher

        if (validItemsForImage.length === 0) {
            let errorMsg = "Aucune donnée valide à convertir en image. Vérifiez le format de votre texte d'entrée.\n";
            const errors = parsedItems.filter(item => item.parsingError || item.error);
            if (errors.length > 0) {
                errorMsg += "\nErreurs détectées (max 3 affichées) :\n";
                errors.slice(0, 3).forEach(err => { 
                    errorMsg += `- ${err.parsingError || (err.data ? err.data.answer : 'Erreur inconnue')}\n`;
                });
            } else if (rawText.trim()) {
                 errorMsg += "Le texte fourni n'a pas pu être interprété comme des exercices valides."
            }
            alert(errorMsg);
            processingButton.innerHTML = originalButtonContent;
            processingButton.disabled = false;
            return;
        }

        const exerciseTitleInModal = `${modalTitleText} ${showCorrection ? '(Corrigé)' : '(Exercice)'}`;
        // On passe tous les items parsés à buildExerciseHtml, qui saura afficher les erreurs individuellement
        const htmlToRender = buildExerciseHtml(parsedItems, showCorrection, exerciseType, exerciseTitleInModal);

        openModalWithHtmlForCanvas(htmlToRender, `${baseFileName}_${showCorrection ? 'corrige' : 'exercice'}.png`, exerciseTitleInModal)
            .finally(() => { 
                processingButton.innerHTML = originalButtonContent;
                processingButton.disabled = false;
            });
    }

    function handleExerciseDocxExport(textInput, exerciseType, showCorrection, processingButton) {
        if (!textInput) { console.error("handleExerciseDocxExport: textInput non fourni."); return; }
        const rawText = textInput.value; // Ne pas trimer ici
        if (!rawText.trim()) {
            alert(`Veuillez coller le texte pour "${exerciseType === 'short' ? 'Questions Courtes' : 'QCM'}" avant d'exporter.`);
            textInput.focus(); return;
        }

        const originalButtonText = processingButton ? processingButton.dataset.originalText || processingButton.innerHTML : '';
        if(processingButton) {
            processingButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération...';
            processingButton.disabled = true;
        }

        const parsedItems = parseExerciseText(rawText, exerciseType); 

        if (parsedItems.length === 0 && rawText.trim().length > 0) { 
             alert("Aucun exercice n'a pu être analysé à partir du texte fourni. Vérifiez le format.");
             if(processingButton) {
                processingButton.innerHTML = originalButtonText; 
                processingButton.disabled = false;
            }
             return;
        }
        
        let docTitle = "", filename = "";
        if (exerciseType === 'short') {
            docTitle = showCorrection ? 'Questions à Réponses Courtes (Corrigé)' : 'Questions à Réponses Courtes (Exercice)';
            filename = showCorrection ? 'questions_courtes_corrige.doc' : 'questions_courtes_exercice.doc';
        } else { 
            docTitle = showCorrection ? 'Questions à Choix Multiples (Corrigé)' : 'Questions à Choix Multiples (Exercice)';
            filename = showCorrection ? 'qcm_corrige.doc' : 'qcm_exercice.doc';
        }
        // On passe tous les items à generateDocxHtmlContent, qui gère l'affichage des erreurs par item
        const htmlContent = generateDocxHtmlContent(parsedItems, exerciseType, showCorrection, docTitle);
        triggerDocDownload(htmlContent, filename);

        if(processingButton) {
            processingButton.innerHTML = originalButtonText;
            processingButton.disabled = false;
        }
    }

     async function generateCombinedImage(showCorrection, processingButton) {
        if (!textShortQuestionsInput || !textMCQInput || !processingButton) {
            console.error("generateCombinedImage: Un ou plusieurs éléments DOM requis sont manquants.");
            if(processingButton) {
                processingButton.innerHTML = processingButton.dataset.originalText || 'Générer Image Combinée';
                processingButton.disabled = false;
            }
            return;
        }
        const rawTextShort = textShortQuestionsInput.value;
        const rawTextMCQ = textMCQInput.value;

        if (!rawTextShort.trim() && !rawTextMCQ.trim()) {
            alert("Veuillez fournir du texte pour au moins un type d'exercice (Questions Courtes ou QCM).");
            return;
        }
        if (typeof html2canvas === 'undefined') {
            alert("La librairie html2canvas n'est pas chargée.");
            console.error("generateCombinedImage: html2canvas non défini.");
            return;
        }

        const originalButtonContent = processingButton.innerHTML;
        processingButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement Combiné...';
        processingButton.disabled = true;

        let combinedHtml = "<div class='questions-render-container' style='width:100%;'>"; 
        let hasContentToDisplay = false; // Indicateur si au moins une section a du contenu valide ou des erreurs à afficher
        let mainTitle = `Exercices Combinés ${showCorrection ? '(Corrigé)' : '(Exercice)'}`;
        combinedHtml += `<h3>${escapeHtml(mainTitle)}</h3>`;

        if (rawTextShort.trim()) {
            const parsedShort = parseExerciseText(rawTextShort, 'short');
            // Même si parsedShort est vide, buildExerciseHtml gère l'affichage d'un message
            combinedHtml += buildExerciseHtml(parsedShort, showCorrection, 'short', 'Questions à Réponses Courtes');
            if(parsedShort.length > 0) hasContentToDisplay = true;
        }

        if (rawTextMCQ.trim()) {
            if (rawTextShort.trim()) { 
                combinedHtml += `<div style="height: 2px; background-color: #ccc; margin: 25px 0; border-radius: 1px;"></div>`;
            }
            const parsedMCQ = parseExerciseText(rawTextMCQ, 'mcq');
            combinedHtml += buildExerciseHtml(parsedMCQ, showCorrection, 'mcq', 'Questions à Choix Multiples');
            if(parsedMCQ.length > 0) hasContentToDisplay = true;
        }
        combinedHtml += "</div>"; 

        if (!hasContentToDisplay && !rawTextShort.trim() && !rawTextMCQ.trim()) { // Double check, should be caught earlier
            alert("Aucun contenu valide à afficher pour l'image combinée. Vérifiez les formats d'entrée.");
            processingButton.innerHTML = originalButtonContent;
            processingButton.disabled = false;
            return;
        }
        
        await openModalWithHtmlForCanvas(combinedHtml, `exercices_combines_${showCorrection ? 'corrige' : 'exercice'}.png`, mainTitle);

        processingButton.innerHTML = originalButtonContent;
        processingButton.disabled = false;
    }

    function populateModules(gradeValue) {
        if (!moduleSelect || !modulesData) {
            console.error("Élément moduleSelect ou modulesData non disponible pour populateModules.");
            return;
        }
        while (moduleSelect.options.length > 1) {
            moduleSelect.remove(1);
        }
        if (outputPrompt) outputPrompt.value = ''; 
        if (pedagogicalOutput) pedagogicalOutput.value = ''; 
        if(copyMessage) copyMessage.textContent = '';
        if(copyPedagogicalOutputMessage) copyPedagogicalOutputMessage.textContent = '';

        const modulesForGrade = modulesData[gradeValue];
        if (gradeValue && modulesForGrade) {
            Object.keys(modulesForGrade).forEach(key => {
                const module = modulesForGrade[key];
                const option = document.createElement('option');
                option.value = key;
                option.textContent = `${key}. ${module.title}`;
                moduleSelect.appendChild(option);
            });
            moduleSelect.disabled = false;
        } else {
            moduleSelect.disabled = true;
        }
    }

    if (gradeSelect) {
        gradeSelect.addEventListener('change', function() {
            populateModules(this.value);
        });
        if (gradeSelect.value) {
            populateModules(gradeSelect.value);
        } else if (moduleSelect) {
            moduleSelect.disabled = true; 
        }
    }

    const radioGroupsDOM = document.querySelectorAll('.radio-group'); // Renamed to avoid conflict
    if (radioGroupsDOM.length > 0) {
        radioGroupsDOM.forEach(group => {
            const radioInputs = group.querySelectorAll('input[type="radio"]');
            radioInputs.forEach(radioInput => {
                radioInput.addEventListener('change', updateRadioLabelStyle);
            });
        });
        updateRadioLabelStyle(); 
    }

    // **ONGLET 1: Prompts Module (Listeners)**
    if (generateButton && studentThemesInput && outputPrompt && gradeSelect && moduleSelect && modulesData && outputFormatGroup) {
        generateButton.addEventListener('click', function() {
            const selectedGrade = gradeSelect.value;
            const selectedModuleKey = moduleSelect.value;
            const studentThemes = studentThemesInput.value.trim();
            const outputFormatRadio = outputFormatGroup.querySelector('input[name="outputFormat"]:checked');

            if (!selectedGrade) { alert("Veuillez choisir un niveau."); if(gradeSelect) gradeSelect.focus(); return; }
            if (!selectedModuleKey) { alert("Veuillez choisir un module."); if(moduleSelect) moduleSelect.focus(); return; }
            if (!outputFormatRadio) { alert("Veuillez choisir un format de sortie."); return; }

            const outputFormat = outputFormatRadio.value;
            const moduleDetails = modulesData[selectedGrade]?.[selectedModuleKey];

            if (!moduleDetails) { alert("Détails du module non trouvés. Veuillez re-sélectionner."); return; }

            let promptText = `Agis en tant qu'expert en ingénierie pédagogique spécialisé en technologie pour le collège (niveau ${selectedGrade}), et également en conception de supports de cours engageants.\n`;
            promptText += `Je souhaite que tu génères le contenu complet pour le module ${selectedModuleKey} intitulé "${moduleDetails.title}".\n`;
            promptText += `La cible sont des élèves de ${selectedGrade}.\n\n`;
            promptText += `**Thèmes Chers aux Élèves (à intégrer dans les exemples autant que possible) :** ${studentThemes || 'non spécifiés, utiliser des exemples généraux et pertinents pour des collégiens'}\n\n`;
            promptText += `**Format de Sortie Demandé : ${outputFormat === 'html' ? 'Page Web HTML unique (avec CSS/JS intégrés pour interactivité et style)' : 'Document DOCX (structuré pour être facilement copié dans Word, avec descriptions pour images/schémas)'}**\n\n`;
            promptText += `**Structure et Contenu Détaillé du Module "${moduleDetails.title}" (${selectedGrade}) :**\n\n`;
            promptText += `1.  **Titre du Module :** "${moduleDetails.title}"\n\n`;
            promptText += `2.  **Introduction (environ 150 mots) :**\n`;
            promptText += `    * Phrase d'accroche engageante : "${moduleDetails.hook || `Découvrons ensemble le monde fascinant de ${moduleDetails.title} !`}"\n`;
            promptText += `    * Présentation claire des objectifs d'apprentissage : Ce que l'élève saura faire (compétences : "${moduleDetails.skills || 'Compétences clés du module'}").\n`;
            promptText += `    * Annonce des connaissances qui seront acquises : Les savoirs essentiels (connaissances : "${moduleDetails.knowledge || 'Connaissances fondamentales du module'}").\n\n`;
            promptText += `3.  **Développement du Cours (Minimum 3 sections ou chapitres principaux) :**\n`;
            promptText += `    * Pour chaque section/chapitre :\n`;
            promptText += `        * Titre clair et pertinent pour la section.\n`;
            promptText += `        * Explication détaillée des concepts, adaptée au niveau ${selectedGrade}, en utilisant un langage simple et des analogies si possible.\n`;
            promptText += `        * Au moins deux exemples concrets illustrant les concepts, en lien avec les thèmes chers aux élèves si possible.\n`;
            promptText += `        * ${outputFormat === 'html' ? "Suggestions d'éléments interactifs simples (ex: un clic pour révéler une info, une petite animation CSS pour illustrer un mécanisme) ou d'icônes/images libres de droits à intégrer (fournir des placeholders comme [IMAGE: description de l'image] si tu ne peux pas générer d'URL)." : "Descriptions textuelles détaillées des schémas, illustrations ou tableaux nécessaires pour clarifier les points clés. Exemple : [SCHÉMA : Diagramme montrant X avec Y et Z]."} \n`;
            promptText += `    * Intégrer des "Le Savais-tu ?" ou "Point Focus" (au moins 2-3 dans tout le module) : Anecdotes, faits surprenants, applications concrètes avancées, ou liens vers l'actualité technologique.\n\n`;
            promptText += `4.  **Conclusion (environ 100 mots) :**\n`;
            promptText += `    * Bref résumé des points essentiels du module.\n`;
            promptText += `    * Ouverture vers le prochain module ou une application plus large des connaissances acquises.\n`;
            promptText += `    * Une question pour stimuler la réflexion des élèves.\n\n`;
            promptText += `5.  **Glossaire (5 à 10 termes techniques importants du module) :**\n`;
            promptText += `    * Définitions claires et concises, adaptées au niveau ${selectedGrade}.\n\n`;

            if (outputFormat === 'html') {
                promptText += `**Consignes Spécifiques pour la Sortie HTML :**\n`;
                promptText += `* **Fichier Unique :** Tout le code (HTML, CSS, et JavaScript pour l'interactivité) doit être dans un seul fichier HTML.\n`;
                promptText += `* **Design :** Doit être moderne, responsive (adaptable aux tablettes et mobiles), et visuellement attrayant pour des collégiens. Utilise des couleurs harmonieuses, une typographie lisible, et aère le contenu.\n`;
                promptText += `* **CSS :** Intégré dans des balises \`<style>\` dans le \`<head>\`. Utilise des classes pour le style.\n`;
                promptText += `* **JavaScript (si nécessaire pour l'interactivité) :** Intégré dans des balises \`<script>\` à la fin du \`<body>\`. Pour des interactions comme afficher/cacher des éléments, des mini-quiz simples non notés, etc.\n`;
                promptText += `* **Accessibilité :** Penser aux contrastes, aux alternatives pour les images (attributs alt), et à une structure sémantique (bon usage des balises h1-h6, nav, main, section, article, aside, footer).\n`;
                promptText += `* **Exercices Interactifs (Optionnel mais fortement souhaité pour HTML) :** À la fin du contenu du cours, si possible, propose 2-3 petits exercices interactifs (QCM simple, vrai/faux, texte à trous simple) avec feedback immédiat (correct/incorrect). Cela doit être codé en HTML/CSS/JS directement.\n\n`;
            } else { // DOCX
                promptText += `**Consignes Spécifiques pour la Sortie DOCX :**\n`;
                promptText += `* **Formatage :** Utilise une structure claire avec des titres (Niveau 1 pour le titre du module, Niveau 2 pour les grandes sections, Niveau 3 pour les sous-sections). Utilise des listes à puces ou numérotées lorsque c'est pertinent.\n`;
                promptText += `* **Clarté :** Le texte doit être directement utilisable. Les descriptions pour les schémas/images doivent être claires pour que je puisse les recréer ou trouver des illustrations adéquates.\n\n`;
            }
            promptText += `Merci de générer le contenu complet et structuré pour ce module.`;
            outputPrompt.value = promptText;
            outputPrompt.scrollTop = 0; 
            if(copyMessage) showFeedback(copyMessage, "Prompt de module généré !", 'success');
        });
    }
    if (copyButton && outputPrompt && copyMessage) {
        copyButton.addEventListener('click', () => copyToClipboardUtil(outputPrompt.value, copyMessage));
    }

    if (logbookButton && pedagogicalOutput && pedagogicalOutputLabel && gradeSelect && moduleSelect && modulesData) {
        logbookButton.addEventListener('click', function() {
            const selectedGrade = gradeSelect.value;
            const selectedModuleKey = moduleSelect.value;
            if (!selectedGrade || !selectedModuleKey) {
                alert("Veuillez d'abord sélectionner un niveau et un module.");
                return;
            }
            const moduleDetails = modulesData[selectedGrade]?.[selectedModuleKey];
            if (!moduleDetails) { alert("Détails du module non trouvés."); return; }

            const logbookText = `Pour la séance prochaine en ${selectedGrade}, nous travaillerons sur le module "${moduleDetails.title}". Objectifs : Comprendre ${moduleDetails.knowledge.toLowerCase()}.`;
            pedagogicalOutput.value = logbookText;
            if(pedagogicalOutputLabel) pedagogicalOutputLabel.textContent = "Phrase pour Cahier de Texte :";
            if(copyPedagogicalOutputMessage) showFeedback(copyPedagogicalOutputMessage, "Phrase pour cahier de texte générée !", "success");
        });
    }

    if (summaryButton && pedagogicalOutput && pedagogicalOutputLabel && gradeSelect && moduleSelect && modulesData) {
        summaryButton.addEventListener('click', function() {
            const selectedGrade = gradeSelect.value;
            const selectedModuleKey = moduleSelect.value;
            if (!selectedGrade || !selectedModuleKey) {
                alert("Veuillez d'abord sélectionner un niveau et un module.");
                return;
            }
            const moduleDetails = modulesData[selectedGrade]?.[selectedModuleKey];
            if (!moduleDetails) { alert("Détails du module non trouvés."); return; }

            const summaryText = `Résumé des connaissances pour les élèves (Module: ${moduleDetails.title} - ${selectedGrade}):\n` +
                                `À la fin de ce module, tu dois être capable de :\n` +
                                `* Expliquer ce qu'est : ${moduleDetails.knowledge}.\n` +
                                `* Utiliser tes compétences pour : ${moduleDetails.skills}.\n` +
                                `N'oublie pas les points clés et les exemples vus en classe !`;
            pedagogicalOutput.value = summaryText;
            if(pedagogicalOutputLabel) pedagogicalOutputLabel.textContent = "Résumé des Connaissances pour Élèves :";
            if(copyPedagogicalOutputMessage) showFeedback(copyPedagogicalOutputMessage, "Résumé pour élèves généré !", "success");
        });
    }
    if (copyPedagogicalOutputButton && pedagogicalOutput && copyPedagogicalOutputMessage) {
        copyPedagogicalOutputButton.addEventListener('click', () => copyToClipboardUtil(pedagogicalOutput.value, copyPedagogicalOutputMessage, "Texte annexe copié !"));
    }

    function generateGenericExercisePrompt(exerciseTypeName, specificInstructions, outputTextarea, feedbackMessageElem) {
        if (!courseContentInputForExercises || !outputTextarea) return;
        const courseContent = courseContentInputForExercises.value.trim();
        if (!courseContent) {
            alert("Veuillez d'abord coller le contenu du cours dans la zone de texte principale de cet onglet.");
            courseContentInputForExercises.focus();
            return;
        }
        let prompt = `En te basant sur le contenu de cours suivant :\n\`\`\`\n${courseContent}\n\`\`\`\n\n`;
        prompt += `Génère ${exerciseTypeName} en respectant les consignes suivantes :\n${specificInstructions}\n\n`;
        prompt += `Assure-toi que les exercices soient adaptés à un niveau collège et directement liés au contenu fourni.`;
        outputTextarea.value = prompt;
        if(feedbackMessageElem) showFeedback(feedbackMessageElem, `Prompt pour ${exerciseTypeName} généré !`, "success");
    }

    if (generatePromptShortQuestionsBtn && numShortQuestions && promptShortQuestionsOutput) {
        generatePromptShortQuestionsBtn.addEventListener('click', () => {
            const count = numShortQuestions.value || 10;
            const instructions = `- ${count} questions à réponse courte et précise.\n- Pour chaque question, fournis également la réponse attendue, séparée par "::".\n- Les questions doivent tester la compréhension des concepts clés du cours.`;
            generateGenericExercisePrompt("Questions à Réponse Courte", instructions, promptShortQuestionsOutput, copyPromptShortMessage);
        });
    }
    if (copyPromptShortQuestionsBtn && promptShortQuestionsOutput && copyPromptShortMessage) {
        copyPromptShortQuestionsBtn.addEventListener('click', () => copyToClipboardUtil(promptShortQuestionsOutput.value, copyPromptShortMessage));
    }

    if (generatePromptMCQBtn && numMCQ && numChoicesMCQ && promptMCQOutput) {
        generatePromptMCQBtn.addEventListener('click', () => {
            const count = numMCQ.value || 7;
            const choices = numChoicesMCQ.value || 4;
            const instructions = `- ${count} Questions à Choix Multiples (QCM).\n- Chaque QCM doit avoir ${choices} propositions de réponse (lettres A, B, C,...).\n- Indique clairement la bonne réponse pour chaque QCM (par exemple, en utilisant le format "Bonne réponse : X" sur une ligne séparée à la fin de chaque QCM).\n- Fournis les QCM sous forme de texte structuré : Question sur une ligne, chaque option sur une nouvelle ligne (préfixée par A., B., etc.), puis la ligne de la bonne réponse. Sépare chaque QCM complet par une ligne contenant uniquement "---".\n- Varier les types de questions (définitions, applications, etc.).`;
            generateGenericExercisePrompt("QCM (format texte multilignes)", instructions, promptMCQOutput, copyPromptMCQMessage);
        });
    }
    if (copyPromptMCQBtn && promptMCQOutput && copyPromptMCQMessage) {
        copyPromptMCQBtn.addEventListener('click', () => copyToClipboardUtil(promptMCQOutput.value, copyPromptMCQMessage));
    }

    if (generatePromptSummaryBtn && promptSummaryOutput) {
        generatePromptSummaryBtn.addEventListener('click', () => {
            const instructions = `- Un résumé du cours en environ 180 mots.\n- Le résumé doit être concis, clair et reprendre les idées principales du texte fourni.\n- Il doit être formulé de manière à être facilement compréhensible par un élève de collège.`;
            generateGenericExercisePrompt("Résumé de Cours", instructions, promptSummaryOutput, copyPromptSummaryMessage);
        });
    }
    if (copyPromptSummaryBtn && promptSummaryOutput && copyPromptSummaryMessage) {
        copyPromptSummaryBtn.addEventListener('click', () => copyToClipboardUtil(promptSummaryOutput.value, copyPromptSummaryMessage));
    }

    if (generatePromptRegroupementBtn && numRegroupementZones && numRegroupementItems && promptRegroupementOutput) {
        generatePromptRegroupementBtn.addEventListener('click', () => {
            const zones = numRegroupementZones.value || 3;
            const itemsPerZone = numRegroupementItems.value || 5;
            const totalItems = zones * itemsPerZone;
            const instructions = `- Un exercice de regroupement.\n- Crée ${zones} zones (catégories) distinctes basées sur les concepts du cours.\n- Fournis une liste de ${totalItems} éléments (termes, définitions courtes, exemples) à classer dans ces zones.\n- Assure-toi qu'il y ait ${itemsPerZone} éléments à placer par zone.\n- Présente clairement les noms des zones et la liste des éléments à classer, puis la correction (quels éléments vont dans quelle zone).`;
            generateGenericExercisePrompt("Exercice de Regroupement", instructions, promptRegroupementOutput, copyPromptRegroupementMessage);
        });
    }
    if (copyPromptRegroupementBtn && promptRegroupementOutput && copyPromptRegroupementMessage) {
        copyPromptRegroupementBtn.addEventListener('click', () => copyToClipboardUtil(promptRegroupementOutput.value, copyPromptRegroupementMessage));
    }

    if (convertMCQTableBtn && textMCQInput && mcqConversionMessage && numChoicesMCQ) {
        convertMCQTableBtn.addEventListener('click', () => {
            const markdownTable = textMCQInput.value.trim();
            if (!markdownTable) {
                if(mcqConversionMessage) { mcqConversionMessage.textContent = "Veuillez coller un tableau Markdown."; mcqConversionMessage.className = "conversion-message-box error"; }
                return;
            }

            const lines = markdownTable.split('\n').map(l => l.trim()).filter(l => l.startsWith('|'));
            if (lines.length < 2) { 
                if(mcqConversionMessage) { mcqConversionMessage.textContent = "Tableau Markdown invalide ou incomplet."; mcqConversionMessage.className = "conversion-message-box error"; }
                return;
            }

            let qcmText = "";
            let conversionSuccess = false;
            let errors = [];
            let startRow = 1;
            if (lines[1] && lines[1].includes('---')) { 
                startRow = 2;
            }

            for (let i = startRow; i < lines.length; i++) {
                const cells = parseMarkdownTableRow(lines[i]);
                if (!cells || cells.length < 3) { 
                    errors.push(`Ligne ${i+1} du tableau mal formatée ou nombre de colonnes insuffisant.`);
                    continue;
                }

                const question = cells[0];
                const correctAnswerCell = cells[cells.length - 1]; 
                const options = cells.slice(1, cells.length - 1).filter(opt => opt.trim() !== "");

                if (!question || options.length === 0 || !correctAnswerCell) {
                     errors.push(`Données manquantes à la ligne ${i+1} (Question, au moins une option, ou bonne réponse).`);
                    continue;
                }

                qcmText += `${question}\n`;
                options.forEach((opt, index) => {
                    qcmText += `${String.fromCharCode(65 + index)}. ${opt}\n`;
                });
                qcmText += `Bonne réponse : ${correctAnswerCell.trim().charAt(0).toUpperCase()}\n`;
                qcmText += "---\n"; 
                conversionSuccess = true;
            }

            if (conversionSuccess) {
                textMCQInput.value = qcmText.trimEnd().replace(/\n---\n$/, "\n---"); // Enlève le dernier --- s'il est seul
                if (textMCQInput.value.endsWith("\n---")) { // S'il y a plusieurs QCM, le dernier --- est ok
                     // textMCQInput.value = textMCQInput.value.slice(0, -4);
                }

                if(mcqConversionMessage) { mcqConversionMessage.textContent = "Tableau converti avec succès en format QCM multilignes !"; mcqConversionMessage.className = "conversion-message-box success"; }
            } else {
                 let errorMsg = "Échec de la conversion. ";
                 if(errors.length > 0) errorMsg += "Erreurs: " + errors.slice(0,2).join("; "); 
                 else errorMsg += "Assurez-vous que le tableau Markdown a une colonne pour la question, des colonnes pour les options et une dernière colonne pour la lettre de la bonne réponse.";

                if(mcqConversionMessage) { mcqConversionMessage.textContent = errorMsg; mcqConversionMessage.className = "conversion-message-box error"; }
            }
        });
    }

    [exportShortToDocxWithCorrectionBtn, exportShortToDocxWithoutCorrectionBtn, exportMCQToDocxWithCorrectionBtn, exportMCQToDocxWithoutCorrectionBtn].forEach(btn => {
        if (btn) btn.dataset.originalText = btn.innerHTML;
    });

    if (convertShortToImageWithCorrectionBtn && textShortQuestionsInput) {
        convertShortToImageWithCorrectionBtn.addEventListener('click', () => processAndDisplayImageInModal(textShortQuestionsInput, 'short', true, convertShortToImageWithCorrectionBtn, 'questions_courtes', 'Questions Courtes'));
    }
    if (convertShortToImageWithoutCorrectionBtn && textShortQuestionsInput) {
        convertShortToImageWithoutCorrectionBtn.addEventListener('click', () => processAndDisplayImageInModal(textShortQuestionsInput, 'short', false, convertShortToImageWithoutCorrectionBtn, 'questions_courtes', 'Questions Courtes'));
    }
    if (exportShortToDocxWithCorrectionBtn && textShortQuestionsInput) {
        exportShortToDocxWithCorrectionBtn.addEventListener('click', () => handleExerciseDocxExport(textShortQuestionsInput, 'short', true, exportShortToDocxWithCorrectionBtn));
    }
    if (exportShortToDocxWithoutCorrectionBtn && textShortQuestionsInput) {
        exportShortToDocxWithoutCorrectionBtn.addEventListener('click', () => handleExerciseDocxExport(textShortQuestionsInput, 'short', false, exportShortToDocxWithoutCorrectionBtn));
    }

    if (convertMCQToImageWithCorrectionBtn && textMCQInput) {
        convertMCQToImageWithCorrectionBtn.addEventListener('click', () => processAndDisplayImageInModal(textMCQInput, 'mcq', true, convertMCQToImageWithCorrectionBtn, 'qcm', 'QCM'));
    }
    if (convertMCQToImageWithoutCorrectionBtn && textMCQInput) {
        convertMCQToImageWithoutCorrectionBtn.addEventListener('click', () => processAndDisplayImageInModal(textMCQInput, 'mcq', false, convertMCQToImageWithoutCorrectionBtn, 'qcm', 'QCM'));
    }
    if (exportMCQToDocxWithCorrectionBtn && textMCQInput) {
        exportMCQToDocxWithCorrectionBtn.addEventListener('click', () => handleExerciseDocxExport(textMCQInput, 'mcq', true, exportMCQToDocxWithCorrectionBtn));
    }
    if (exportMCQToDocxWithoutCorrectionBtn && textMCQInput) {
        exportMCQToDocxWithoutCorrectionBtn.addEventListener('click', () => handleExerciseDocxExport(textMCQInput, 'mcq', false, exportMCQToDocxWithoutCorrectionBtn));
    }

    if(convertCombinedToImageWithCorrectionBtn) convertCombinedToImageWithCorrectionBtn.dataset.originalText = convertCombinedToImageWithCorrectionBtn.innerHTML;
    if(convertCombinedToImageWithoutCorrectionBtn) convertCombinedToImageWithoutCorrectionBtn.dataset.originalText = convertCombinedToImageWithoutCorrectionBtn.innerHTML;

    if (convertCombinedToImageWithCorrectionBtn) {
        convertCombinedToImageWithCorrectionBtn.addEventListener('click', () => generateCombinedImage(true, convertCombinedToImageWithCorrectionBtn));
    }
    if (convertCombinedToImageWithoutCorrectionBtn) {
        convertCombinedToImageWithoutCorrectionBtn.addEventListener('click', () => generateCombinedImage(false, convertCombinedToImageWithoutCorrectionBtn));
    }

    if (generateDesignModificationPromptBtn && existingHtmlCourseCodeInput && designModificationPromptOutput &&
        designColorPrimary && designColorSecondary && designColorAccent &&
        designGeneralStyle && designIconStyle && designImageInstructions && designOtherImprovements) {
        generateDesignModificationPromptBtn.addEventListener('click', function() {
            const htmlCode = existingHtmlCourseCodeInput.value.trim();
            if (!htmlCode) {
                alert("Veuillez coller le code HTML du cours existant.");
                existingHtmlCourseCodeInput.focus();
                return;
            }

            const primaryColor = designColorPrimary.value;
            const secondaryColor = designColorSecondary.value;
            const accentColor = designColorAccent.value;
            const generalStyle = designGeneralStyle.value;
            const iconStyle = designIconStyle.value;
            const imageInstructions = designImageInstructions.value.trim();
            const otherImprovements = designOtherImprovements.value.trim();

            let prompt = `Je souhaite améliorer le design du code HTML de cours suivant. Agis en tant qu'expert en design web et intégration HTML/CSS.\n\n`;
            prompt += `**Code HTML Actuel à Modifier :**\n\`\`\`html\n${htmlCode}\n\`\`\`\n\n`;
            prompt += `**Instructions de Modification de Design :**\n\n`;
            prompt += `1.  **Palette de Couleurs :**\n`;
            prompt += `    * Couleur Primaire : ${primaryColor}\n`;
            prompt += `    * Couleur Secondaire : ${secondaryColor}\n`;
            prompt += `    * Couleur d'Accentuation : ${accentColor}\n`;
            prompt += `    Applique cette palette de manière cohérente pour les fonds, textes, titres, liens, boutons, etc.\n\n`;
            prompt += `2.  **Style Général Souhaité :** "${generalStyle}". Adapte la typographie (polices, tailles, espacements), les bordures, les ombres, et la mise en page globale pour refléter ce style.\n\n`;
            prompt += `3.  **Style des Pictogrammes/Icônes :** "${iconStyle}". Si des icônes sont présentes ou doivent être ajoutées, suis cette directive. Si tu ajoutes de nouvelles icônes (par exemple, pour illustrer des sections), utilise des icônes SVG simples ou des classes Font Awesome si c'est plus simple pour toi (et si la librairie est déjà incluse dans le HTML initial, sinon suggère l'ajout).\n\n`;

            if (imageInstructions) {
                prompt += `4.  **Insertion/Modification d'Images :**\n`;
                prompt += `    Suis ces instructions pour les images (une instruction par ligne au format "URL --- Description de l'emplacement"):\n`;
                prompt += `    ${imageInstructions.split('\n').map(line => `    * ${line}`).join('\n')}\n`;
                prompt += `    Assure-toi que les images soient responsives (max-width: 100%; height: auto;).\n\n`;
            } else {
                prompt += `4.  **Images :** Aucune instruction spécifique pour les images, mais si tu estimes qu'une image d'illustration (libre de droits) améliorerait une section, tu peux suggérer son ajout en indiquant l'URL et l'emplacement ([IMAGE: URL_IMAGE --- Emplacement]).\n\n`;
            }

            if (otherImprovements) {
                prompt += `5.  **Autres Améliorations Spécifiques Demandées :**\n`;
                prompt += `    ${otherImprovements.split('\n').map(line => `    * ${line}`).join('\n')}\n\n`;
            } else {
                prompt += `5.  **Autres Améliorations :** Tu as carte blanche pour proposer d'autres améliorations de design qui te semblent pertinentes (ex: animations subtiles au survol, amélioration de la lisibilité, réorganisation visuelle d'éléments pour une meilleure hiérarchie de l'information), tant qu'elles respectent le style général demandé.\n\n`;
            }

            prompt += `**Format de Réponse Attendu :**\n`;
            prompt += `Fournis UNIQUEMENT le code HTML COMPLET et MODIFIÉ. Le CSS doit être intégré dans des balises \`<style>\` dans le \`<head>\`, et le JavaScript (si tu en ajoutes pour des effets de design) dans des balises \`<script>\` à la fin du \`<body>\`. Ne fournis pas d'explications en dehors du code, sauf si c'est un commentaire dans le code lui-même.\n`;
            prompt += `Assure-toi que le code HTML résultant est valide et bien structuré.`;

            designModificationPromptOutput.value = prompt;
            if(copyDesignModificationPromptMessage) showFeedback(copyDesignModificationPromptMessage, "Prompt de modification de design généré !", "success");
        });
    }
    if (copyDesignModificationPromptBtn && designModificationPromptOutput && copyDesignModificationPromptMessage) {
        copyDesignModificationPromptBtn.addEventListener('click', () => copyToClipboardUtil(designModificationPromptOutput.value, copyDesignModificationPromptMessage));
    }

    console.log("Script.js: Fin de l'initialisation de DOMContentLoaded.");
}); // FIN DOMContentLoaded