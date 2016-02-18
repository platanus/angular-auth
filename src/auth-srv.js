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
      getAuthorizationHeaders: getAuthorizationHeaders
    };

    var tokenHeaderName = AuthConfig.getTokenHeaderName();
    var uidHeaderName = AuthConfig.getUidHeaderName();
    var tokenKey = AuthConfig.getTokenKey();
    var uidKey = AuthConfig.getUidKey();
    var uidRequired = AuthConfig.getUidRequired();

    return service;

    ////////////

    function isLogged() {
      var logged = [];
      if(uidRequired) {
        logged.push(!!LocalDataSrv.getKey('uid'));
      }
      logged.push(!!LocalDataSrv.getKey('token'));
      return logged.every(function(value){ return value === true; });
    }

    function isRegistered() {
      return !!LocalDataSrv.getKey('uid');
    }

    function getAuthorizationHeaders() {
      var headers = {};
      if(uidRequired) {
        headers[uidHeaderName] = LocalDataSrv.getKey('uid');
      }
      headers[tokenHeaderName] = LocalDataSrv.getKey('token');
      return headers;
    }

    function store(_authData) {
      if (!angular.isObject(_authData)) {
        throw new Error('an object was expected to store');
      }

      if (_authData[tokenKey]) {
        if (!_authData[uidKey] && uidRequired) {
          throw new Error('A uid is need');
        }
        LocalDataSrv.setKey('token', _authData[tokenKey]);
      }

      if (_authData[uidKey] && uidRequired) {
        LocalDataSrv.setKey('uid', _authData[uidKey]);
      }
    }

    function clear() {
      LocalDataSrv.eraseKey('uid');
      LocalDataSrv.eraseKey('token');
    }
  }

})();
