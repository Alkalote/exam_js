
/* On récupère le formulaire */
const form = document.getElementById("order");

/* On valide ou non le formulaire via des regex */
function validateForm() {
    const prenom = document.getElementById("first").value.trim();
    const nom = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();


    /* Jean-Eude ou Jean Eude ou jean-eude ou jean-Eude ... passent mais pas Jean.eude par exemple */
    if (prenom.length < 2 || !/^[a-zA-Z][a-zA-Zéèêëîïôûù'-]*(?:[-' ]?[a-zA-Z][a-zA-Zéèêëîïôûù'-]*)*$/.test(prenom)) {
        alert("Le prénom est invalide. Veuillez entrer un prénom valide.");
        return false;
    }
    /* Pareil pour les noms */
    if (nom.length < 2 || !/^[a-zA-Z][a-zA-Zéèêëîïôûù'-]*(?:[-' ]?[a-zA-Z][a-zA-Zéèêëîïôûù'-]*)*$/.test(nom)) {
        alert("Le nom est invalide. Veuillez entrer un nom valide.");
        return false;
    }
    /* Validation de l'email via la fonction en dessous */
    if (!validateEmail(email)) {
        alert("L'email est invalide. Veuillez entrer un email valide.");
        return false;
    }
    return true;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

/* A la validation du formulaire on empèche le rechargement puis vide le contenu et cache la modale */
form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (validateForm()) {

        alert('Envoi réussi');
        const content = document.querySelector('.contentForm');
        const bground = document.querySelector('.bgroundForm');
    
        const prenom = document.getElementById("first");
        const nom = document.getElementById("last");
        const email = document.getElementById("email");
        prenom.value='';
        nom.value='';
        email.value='';

        
        bground.style.display = "none";
        content.style.display = "none";

        
        /* On pourrais choisir de supprimer le contenu du panier ici et le ferais dans un cadre normal mais pour le context de tests il est plus pratique de ne pas le faire */

    }

});

