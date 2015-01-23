(function() {
  'use strict';

  angular
    .module('PlAuth')
    .service('HttpAuth', HttpAuth);

  HttpAuth.$inject = ['restmod', 'inflector', 'AuthSrv'];

  function HttpAuth(restmod, inflector, AuthSrv) {

    return restmod.mixin(function() {
      // Adds api key to every request
      this.on('before-request', function(request) {
        if(AuthSrv.isLogged())
          request.headers = angular.extend(request.headers || {}, { 'Authorization' : AuthSrv.getAuthorizationHeader() });
      });
    });

  };

})();
