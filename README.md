# Introduction
Ce projet réalisé en React et nodejs a permis de developper une application web de dessin collaboratif intitulé **PixelWar**. 

### Démonstration
Lien de la vidéo: https://www.youtube.com/watch?v=B-Ex2dppS3A 
 
### Installation en production
- Cloner le projet:
  ``` git clone https://github.com/RemiDufeu/pixelWar.git ```
- Lancer la commande: docker-compose up
- L'application est maintenant disponible sur l'adresse: http://localhost:3000/
- Il est possible de se connecter en tant qu'administrateur avec le compte: [email:admin, password: adminn]

### Installation en developpement
  - Cloner le projet: 
  ``` git clone https://github.com/RemiDufeu/pixelWar.git ```
  -  Backend: 
        - ```cd backend ```
        - Installer les dépendances: 
    ``` npm install ```
        - Lancer le backend:```  npm run ```
- Frontend:
    -  ```cd frontend ```
    - Installer les dépendances: 
  ``` npm install ```
    - Lancer le frontend:```  npm run start ```


### Fonctionnalités
- **Homepage:** Une page publique offrant les services suivants:
    
    - Visualiser le nombre d'utilisateur inscrits
    - Visualiser le nombre de PixelBoard créés.
    - Visualiser les PixelBoards en cours de création
    - Visualiser les PixelBoards terminés
    - Participer à un PixelBoard

- **Visiteurs:** Un visiteur est un utilisateur non connecté. Il peut:

    - Visualiser les PixeblBoard disponibles et participer à ceux qui sont publics.
    - S'inscrire 

- **Utilisateurs :** Un utilisateur posséde un compte. Lorsque ce dernier **se connecte** , il aura accés aux services suivants: 
    - Visualiser les PixelBoards en cours de création
    - Visualiser les PixelBoards terminés
    - Participer à tous les PixelBoards(public/privé)
    - Visualiser ses informations personnelles
    - Modifier ses informations personnelles
    - Visualiser ses contributions en terme de
        - Nombre de Pixelboards auxquels il a participé
        - Nombre de pixels ajoutés
    - Possibilité de changer le thème de l'application et choisir parmi les deux thèmes possibles (un light et un dark). Si le systéme d'exploitation de l'utilisateur est mis en mode préference, le site sera automatiquement proposé sous ce mode.


- **Administrateurs:** Un administrateur est un utilisateur avec des priviléges en plus notamment:
    - La création, la modification et la suppression d'un PixelBoard
    - Consulter l'ensemble des utilisateurs appelés pixelers sur le site
    - Modifier les informations d'un utilisateur et le supprimer

- **PixelBoard:** Un PixelBoard est un dessin collaboratif composé de plusieurs pixels de différentes couleurs au choix. 
    - On peut avoir une infobulle sur l'utilisateur qui a ajouté le pixel et à quelle date. 
    - On peut avoir la possibilité (ou pas) de dessiner par dessus un pixel déjà dessiné
    - Impossibilité d'ajouter un pixel sur un pixelboard dont la date de fin est passée

