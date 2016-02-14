// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    pushNotification = window.plugins.pushNotification;

    pushNotification.register(
      onNotification,
      errorHandler,
      {
        'badge': 'true',
        'sound': 'true',
        'alert': 'true',
        'ecb': 'onNotification',
        'senderID': '610546292889',
      }
    );
  });
});

window.regIdStr="init";

window.onNotification = function(e){
      switch(e.event){
        case 'registered':
          if(e.regid.length > 0){
            regIdStr = e.regid;
//            RequestsService.register(e.regid);
//            .then(function(response){
//              alert('registered!');
//            });
          }
        break;

        case 'message':
          alert('msg received: ' + e.message);
          /*
            {
                "message": "Hello this is a push notification",
                "payload": {
                    "message": "Hello this is a push notification",
                    "sound": "notification",
                    "title": "New Message",
                    "from": "813xxxxxxx",
                    "collapse_key": "do_not_collapse",
                    "foreground": true,
                    "event": "message"
                }
            }
          */
        break;

        case 'error':
          alert('error occured');
        break;
      }
};

window.errorHandler = function(error){
  alert('an error occured');
};

app.controller('MainCtrl',function($scope,$cordovaCamera , RequestsService){

  $scope.registPush = function(){
    RequestsService.register(regIdStr).then(function(response){
      alert('등록되었습니다.');
    });
  }

  $scope.cancelPush = function(){
    RequestsService.cancel(regIdStr).then(function(response){
      alert('취소되었습니다.');
    });
  }

  $scope.shewRegIdStr = function(){
    alert(regIdStr);
  }

  $scope.sendEmailRegistId = function() {

      if (null != regIdStr) {
          window.plugin.email.open({
              to:      null,
              cc:      null,
              bcc:     null,
              subject: 'regId 전송',
              body:    regIdStr
          }, function () {
              console.log('email view dismissed');
          },
          this);
      }
    }


  $scope.takePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          // An error occured. Show a message to the user
      });
  }

  $scope.choosePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;

//          onImageSuccess(imageData);
//
//          function onImageSuccess(fileURI) {
//              createFileEntry(fileURI);
//          }
//
//          function createFileEntry(fileURI) {
//              window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
//          }
//
//          // 5
//          function copyFile(fileEntry) {
//              var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
//              var newName = makeid() + name;
//
//              window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
//                  fileEntry.copyTo(
//                      fileSystem2,
//                      newName,
//                      onCopySuccess,
//                      fail
//                  );
//              },
//              fail);
//          }
//
//          // 6
//          function onCopySuccess(entry) {
//              $scope.$apply(function () {
//                  $scope.images.push(entry.nativeURL);
//              });
//          }
//
//          function fail(error) {
//              console.log("fail: " + error.code);
//          }
//
//          function makeid() {
//              var text = "";
//              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//
//              for (var i=0; i < 5; i++) {
//                  text += possible.charAt(Math.floor(Math.random() * possible.length));
//              }
//              return text;
//          }


      }, function (err) {
          // An error occured. Show a message to the user
      });
  }

//  $scope.urlForImage = function(imageName) {
//      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
//      var trueOrigin = cordova.file.dataDirectory + name;
//      return trueOrigin;
//  }

//  $scope.sendEmailImg = function() {
//
//    // 1
//            var bodyText = "<h2>Look at this images!</h2>";
//            if (null != $scope.images) {
//                var images = [];
//                var savedImages = $scope.images;
//                for (var i = 0; i < savedImages.length; i++) {
//                    // 2
//                    images.push("" + $scope.urlForImage(savedImages[i]));
//                    // 3
//                    images[i] = images[i].replace('file://', '');
//                }
//
//                // 4
//                window.plugin.email.open({
//                    to:          ["saimon@devdactic.com"], // email addresses for TO field
//                    cc:          Array, // email addresses for CC field
//                    bcc:         Array, // email addresses for BCC field
//                    attachments: images, // file paths or base64 data streams
//                    subject:    "Just some images", // subject of the email
//                    body:       bodyText, // email body (for HTML, set isHtml to true)
//                    isHtml:    true, // indicats if the body is HTML or plain text
//                }, function () {
//                    console.log('email view dismissed');
//                },
//                this);
//            }
//  }

});
