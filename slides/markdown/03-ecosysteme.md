## Ecosystème

#### Frameworks

<img class="icon icon-small" style="border: none; margin: 0 10px;" src="images/jquery.png">
<img class="icon icon-small" style="border: none; margin: 0 10px;" src="images/backbone.png">
<img class="icon icon-small" style="border: none; margin: 0 10px;" src="images/AngularJS-large.png">

---

## Ecosystème

#### Single Page Application

- Ces librairies visent à couvrir les besoins d'une application Web moderne :
  - Simplification des accès au DOM.
  - Mise en place d'une Single Page Application.
  - Interface avec une API REST.

---

## Ecosystème

#### DOM

- DOM : Document Object Model.
- Page HTML vue sous la forme d'un arbre DOM.
- Le parcours de ce type d'arbre se fait en `javascript`.
  - Fastidieux.
  - Verbeux.
  - Différence entre les navigateurs.

---

## Ecosystème

#### DOM

Exemple en pur javascript :

```html
<div id="foo">
  <span class="message">Hello</span>
  <input name="inputName">
</div>
```

```javascript
var div = document.getElementById('foo');
var span = document.getElementsByClassName('message')[0];
var input = document.querySelector('[name="inputName"]');
```

---

## Ecosystème

#### DOM

Exemple avec jQuery :

```html
<div id="foo">
  <span class="message">Hello</span>
  <input name="inputName">
</div>
```

```javascript
var div = $('#foo');
var span = $('.message');
var input = $('[name="inputName"]');
```

---

<img src="images/questions.jpg">

---

## Ecosystème

#### Single Page Application

Wikipédia : Une application web monopage (en anglais single-page application ou SPA) est une application web accessible via une page web unique. Le but est d'éviter le chargement d'une nouvelle page à chaque action demandée, et de fluidifier ainsi l'expérience utilisateur.

---

## Ecosystème

#### Single Page Application

- Dans une Single Page Application (SPA), la page html n'est jamais rechargée entièrement
- Seul le contenu dynamique, est mis à jour
- Exemples
  - Gmail
  - Facebook
  - Etc.

---

## Ecosystème

#### Single Page Application

<img src="images/spa.png">

---

## Ecosystème

#### Single Page Application

Problème : la gestion de l'historique !

---

## Ecosystème

#### Single Page Application

- Solutions:
  - Pendant longtemps, la solution a été d'utiliser le contenu situé aptès le caractère # (hash) : c'est la solution utilisée par Gmail
  - HTML5 standardise ce concept avec l'API push state : c'est la solution utilisée par Facebook
  - L'API push state est à préférer car c'est un standard et facilite l'indexation par les moteurs de recherches

---

<img src="images/questions.jpg">

---

## Ecosystème

#### REST

- REpresentational State Transfer
- Standard d'échange entre un client et un serveur
- Style d'architecture
- Indépendant du protocole (http, etc.)
- Très rare de l'utiliser sur un autre protocole que http

---

## Ecosystème

#### REST

- Doit respecter ces contraintes:
  - Client / Serveur
  - Stateless
  - Les échanges peuvent être mis en cache
  - Identification de resources

---

## Ecosystème

#### REST

Exemple: HTTP

- Client / Serveur : OK par définition
- Stateless : OK par définition
- Les échanges peuvent être mis en cach : OK via les headers HTTP
- Identification de resources : OK via les URL

---

## Ecosystème

#### REST

Exemple: Api Tweeter
- GET /tweets
- GET /tweets/1
- POST /tweets
- PUT /tweets/1
- DELETE /tweets

---

<img src="images/questions.jpg">

---

## Ecosystème

#### Bonnes pratiques

- Pendant longtemps, le Javascript est resté très "artisanal"
  - Pas de tests automatisés
  - Pas de package manager
- Depuis quelques années, la communauté a développé tous les outils nécessaires !
- Ces outils sont basés sur node.js

---

## Ecosystème

#### Bonnes pratiques

- En 2015, avant de livrer une application en production, il faut la "builder"
  - Concaténer ses fichiers javascript en un seul fichier
  - Minifier son code Javascript
  - Gzipper ses fichiers
  - Jouer les tests unitaires pour s'assurer de la stabilité du code
- Le but est de garantir la non régression, de réduire le poids de la page, et donc améliorer l'expérience utilisateur !
- Necessité <strong>d'automatiser</strong> ces tâches

---

## Ecosystème

#### Bonnes pratiques

<img class="icon icon-small" style="border: none; margin: 0 10px;" src="images/grunt.png">
<img class="icon icon-small" style="border: none; margin: 0 10px;" src="images/bower.png">
<img class="icon icon-small" style="border: none; margin: 0 10px;" src="images/gulp.png">

---

## Ecosystème

#### Bonnes pratiques

<img class="icon icon-small" style="border: none; margin: 0 10px;" src="images/karma.png">
<img class="icon icon-small" style="border: none; margin: 0 10px;" src="images/jasmine.png">

---

## Ecosystème

#### Bonnes pratiques

<img src="images/AngularJS-large.png">

---

<img src="images/questions.jpg">
