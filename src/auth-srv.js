(function() {
  'use strict';

  angular
    .module('PlAuth')
    .service('AuthSrv', AuthSrv);

  AuthSrv.$inject = ['LocalDataSrv'];

  function AuthSrv(LocalDataSrv) {
    var service = {
      store: store,
      isLogged: isLogged,
      isRegistered: isRegistered,
      getAuthorizationHeader: getAuthorizationHeader
    };

    return service;

    ////////////

    function isLogged() {
      return (!!LocalDataSrv.getKey('uid') && !!LocalDataSrv.getKey('token'));
    }

    function isRegistered() {
      return !!LocalDataSrv.getKey('uid');
    }

    function getAuthorizationHeader() {
      return 'token=' + LocalDataSrv.getKey('token') + ' uid=' + LocalDataSrv.getKey('uid');
    }

    function store(_authData) {
      if (!angular.isObject(_authData)) {
        throw new Error('an object was expected to store');
      }

      if (_authData.token) {
        if (!_authData.uid) {
          throw new Error('A uid is need ');
        }
        LocalDataSrv.setKey('token', _authData.token);
      }

      if (_authData.uid) {
        LocalDataSrv.setKey('uid', _authData.uid);
      }
    }
  }

})();
