angular.module('starter').service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

function RequestsService($http, $q, $ionicLoading){
    var base_url = 'http://49.172.171.141:8082/b40';
//    var base_url = 'http://localhost:8082/b40';

    function register(device_token){
        var deferred = $q.defer();
        $ionicLoading.show();

        $http.get(base_url + '/angularjs/pushMessage/regist', {params:{"device_token":device_token}})
            .success(function(response){
                $ionicLoading.hide();
                deferred.resolve(response);
            })
            .error(function(data){
                deferred.reject();
            });

        return deferred.promise;
    };

    function cancel(device_token){
      var deferred = $q.defer();
      $ionicLoading.show();

      $http.get(base_url + '/angularjs/pushMessage/cancel', {params:{"device_token":device_token}})
        .success(function(response){
            $ionicLoading.hide();
            deferred.resolve(response);
        })
        .error(function(data){
            deferred.reject();
        });
      return deferred.promise;
    }

    return {
        register: register,
        cancel:cancel
    };
}
