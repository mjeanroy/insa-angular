// Build your own angular !

// Scope & Digest

var Scope = function () {

  this.$$watchers = [];

  this.$watch = function (watcherFn, listenerFn) {
    this.$$watchers.push({
      watcherFn: function () {
        return this[watcherFn];
      }.bind(this),
      listenerFn: listenerFn
    });
  };

  this.$digest = function () {
    this.$$watchers.forEach(function (watcher) {
      var newValue = watcher.watcherFn();
      var oldValue = watcher.last;
      if (newValue !== oldValue) {
        watcher.listenerFn(newValue, oldValue);
      }
    });
  };

  this.$apply = function (func) {
    try {
      if (func) func();
    }
    finally {
      this.$digest();
    }
  };
};

var $$directives = {
  'ng-bind': function (scope, element, attributes) {
    scope.$watch(attributes['ng-bind'].value, function (newValue) {
      element.innerHTML = newValue;
    });
  },

  'ng-model': function (scope, element, attributes) {
    scope.$watch(attributes['ng-model'].value, function (newValue) {
      element.value = newValue;
    });

    element.addEventListener('keyup', function () {
      scope.$apply(function () {
        scope[attributes['ng-model'].value] = element.value;
      });
    });
  }
};

var $compile = function (element, scope) {
  [].forEach.call(element.children, function (child) {
    $compile(child, scope);
  });

  [].forEach.call(element.attributes, function (attribute) {
    var directive = $$directives[attribute.name];
    if (directive) {
      directive(scope, element, element.attributes);
    }
  });
};

var $rootScope = new Scope();
$rootScope.name = 'hello';

$compile(document.body, $rootScope);
$rootScope.$digest();
