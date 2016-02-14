// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])
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

app.controller('MainCtrl',function($scope,RequestsService){

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

  $scope.sendEmail=function(){
    alert("개발중");
  }

  $scope.sendEmail = function() {

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
});
