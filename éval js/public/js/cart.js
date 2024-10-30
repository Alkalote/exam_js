
/* Création du socket io pour la communication au serveur */
const socket = io();
/* Récupération des éléments de la modale du formulaire */
const content = document.querySelector('.contentForm');
const bground = document.querySelector('.bgroundForm');
const close = document.querySelector('.closeForm');

/* Affichage de la modale et de son contenu  */
function showModal() {

    /* On change l'affichage de la modale qui est cachée de base */
    bground.style.display = "flex";
    content.style.display = "flex";
    /* Au click sur le bouton on "ferme" la modale en la cachant */
    close.addEventListener('click', function (event) {

        bground.style.display = "none";
        content.style.display = "none";

    });
}

/* On demande les éléments du panier au serveur */
socket.emit('getElements');
/* A leur récupération, on affiche les produits en résumé */
socket.on('elements', (elements) => {
    /* Variables pour l'affichage du prix total et du nombre total d'articles */
    let prixTotal = 0;
    let totalElem = 0;
    /* Récupération de l'élément avec la classe panier qu'on vide */
    const cart = document.querySelector('.panier');
    cart.innerHTML = '';

    /* Pour chacun des éléments on affiche: La photo, le nom, le prix, la description et un bouton pour retirer l'article du panier */
    elements.forEach(element => {

        prixTotal = prixTotal + element.prix;
        totalElem = totalElem + 1;

        const recap = document.createElement('div');
        const divIm = document.createElement('div');
        const image = document.createElement('img');
        const nomProd = document.createElement('p');
        const desc = document.createElement('p');
        const prix = document.createElement('p');
        const divBut = document.createElement('div');
        const button = document.createElement('button');

        recap.classList.add('cartRecap');
        divIm.classList.add('gridCart');
        image.src = `${element.image}`;
        nomProd.textContent = `${element.nom_produit}`;
        nomProd.classList.add('gridCart2');
        desc.textContent = `${element.description}`;
        desc.classList.add('gridCart3');
        prix.textContent = `${element.prix}€`;
        prix.classList.add('gridCart4');
        divBut.classList.add('gridCart5');
        button.textContent = 'Retirer';
        /* On demande au serveur de supprimer l'élément du panier */
        button.addEventListener('click', function (e) {

            socket.emit('removeCart', element);

        });
        divIm.appendChild(image);
        recap.appendChild(divIm);
        recap.appendChild(nomProd);
        recap.appendChild(desc);
        recap.appendChild(prix);
        divBut.appendChild(button);
        recap.appendChild(divBut);

        cart.appendChild(recap);

    });
    /* On ajoute ensuite un élément qui contient le nombre total d'articles et le prix total ainsi qu'un bouton pour payer */
    const divPr = document.createElement('div');
    const recap = document.createElement('p');
    const butValid = document.createElement('button');

    divPr.classList.add('recapCartTotal');
    recap.textContent = `Nombre d'éléments: ${totalElem}: Prix total ${prixTotal}€`;
    butValid.classList.add('modalOpen');
    butValid.textContent = 'Passer au payment';
    /* On affiche la modale contenant le formulaire qui "simule" un payment*/
    butValid.addEventListener('click', function (e) {

        showModal();


    });
    divPr.appendChild(recap);
    divPr.appendChild(butValid);
    cart.appendChild(divPr);

});

