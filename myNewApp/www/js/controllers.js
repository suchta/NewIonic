angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Camera, Friends) {
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
            /*
             navigator.camera.getPicture(function(imageURI) {
             console.log(imageURI);
             }, function(err) {
             }, {
             quality: 50,
             destinationType: Camera.DestinationType.DATA_URL
             });
             */
        }
})

.controller('FriendsCtrl', function($scope, Friends) {
        console.log(' friends ctrl loaded ')
    $scope.friends = Friends.all();

})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends, $ionicLoading) {
  $scope.friend = Friends.get($stateParams.friendId);
})



.controller('AccountCtrl', function($scope, $ionicLoading) {

    console.log('loading account ctrl')
        $scope.long = '';
        $scope.lat = '...loading location';
        navigator.geolocation.getCurrentPosition(
            function(pos){
                console.log('we have current position' + pos.coords.latitude)
                $scope.lat = pos.coords.latitude;
                $scope.long = pos.coords.longitude;
                $scope.$apply();
            },
            function(error){
                console.log('did not get pos')
            })

});
