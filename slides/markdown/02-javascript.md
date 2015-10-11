## JavaScript

#### Introduction

- Créé en 1995 par Brendan Eich pour Netscape
- Standardisé : ECMAScript
  - ECMAScript 3 : 1999
  - **ECMAScript 5** : 2009
  - ECMAScript 6 : 2015 !
- ECMAScript 5 est la version la mieux implémentée dans les navigateurs (Chrome, Firefox, Safari, IE10)
- ECMAScript 6 : besoin d'une phase de build (<strong>babel</strong>, traceur)

---

## JavaScript

#### Introduction

- Langage de script
- S'exécute dans une VM (Virtual Machine)
  - Browser: V8 (Chrome) ; SpiderMonkey (Firefox) ; JavaScriptCore (Safari) etc.
  - Serveur: V8 (Node.JS) ; Rhino / Nashorn (Java) etc.
- La mémoire est gérée grâce à un **garbage collector**
- Langage **dynamique**
- Langage **faiblement typé**
- Langage **orienté prototype**

---

## JavaScript

#### Debug</h5>

- Le plus basique: console.log
- Permet de laisser des traces sur les appels
- Certains navigateurs proposent des features en plus :
  - `console.table()`
  - `console.time()`
  - `console.memory()`
  - etc.

```javascript
// Fonction nommée "foo"
function foo() {
  console.log('hello world', 'hello bar');
}
```

---

## JavaScript

#### Debug

- **Chrome Dev Tools** : le meilleur !
- Firebug / Firefox Developer Edition
- Safari Web Inspector
- Opera DragonFly
- IE : présent depuis IE9

---

## JavaScript

#### Debug

<img src="images/dev-tools-1.png">

---

## JavaScript

#### Debug

<img src="images/dev-tools-2.png">

---

## JavaScript

#### Debug

<img src="images/dev-tools-3.png">

---

## JavaScript

#### Le langage

<img src="images/javascript-the-good-parts-the-definitive-guide.jpg">

---

## JavaScript

#### Un langage faiblement typé

- Le mot clé `var` permet de déclarer une variable
- Peu de type: `number`, `string`, `boolean`, `function`, `null`
- Une variable sans aucune valeur est `undefined`
- Les objets et les tableaux permettent de les composer
- Une variable n'a pas de type fixe (typage dynamique)

---

## JavaScript

#### Un langage faiblement typé

```javascript
var foo;
console.log(foo); // 'undefined'
console.log(typeof foo); // 'undefined'

foo = 5;
console.log(typeof foo); // 'number'

foo = 'string';
console.log(typeof foo); // 'string'

foo = true;
console.log(typeof foo); // 'boolean'
```

---

## JavaScript

#### Les collections

- Une seule structure de données: les tableaux
- Suite ordonnée d'éléments, chaque élément étant accessible par son index
- La propriété `length` donne la taille du tableau

```javascript
var foo = [1, 2, 3];
console.log(foo); // [1, 2, 3]

foo.push('string', true);
console.log(foo); // [1, 2, 3, 'string', true]

console.log(foo.length); // 5
console.log(foo[4]); // true
console.log(foo[5]); // undefined
```

---

## JavaScript

#### Les objets

- Un objet est créé via une syntaxe simple : `var o = {};`
- Un objet est dynamique: on peut lui rajouter un attribut au runtime
- Ni plus, ni moins qu'une map clé valeur

---

## JavaScript

#### Les objets

```javascript
var foo = {};
console.log(typeof foo); // 'object'
console.log(foo); // {}

foo = {
  id: 1
};

console.log(foo); // {id: 1}

foo.name = 'Mickael';
console.log(foo); // {id: 1, name: 'Mickael'}

foo.skills = ['Js', 'Java'];
console.log(foo.skills); // ['Js', 'Java']
console.log(foo['skills']); // ['Js', 'Java']
```

---

## JavaScript

#### Spécificités

- En JavaScript, on distingue égalité et égalité stricte
  - L'opérateur `==` (négation : `!=`) permet de comparer deux objets indépendamment du type
  - L'opérateur `===` (négation : `!==`) permet de comparer deux objets en prenant en compte les types
- Pour le cas des objets et des tableaux, c'est toujours une comparaison d'instance qui est faite !

---

## JavaScript

#### Spécificités

```javascript
var foo = 1;
var bar = '1';
console.log(foo == bar);  // true
console.log(foo === bar); // false

console.log([1, 2, 3] == [1, 2, 3]);  // false
console.log([1, 2, 3] === [1, 2, 3]); // false
```

---

## JavaScript

#### Spécificités

Question : qu'affiche ce code ?

```javascript
console.log('' == '0'); // ???
console.log('' == 0);   // ???
console.log('0' == 0);  // ???
```

---

## JavaScript

#### Spécificités

WTF ???

```javascript
console.log('' == '0'); // false
console.log('' == 0);   // true
console.log('0' == 0);  // true
```

---

## JavaScript

#### Spécificités

http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.1

<img src="images/equality.png" width="80%">

---

## JavaScript

#### Spécificités

- Pour simplifier : JavaScript essaye de rapprocher les variables vers deux types identiques
- Cela peut amener à quelques spécificités un peu "étranges"
  - Opérateur non transitif
  - Opérateur non réflexif
- Simplifiez-vous la vie : **utilisez toujours l'égalité stricte !**

---

## JavaScript

#### Un langage orienté fonctionnel

- En javascript, les fonctions sont partout
- Une fonction est un type comme un autre (objet de type `function`)
- Une fonction peut être nommée ou anonyme

```javascript
// Fonction nommée "foo"
function foo() {
  console.log('hello world');
}

foo();

// Fonction anonyme qu'on affecte à une variable "foo"
var foo = function () {
  console.log('hello world');
};

foo();
```

---

## JavaScript

#### Un langage orienté fonctionnel

- Une fonction a un **nombre de paramètre variable**
- Le mot clé `arguments` au sein d'une fonction permet de récupérer la liste des paramètres
- Une fonction peut ne rien retourner

```javascript
// Fonction nommée "foo"
function foo(param1, param2) {
  console.log(param1, param2, 'arguments = ', arguments);

  if (param1 === 1) {
    return true;
  }
}

foo();         // undefined, undefinfed, arguments = []
foo(1);        // 1, undefinfed, arguments = [1]
foo(1, 2);     // 1, 2, arguments = [1, 2]
foo(1, 2, 3);  // 1, 2, arguments = [1, 2, 3]
```

---

## JavaScript

#### Un langage orienté fonctionnel

- Une fonction peut être donnée en paramètre à une autre fonction
- Une fonction peut retourner une autre fonction
- En langage fonctionnel, de telles fonctions sont appelées **fonctions d'ordre supérieur**

---

## JavaScript

#### Un langage orienté fonctionnel

```javascript
// Fonction nommée "foo": cette fonction prend en paramètre
// une fonction à exécuter
function foo(func) {
  func();
}

foo(function () {
  console.log('hello world');
});

function myFunc() {
  console.log('hello world');
}

foo(myFunc);
```

---

## JavaScript

#### Un langage orienté fonctionnel

```javascript
// Fonction nommée "foo"
// Cette fonction renvoie une fonction permettant de "logguer" le
// contenu d'un tableau lorsqu'elle est exécutée
function add(op1) {
  return function (op2) {
    return op1 + op2;
  };
}

var r1 = add(5)(10);
console.log(r1); // 15

var addFn = add(5);
var r2 = addFn(10);
console.log(r2); // 15
```

---

## JavaScript

#### Un langage orienté fonctionnel

Une fonction peut également être affectée à un **attribut d'un objet**

```javascript
// On déclare un objet avec une fonction comme attribut
var batman = {
  name: 'Batman',
  speak: function () {
    console.log('I am Batman');
  }
};

console.log(batman); // {name: "Batman", speak: function}
console.log(typeof batman.speak); // 'function'

// Exécution de la fonction
batman.speak(); // 'I am Batman'
```

---

## JavaScript

#### Un langage orienté fonctionnel

- Les fonctions sont le **coeur** du langage
- Avec Angular.js, on manipule des fonctions **tout le temps** :
  - Création d'un contrôleur
  - Création d'un service
  - Etc.

---

## JavaScript

#### Un langage orienté fonctionnel

Comme beaucoup de langages fonctionnels, ECMAScript 5 rajoute des fonctions de manipulation de listes : `forEach`, `map`, `some`, `every`, `reduce` etc.

```javascript
// Exécute une fonction sur chaque élément d'un tableau
[1, 2, 3].forEach(function (current, idx) {
  console.log(current, idx);
});

// Applique une transformation à chaque élément et retourne
// un nouveau tableau contenant tous les résultas
// Ex: Multiplication par deux de tous les éléments
var newArray = [1, 2, 3].map(function (current) {
  return current * 2;
});

console.log(newArray); // 2, 4, 6
```

---

## JavaScript

#### Un langage orienté fonctionnel

```javascript
// Vérifie une condition sur chaque élément d'un tableau
[2, 4, 6].every(function (current) {
  return current % 2 === 0;
});

// Vérifie qu'une condition est vérifié sur au moins un élément
[1, 2, 3].some(function (current) {
  return current % 2 === 0;
});

// Réduit le contenu du tableau à une valeur
var reduceValue = [1, 2, 3].reduce(function (memo, current) {
  return memo + current;
}, 0);

console.log(reduceValue); // 6
```

---

## JavaScript

#### Un langage orienté prototype

- Le langage JavaScript n'est pas un langage orienté objet
- Mais, cela ne signifie pas qu'on ne peut utiliser des objets !
- Cela nécessite la manipulation de prototype
  - Compliqué, surtout quand on débute</li>
  - ECMAScript 6 vient masquer cette complexité grâce à l'introduction des classes

---

## JavaScript

#### Un langage orienté prototype

- Chaque objet dispose d'un `prototype`
- Un prototype n'est rien de plus qu'une liste de propriétés (a.k.a un objet) **partagé** par toutes les instances d'un même type

```javascript
var Hero = function (name) {
  this.name = name;
};

Hero.prototype = {
  speak: function () {
    console.log('I am ' + this.name);
  }
};

var batman = new Hero('Batman');     // I am Batman
var superman = new Hero('Superman'); // I am Superman
console.log(batman.speak === superman.speak); // true
```

---

## JavaScript

#### ECMAScript 6

- Introduit un ensemble de features visant à simplifier ECMAScript 5
- Beaucoup de sucre syntaxique au dessus d'ES5
  - Classes
  - Arrow Functions
  - Mots clés `let` et `const`
  - Etc.
- Mais pas que : modules, iterators, generators, etc.

---

## JavaScript

#### ECMAScript 6

Pourquoi apprendre ES6 ?

- Nouveau standard : **c'est l'avenir**
- Langage poussé sur les prochaines versions des librairies les plus populaires :
  - Angular 2
  - React
  - Twitter Bootstrap

---

## JavaScript

#### ECMAScript 6

Les classes

```javascript
class Hero extends Human {
  constructor(name) {
    super();
    this.name = name;
  }

  speak() {
    console.log('I am ' + this.name);
  }
}

var batman = new Hero('Batman');
console.log(batman.speak()); // I am Batman
```

---

## JavaScript

#### ECMAScript 6

Arrow Functions : raccourci pour déclarer des fonctions anonymes

```javascript
let array = [1, 2, 3];

array.forEach(x => console.log(x));
array.map(x => x + 1);
```

---

<img src="images/questions.jpg">
