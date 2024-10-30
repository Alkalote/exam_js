EXAMEN JAVASCRIPT
---Contexte

-Ouvrir Enoncé-Creation-site-web.pdf

---Installer et utiliser
--Prérequis

    -Node.js
    -npm

--Étapes d'installation
-Clonez le dépôt en utilisant la commande suivante dans git bash :

    git clone https://github.com/Alkalote/exam_js.git

-Ouvrez un terminal à la racine du projet, puis installez les dépendances (dans le fichier package.json) en exécutant dans git bash ou dans le terminal intégré d'un IDE :

    npm install "nom de la dépendance"


-Créez une base de donnée sur Wamp(par exemple) nommée "eval_js" et changez dans server.js à la ligne 8 'root','root' pour vos identifiant de connection à phpmyadmin (sur Wamp) le premier étant l'utilisateur et le second étant le mot de passe    

-Démarrez le serveur en lançant la commande suivante dans le terminal git bash ou dans le terminal intégré d'un IDE :

    node server.js

Le site sera accessible sur http://localhost:3000.