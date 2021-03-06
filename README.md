<p align="center">
<img src="./public/../src/images/logo_tutorat.png" alt="Tutorinsa logo" align="center" style="width:320px">


![GitHub](https://img.shields.io/github/license/Campus-INSA-CVL/tutorinsa-client-react)
![Update packages](https://github.com/Campus-INSA-CVL/tutorinsa-client-react/workflows/Update%20packages/badge.svg)
![GitHub deployments](https://img.shields.io/github/deployments/CAMPUS-INSA-CVL/tutorinsa-client-react/github-pages)

</p>

<div align="center">

# Tutor'INSA - Client (React)

</div>

Bienvenue sur le repo du client de Tutor'INSA !

Celui-ci fait office d'interface utilisateur pour la plateforme de mise en relation entre les tuteurs et les élèves de l'INSA CVL. 

## Requirement

This project need, to run correctly:

+ [Node.js](https://nodejs.org/en/)
 
## Technologies utilisées

+ Framework UI : [React](https://fr.reactjs.org/)
+ Component lib : [Material Ui](https://material-ui.com/)
+ Third-party lib : 
    
    + **@feathersjs/{client, authentication-client
rest-client}** : fetcher de l'API
    + **@fullcalendar** : composant du calendrier
    + **figbird** : fetchers personnalisés avec mise en cache intégrée 
    + **framer-motion** : animations
    + **react-admin** : panel-admin
  

## Procédure pour démarer le serveur en développement : 

1) Premièrement, installer les dépendences nécessaires : 

```bash
cd tutorinsa-client-react
npm install
npm start
```

2) Ensuite, créer le fichier **.env** en utilisant le ficher **.env.local** comme modèle, suivre les indications sous forme de commentaires !  

## A venir 

+ responsive design (priorité la plus élevée)
+ affichage "timeline" pour les posts
+ documentation (démo)
+ exploitation du mailer améliorée
+ plus de contenu 
+ communication entre le tutueur et l'étudiante améliorée avec le mailer 
+ réorganisation du code (optimiser rendering de components / stuffs)
+ quelques surprises ...

## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Campus-INSA-CVL/tutorinsa-client-react/issues)

N'hésitez pas à améliorer ce projet en ouvrant des [issues](https://github.com/Campus-INSA-CVL/tutorinsa-client-react/issues) and [pull requests](https://github.com/Campus-INSA-CVL/tutorinsa-client-react/pulls) !

> *Pour toute questions / critiques, n'hésitez pas à me contacter !* 

Made with ❤️ by Jordan Béziaud (3A STI)

