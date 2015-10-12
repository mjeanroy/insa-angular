// Build your own angular !

// Scope
//  => $$watchers
//  => $watch
//  => $digest
//  => $apply

var Scope = function () {

  this.$$watchers = [];
  this.$$events = [];

  this.$watch = function(varName, listenerFn) {
    var watcherFn;

    if (typeof varName === 'function') {
      watcherFn = varName;
    } else {
      watcherFn = function() {
        return this[varName];
      };
    }

    this.$$watchers.push({
      watcherFn: watcherFn.bind(this),
      listenerFn: listenerFn
    });
  };

  this.$apply = function (func) {
    // TODO #1
    // Implémenter la fonction $apply
    // Le code de cette fonction est très simple et effectue uniquement
    // un appel à la fonction $digest
    // Voir les slides pour plus d'infos.

    try {
      func();
    } finally {
      this.$digest();
    }
  };

  this.$digest = function () {
    // TODO #2
    // Implémenter la fonction $digest
    // Le code de cette fonction est un petit peu plus compliqué et nécessite
    // d'itérer sur tous les watchers et de vérifier si une donnée a changé.
    // Attention à la première vérification.
    // Voir les slides pour plus d'infos.

    this.$$watchers.forEach(function(watcher) {
      var oldValue = watcher.last;
      var newValue = watcher.watcherFn();

      watcher.last = newValue;

      if (oldValue !== newValue) {
        watcher.listenerFn(newValue, oldValue);
      }
    });
  };
};

// Compiler & Directives
//  => $compile
//  => $$directives

var $$directives = {
  'ng-bind': function (scope, element, attributes) {
    scope.$watch(attributes['ng-bind'].value, function (newValue) {
      // TODO #3
      // Implémenter le code de la fonction.
      // Cette fonction doit mettre à jour le contenu de l'élément du DOM.
      // Pour cela, on peut écrire sur l'attribut innerHTML
      // Par exemple:
      //   element.innerHTML = 'foo';
      // -> Ecrit la valeur "foo" dans le DOM

      element.innerHTML = newValue || '';
    });
  },

  'ng-model': function (scope, element, attributes) {
    scope.$watch(attributes['ng-model'].value, function (newValue) {
      element.value = newValue;
    });

    element.addEventListener('keyup', function () {
      var name = attributes['ng-model'].value;
      scope.$apply(function () {
        // TODO #4
        // Implémenter le code de la fonction.
        // Cette fonction doit mettre à jour une variable dans l'objet scope.
        // Le nom de la variable sur le scope est donné par la variable "name"

        scope[name] = element.value;
      });
    });
  }
};

// Ce code permet de déclencher les différentes directives du fichier html.
// Ce code n'est pas à modifier dans le cadre de l'exercice.
// Voici son fonctionnement :
// - Les différentes balises HTML sont analysés afin de vérifier si l'une
//   d'elle est associée à une directive.
// - Si c'est le cas, la fonction associée à la directive est déclenchée.
// - C'est une fonction récursive qui sera appelée sur tous les éléments
//   de l'arbre du DOM.
var $compile = function (scope, element) {
  for (var i = 0, s1 = element.children.length; i < s1; i++) {
    $compile(scope, element.children[i]);
  }

  for (var k = 0, s2 = element.attributes.length; k < s2; k++) {
    var attr = element.attributes[k].name;
    var directive = $$directives[attr];
    if (directive) {
      directive(scope, element, element.attributes);
    }
  }
};


// Tests & logs

var $rootScope = new Scope();
$compile($rootScope, document.body);
