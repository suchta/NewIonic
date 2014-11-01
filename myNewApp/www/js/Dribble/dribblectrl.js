/**
 * Created by Sudheer Kumar on 01-Nov-14.
 */
angular.module('dribble.module', [])
    .controller('DribbleCtrl', function($scope, Friends, $http, $q) {
        console.log(' friends ctrl loaded ')
        $scope.doRefresh = function(){
            $scope.init();
        }
        $scope.init = function(){
            $scope.getImages()
                .then(function(res){
                    //success
                    console.log('Images: ', res)
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.imageList = res.shots;
                },function(status){
                    //error
                    console.log('Error: ', status)
                    $scope.pageError = status;
                })
        }

        $scope.getImages = function(){
            var defer = $q.defer();

            $http.jsonp('http://api.dribbble.com/shots/popular?callback=JSON_CALLBACK')
                .success(function(res){
                    defer.resolve(res)
                })
                .error(function(status, err){
                    defer.reject(status)
                })

            return defer.promise;

        }
        $scope.init();

    })