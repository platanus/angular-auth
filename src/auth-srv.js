(function() {
  'use strict';

  angular
    .module('PlAuth')
    .service('AuthSrv', AuthSrv);

  AuthSrv.$inject = ['LocalDataSrv', 'AuthConfig'];

  function AuthSrv(LocalDataSrv, AuthConfig) {
    var service = {
      store: store,
      clear: clear,
      isLogged: isLogged,
      isRegistered: isRegistered,
      getAuthorizationHeader: getAuthorizationHeader
    };

    var tokenKey = AuthConfig.getTokenKey();
    var uidKey = AuthConfig.getUidKey();

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

      if (_authData[tokenKey]) {
        if (!_authData[uidKey]) {
          throw new Error('A uid is need');
        }
        LocalDataSrv.setKey('token', _authData[tokenKey]);
      }

      if (_authData[uidKey]) {
        LocalDataSrv.setKey('uid', _authData[uidKey]);
      }
    }

    function clear() {
      LocalDataSrv.eraseKey('uid');
      LocalDataSrv.eraseKey('token');
    }
  }

})();
