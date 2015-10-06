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
    this.$$watchers.push({
      watcherFn: function () {
        return this[varName];
      }.bind(this),
      listenerFn: listenerFn
    });
  };

  this.$digest = function () {
    // TODO #2

    this.$$watchers.forEach(function (watcher) {
      var newValue = watcher.watcherFn();
      var oldValue = watcher.last;
      watcher.last = newValue;
      if (newValue !== oldValue) {
        watcher.listenerFn(newValue, oldValue);
      }
    });
  };

  this.$apply = function (func) {
    // TODO #1

    try {
      func();
    } finally {
      this.$digest();
    }
  };

  this.$on = function (eventName, func) {
    this.$$events.push({
      eventName: eventName,
      listenerFn: func
    });
  };

  this.$broadcast = function (eventName) {
    var params = [].slice.call(arguments, 1);
    this.$$events.forEach(function (event) {
      var args = [eventName].concat(params);
      event.listenerFn.apply(null, params);
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
      element.innerHTML = newValue;
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
  Array.prototype.forEach.call(element.children, function (children) {
    $compile(scope, children);
  });

  Array.prototype.forEach.call(element.attributes, function (attribute) {
    console.log(attribute);
    var attr = attribute.name;
    var directive = $$directives[attr];
    if (directive) {
      directive(scope, element, element.attributes);
    }
  });
};


// Tests & logs

var $rootScope = new Scope();

$rootScope.$watch('name', function (newValue, oldValue) {
  console.log(newValue);
  console.log('first watch');
});

$compile($rootScope, document.body);
$rootScope.$apply(function () {
  $rootScope.name = 'world';
});

$rootScope.$on('foo', function (event, p1) {
  console.log('hello', event);
});

$rootScope.$broadcast('foo', 1);
