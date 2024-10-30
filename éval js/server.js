const http = require('http');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');
const { Sequelize, DataTypes, Op  } = require('sequelize');
const validator = require('validator');

const sequelize = new Sequelize('eval_js', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const Panier = sequelize.define('panier', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom_produit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true
});






sequelize.sync().then(() => {
    console.log('Base de données synchronisée');
});

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

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

const getElements = async () => {
    return await Panier.findAll();
};

const io = socketIo(server);

io.on('connection', (socket) => {

    socket.on('getElements', async () => {
        const events = await getElements();
        socket.emit('elements', events);
    });

    socket.on('addCart',async (data) => {
            const prixD = parseFloat(data.prix);
            Panier.create({
                nom_produit: data.nom_produit,
                description: data.descriptif,
                image: data.image,
                prix: prixD

            }).then(() => {
                io.emit('launchCreate', data);
            }).catch(err => console.error(err));
    
    });

    socket.on('removeCart',async (data) =>{
        Panier.destroy({
            where:{
                id: data.id
            }
        })
        const events = await getElements();
        socket.emit('elements', events);
    })

});

server.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
