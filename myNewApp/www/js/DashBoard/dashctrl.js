/**
 * Created by Sudheer Kumar on 01-Nov-14.
 */
angular.module('dash.module', [])
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
        }
    })
