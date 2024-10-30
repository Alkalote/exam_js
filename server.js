/* On créé les dépendance nécéssaires */

const http = require('http');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');
const { Sequelize, DataTypes, Op  } = require('sequelize');
const validator = require('validator');

/* Via Sequelize on se connecte à la base de donnée "eval_js" avec le nom d'utilisateur "root" et le mot de passe "root" */
const sequelize = new Sequelize('eval_js', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

/* On créé ensuite la table Panier en BDD avec plusieurs attributs*/
const Panier = sequelize.define('panier', {
    /* L'identifiant du produit en base de données : Entier qui s'augmente à chaque ajout d'une donnée, ne peut être inexistant */
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    /* Le nom du produit en chaine de caractères, ne peut être vide ou inexistant */
    nom_produit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /* La description du produit en chaine de caractères, ne peut être vide ou inexistant */
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /* Le chemin de l'image du produit en chaine de caractères, ne peut être vide ou inexistant */
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /* Le prix du produit en nombre à virgule, ne peut être inexistant */
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    /* Permet d'avoir une date de création et de mise a jour  */
    timestamps: true
});


/* Si la base de donnée est bien synchronisée */
sequelize.sync().then(() => {
    console.log('Base de données synchronisée');
});

/* Création du serveur et de ses paramêtres */
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    /* js,css ... */
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
    /* Envoie d'erreur en cas de problème (fichier pas trouvé ...) */
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err404, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content404, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});
/* On récupère tout les éléments du panier */
const getElements = async () => {
    return await Panier.findAll();
};
/* Création du moyen de communication grâce à socketIo */
const io = socketIo(server);
/* On créé la liste des action possible via récupérations de requètes (nom,valeur) */
io.on('connection', (socket) => {

    socket.on('getElements', async () => {
        const events = await getElements();
        socket.emit('elements', events);
    });
    /* Ajout d'un article en base de donnée via l'article donné par photos.js */
    socket.on('addCart',async (data) => {
            const prixD = parseFloat(data.prix);
            Panier.create({
                nom_produit: data.nom_produit,
                description: data.descriptif,
                image: data.image,
                prix: prixD
    /* Si succès on envoie la requête adding à photos.js pour dire que c'est bon, sinon on affiche l'erreur */
            }).then(() => {
                io.emit('adding', data);
            }).catch(err => console.error(err));
    
    });

    /* On retire le produit à l'id associé au produit passé */
    socket.on('removeCart',async (data) =>{
        Panier.destroy({
            where:{
                id: data.id
            }
        })
        /* ... sans rechargement de la page */
        const events = await getElements();
        socket.emit('elements', events);
    })

});

/* Définition du port d'écoute */
server.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
