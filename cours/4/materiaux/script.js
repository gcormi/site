document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé. Initialisation du script...");

    const initialView = document.querySelector('.initial-view');
    const sectionContainer = document.querySelector('.course-sections-container');
    const navButtons = document.querySelectorAll('.nav-button');
    const backButtons = document.querySelectorAll('.back-button');
    const allSections = document.querySelectorAll('.course-section');

    // Création de l'indicateur de progression
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'progress-indicator';
    document.body.appendChild(progressIndicator);

    // Fonction pour mettre à jour l'indicateur de progression
    function updateProgressIndicator() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = scrolled / documentHeight;
        progressIndicator.style.transform = `scaleX(${progress})`;
    }

    // Écouteur pour l'indicateur de progression
    window.addEventListener('scroll', updateProgressIndicator);

    // Animation des éléments au défilement
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments pour l'animation au défilement
    document.querySelectorAll('h2, h3, p, .did-you-know, table').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Vérification initiale des éléments
    if (!initialView || !sectionContainer || navButtons.length === 0 || allSections.length === 0) {
        console.error("ERREUR: Un ou plusieurs éléments essentiels sont manquants !");
        return;
    }

    // Fonction pour afficher une section spécifique avec animation améliorée
    function showSection(sectionId) {
        console.log(`Tentative d'affichage section: ${sectionId}`);
        
        // Animation de sortie
        initialView.style.opacity = '0';
        initialView.style.transform = 'scale(0.95) translateY(20px)';
        
        setTimeout(() => {
            initialView.classList.remove('active-view');
            
            // Masquer toutes les sections
            allSections.forEach(section => {
                section.classList.remove('active-section');
                section.style.opacity = '0';
                section.style.transform = 'scale(0.95) translateY(20px)';
            });

            const targetSection = document.querySelector(sectionId);
            if (targetSection) {
                setTimeout(() => {
                    console.log(`Affichage effectif de: ${sectionId}`);
                    targetSection.classList.add('active-section');
                    targetSection.style.opacity = '1';
                    targetSection.style.transform = 'scale(1) translateY(0)';
                    
                    // Scroll fluide vers le haut
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                    // Animer les éléments de la section
                    const elements = targetSection.querySelectorAll('h2, h3, p, .did-you-know, table');
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }, 300);
            } else {
                console.warn(`Section "${sectionId}" non trouvée. Retour à l'accueil.`);
                showInitialView();
            }
        }, 300);
    }

    // Fonction pour afficher la vue initiale avec animation
    function showInitialView() {
        console.log("Tentative d'affichage vue initiale");
        
        // Animation de sortie des sections
        allSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'scale(0.95) translateY(20px)';
            setTimeout(() => {
                section.classList.remove('active-section');
            }, 300);
        });

        // Animation d'entrée de la vue initiale
        setTimeout(() => {
            console.log("Affichage effectif vue initiale");
            initialView.classList.add('active-view');
            initialView.style.opacity = '1';
            initialView.style.transform = 'scale(1) translateY(0)';
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 300);
    }

    // Gestionnaire d'événements pour les boutons de navigation
    navButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = button.getAttribute('href');
            
            // Effet de clic
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);

            if (targetSectionId && targetSectionId.startsWith('#')) {
                showSection(targetSectionId);
            } else {
                console.error(`Href invalide sur le bouton: ${targetSectionId}`);
            }
        });

        // Effet de survol
        button.addEventListener('mouseenter', () => {
            button.querySelector('i').style.transform = 'scale(1.2) rotate(5deg)';
        });

        button.addEventListener('mouseleave', () => {
            button.querySelector('i').style.transform = '';
        });
    });

    // Gestionnaire d'événements pour les boutons retour
    backButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Effet de clic
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
                showInitialView();
            }, 150);
        });
    });

    // Code pour la modale avec animations améliorées
    const modal = document.getElementById('explanation-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeModalButton = document.querySelector('.modal-close-button');

    if (!modal || !modalTitle || !modalText || !closeModalButton) {
        console.warn("ATTENTION: Éléments de la modale manquants !");
        return;
    }

    // Base de données des explications
    const explanations = {
        "materiau": "Matière d'origine naturelle ou artificielle utilisée pour fabriquer des objets techniques. Exemples : bois, métal, plastique, verre.",
        "materiel": "Ensemble des outils, équipements ou objets fabriqués utilisés pour une activité. Le matériel est fabriqué à partir de matériaux. Exemple : un ordinateur, un marteau.",
        "alliage": "Mélange homogène d'un métal avec un ou plusieurs autres éléments (métalliques ou non) pour améliorer ses propriétés. Exemple : l'acier (fer + carbone), le laiton (cuivre + zinc).",
        "composite": "Matériau constitué d'au moins deux composants non miscibles : un renfort (ex: fibres) et une matrice (ex: résine) qui les lie. L'objectif est de combiner les qualités des composants.",
        "metal": "Élément chimique caractérisé par une bonne conductivité électrique et thermique, un éclat métallique, et souvent une bonne malléabilité et ductilité. Exemples : fer, cuivre, aluminium.",
        "minerai": "Roche ou minéral contenant des métaux ou des minéraux utiles en concentration suffisante pour justifier son exploitation.",
        "acier": "Alliage métallique principalement composé de fer et de carbone (généralement moins de 2%).",
        "acier-inox": "Acier contenant au moins 10,5% de chrome, ce qui lui confère une grande résistance à la corrosion (rouille).",
        "bauxite": "Roche riche en oxydes d'aluminium, principale source d'aluminium.",
        "biocompatibilite": "Capacité d'un matériau à être en contact avec les tissus vivants sans provoquer de réaction indésirable (rejet, inflammation, toxicité). Crucial pour les implants médicaux.",
        "polymere": "Macromolécule constituée de la répétition de nombreuses petites unités structurales appelées monomères. Les plastiques sont des polymères.",
        "polymere-synthetique": "Polymère fabriqué par l'homme par des réactions chimiques, souvent à partir de dérivés du pétrole.",
        "monomere": "Petite molécule qui peut s'assembler avec d'autres monomères identiques ou différents pour former un polymère.",
        "polymerisation": "Processus chimique par lequel des monomères réagissent entre eux pour former de longues chaînes polymères.",
        "bioplastique": "Plastique fabriqué à partir de ressources renouvelables d'origine biologique (ex: amidon de maïs, canne à sucre) et/ou biodégradable.",
        "plastifiant": "Substance ajoutée à un polymère (comme le PVC) pour augmenter sa souplesse et sa flexibilité.",
        "polyester": "Famille de polymères dont la chaîne principale contient la fonction ester. Le PET en est un exemple courant.",
        "thermoplastique": "Type de polymère qui ramollit sous l'effet de la chaleur (permettant sa mise en forme) et durcit en refroidissant, de manière réversible.",
        "copolymere": "Polymère constitué d'au moins deux types de monomères différents.",
        "ceramique": "Matériau solide inorganique, non métallique, généralement obtenu par cuisson à haute température de matières premières minérales (ex: argile, oxydes, carbures). Souvent durs, résistants à la chaleur et à l'usure, mais fragiles.",
        "ceramique-traditionnelle": "Céramique fabriquée à partir de matières premières naturelles comme l'argile (ex: poterie, briques, tuiles, porcelaine).",
        "ceramique-technique": "Céramique élaborée à partir de poudres synthétiques de haute pureté pour des applications spécifiques exigeant des propriétés avancées (ex: alumine pour prothèses, carbure de tungstène pour outils de coupe).",
        "renfort": "Composant d'un matériau composite qui apporte la résistance mécanique principale (ex: fibres de verre, de carbone).",
        "matrice": "Composant d'un matériau composite qui lie le renfort, assure la cohésion et transmet les efforts (ex: résine époxy, ciment).",
        "biosphere": "Ensemble des organismes vivants et des milieux où ils vivent sur Terre.",
        "geosphere": "Partie minérale de la Terre (roches, sols).",
        "cellulose": "Principal constituant structurel des parois des cellules végétales, c'est un polymère naturel (sucre complexe).",
        "lignine": "Polymère complexe présent dans la paroi des cellules végétales (surtout le bois), qui apporte rigidité et résistance.",
        "silice": "Dioxyde de silicium (SiO2), principal constituant du sable et du quartz, et composant majeur du verre.",
        "amorphe": "Se dit d'un solide dont les atomes ou molécules ne sont pas organisés selon une structure cristalline ordonnée et répétitive (comme le verre).",
        "resistance-meca": "Capacité d'un matériau à résister aux forces appliquées sans se rompre ou se déformer de manière excessive.",
        "contrainte": "Force appliquée par unité de surface à l'intérieur d'un matériau (mesurée en Pascals ou N/m²).",
        "rupture": "Séparation d'un matériau en deux ou plusieurs morceaux sous l'effet d'une contrainte.",
        "durete": "Résistance d'un matériau à la pénétration, à la rayure ou à l'abrasion.",
        "abrasion": "Usure d'une surface par frottement ou grattage.",
        "elasticite": "Propriété d'un matériau de retrouver sa forme et ses dimensions initiales après suppression de la contrainte appliquée.",
        "plasticite": "Propriété d'un matériau de subir une déformation permanente (qui subsiste après suppression de la contrainte) sans se rompre.",
        "fragilite": "Tendance d'un matériau à se rompre brutalement sans déformation plastique notable.",
        "tenacite": "Capacité d'un matériau à absorber de l'énergie et à résister à la propagation des fissures avant de rompre. C'est l'inverse de la fragilité.",
        "masse-volumique": "Masse d'un matériau par unité de volume (exprimée en kg/m³ ou g/cm³). Caractérise sa 'lourdeur'.",
        "conductivite-thermique": "Mesure de la capacité d'un matériau à conduire la chaleur.",
        "conducteur": "Matériau qui laisse facilement passer la chaleur (conducteur thermique) ou le courant électrique (conducteur électrique).",
        "isolant": "Matériau qui s'oppose au passage de la chaleur (isolant thermique) ou du courant électrique (isolant électrique).",
        "conductivite-electrique": "Mesure de la capacité d'un matériau à conduire le courant électrique.",
        "dilatation-thermique": "Augmentation des dimensions (longueur, surface, volume) d'un matériau sous l'effet d'une augmentation de température.",
        "corrosion": "Dégradation d'un matériau (surtout métallique) par réaction chimique ou électrochimique avec son environnement (ex: rouille du fer).",
        "oxydation": "Réaction chimique impliquant la perte d'électrons. Pour les métaux, c'est souvent la réaction avec l'oxygène de l'air ou de l'eau.",
        "traction": "Sollicitation mécanique qui tend à étirer un matériau.",
        "compression": "Sollicitation mécanique qui tend à écraser ou raccourcir un matériau.",
        "frottement": "Force qui s'oppose au mouvement relatif de deux surfaces en contact.",
        "usure": "Dégradation progressive de la surface d'un matériau due au frottement, à l'abrasion ou à d'autres sollicitations.",
        "moulage": "Procédé de fabrication consistant à verser ou injecter un matériau liquide ou pâteux dans un moule pour lui donner une forme spécifique après solidification.",
        "usinage": "Procédé de fabrication par enlèvement de matière (copeaux) à l'aide d'une machine-outil (ex: tournage, fraisage, perçage).",
        "impression-3d": "Fabrication additive : procédé de création d'objets tridimensionnels par ajout successif de couches de matériau à partir d'un modèle numérique.",
        "recyclable": "Qualifie un matériau ou un produit qui peut être collecté, traité et réintroduit dans un cycle de production pour fabriquer de nouveaux produits.",
        "impact-env": "Ensemble des modifications (positives ou négatives) de l'environnement engendrées par une activité humaine, un produit ou un procédé.",
        "energie-grise": "Quantité totale d'énergie consommée lors du cycle de vie d'un matériau ou d'un produit, depuis l'extraction des matières premières jusqu'à son élimination ou recyclage.",
        "rigidite": "Résistance d'un matériau à la déformation élastique. Un matériau rigide se déforme peu sous une charge donnée.",
        "recyclabilite": "Capacité d'un déchet à être recyclé, techniquement et économiquement.",
        "smart-material": "Matériau 'intelligent' capable de modifier une ou plusieurs de ses propriétés de manière contrôlée en réponse à un stimulus externe (température, lumière, pression, champ électrique...).",
        "stimulus": "Agent externe (physique ou chimique) capable de provoquer une réaction ou une modification dans un système ou un matériau.",
        "memoire-forme": "Propriété de certains alliages (dits AMF) de retrouver leur forme initiale préprogrammée lorsqu'ils sont chauffés au-delà d'une certaine température, après avoir été déformés à plus basse température.",
        "piezoelectrique": "Propriété de certains matériaux de générer une charge électrique en réponse à une contrainte mécanique appliquée (effet direct), ou de se déformer mécaniquement sous l'effet d'un champ électrique (effet inverse).",
        "nanomateriau": "Matériau dont au moins une des dimensions caractéristiques est de l'ordre du nanomètre (1 à 100 nm). À cette échelle, les propriétés peuvent différer significativement de celles du matériau massif.",
        "nanometre": "Unité de longueur égale à un milliardième de mètre (1 nm = 10⁻⁹ m).",
        "graphene": "Matériau bidimensionnel constitué d'une seule couche d'atomes de carbone organisés en réseau hexagonal. Extrêmement fin, résistant et conducteur.",
        "nanotube-carbone": "Structure tubulaire creuse constituée d'atomes de carbone, de diamètre nanométrique. Possède des propriétés mécaniques et électriques exceptionnelles.",
        "nanoparticule": "Particule dont la taille est comprise entre 1 et 100 nanomètres.",
        "biomimetisme": "Démarche d'innovation qui consiste à s'inspirer des formes, matières, propriétés, processus et fonctions du vivant pour développer de nouvelles technologies ou solutions.",
        "auto-reparant": "Qualifie un matériau capable de réparer lui-même des dommages subis (fissures, rayures) de manière autonome ou déclenchée.",
        "hydrophobe": "Qui repousse l'eau. Une surface super-hydrophobe présente un angle de contact avec l'eau très élevé (>150°), faisant perler les gouttes.",
        "biodegradable": "Qualifie une substance ou un matériau qui peut être décomposé par des micro-organismes (bactéries, champignons) dans des conditions environnementales spécifiques.",
        "compostable": "Qualifie un matériau biodégradable dans des conditions de compostage industriel ou domestique, se transformant en compost, eau et CO2 sans laisser de résidus toxiques.",
        "gradient-fonction": "Se dit d'un matériau dont la composition ou la microstructure, et donc les propriétés, varient progressivement d'un point à un autre."
    };

    // Fonction pour ouvrir la modale avec animation
    function openModal(termKey) {
        const explanation = explanations[termKey];
        if (explanation && modal && modalTitle && modalText) {
            const termElement = document.querySelector(`.clickable-term[data-term="${termKey}"]`);
            modalTitle.textContent = termElement ? termElement.textContent.trim() : termKey.replace(/-/g, ' ');
            modalText.textContent = explanation;
            
            // Reset des animations
            modal.style.opacity = '0';
            modalText.style.opacity = '0';
            modalText.style.transform = 'translateY(20px)';
            
            // Affichage et animation
            modal.classList.add('show');
            setTimeout(() => {
                modal.style.opacity = '1';
                modalText.style.opacity = '1';
                modalText.style.transform = 'translateY(0)';
            }, 50);
        } else {
            console.warn(`Explication non trouvée pour: ${termKey}`);
        }
    }

    // Fonction pour fermer la modale avec animation
    function closeModal() {
        if(modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.classList.remove('show');
            }, 400);
        }
    }

    // Délégation d'événements pour les termes cliquables
    document.addEventListener('click', (e) => {
        const clickableTerm = e.target.closest('.clickable-term');
        if (clickableTerm) {
            e.preventDefault();
            // Effet de pulse sur le terme cliqué
            clickableTerm.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                clickableTerm.style.animation = '';
            }, 300);
            
            const termKey = clickableTerm.dataset.term;
            if (termKey) {
                openModal(termKey);
            }
        }
    });

    // Gestionnaires d'événements pour la modale
    if(closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Fermeture de la modale avec Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Animation des "Did you know" au survol
    document.querySelectorAll('.did-you-know').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });

    console.log("Fin de l'initialisation du script avec animations.");
});