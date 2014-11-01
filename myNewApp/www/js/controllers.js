angular.module('starter.controllers', [])

/*.controller('DashCtrl', function($scope, Camera, Friends) {
        console.log('dash ctrl')
        $scope.friends = Friends.all();
        $scope.getPhoto = function() {
            console.log('Getting camera');
            Camera.getPicture().then(function(imageURI) {
                console.log(imageURI);
                $scope.lastPhoto = imageURI;
            }, function(err) {
                console.err(err);
            }, {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: true
            });
        }
})*/

//.controller('FriendsCtrl', function($scope, Friends, $http, $q) {
//    console.log(' friends ctrl loaded ')
//        $scope.doRefresh = function(){
//            $scope.init();
//        }
//        $scope.init = function(){
//            $scope.getImages()
//                .then(function(res){
//                    //success
//                    console.log('Images: ', res)
//                    $scope.$broadcast('scroll.refreshComplete');
//                    $scope.imageList = res.shots;
//                },function(status){
//                    //error
//                    console.log('Error: ', status)
//                    $scope.pageError = status;
//                })
//        }
//
//        $scope.getImages = function(){
//            var defer = $q.defer();
//
//            $http.jsonp('http://api.dribbble.com/shots/popular?callback=JSON_CALLBACK')
//                .success(function(res){
//                    defer.resolve(res)
//                })
//                .error(function(status, err){
//                    defer.reject(status)
//                })
//
//            return defer.promise;
//
//        }
//        $scope.init();
//
//})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends, $ionicLoading) {
  $scope.friend = Friends.get($stateParams.friendId);



})



/*.controller('MapCtrl', function($scope, $ionicLoading) {

        $scope.init = function(){

        }
    console.log('loading account ctrl')
        $scope.long = '';
        $scope.lat = '...loading location';
        navigator.geolocation.getCurrentPosition(

            function(pos){*/
                /*console.log('we have current position' + pos.coords.latitude)*/
                /*$scope.lat = Math.round(pos.coords.latitude * 1000)/1000;
                $scope.long = Math.round(pos.coords.longitude * 1000)/1000;
                $scope.$apply();
            },
            function(error){
                console.log('did not get pos')
            })

});*/
