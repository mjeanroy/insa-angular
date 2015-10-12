// Simple Client

angular.module('tweetInsa', [])
  .run(['$rootScope', function ($rootScope) {
    var socket = io();
    socket.on('tweet:new', function(tweet) {
      $rootScope.$apply(function () {
        $rootScope.$broadcast('tweet:new', tweet);
      });
    });
  }])

  // TODO #4: Ecrire un filtre pour afficher le login précédé du caractère '@'
  //          Remplacer également le html pour utiliser le filtre

  // TODO #6: Ecrire la directive pour afficher un tweet

  .controller('TweetsController', ['$scope', '$http', function ($scope, $http) {
    var vm = this;

    // Store tweets to display
    vm.tweets = [];

    // TODO #2 Récupérer les tweets en faisant un GET sur "/tweets"
    //         Remplacer également le html pour afficher le contenu du tweet

    vm.submit = function () {
      // TODO #3 Brancher le post d'un tweet en faisant un POST sur /tweets
      //         Modifier également le html pour binder les saisies utilisateurs
    };

    // TODO #5 Capter l'événement 'tweet:new' pour afficher les tweets en temps réel
  }]);
