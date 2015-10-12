## Angular.js

#### by Google

- Angular.js est un framework javascript "full stack"
- Développé par Google (Miško Hevery, Igor Minar, Vojta Jina, etc.)
- Version 1.5
- Open source: https://github.com/angular/angular.js

---

## Angular.js

#### Introduction

- Data Binding
- Single Page Application (SPA)
- REST
- Dependency Injection (DI)
- MVC

---

## Angular.js

#### Introduction

DEMO

---

## Angular.js

#### Fonctionnement

- Les données à afficher à l'écran sont définies sur un objet `$scope`.
- Lors d'un événement, la phase de digest va comparer l'état des variables (dirty checking).
- Les watchers permettent d'appliquer les modifications dans le DOM.

---

## Angular.js

#### Fonctionnement

Les watchers

- Simple fonctions exécutées pendant la phase de digest.
- Permettent de déclencher un traitement à la modification d'une variable.
- C'est le coeur d'angular.
- Permet d'implémenter le data-binding.

```javascript
$scope.$watch('foo', function(newValue, oldValue) {
  element.innerHTML = newValue;
});
```

---

## Angular.js

#### Fonctionnement

- Les watchers sont exécutées lors de la phase de "digest"

<img class="icon" style="border: none; margin: 20px 10px;" src="images/concepts-runtime.png">

---

## Angular.js

#### Fonctionnement

Le code de la fonction $apply est en fait très simple :

```javascript
$scope.$apply = function(fn) {
  try {
    fn();
  } finally {
    this.$digest();
  }
};
```

---

## Angular.js

#### Fonctionnement

- La fonction `$apply` est, au final, très simple :
  - Exécution d'une fonction.
  - Déclenchement de la phase de digest.
- La fonction donnée en paramètre est généralement fournie par les directives :
  - Doit rester simple.
  - Ex: Mise à jour de variables dans le scope.

---

## Angular.js

#### Fonctionnement

Exemple d'appel : mise à jour d'une variable sur un événement du DOM

```javascript
element.on('keyup', function(e) {
  $scope.$apply(function() {
    $scope.name = e.target.value;
  });
});
```

---

## Angular.js

#### Fonctionnement

- La fonction `digest` consiste à :
  - Parcourir les différents watchers.
  - Exécuter la fonction `listener` en cas de changement.
- C'est cette fonction qui implémente la "magie" d'Angular.

---

## Angular.js

#### Fonctionnement

Zoom sur la fonction digest :

```javascript
$scope.$digest = function() {
  this.$$watchers.forEach(function(watcher) {
    var oldValue = watcher.last;
    var newValue = watcher.watcherFn();

    watcher.last = newValue;

    if (oldValue !== newValue) {
      watcher.listenerFn();
    }
  });
};
```

---

## Angular.js

#### Fonctionnement

- L'ajout de watchers se fait via la fonction `$watch` :
  - Le premier paramètre est le nom de la variable à observer.
  - Le deuxième paramètre est la fonction listener à exécuter lors d'un changement.
- La fonction listener va permettre de déclencher du traitement à chaque mise à jour : mise à jour du DOM.
- A inspirer l'api `Object.observe` qui sera disponible avec ECMAScript 7.

---

## Angular.js

#### Fonctionnement

- Son implémentation est également assez simple : ajout du watchers dans une collection !

```javascript
$scope.$$watchers = [];

$scope.$watch = function(getter, listener) {
  this.$$watchers.push({
    watcherFn: getter,
    listenerFn: listener
  });
};
```

---

## Angular.js

#### Fonctionnement

Combinées ensemble, ces trois fonctions sont le coeur d'Angular.js

```javascript
element.addEventListener('keyup', function(e) {
  $scope.$apply(function() {
    $scope.foo = e.target.value;
  });
});
```

```javascript
$scope.$watch('foo', function(newValue) {
  element.innerHTML = newValue;
});
```

---

## Angular.js

#### Fonctionnement

- C'est l'utilisation conjointe de ces trois fonctions qui permettent la "magie" d'Angular.js
- *C'est ce que nous allons implémenter dans l'exercice #1*

---

<img src="images/questions.jpg">

---

## Angular.js

#### Exercice #1

- Implémenter la fonction `$apply` (todo #1).
- Implémenter la fonction `$digest` (todo #2).
- Implémenter le watcher de la directive `ng-bind` (todo #3).
- Implémenter l'appel à `$apply` de la directive `ng-model` (todo #4).
