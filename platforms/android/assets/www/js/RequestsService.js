(function(){

    angular.module('starter')
    .service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

    function RequestsService($http, $q, $ionicLoading){

        var base_url = 'http://localhost:8082/b40';

        function register(device_token){

            var deferred = $q.defer();
            $ionicLoading.show();

            alert("원본 :"+device_token +"대문자:"+device_token.toUpperCase());

            $http.post(base_url + '/pushMessage', {'device_token': device_token})
                .success(function(response){

                    $ionicLoading.hide();
                    deferred.resolve(response);

                })
                .error(function(data){
                    deferred.reject();
                });


            return deferred.promise;

        };


        return {
            register: register
        };
    }
})();
