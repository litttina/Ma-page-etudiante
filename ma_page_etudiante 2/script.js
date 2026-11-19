// Navigation : un seul onglet visible à la fois
var liens = document.querySelectorAll('.menu a, .lien-principal');
var carte = null;

function afficherOnglet(nom) {
    var cible = document.getElementById(nom) ? nom : 'accueil';
    document.querySelectorAll('.onglet').forEach(function(section) {
        section.classList.toggle('actif', section.id === cible);
    });
    document.querySelectorAll('.menu a').forEach(function(lien) {
        lien.classList.toggle('selectionne', lien.getAttribute('href') === '#' + cible);
    });
    if (cible === 'carte') {
        if (carte === null) { creerCarte(); }
        setTimeout(function() { carte.invalidateSize(); }, 50);
    }
    window.scrollTo(0, 0);
}

liens.forEach(function(lien) {
    lien.addEventListener('click', function(event) {
        var nom = lien.getAttribute('href').substring(1);
        if (document.getElementById(nom)) {
            event.preventDefault();
            history.replaceState(null, '', '#' + nom);
            afficherOnglet(nom);
        }
    });
});

// Données reprises du code de notre carte initiale
var librairies = [

            {
                nom: "Librairie Delamain",
                adresse: "155 Rue Saint-Honoré, 75001 Paris",
                latitude: 48.8625,
                longitude: 2.3355,
                categorie: "Librairie généraliste",
                specialisation: "Littérature française, nouveautés, livres anciens et éditions rares.",
                bonsPlans: "Réduction de 5 % via Club Butterfly (à confirmer).",
                horaires: "Lun–sam : 10h–20h ; dim : 13h–19h.",
                telephone: "01 42 61 48 78",
                site: "https://www.delamain.fr/"
            },

            {
                nom: "Librairie de Paris",
                adresse: "7-11 Place de Clichy, 75017 Paris",
                latitude: 48.8837,
                longitude: 2.3276,
                categorie: "Librairie généraliste",
                specialisation: "Littérature, sciences humaines, essais, jeunesse, BD et mangas.",
                bonsPlans: "Réduction de 5 % via Club Butterfly (à confirmer).",
                horaires: "Lun–sam : 10h–20h ; dim : fermé.",
                telephone: "01 45 22 47 81",
                site: "https://www.librairie-de-paris.fr/"
            },

            {
                nom: "Le Bibliovore Paris 11",
                adresse: "25 Rue de Vaucouleurs, 75011 Paris",
                latitude: 48.8685,
                longitude: 2.3785,
                categorie: "Livres d'occasion",
                specialisation: "Romans, littérature contemporaine, classiques et livres d'occasion.",
                bonsPlans: "3 € le livre ou 10 € les 4.",
                horaires: "Mar et jeu : 14h30–19h30 ; mer et ven : 10h–13h et 14h30–19h30 ; sam : 10h–19h30 ; dim : 14h–18h ; lun : fermé.",
                telephone: "06 66 72 53 21",
                site: "https://www.lebibliovore.fr/"
            },

            {
                nom: "Boulinier",
                adresse: "18 Boulevard Saint-Michel, 75006 Paris",
                latitude: 48.8524,
                longitude: 2.3435,
                categorie: "Livres d'occasion",
                specialisation: "Livres d'occasion, BD, mangas, CD, DVD et vinyles.",
                bonsPlans: "Livres à partir de 0,20 €.",
                horaires: "Lun–sam : 10h–20h ; dim : 13h30–19h30.",
                telephone: "01 43 25 86 02",
                site: "https://www.boulinier.com/"
            },

            {
                nom: "La Maison du Canal",
                adresse: "27 Rue du Château d'Eau, 75010 Paris",
                latitude: 48.8719,
                longitude: 2.3600,
                categorie: "Librairie solidaire",
                specialisation: "Livres d'occasion issus de dons, littérature et ouvrages variés.",
                bonsPlans: "Prix solidaires et livres parfois gratuits.",
                horaires: "Mar–ven : 12h–19h ; sam : 10h–19h ; dim–lun : fermé.",
                telephone: "09 67 07 08 58",
                site: "https://www.lamaisonducanal.fr/"
            },

            {
                nom: "Emmaüs Campüs Césure",
                adresse: "13 Rue Santeuil, 75005 Paris",
                latitude: 48.8394,
                longitude: 2.3533,
                categorie: "Boutique solidaire",
                specialisation: "Livres d'occasion, vêtements et objets de seconde main.",
                bonsPlans: "Promotions pour les étudiants et les moins de 30 ans (conditions à vérifier).",
                horaires: "Mer–sam : 12h–18h30.",
                telephone: "Non communiqué",
                site: "https://emmaus-defi.org/boutique-emmaus-cesure/"
            },

            {
                nom: "Re-Read Paris Voltaire",
                adresse: "119 Boulevard Voltaire, 75011 Paris",
                latitude: 48.8580,
                longitude: 2.3800,
                categorie: "Livres d'occasion",
                specialisation: "Romans, classiques, livres en langues étrangères et ouvrages d'occasion.",
                bonsPlans: "Livres à partir de 4 € ; tarifs dégressifs pour plusieurs livres (à vérifier).",
                horaires: "Lun–sam : 10h–19h30 ; dim : fermé.",
                telephone: "01 88 48 05 66",
                site: "https://www.re-read.com/"
            },

            {
                nom: "Book Off Châtelet",
                adresse: "9 Rue Saint-Martin, 75004 Paris",
                latitude: 48.8585,
                longitude: 2.3486,
                categorie: "Livres et mangas d'occasion",
                specialisation: "Mangas, BD, romans, livres en langues étrangères, CD et DVD.",
                bonsPlans: "Livres et mangas à petits prix, promotions selon les arrivages.",
                horaires: "Lun–ven : 11h–19h30 ; sam : 10h–19h30 ; dim : 12h–19h30.",
                telephone: "01 40 29 90 68",
                site: "https://lingonbook.fr/pages/book-off-chatelet"
            },

            {
                nom: "Bouquinerie Oxfam Daguerre",
                adresse: "61 Rue Daguerre, 75014 Paris",
                latitude: 48.8341,
                longitude: 2.3265,
                categorie: "Librairie solidaire",
                specialisation: "Littérature étrangère, sciences humaines, livres d'art, jeunesse, BD et vinyles.",
                bonsPlans: "Livres d'occasion à prix solidaires.",
                horaires: "Mar–sam : 12h–19h ; dim–lun : fermé.",
                telephone: "01 42 79 83 10",
                site: "https://www.oxfamfrance.org/magasins/bouquinerie-oxfam-paris-daguerre/"
            },

            {
                nom: "Mona Lisait Gambetta",
                adresse: "259 Rue des Pyrénées, 75020 Paris",
                latitude: 48.8680,
                longitude: 2.3985,
                categorie: "Livres à prix réduits",
                specialisation: "Livres neufs à prix réduits, livres d'occasion, ouvrages illustrés et littérature générale.",
                bonsPlans: "Livres à prix réduits et déstockage.",
                horaires: "À confirmer.",
                telephone: "09 87 52 17 04",
                site: "https://monalisait.fr/"
            }

        ];

// Petite liste des librairies
var liste = document.getElementById('liste-librairies');
librairies.forEach(function(librairie) {
    var article = document.createElement('article');
    article.className = 'carte-librairie';
    var titre = document.createElement('h3');
    titre.textContent = librairie.nom;
    var adresse = document.createElement('p');
    adresse.textContent = librairie.adresse;
    var categorie = document.createElement('p');
    categorie.textContent = librairie.categorie;
    var bonPlan = document.createElement('p');
    bonPlan.textContent = librairie.bonsPlans;
    var bouton = document.createElement('button');
    bouton.textContent = 'Voir sur la carte';
    bouton.addEventListener('click', function() {
        history.replaceState(null, '', '#carte');
        afficherOnglet('carte');
        marqueurs[librairies.indexOf(librairie)].openPopup();
    });
    article.append(titre, adresse, categorie, bonPlan, bouton);
    liste.appendChild(article);
});

var marqueurs = [];
function creerCarte() {
    carte = L.map('carte-librairies').setView([48.8566, 2.3522], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(carte);

    var icone = L.divIcon({
        className: '',
        html: '<div class="point-librairie"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    librairies.forEach(function(librairie) {
        var contenu = `
            <div class="popup-librairie">
                <h3>${librairie.nom}</h3>
                <span class="categorie">${librairie.categorie}</span>
                <p><strong>Adresse :</strong> ${librairie.adresse}</p>
                <p><strong>Spécialisation :</strong> ${librairie.specialisation}</p>
                <p class="bon-plan"><strong>Bons plans :</strong> ${librairie.bonsPlans}</p>
                <p><strong>Horaires :</strong> ${librairie.horaires}</p>
                <p><strong>Téléphone :</strong> ${librairie.telephone}</p>
                <p><a href="${librairie.site}" target="_blank" rel="noopener noreferrer">Site officiel</a></p>
            </div>`;
        var marqueur = L.marker([librairie.latitude, librairie.longitude], { icon: icone })
            .addTo(carte)
            .bindPopup(contenu, { maxWidth: 280, maxHeight: 350 });
        marqueurs.push(marqueur);
    });
}

afficherOnglet(location.hash.substring(1) || 'accueil');
