// Fonction asynchrone pour charger les détails du projet
async function loadProjectDetails() {
    try {
        // Récupère l'ID du projet depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        // Charger le fichier JSON contenant les données des projets
        const response = await fetch('data.json');
        const projects = await response.json();

        // Trouver le projet correspondant à l'ID
        const project = projects.find(p => p.id == projectId);

        // Obtenir l'élément conteneur pour les détails du projet
        const projectDetailContainer = document.getElementById('project-detail');

        // Diviser la chaîne de caractères "technologies" en un tableau
        const technologiesArray = project.technologies.split(', ');

        // Créer une chaîne pour stocker les badges de technologie
        let technologies = "";
        for (let tech of technologiesArray) {
            technologies += `<span class="badge badge-info">${tech}</span> `;
        }

        // Créer les détails du projet HTML
        const projectDetail = `
            <h1>${project.title}</h1>
            <p>${project.description}</p>
            <p><strong>Technologies :</strong> ${technologies}</p> 
            <p><strong>Compétences techniques :</strong> ${project.technical_skills}</p>
            <p><strong>Soft skills :</strong> ${project.soft_skills}</p>
            <a href="${project.online_link}" class="btn btn-primary" target="_blank">Lien Github</a>
            <a href="index.html" class="btn btn-success">Retour à la page d'accueil</a>
        `;

        // Ajouter les détails du projet au conteneur
        projectDetailContainer.innerHTML = projectDetail;
    } catch (error) {
        // Afficher l'erreur dans la console si quelque chose ne va pas
        console.error('Erreur lors du chargement des détails du projet:', error);
    }
}

// Appeler la fonction pour charger les détails du projet
loadProjectDetails();

// Mettre à jour l'année dans le pied de page
const prenom = "Barseille"; // Ton prénom
document.getElementById('footer-year').innerHTML = "&copy; " + new Date().getFullYear() + " - " + prenom + " Portfolio";
