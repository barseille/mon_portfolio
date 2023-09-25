document.addEventListener("DOMContentLoaded", async function() {
    // Définir le prénom
    const prenom = "Barseille";

    // Ajouter le prénom à l'élément HTML avec l'ID "prenom"
    document.getElementById("prenom").innerHTML += prenom;

    // Mettre à jour l'année dans le pied de page
    document.getElementById('footer-year').innerHTML = "&copy; " + new Date().getFullYear() + " - " + prenom + " Portfolio";

    try {
        // Récupérer les données JSON depuis le fichier 'data.json'
        const response = await fetch('data.json');
        let projects = await response.json();

        // Trier les projets par ordre croissant d'ID
        projects.sort(function(a, b) {
            return a.id - b.id;
        });

        // Obtenir l'élément conteneur pour les projets
        const projectsContainer = document.getElementById('project-list');

        // Parcourir chaque projet dans le tableau
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];

            // Diviser la chaîne de caractères "technologies" en un tableau
            const technologiesArray = project.technologies.split(', ');

            // Créer une chaîne vide pour stocker les badges de technologie
            let technologies = "";
            for (let j = 0; j < technologiesArray.length; j++) {
                technologies += '<span class="badge badge-info">' + technologiesArray[j] + '</span> ';
            }

            const projectCard = `
                <div class="row mt-4 project-card ">
                    <div class="col-md-4 project-image-container">
                        <img src="${project.image}" alt="${project.title}" class="img-fluid profile-image project-image ">
                    </div>
                    <div class="col-md-8">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.online_link}" class="btn btn-primary" target="_blank">Lien Github</a>
                        <a href="project_detail.html?id=${project.id}" class="btn btn-success">Détails du projet</a>
                        <div class="mt-2">${technologies}</div> 
                    </div>
                </div>`;

            // Ajouter la carte de projet au conteneur
            projectsContainer.innerHTML += projectCard;
        }
    } catch (error) {
        // Afficher l'erreur dans la console si quelque chose ne va pas
        console.error('Erreur lors du chargement des projets:', error);
    }
});