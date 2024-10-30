/* Création du socket io pour la communication au serveur */
const socket = io();

/* Ouverture de la modale et création/remplissage des éléments pour le produit séléctionné */
function modalOpen(ev){

    /* On récupère la balise dans le html qui va donner les détails */
    const elemDiv = document.querySelector('.elemDetails');
    elemDiv.innerHTML='';
    /* On créé les éléments */
    const close = document.querySelector('.close');
    const content = document.querySelector('.content');
    const bground = document.querySelector('.bground');
    bground.style.display="block";
    content.style.display = "flex";
    const listItem = document.createElement('div');
    const title = document.createElement('h2');
    const background = document.createElement('div');
    const image = document.createElement('img');
    const prix = document.createElement('p');
    const desc = document.createElement('p');
    const specs1 = document.createElement('p');
    const specs2 = document.createElement('p');
    const cart = document.createElement('button');

    /* On leur applique style et valeur */
    listItem.classList.add('cardExtended');
    title.textContent =`${ev.nom_produit}`;
    title.classList.add('titleCard');
    background.classList.add('cardE-background');
    image.src=`${ev.image}`;
    desc.classList.add('cardE-p');
    desc.textContent=`${ev.descriptif}`;
    prix.classList.add('cardE-p');
    prix.textContent=`${ev.prix}`;
    specs1.classList.add('cardE-p');
    specs1.textContent=`Résolution: ${ev.caracteristiques.résolution}/ Zoom: ${ev.caracteristiques.zoom}`;

    specs2.classList.add('cardE-p');
    specs2.textContent=`Connectivité: ${ev.caracteristiques.connectivité}/ Ecran: ${ev.caracteristiques.écran}`;
    cart.classList.add('modalEvent');
    cart.textContent='Ajouter au panier';
    /* Au click sur ce bouton on ajoute l'élément ev au panier */
    cart.addEventListener('click',function(e){
        addCart(ev);
    })

    /* Au click sur ce bouton on ferme la modale */
    close.addEventListener('click',function(event){

        bground.style.display = "none";
        content.style.display = "none";

    });

    /* On ajoute le tout au front */

    background.appendChild(specs1);
    background.appendChild(specs2);
    background.appendChild(desc);
    background.appendChild(prix);
    background.appendChild(cart);


    listItem.appendChild(title);
    listItem.appendChild(image);
    listItem.appendChild(background);

    elemDiv.appendChild(listItem)

}

/* On affiche chacun des produits depuis le fichier JSON */
function showProducts(prods){

    /* On récupère l'élément avec la classe photos */
    const products = document.querySelector('.photos');
    products.innerHTML='';

    /* Pour chaque produit, on effectue sa création */
    prods.forEach(product => {
        
        const prodCard = document.createElement('div');
        prodCard.classList.add('card'); 
        const title = document.createElement('h2');
        const background = document.createElement('div');
        const image = document.createElement('img');
        const prix = document.createElement('p');
        const more = document.createElement('button');
        
        prodCard.classList.add('cardE');
        title.textContent =`${product.nom_produit}`;
        title.classList.add('titleCard');
        background.classList.add('cardE-background');
        image.src=`${product.image}`;
        prix.classList.add('cardE-p')
        prix.textContent=`${product.prix}`;
        more.classList.add('modalEvent');
        more.textContent="Plus d'information ici";
        /* Appel de la fonction d'ouverture de la modale avec la description du produit */
        more.addEventListener('click',function(e){

            modalOpen(product);

        });
        background.appendChild(prix);
        background.appendChild(more);

        prodCard.appendChild(title);
        prodCard.appendChild(image);
        prodCard.appendChild(background);

        products.appendChild(prodCard);    

    });

}

/* On alerte l'utilisateur du succès  */
socket.on('adding', (data) => {
    alert('Ajout réussi');
});

/* Ajout du produit depuis le serveur en envoyant une requète d'ajout avec le produit en paramètre */
function addCart(product){

    socket.emit("addCart", product);

}

/* On récupère les données puis les affiche */
fetch('json/produits.json')
    .then(response => response.json())
    .then(data => showProducts(data))
    .catch(err => console.error('Problem during data collection from JSON file : ',err));

