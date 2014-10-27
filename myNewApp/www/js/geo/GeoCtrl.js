.controller('AccountCtrl', function($scope, $ionicLoading) {

    $scope.init = function(){

    }
    console.log('loading account ctrl')
    $scope.long = '';
    $scope.lat = '...loading location';
    navigator.geolocation.getCurrentPosition(

        function(pos){
            /*console.log('we have current position' + pos.coords.latitude)*/
            $scope.lat = Math.round(pos.coords.latitude * 1000)/1000;
            $scope.long = Math.round(pos.coords.longitude * 1000)/1000;
            $scope.$apply();
        },
        function(error){
            console.log('did not get pos')
        })

});