## Angular.js

#### Composants

- Modules
- Contrôleurs
- Formulaires
- Services et factory
- Filtres
- Directives
- Routeur

---

## Angular.js

#### Module

- Contient les différents composants de votre application
- Toute application contient au moins un module
- On le déclare dans le code (avec l'attribut ng-app) et dans un fichier Javascript

```javascript
// Création d'un module dans app.js
angular.module('myApp', []);
```

---

## Angular.js

#### Module

- Equivalent d'un "main" (point d'entrée de votre application)
- Tous les composants de votre application seront créés au sein de votre module
- Le deuxième paramètre est la liste des modules dont votre application dépend
- Pour récupérer un module sans le créer, il suffit de ne pas préciser le second paramètre

---

## Angular.js

#### Module

```javascript
// Création d'un module
var m1 = angular.module('myApp', []);

// Récupération du module
var m2 = angular.module('myApp');

console.log(m1 === m2); // true
```

---

## Angular.js

#### Contrôleurs

<img src="images/mvc.png">

---

## Angular.js

#### Contrôleurs

- Un contrôleur contient la logique (le comportement) associée à votre page HTML (qui représente la vue du modèle M**V**C)
- C'est un contrôleur conforme au pattern MV**C**
- Un contrôleur angular.js n'est rien d'autre qu'une fonction !

```html
<div ng-controller="MyController">
  <p>Ma page HTML</p>
</div>
```

```javascript
angular.module('myApp')
  .controller('MyController', function () {
    // Le code de votre contrôleur !
  });
```

---

## Angular.js

#### Contrôleurs

- Pour afficher des données gérées dans votre contrôleur, il faut les partager à la vue
- Pour partager des données, on utilise l'objet $scope
- C'est le <strong>M</strong> du modèle **M**VC

```html
<div ng-controller="MyController">
  <p>Hello {{ name }}</p>
</div>
```

```javascript
angular.module('myApp')
  .controller('MyController', ['$scope', function ($scope) {
    $scope.name = 'world';
  }]);
```

---

## Angular.js

#### Contrôleurs

- L'objet $scope a été instancié par Angular.js : notre application ne crée pas d'objets, mais **demande à Angular.js de nous les fournir**
- C'est **l'injection de dépendance**
- C'est un concept qu'on retrouve dans beaucoup d'autres langages et frameworks
  - Java: Spring, CDI
  - PHP: Symfony

---

## Angular.js

#### $scope

- L'objet $scope est un objet très **important**
  - Il contient les données accessible depuis la page HTML
  - Il hérite de ses parents
  - Il possède les méthodes `$watch` ; `$on` ; `$apply` ; `$digest`
  - Tout objet $scope hérite forcément du **$rootScope**
  - Toute application Angular.js possède **un (et un seul) $rootScope**

---

## Angular.js

#### $scope

Chaque $scope hérite de son scope parent (défini par l'arborescence du dom)

```html
<div ng-controller="MyController">
  <div ng-controller="MyOtherController">
  </div>
</div>
```

```javascript
angular.module('myApp')
  .controller('MyController', ['$scope', function ($scope) {
    $scope.name = 'world';
  }]);

angular.module('myApp')
  .controller('MyOtherController', ['$scope', function ($scope) {
    console.log($scope.name); // world
  }]);
```

---

## Angular.js

#### $scope

- Pour afficher les valeurs du scope, le plus simple est d'utiliser les "doubles moustaches"
- Une autre façon est d'utiliser la directive **ng-bind**

```html
<div ng-controller="MyController">
  Hello {{name}}
  Hello <span ng-bind="name"></span>
</div>
```

```javascript
angular.module('myApp')
  .controller('MyController', ['$scope', function ($scope) {
    $scope.name = 'world';
  }]);
```

---

## Angular.js

#### $scope

- La méthode $on permet d'écouter un évenement provenant d'un autre contrôleur
- Permet de "dispatcher" des événements
- Une façon de faire communiquer des contrôleurs (mais pas toujours la bonne façon)

```javascript
angular.module('myApp')
  .controller('myController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
      $scope.$on('myEvent', function (event, param1) {
        console.log(param1);
      });

      $rootScope.$broadcast('myEvent', 'foo');
    }
  ]);
```

---

## Angular.js

#### controller as

- Avec l'arrivée d'Angular 2, la syntaxe controllerAs est préconisée
- Les données sont précisées sur le contrôleur
- Le contrôleur est vu comme une classe

```html
<div ng-controller="MyController as ctrl">
  Hello {{ctrl.name}}
  Hello <span ng-bind="ctrl.name"></span>
</div>
```
```javascript
angular.module('myApp')
  .controller('MyController', function() {
    this.name = 'world';
  });
```

---

## Angular.js

#### Formulaires & ng-model

- Pour récupérer les valeurs saisies dans un formulaire, on utilisera l'attribut **ng-model**
- Au fur et à mesure de la saisie, les variables du scope sont mises à jour par Angular.js
- Si la valeur est mise à jour programmatiquement, la valeur du champ est mise à jour
- C'est ce qu'on appelle le **double binding**

---

## Angular.js

#### Formulaires & ng-model

Exemple

```html
<div ng-controller="MyController as ctrl">
  <form>
    <input type="text" ng-model="ctrl.name">
    Message: {{ ctrl.name }}
  </form>
</div>
```
```javascript
angular.module('myApp')
  .controller('MyController', function() {
    this.name = 'hello world';
  });
```

---

## Angular.js

#### Formulaires & ng-model

La directive **ng-model** est l'une des features les plus importantes d'Angular.js

```html
<div ng-controller="MyController as ctrl">
  <input id="my-input" type="text" ng-model="ctrl.name">
</div>
```
VS
```javascript
var myValue = 'foo';

$('#my-input').on('keyup', function (e) {
  myValue = $(this).val();
});

myValue = 'bar';
$('#my-input').val(myValue);
```

---

## Angular.js

#### Formulaires & ng-model

Permet de faire de la validation à partir des attributs "classiques" : `required`, `maxlength`, `pattern`, etc.

```html
<div ng-controller="MyController as ctrl">
  <input id="my-input" type="text" name="inputName"
         ng-model="ctrl.name"
         required
         maxlength="100">
</div>
```

---

## Angular.js

#### Http

- Angular.js fournit une api pour faire des requêtes HTTP
- S'interface parfaitement avec une **api REST**
- Prend en charge toutes les spécificités des navigateurs
- Il suffit d'injecter le service **$http** dans un contrôleur
- Permet de faire toutes les requêtes "classique"
  - `GET`
  - `POST`
  - `PUT`
  - `DELETE`

---

## Angular.js

#### Http

Exemple : `GET /foo`

```javascript
angular.module('myApp')
  .controller('MyController', ['$http',
    function ($http) {
      var vm = this;

      $http.get('/foo')
        .success(function (data) {
          vm.data = data;
        })
        .error(function (error) {
          vm.error = error;
        });
    }
  ]);
```

---

## Angular.js

#### Http

- **Attention**, le résultat est **asynchrone**
  - Communication synchrone: vous demandez un résultat et l'avez "tout de suite" (i.e vous êtes bloqué tant que la réponse n'est pas là)
  - Communication asynchrone: vous demandez un résultat, mais vous pouvez passez à autre chose et vous serez averti de la réponse une fois disponible
- On récupère le résultat via un **callback** de succès
- On récupère l'erreur via un **callback** d'erreur

---

## Angular.js

#### Http

Exemple de récupération des tweets :

```html
<div ng-controller="TweetController as ctrl">
  <div ng-repeat="tweet as ctrl.tweets">{{ tweet.message }}</div>
</div>
```

```javascript
angular.module('app').controller('TweetController', function($http) {
  var vm = this;

  $http.get('/tweets')
    .success(function(data) {
      vm.tweets = data;
    });
});
```

---

## Angular.js

#### Http

Exemple de création d'un tweet :

```html
<div ng-controller="TweetController as ctrl">
  <form name="tweetForm" ng-submit="ctrl.submit()">
    <input ng-model="ctrl.login" required>
    <textarea ng-model="ctrl.message" maxlength="140"></textarea>
    <button ng-disabled="tweetForm.$invalid">Tweeter !</button>
  </form>
</div>
```

```javascript
angular.module('app').controller('TweetController', function($http) {
  var vm = this;

  vm.submit = function() {
    var tweet = { login: vm.login, message: vm.message };
    $http.post('/tweets', tweet)
      .success(function() {
        console.log('Success !');
      });
  };
```

---

## Angular.js

#### Factory

- Une factory permet d'extraire des composants ré-utilisables
- On peut le récupérer dans un contrôleur par injection de dépendance

---

## Angular.js

#### Factory

```javascript
angular.module('myApp')
  .factory('myComponent', function () {
    return {
      helloWorld: function () {
        console.log('hello world');
      }
    };
  })

  .controller('MyController', ['myComponent',
    function (myComponent) {
      this.message = myComponent.helloWorld();
    }
  ]);
```

---

## Angular.js

#### Factory

- La factory est exécutée la première fois où le composant est injecté (lazy initialization).
- Le composant ne sera créé qu'une et une seule fois (singleton).
- La solution idéale pour factoriser du code entre contrôleurs

---

## Angular.js

#### Filtres

- Un filtre est un composant permettant d'altérer l'affichage d'une valeur</li>
- Permet de bien séparer l'affichage de la manipulation des données</li>
- Un exemple est l'utilisation du filtre "date"</li>

```html
<div ng-conroller="MyController as ctrl">
  Current date: {{ ctrl.myDate | date:'dd/MM/yyyy' }}
</div>
```
```javascript
angular.module('myApp')
  .controller('MyController', function () {
    this.myDate = new Date();
  });
```

---

## Angular.js

#### Filtres

- Angular fournit une collection de filtres prêts à l'emploi
  - `date`
  - `number`
  - `currency`
  - `uppercase` / `lowercase`
  - `orderBy`
- La documentation est très bien faite !

---

## Angular.js

#### Filtres

Les filtres peuvent se chaîner (comme un pipe unix)</li>

```html
<div ng-conroller="MyController as ctrl">
  Current date: {{ ctrl.myDate | date:'dd/MMMMM/yyyy' | uppercase }}
</div>
```
```javascript
angular.module('myApp')
  .controller('MyController', function () {
    this.myDate = new Date();
  });
```

---

## Angular.js

#### Filtres

Ecrire son propre filtre consiste "juste" à écrire une fonction

```html
<div ng-conroller="MyController as ctrl">
  {{ ctrl.myData | uppercase }}&gt;
</div>
```
```javascript
angular.module('myApp')
  .controller('MyController', function () {
    this.myData = 'hello';
  })

  .filter('uppercase', function () {
    return function (param) {
      return param.toUpperCase();
    };
  });
```

---

## Angular.js

#### Filtres

Cas d'utilisation : affichage d'un login "twitter" :

```html
<div ng-conroller="MyController as ctrl">
  {{ ctrl.tweet.login | twitterLogin }}
</div>
```
```javascript
angular.module('myApp')
  .controller('MyController', function () {
    this.tweet = {
      login: 'mjeanroy',
      message: 'Hello Insa'
    };
  })

  .filter('twitterLogin', function () {
    return function (login) {
      return '@' + login;
    };
  });
```

---

## Angular.js

#### Directives

- Les directives représentent une extention du DOM : attribut / balise customisé
  - Permettent de centraliser la manipulation du DOM
  - Concept très proche des WebComponents
- Peut être utilisée comme un attribut ou une nouvelle balise
- Les attributs `ng-controller` / `ng-app` / `ng-model` sont des directives !

---

## Angular.js

#### Directives

Exemple de la directive ng-bind :

```javascript
module.directive('ngBind', function () {
  return function (scope, element, attrs) {
    scope.$watch(attrs.ngBind, function (newValue) {
      element.html(newValue);
    });
  };
});
```

---

## Angular.js

#### Directives

- Les directives peuvent avoir un template html
  - Pratique pour séparer logique et présentation.
- Les directives disposent d'un scope :
  - Permet d'implémenter le data binding facilement !

---

## Angular.js

#### Directives

Exemple d'une directive custom :

```html
<div ng-controller="TweetController as ctrl">
  <tweet tweet="ctrl.activeTweet"></tweet>
</div>
```

```javascript
angular.module('app').directive('tweet', function () {
  return {
    template: '<div>{{tweet.login}} - {{tweet.message}}</div>',
    scope: {
      tweet: '='
    }
  };
});
```

---

## Angular.js

#### Directives

- Sujet vaste et compliqué qu'on n'abordera pas plus aujourd'hui
- Nombreux exemples sur Github (angular-ui, angular-strap)
- Beaucoup de directives Angular.js (ngBind, ngModel, etc.) sont simples à lire et sont très instructives

---

## Angular.js

#### Router

- Le routeur Angular.js est un composant très simple
- Il suffit de définir les routes disponibles et les templates html associés
- La page doit contenir un élément avec un attribut `ng-view`
- C'est ce bloc qui sera mis à jour à chaque changement de route

---

## Angular.js

#### Best Practices

- Pas de manipulation du DOM dans un contrôleur : c'est le rôle d'une directive !
- La customisation de l'affichage doit être fait dans un filtre
- Gardez vos contrôleurs simple et "petit"
- Utiliser des services pour factoriser du code et extraire le code métier des contrôleurs
- **Faites des tests unitaires** : jasmine + karma = :)

---

## Angular.js

#### Best Practices

- Evitez les composants trop complexe : principe de responsabilité unique
- Performances : évitez les pages trop lourdes

---

<img src="images/questions.jpg">

---

## Angular.js

#### Exercice #2

- Récupérer le zip du tp
- Lancer le serveur en lançant la commande `node server/app.js`
- Enregistrer son login
- Valider avec moi l'exercice
- Récupérer le mot de passe de validation !

---

## Angular.js

#### Exercice #2

1. Récupérer les tweets en faisant un GET sur `/tweets`
2. Brancher le post d'un tweet
3. Ecrire un filtre pour afficher le login précédé du caractère `@`
4. Capter l'événement 'tweet:new' pour afficher les tweets en temps réel
5. Refactorer l'affichage du tweet en utilisant une directive
