# Projet Openclassrooms n°6 : Créez un site communautaire autours de l'escalade

## Présentation du projet

Les amis de l'escalade est une association qui réunit les passionnés d'escalade dans toute la France. 
Ils souhaitent donc créer un site communautaire autours de cette discipline. Ce site aura pour but la mise en
relation et le partage d'informations. Il permettra de donner de la visibilité à l'association afin d'encourager des 
grimpeurs indépendants à y adhérer. 

### Fonctionnalités : 

* Un utilisateur doit pouvoir consulter les informations des sites d'escalades (secteurs, voies, longueurs, etc.).
* Un utilisateur doit pouvoir faire une recherche à l’aide de plusieurs critères pour trouver un site de grimpe et 
  consulter le résultat de cette recherche. Les critères peuvent être le lieu, la cotation, le nombre de
  secteurs, etc.
* Un utilisateur doit pouvoir s’inscrire gratuitement sur le site.
* Un utilisateur connecté doit pouvoir partager des informations sur un site d’escalade (secteurs, voies, longueurs, etc.).
* Un utilisateur connecté doit pouvoir laisser des commentaires sur les pages des sites d’escalade.
* Un membre de l'association doit pouvoir taguer un site d’escalade enregistré sur la plateforme comme
 « Officiel Les amis de l’escalade ».
 * Un membre de l'association doit pouvoir modifier et supprimer un commentaire.
 * Un utilisateur connecté doit pouvoir enregistrer dans son espace personnel les topos qu’ils possèdent et préciser 
 si ces derniers sont disponibles pour être prêtés ou non. Un topo est défini par un nom, une description, un lieu et 
 une date de parution.
 * Un utilisateur connecté doit pouvoir consulter la liste des topos disponibles par d’autres utilisateurs et faire une 
 demande de réservation. La réservation n’inclut pas les notions de date de début et date de fin.
* Un utilisateur connecté doit pouvoir accepter une demande de réservation. Si une réservation est acceptée, 
automatiquement le topo devient indisponible. L’utilisateur connecté pourra ensuite de nouveau changer le statut du 
topo en « disponible ». La plateforme se contente de mettre en contact les deux parties pour le prêt d’un topo 
(par échange de coordonnées).

### Contraintes fonctionnelles

* Le vocabulaire de l'escalade doit être utilisé : site, spot, voie, longueur, grimpeur, etc.
* Le site doit être responsive.
* Le site doit être sécurisé.
* Un SGBD est utilisé et les données sont persistées dans la base de données. 
* Utilisation d'un ORM
* Build Maven
* Application développée en utilisant JEE

## Partie FRONT-END
Application Angular

* Angular CLI 9.1.7
* Typescript 3.8.3
* Node 12.13.0
* Rxjs 6.5.5
* Angular material 9.2.4
* NgBootstrap 5.3.0
* Infinite Scroll 8.0.1
* Ngx-material-file-input 2.1.1

## Déploiement

* Clôner le projet
* Lancer la commande `npm install` ou `yarn install`

## Lancement de l'application
    
Pour lancer le serveur :

    ng serve
    
Application disponible à l'adresse suivante : [http://localhost:4200](http://localhost:4200)

/!\ Le serveur back doit être lancé pour profiter de ses fonctionnalités
