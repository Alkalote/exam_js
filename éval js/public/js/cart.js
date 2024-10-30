const socket = io();
const content = document.querySelector('.contentForm');
const bground = document.querySelector('.bgroundForm');
const close = document.querySelector('.closeForm');


function showModal(){
    bground.style.display="block";
    content.style.display = "flex";
    close.addEventListener('click',function(event){

        bground.style.display = "none";
        content.style.display = "none";

    });
}

socket.emit('getElements');
socket.on('elements', (elements) => {
    let prixTotal=0;
    let totalElem = 0;
    const cart = document.querySelector('.panier');
    cart.innerHTML='';

    elements.forEach(element => {

    prixTotal =  prixTotal+element.prix;
    totalElem= totalElem+1;
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
    image.src=`${element.image}`;
    nomProd.textContent=`${element.nom_produit}`;
    nomProd.classList.add('gridCart2');
    desc.textContent=`${element.description}`;
    desc.classList.add('gridCart3');
    prix.textContent=`${element.prix}€`;
    prix.classList.add('gridCart4');
    divBut.classList.add('gridCart5');
    button.textContent='Retirer';
    button.addEventListener('click',function(e){

        socket.emit('removeCart',element);

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

    const divPr = document.createElement('div');
    const recap =document.createElement('p');
    const butValid=document.createElement('button');

    divPr.classList.add('recapCartTotal');
    recap.textContent=`Nombre d'éléments: ${totalElem}: Prix total ${prixTotal}€`;
    butValid.classList.add('modalOpen');
    butValid.textContent='Passer au payment';
    butValid.addEventListener('click',function(e){

        showModal();


    });
    divPr.appendChild(recap);
    divPr.appendChild(butValid);
    cart.appendChild(divPr);

});

