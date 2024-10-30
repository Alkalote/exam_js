const form = document.getElementById("order");


function validateForm() {
    const prenom = document.getElementById("first").value.trim();
    const nom = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();



    if (prenom.length < 2 || !/^[a-zA-Z]+$/.test(prenom)) {
        alert("Le prénom est invalide. Veuillez entrer un prénom valide.");
        return false;
    }
    if (nom.length < 2 || !/^[a-zA-Z]+$/.test(nom)) {
        alert("Le nom est invalide. Veuillez entrer un nom valide.");
        return false;
    }
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


form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (validateForm()) {

        alert('Envoi réussi');
        const content = document.querySelector('.contentForm');
        const bground = document.querySelector('.bgroundForm');
    
        
        bground.style.display = "none";
        content.style.display = "none";

    }

});