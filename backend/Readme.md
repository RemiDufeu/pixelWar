# 0. Mise en place

Accédez à la console de votre serveur et clonez ce répertoire. Ensuite vous pouvez lancer la commande "npm install" pour charger les dépendances du serveur.
Pour l'installation renommer le fichier "exemplesettings.json" en "settings.json".

# 1. Setup du service de messagerie

- Pour setup la messagerie nous avons besoin d'une adresse GMAIL. Le mieux est de créer un compte pour ce service pour éviter que le fonctionnement de l'application soit bouleversé par la supression d'un ancien mail.
- Une fois le compte généré il faut permettre l'accès aux applications moins sécurisé : https://www.google.com/settings/security/lesssecureapps
- Si Votre compte est géré par un groupe, il faut activer l'option : Autoriser les utilisateurs à gérer leur accès aux applications moins sécurisées à l'adresse : https://admin.google.com/ac/security/lsa
- Après ces étapes il suffit juste d'inscrire l'email et le mot de passe du compte dans le fichiers settigns.json (userGmail et passGmail)

# 2. Set up de mongodb

Dans cette étape on allons générer la base de donnée en ligne mongodb. 
- Se rendre à la page : https://account.mongodb.com/account/login et je m'identifie avec un compte de service (réutiliser le même compte que la messagerie peut être interessant pour éviter de multiplier le compte). Le plan gratuit de mongoDB est suffisant.
- Créer un utilisateur et noter le mot de passe
- Dans les IP d'accès il faut inscrire l'IP d'hébergement du backend.
- Naviguer dans l'onglet database et cliquer sur connect puis cliquez sur "Connect your application"
- copier la string de connexion et l'inscrire dans le fichier "settings.json"
- Remplacer la balise "password" par le mot de passe de l'utilisateur 

# 3. Autres réglages
- Définisser le nombre de hachage du mot de passe dans settings nbHach
- Définissez une string de cryptage aléatoire dans le fichier settings.json

Après création du premier admin l'application le backend est prêt à être déployé

# 4. Déploiement

Pour déployer l'application lancer la commande "npm start server.js" dans la racine du projet. Vous devriez voir apparaitre l'inscription "Connexion à MongoDB réussie !" en cas de succès.




