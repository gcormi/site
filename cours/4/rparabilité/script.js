document.addEventListener('DOMContentLoaded', () => {
    // --- Contenu du Cours Enrichi ---
    const courseContent = {
        "introduction": {
            title: "Introduction : Pourquoi Réparer ?",
            icon: "fas fa-puzzle-piece",
            html: `
                <p>Imagine tous les objets techniques que tu utilises chaque jour : ton téléphone, ta console de jeux, ton vélo, le micro-ondes... Ils sont super pratiques ! Mais que faire quand ils tombent en panne ? Souvent, on pense à les jeter pour en acheter un neuf. Mais ce n'est pas toujours la meilleure solution !</p>
                <p>Jeter et remplacer tout le temps pose de gros problèmes :</p>
                <ul>
                    <li><i class="fas fa-leaf" style="color: #4CAF50;"></i> &nbsp;<strong>Pour la Planète :</strong> Fabriquer de nouveaux objets demande beaucoup de <span class="tooltip-trigger" data-tooltip="<i class='fas fa-cube'></i> Ce sont les matières premières comme les métaux (fer, cuivre, or...), le pétrole (pour le plastique), le sable (pour le verre)... Elles ne sont pas infinies !">ressources naturelles</span> (métaux rares, plastique...) et d'énergie. En plus, les objets jetés, surtout électroniques, deviennent des <span class="tooltip-trigger" data-tooltip="<i class='fas fa-trash-alt'></i> Aussi appelés DEEE (Déchets d'Équipements Électriques et Électroniques). Ils contiennent des substances polluantes mais aussi des matériaux précieux qui pourraient être recyclés.">déchets électroniques</span> qui polluent énormément si on ne les traite pas bien.</li>
                    <li><i class="fas fa-euro-sign" style="color: #FFC107;"></i> &nbsp;<strong>Pour ton Porte-Monnaie :</strong> Réparer coûte souvent moins cher que de racheter un objet neuf. C'est une façon intelligente d'économiser !</li>
                    <li><i class="fas fa-brain" style="color: #2196F3;"></i> &nbsp;<strong>Pour Mieux Comprendre :</strong> En essayant de réparer, tu découvres comment les objets fonctionnent. C'est comme résoudre une énigme, c'est super intéressant et ça te rend plus autonome !</li>
                </ul>
                <p>La <strong class="tooltip-trigger" data-tooltip="<i class='fas fa-screwdriver'></i> C'est la capacité d'un objet à être réparé plus ou moins facilement. Un objet très réparable est conçu pour que ses pièces puissent être changées sans trop de difficulté.">réparabilité</strong>, c'est donc la possibilité de réparer facilement un objet. C'est devenu super important pour protéger notre environnement, faire des économies et être plus malin avec la technologie !</p>
                <div class="did-you-know">
                    <strong><i class="fas fa-lightbulb"></i> Le savais-tu ?</strong>
                    <p>Chaque année, des millions de tonnes de déchets électroniques sont produits dans le monde. Réparer, même un seul appareil, aide à réduire cette montagne de déchets !</p>
                </div>
            `
        },
        "comprendre-objet": {
            title: "Comment Fonctionne un Objet ?",
            icon: "fas fa-cogs",
            html: `
                <p>Un objet technique, ce n'est pas de la magie ! Il a été pensé et construit pour faire quelque chose de précis (sa <span class="tooltip-trigger" data-tooltip="<i class='fas fa-bullseye'></i> C'est le rôle principal de l'objet. Ex: la fonction d'usage d'une lampe est d'éclairer.">fonction d'usage</span>). Pour comprendre comment le réparer, il faut d'abord comprendre comment il marche.</p>
                <h3><i class="fas fa-plug"></i> La Chaîne d'Énergie et d'Information</h3>
                <p>La plupart des objets suivent une logique : ils reçoivent quelque chose, le transforment, et produisent un résultat.</p>
                <ul>
                    <li><strong>La Chaîne d'Énergie :</strong> C'est le chemin que suit l'énergie pour faire fonctionner l'objet. D'où vient l'énergie (prise, pile, batterie...) ? Comment est-elle transformée (moteur, résistance, ampoule...) ? Quelle forme prend-elle à la fin (mouvement, lumière, chaleur...) ?</li>
                    <li><strong>La Chaîne d'Information :</strong> C'est ce qui commande l'objet. Comment l'utilisateur donne-t-il un ordre (bouton, télécommande, capteur...) ? Comment cet ordre est-il traité (carte électronique...) ? Quelle action cela déclenche-t-il ?</li>
                </ul>
                <p><strong>Exemple : Une manette de jeu vidéo sans fil</strong></p>
                <ul>
                    <li><i class="fas fa-bolt" style="color: #FF9800;"></i> &nbsp;<u>Chaîne d'énergie :</u> Batterie (stockage) -> Circuits électroniques (distribution) -> Moteurs de vibration, LED (utilisation).</li>
                    <li><i class="fas fa-rss" style="color: #3F51B5;"></i> &nbsp;<u>Chaîne d'information :</u> Tes doigts appuient sur un bouton (acquisition) -> Le signal est traité par la puce de la manette (traitement) -> L'information est envoyée sans fil à la console (transmission).</li>
                </ul>
                <img src="4.JPG" alt="Composants internes d'un objet technique">
                <h3><i class="fas fa-puzzle-piece"></i> Les Pièces de l'Objet (Constituants)</h3>
                <p>Un objet est un assemblage de différentes pièces, appelées <span class="tooltip-trigger" data-tooltip="<i class='fas fa-cube'></i> Ce sont les différentes parties qui composent l'objet. Chaque constituant a une fonction technique précise. Ex: la roue, le cadre, la chaîne sont des constituants du vélo.">constituants</span>. Chaque pièce a un rôle. Pour réparer, il faut souvent identifier quelle pièce pose problème.</p>
                <p><strong>Exemple : Un smartphone</strong></p>
                <p>Il est composé d'un écran, d'une batterie, d'une carte mère (le "cerveau"), d'appareils photo, de boutons, d'une coque... Si l'écran est cassé, on sait quel constituant remplacer !</p>
            `
        },
        "causes-pannes": {
            title: "Pourquoi ça Tombe en Panne ?",
            icon: "fas fa-bolt",
            html: `
                <p>Même les objets les plus solides peuvent avoir des problèmes. Pourquoi ? Plusieurs raisons possibles :</p>
                <ul>
                    <li><i class="fas fa-hourglass-half" style="color: #795548;"></i> &nbsp;<strong>L'Usure Normale :</strong> C'est comme les chaussures qui s'abîment à force de marcher. Les pièces qui bougent, frottent ou chauffent finissent par s'user. Ex: La batterie de ton téléphone qui tient moins longtemps après 2 ans, les freins de ton vélo qui s'usent.</li>
                    <li><i class="fas fa-industry" style="color: #607D8B;"></i> &nbsp;<strong>Les Défauts de Fabrication :</strong> Parfois, une pièce a un petit défaut dès sa sortie d'usine et lâche plus tôt que prévu. C'est souvent couvert par la <span class="tooltip-trigger" data-tooltip="<i class='fas fa-shield-alt'></i> C'est un engagement du vendeur ou du fabricant à réparer ou remplacer gratuitement un produit s'il tombe en panne dans un certain délai (souvent 2 ans en Europe pour les défauts de conformité).">garantie</span>.</li>
                    <li><i class="fas fa-exclamation-triangle" style="color: #F44336;"></i> &nbsp;<strong>Les Accidents / Mauvaise Utilisation :</strong> Faire tomber son téléphone (choc), renverser de l'eau dessus (liquide), le laisser en plein soleil (chaleur)...</li>
                 </ul>
                 <img src="41.jpg" alt="Exemple de panne (écran cassé)">
                 <ul>
                    <li><i class="fas fa-sync-alt" style="color: #FF5722;"></i> &nbsp;<strong>L'Obsolescence Programmée :</strong> C'est quand un fabricant conçoit volontairement un objet pour qu'il ne dure pas longtemps ou devienne vite démodé, pour t'inciter à racheter. Il y a plusieurs types :
                        <ul>
                            <li><em>Technique :</em> Une pièce est conçue pour lâcher après un certain nombre d'utilisations.</li>
                            <li><em>Logicielle :</em> Une mise à jour rend l'appareil plus lent ou incompatible avec de nouvelles applications.</li>
                            <li><em>Esthétique :</em> La mode change vite et ton objet te paraît "vieux".</li>
                        </ul>
                    </li>
                </ul>
                <div class="did-you-know">
                    <strong><i class="fas fa-balance-scale"></i> Le savais-tu ?</strong>
                    <p>L'obsolescence programmée (technique) est difficile à prouver, mais elle est interdite par la loi en France ! Des associations se battent pour la dénoncer et protéger les consommateurs.</p>
                </div>
            `
        },
        "diagnostiquer-panne": {
            title: "Trouver l'Origine du Problème",
            icon: "fas fa-search",
            html: `
                <p>Ton objet ne marche plus ? Pas de panique ! La première étape, c'est de jouer au détective : il faut trouver <span class="tooltip-trigger" data-tooltip="<i class='fas fa-stethoscope'></i> C'est l'action d'identifier la cause exacte d'une panne en analysant les symptômes. Comme un médecin qui cherche à comprendre une maladie.">diagnostiquer</span> la panne.</p>
                <h3><i class="fas fa-eye"></i> 1. Observer les Symptômes</h3>
                <p>Qu'est-ce qui ne va pas exactement ? Décris le problème le plus précisément possible :</p>
                <ul>
                    <li>Il ne s'allume plus du tout ?</li>
                    <li>Il fait un bruit bizarre (grincement, sifflement...) ?</li>
                    <li>Une lumière clignote anormalement ?</li>
                    <li>Une fonction précise ne marche plus (le son, l'image, un bouton...) ?</li>
                    <li>Il est très lent ?</li>
                </ul>
                <p><strong>Exemple :</strong> Mon ordinateur portable ne charge plus. Symptôme : Quand je branche le chargeur, la lumière de charge ne s'allume pas et la batterie ne se remplit pas.</p>
                <img src="42.jpg" alt="Outil de diagnostic ou loupe">
                <h3><i class="fas fa-wrench"></i> 2. Faire les Vérifications Simples (Dépannage)</h3>
                <p>Avant de tout démonter, vérifie les choses évidentes. C'est le <span class="tooltip-trigger" data-tooltip="<i class='fas fa-check-circle'></i> Ce sont les premières vérifications et manipulations simples pour essayer de résoudre un problème sans avoir à démonter ou remplacer des pièces.">dépannage</span> de base :</p>
                <ul>
                    <li><strong>Alimentation :</strong> Est-ce que c'est bien branché ? La prise fonctionne-t-elle (essaie avec un autre appareil) ? Les piles/batteries sont-elles chargées ou à remplacer ? Le câble n'est-il pas abîmé ?</li>
                    <li><strong>Connexions :</strong> Les câbles sont-ils bien enfoncés ? Le Bluetooth/Wi-Fi est-il activé ?</li>
                    <li><strong>Redémarrage :</strong> As-tu essayé d'éteindre complètement l'appareil et de le rallumer ? Ça résout plein de petits bugs !</li>
                    <li><strong>Nettoyage :</strong> Parfois, la poussière peut bloquer des connecteurs ou des ventilateurs.</li>
                </ul>
                <p><strong>Exemple pour l'ordi qui ne charge pas :</strong> Vérifier que le chargeur est bien branché à l'ordi ET à la prise murale. Essayer une autre prise. Vérifier si le câble du chargeur n'est pas coupé ou tordu. Nettoyer le port de charge de l'ordi (avec précaution !).</p>
                <h3><i class="fas fa-book-open"></i> 3. Consulter la Documentation</h3>
                <p>Le mode d'emploi ou la notice contient souvent une section "Problèmes et Solutions" ou "FAQ". Regarde aussi sur le site web du fabricant ou cherche des tutoriels en ligne (YouTube, forums...).</p>
                <div class="did-you-know">
                    <strong><i class="fas fa-info-circle"></i> Le savais-tu ?</strong>
                    <p>Sur internet, des sites comme iFixit proposent des milliers de guides de réparation gratuits, créés par des passionnés, pour plein d'appareils différents. C'est une mine d'or pour les réparateurs en herbe !</p>
                </div>
            `
        },
        "quest-ce-reparabilite": {
            title: "C'est Quoi, un Objet Réparable ?",
            icon: "fas fa-award",
            html: `
                <p>La réparabilité, ce n'est pas juste savoir SI on peut réparer, mais surtout si c'est <strong>facile</strong> et <strong>pas trop cher</strong> de le faire. Un objet est considéré comme bien réparable si :</p>
                <ul>
                    <li><i class="fas fa-screwdriver"></i> &nbsp;<strong>Il se démonte facilement :</strong> On peut l'ouvrir avec des outils courants (tournevis standard) sans rien casser. Pas de vis bizarres ou de pièces collées partout !</li>
                    <li><i class="fas fa-shopping-cart"></i> &nbsp;<strong>Les pièces de rechange existent et sont abordables :</strong> On peut acheter la pièce cassée (batterie, écran...) à un prix raisonnable et pendant plusieurs années après l'achat de l'objet.</li>
                    <li><i class="fas fa-file-alt"></i> &nbsp;<strong>L'information est disponible :</strong> Le fabricant fournit des manuels de réparation, des schémas, la liste des pièces...</li>
                    <li><i class="fas fa-tools"></i> &nbsp;<strong>Pas besoin d'outils spéciaux :</strong> On peut utiliser des outils que beaucoup de gens ont déjà ou qui ne coûtent pas cher.</li>
                    <li><i class="fas fa-recycle"></i> &nbsp;<strong>Conception modulaire :</strong> Les pièces qui s'usent le plus (comme la batterie) sont faciles d'accès et à remplacer.</li>
                </ul>
                 <img src="43.jpg" alt="Pièces détachées ou objet démonté">
                <h3><i class="fas fa-check-double"></i> Fiabilité, Durabilité, Réparabilité : Quelle Différence ?</h3>
                <ul>
                    <li><strong>Fiable :</strong> Un objet qui tombe rarement en panne.</li>
                    <li><strong>Durable :</strong> Un objet qui dure longtemps avant d'être hors d'usage (solide, résistant à l'usure).</li>
                    <li><strong>Réparable :</strong> Un objet facile à réparer quand il tombe en panne.</li>
                </ul>
                <p>L'idéal, c'est un objet qui est les trois à la fois !</p>
                <h3><i class="fas fa-tag"></i> L'Indice de Réparabilité</h3>
                <p>En France, pour aider les gens à choisir, il y a une note obligatoire sur certains produits (smartphones, ordis, TV, lave-linge...) : l'<strong class="tooltip-trigger" data-tooltip="<i class='fas fa-star'></i> Note de 0 à 10 indiquant si un produit est facile à réparer. Plus la note est haute (et verte), mieux c'est ! Elle prend en compte 5 critères : documentation, démontage, accès aux pièces, prix des pièces, et un critère spécifique au produit.">indice de réparabilité</strong>. C'est une note sur 10 avec une couleur (de rouge à vert foncé).</p>
                <p>Plus la note est élevée, plus l'objet est facile à réparer. Ça t'aide à faire un choix plus responsable quand tu achètes quelque chose.</p>
                 <div class="did-you-know">
                    <strong><i class="fas fa-lightbulb"></i> Le savais-tu ?</strong>
                    <p>Cet indice pousse les fabricants à faire des efforts pour rendre leurs produits plus réparables. C'est une victoire pour les consommateurs et pour la planète ! Bientôt, il pourrait être remplacé par un indice de durabilité, encore plus complet.</p>
                </div>
            `
        },
        "reparer-comment": {
            title: "Comment Réparer Concrètement ?",
            icon: "fas fa-user-cog",
            html: `
                <p>Ok, tu as trouvé le problème et tu penses pouvoir réparer. Super ! Mais attention, on ne se lance pas n'importe comment.</p>
                <h3><i class="fas fa-hard-hat" style="color: #FF9800;"></i> La Sécurité d'Abord !</h3>
                <p>C'est l'étape la plus importante, surtout avec l'électricité :</p>
                <ul>
                    <li><strong>TOUJOURS débrancher l'appareil</strong> de la prise électrique avant de l'ouvrir. Pour les appareils à batterie, si possible, retire la batterie.</li>
                    <li>Travaille sur une surface propre, sèche et bien éclairée.</li>
                    <li>Utilise les bons outils (pas un couteau à la place d'un tournevis !).</li>
                    <li>Si tu dois forcer, c'est peut-être qu'il y a une vis cachée ou une technique spéciale. Cherche de l'aide en ligne.</li>
                    <li>Ne touche pas aux <span class="tooltip-trigger" data-tooltip="<i class='fas fa-battery-quarter'></i> Ce sont des composants électroniques qui peuvent stocker de l'électricité même quand l'appareil est débranché. Ils peuvent être dangereux. On les reconnaît souvent à leur forme cylindrique.">condensateurs</span> sans savoir comment les décharger (surtout dans les alimentations, les TV, les micro-ondes...).</li>
                    <li><strong>En cas de doute, demande de l'aide à un adulte ou à un pro !</strong></li>
                </ul>
                <img src="44.jpg" alt="Personne en train de réparer un objet">
                <h3><i class="fas fa-list-ol"></i> Les Étapes de la Réparation</h3>
                <p>Pour ne rien oublier, suis un ordre logique :</p>
                <ol>
                    <li><strong>Diagnostic :</strong> Confirmer la cause de la panne.</li>
                    <li><strong>Pièces :</strong> Trouver et acheter la bonne pièce de rechange si besoin.</li>
                    <li><strong>Démontage :</strong> Ouvre l'objet délicatement. Prends des photos à chaque étape ! Range bien les vis (un petit récipient par étape, ou scotche-les sur une feuille en notant d'où elles viennent).</li>
                    <li><strong>Réparation/Remplacement :</strong> Change la pièce cassée ou répare la connexion défectueuse (ex: soudure simple si tu sais faire et que c'est approprié).</li>
                    <li><strong>Nettoyage :</strong> Profites-en pour enlever la poussière à l'intérieur.</li>
                    <li><strong>Remontage :</strong> Refais les étapes du démontage en sens inverse, en utilisant tes photos.</li>
                    <li><strong>Test :</strong> Rebranche et vérifie si tout fonctionne correctement.</li>
                </ol>
                <h3><i class="fas fa-exchange-alt"></i> Remplacer une Pièce</h3>
                <p>C'est le cas le plus courant : changer une batterie, un écran, un interrupteur, une chambre à air de vélo...</p>
                <p><strong>Exemple : Changer la batterie d'un smartphone (si elle est accessible !)</strong></p>
                <p>Il faudra souvent : ouvrir la coque arrière (parfois chauffer légèrement les bords pour ramollir la colle), déconnecter la nappe de la batterie, retirer l'ancienne batterie (parfois collée), mettre la nouvelle, reconnecter, refermer.</p>
                <h3><i class="fas fa-print"></i> Et si la Pièce n'existe Plus ? L'Impression 3D !</h3>
                <p>Pour certaines pièces en plastique simples (engrenages, boutons, coques...), si tu as accès à une <span class="tooltip-trigger" data-tooltip="<i class='fas fa-robot'></i> Machine qui fabrique des objets en trois dimensions en déposant des couches successives de matière (souvent du plastique fondu). Il faut lui fournir un fichier numérique du modèle 3D de l'objet à créer.">imprimante 3D</span> et au modèle 3D de la pièce (parfois trouvable en ligne), tu peux la fabriquer toi-même !</p>
                 <div class="did-you-know">
                    <strong><i class="fas fa-hands-helping"></i> Le savais-tu ?</strong>
                    <p>Il existe des "Repair Cafés" : des endroits où des bénévoles t'aident gratuitement à réparer tes objets. C'est génial pour apprendre et éviter de jeter ! Cherche s'il y en a un près de chez toi.</p>
                </div>
            `
        },
        "reparabilite-environnement": {
            title: "Réparer pour la Planète",
            icon: "fas fa-seedling",
            html: `
                <p>Choisir de réparer, ce n'est pas juste bon pour ton portefeuille, c'est surtout un super geste pour l'environnement !</p>
                <h3><i class="fas fa-trash-alt"></i> Moins de Déchets</h3>
                <p>Chaque objet que tu répares, c'est un objet de moins qui finit à la poubelle. Ça réduit la taille de nos décharges et surtout la quantité de <span class="tooltip-trigger" data-tooltip="<i class='fas fa-recycle'></i> Déchets issus des équipements électriques et électroniques (ordinateurs, téléphones, frigos...). Ils contiennent des polluants mais aussi des métaux précieux difficiles à extraire.">déchets électroniques (DEEE)</span>, qui sont particulièrement polluants.</p>
                <img src="planete.jpg" alt="Planète Terre avec symbole de recyclage">
                <h3><i class="fas fa-mountain"></i> Moins de Ressources Utilisées</h3>
                <p>Fabriquer un nouvel objet demande énormément de ressources :</p>
                <ul>
                    <li><strong>Des matières premières :</strong> Métaux (cuivre, or, lithium...), plastiques (pétrole), terres rares (pour les composants électroniques)... L'extraction de ces matériaux abîme les paysages et consomme de l'énergie.</li>
                    <li><strong>De l'énergie :</strong> Pour extraire, transporter, transformer les matériaux et assembler l'objet. Cette énergie vient souvent de sources polluantes (charbon, gaz...).</li>
                    <li><strong>De l'eau :</strong> Utilisée en grande quantité dans beaucoup de processus industriels.</li>
                </ul>
                <p>En réparant, tu évites tout ce gaspillage lié à la production d'un nouvel objet.</p>
                <h3><i class="fas fa-sync"></i> L'Économie Circulaire : La Boucle Vertueuse</h3>
                <p>Réparer s'inscrit dans un modèle plus large : l'<strong class="tooltip-trigger" data-tooltip="<i class='fas fa-infinity'></i> Contrairement à l'économie 'linéaire' (fabriquer, utiliser, jeter), l'économie circulaire vise à utiliser les ressources plus longtemps en réparant, réutilisant, rénovant et recyclant les produits et matériaux. Le but est de produire moins de déchets et de moins puiser dans les ressources naturelles.">économie circulaire</strong>. L'idée ? Sortir du schéma "Je fabrique -> J'utilise -> Je jette". On essaie plutôt de faire durer les objets le plus longtemps possible :</p>
                <ol>
                    <li><strong>Concevoir</strong> des objets durables ET réparables.</li>
                    <li><strong>Utiliser</strong> l'objet.</li>
                    <li><strong>Réparer</strong> quand il tombe en panne.</li>
                    <li><strong>Réutiliser / Donner / Revendre</strong> si on n'en a plus besoin mais qu'il fonctionne encore.</li>
                    <li><strong>Rénover</strong> pour lui donner une seconde vie.</li>
                    <li><strong>Recycler</strong> les matériaux en fin de vie pour en faire de nouveaux produits.</li>
                </ol>
                <p>Réparer est une étape clé de cette boucle !</p>
                <div class="did-you-know">
                    <strong><i class="fas fa-tint"></i> Le savais-tu ?</strong>
                    <p>La fabrication d'un seul smartphone nécessite des dizaines de matériaux différents venant des quatre coins du monde et consomme beaucoup d'eau et d'énergie. Le garder plus longtemps grâce à la réparation a un impact énorme !</p>
                </div>
            `
        },
        "perspectives-avenir": {
            title: "Et Demain, la Réparation ?",
            icon: "fas fa-rocket",
            html: `
                <p>La réparation revient en force ! C'est une tendance de fond, encouragée par les citoyens, les associations et même les lois.</p>
                <h3><i class="fas fa-gavel"></i> Le "Droit à la Réparation"</h3>
                <p>C'est l'idée que tout le monde devrait avoir le droit de réparer ses propres objets, ou de les faire réparer par le réparateur de son choix. Pour ça, il faut que les fabricants :</p>
                <ul>
                    <li>Rendent les <span class="tooltip-trigger" data-tooltip="<i class='fas fa-puzzle-piece'></i> Ce sont les pièces qui composent un appareil et qui peuvent être remplacées en cas de panne (ex: batterie, écran, moteur...).">pièces détachées</span> disponibles longtemps et à un prix correct.</li>
                    <li>Fournissent les manuels de réparation et les informations techniques.</li>
                    <li>Ne rendent pas le démontage impossible (vis spéciales, pièces collées...).</li>
                    <li>Permettent l'utilisation d'outils standards.</li>
                </ul>
                <p>De plus en plus de pays mettent en place des lois pour renforcer ce droit.</p>
                <h3><i class="fas fa-laptop-code"></i> Les Technologies au Service de la Réparation</h3>
                <ul>
                    <li><strong>Impression 3D :</strong> Permet de recréer des pièces introuvables.</li>
                    <li><strong>Internet :</strong> Tutoriels vidéo (YouTube), forums d'entraide, sites spécialisés (iFixit...), bases de données de pannes... L'information est plus accessible que jamais !</li>
                    <li><strong>Diagnostic assisté :</strong> Des logiciels ou applications peuvent aider à trouver la panne sur des appareils complexes.</li>
                    <li><strong>Conception modulaire :</strong> De plus en plus de fabricants pensent leurs objets comme des "Lego", où les blocs fonctionnels (modules) peuvent être changés facilement.</li>
                </ul>
                <h3><i class="fas fa-user-tie"></i> Les Métiers de la Réparation Ont de l'Avenir !</h3>
                <p>Avec le besoin de moins jeter, les métiers de réparateur (électroménager, informatique, téléphone, vélo...) sont de nouveau valorisés et très demandés. C'est un secteur qui recrute !</p>
                <div class="perspectives">
                    <strong><i class="fas fa-chart-line"></i> Perspectives d'évolution :</strong>
                    <p>On parle de plus en plus d'un <strong>indice de durabilité</strong> qui remplacerait l'indice de réparabilité. Il prendrait en compte la réparabilité, mais aussi la fiabilité (solidité) de l'objet. L'objectif est d'avoir des objets qui durent VRAIMENT longtemps.</p>
                    <p>Les entreprises sont aussi poussées à l'<strong>éco-conception</strong> : penser dès le début à la fin de vie du produit (comment il sera démonté, recyclé, réparé...).</p>
                </div>
                <p><strong>En conclusion :</strong> Apprendre à réparer, ou au moins comprendre comment ça marche, c'est devenir un consommateur plus intelligent, plus autonome et plus responsable. C'est prendre soin de ses affaires, de son argent et de la planète. La technologie, c'est génial, et savoir la maintenir en vie, c'est encore mieux ! <i class="fas fa-thumbs-up"></i></p>
            `
        }
    };

    // --- Sélection des éléments du DOM ---
    const cardGrid = document.querySelector('.card-grid');
    const courseContentOverlay = document.getElementById('course-content');
    const contentTitle = document.getElementById('content-title');
    const contentBody = document.getElementById('content-body');
    const closeBtn = courseContentOverlay.querySelector('.close-btn');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const fontIncreaseBtn = document.getElementById('font-increase');
    const body = document.body;

    let currentTooltip = null;
    let currentChapterIndex = 0;
    const chaptersOrder = [
        "introduction", "comprendre-objet", "causes-pannes", "diagnostiquer-panne",
        "quest-ce-reparabilite", "reparer-comment", "reparabilite-environnement", "perspectives-avenir"
    ];

    // --- Vérification initiale ---
    if (!cardGrid || !courseContentOverlay || !contentTitle || !contentBody || !closeBtn) {
        console.error("ERREUR : Éléments manquants ! Vérifiez le HTML.");
        return;
    }

    // --- Création dynamique des cartes ---
    chaptersOrder.forEach((chapterKey, index) => {
        const chapter = courseContent[chapterKey];
        if (chapter && chapter.icon && chapter.title) {
            const card = document.createElement('div');
            card.classList.add('course-card');
            card.dataset.chapter = chapterKey;
            card.dataset.index = index;
            card.innerHTML = `
                <div class="card-icon"><i class="${chapter.icon}"></i></div>
                <h2>${chapter.title}</h2>
            `;
            cardGrid.appendChild(card);
        }
    });

    // --- Affichage du contenu du chapitre ---
    function showChapter(index) {
        if (index < 0 || index >= chaptersOrder.length) return;
        
        currentChapterIndex = index;
        const chapterKey = chaptersOrder[index];
        const chapter = courseContent[chapterKey];
        
        contentTitle.textContent = chapter.title;
        contentBody.innerHTML = chapter.html;
        courseContentOverlay.classList.add('visible');
        contentBody.scrollTop = 0;
        initTooltips();
        
        // Mise à jour des boutons de navigation
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === chaptersOrder.length - 1;
    }

    // --- Gestion des clics sur les cartes ---
    cardGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.course-card');
        if (card) {
            const index = parseInt(card.dataset.index);
            showChapter(index);
        }
    });

    // --- Navigation entre chapitres ---
    nextBtn.addEventListener('click', () => showChapter(currentChapterIndex + 1));
    prevBtn.addEventListener('click', () => showChapter(currentChapterIndex - 1));

    // --- Fermeture de l'overlay ---
    function closeOverlay() {
        courseContentOverlay.classList.remove('visible');
        removeCurrentTooltip();
    }

    closeBtn.addEventListener('click', closeOverlay);
    courseContentOverlay.addEventListener('click', (event) => {
        if (event.target === courseContentOverlay) closeOverlay();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeOverlay();
    });

    // --- Gestion des Tooltips ---
    function removeCurrentTooltip() {
        if (currentTooltip) {
            currentTooltip.classList.remove('visible');
            setTimeout(() => {
                if(currentTooltip) currentTooltip.remove();
                currentTooltip = null;
            }, 200);
        }
    }

    function showTooltip(triggerElement) {
        if (currentTooltip && currentTooltip.dataset.triggerId === triggerElement.textContent) {
            removeCurrentTooltip();
            return;
        }
        removeCurrentTooltip();

        const tooltipText = triggerElement.dataset.tooltip;
        if (!tooltipText) return;

        const popup = document.createElement('div');
        popup.classList.add('tooltip-popup');
        popup.innerHTML = tooltipText;
        popup.dataset.triggerId = triggerElement.textContent;
        document.body.appendChild(popup);
        currentTooltip = popup;

        const triggerRect = triggerElement.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();

        let top = triggerRect.bottom + window.scrollY + 8;
        let left = triggerRect.left + window.scrollX + (triggerRect.width / 2) - (popupRect.width / 2);

        if (left + popupRect.width > window.innerWidth - 15) left = window.innerWidth - popupRect.width - 15;
        if (top + popupRect.height > window.innerHeight + window.scrollY - 15) top = triggerRect.top + window.scrollY - popupRect.height - 8;
        if (left < 15) left = 15;

        popup.style.top = `${top}px`;
        popup.style.left = `${left}px`;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => { popup.classList.add('visible'); });
        });
    }

    function initTooltips() {
        contentBody.querySelectorAll('.tooltip-trigger').forEach(trigger => {
            const clonedTrigger = trigger.cloneNode(true);
            trigger.replaceWith(clonedTrigger);
            clonedTrigger.addEventListener('click', (event) => {
                event.stopPropagation();
                showTooltip(clonedTrigger);
            });
        });
    }

    document.addEventListener('click', (event) => {
        if (currentTooltip && !event.target.closest('.tooltip-trigger') && !event.target.closest('.tooltip-popup')) {
            removeCurrentTooltip();
        }
    });

    contentBody.addEventListener('scroll', removeCurrentTooltip);
    window.addEventListener('resize', removeCurrentTooltip);

    // --- Gestion du thème sombre ---
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // --- Gestion de la taille de police ---
    let fontSize = 1;
    fontIncreaseBtn.addEventListener('click', () => {
        fontSize = fontSize === 1 ? 1.2 : 1;
        document.documentElement.style.fontSize = `${fontSize}em`;
        fontIncreaseBtn.querySelector('i').style.transform = fontSize === 1.2 ? 'scale(1.2)' : 'scale(1)';
    });

    // --- Effet sonore au survol ---
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const sound = document.getElementById('hover-sound');
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Le son ne peut pas être joué :", e));
        });
    });

    // --- Effet de parallaxe ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelector('#bg-video').style.transform = `translateY(${scrollY * 0.5}px)`;
    });
});