angular.module('tweetInsa', [])
  .run(['$rootScope', function ($rootScope) {
    var socket = io();

    socket.on('tweet:new', function(tweet) {
      $rootScope.$apply(function () {
        $rootScope.$broadcast('tweet:new', tweet);
      });
    });
  }])

  // TODO #3: Ecrire un filtre pour afficher le login précédé du caractère '@'
  //          Remplacer également le html pour utiliser le filtre
  .filter('tweetLogin', function () {
    return function (login) {
       return '@' + login;
    };
  })

  // TODO #5: Ecrire la directive pour afficher un tweet
  .directive('tweet', function() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      template: '<div><span class="label label-primary">{{ data.login | tweetLogin }}</span><span>{{ data.message }}</span></div>'
    };
  })

  .controller('tweetsController', ['$scope', '$http', function ($scope, $http) {
    $scope.tweets = [];
    $http.get('/tweets')
      .success(function (tweets) {
        $scope.tweets = tweets;
      });

    // TODO #1 Récupérer les tweets en faisant un GET sur "/tweets"
    //         Remplacer également le html pour afficher le contenu du tweet

    $scope.submit = function () {
      // TODO #2 Brancher le post d'un tweet en faisant un POST sur /tweets
      //         Modifier également le html pour binder les saisies utilisateurs
      var tweet = {
        login: $scope.foo,
        message: $scope.bar
      };

      $http.post('/tweets', tweet)
        .success(function () {
          $scope.tweets.push(tweet);
        });
    };

    // TODO #4 Capter l'événement 'tweet:new' pour afficher les tweets en temps réel
    $scope.$on('tweet:new', function (event, tweet) {
      $scope.tweets.push(tweet);
    });
  }]);
