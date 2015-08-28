(function() {
  'use strict';

  angular
    .module('PlAuth')
    .provider('AuthConfig', AuthConfigProvider);

  function AuthConfigProvider() {
    var uidKey = 'uid',
        tokenKey = 'token',
        uidHeaderName = 'X-User-Email',
        tokenHeaderName = 'X-User-Token',
        localStoragePrefix = 'angularAuth';

    this.setLocalStoragePrefix = function(value) {
      localStoragePrefix = value;
    };

    this.setTokenHeaderName = function(value) {
      tokenHeaderName = value;
    };

    this.setUidHeaderName = function(value) {
      uidHeaderName = value;
    };

    this.setUidKey = function(value) {
      uidKey = value;
    };

    this.setTokenKey = function(value) {
      tokenKey = value;
    };

    function AuthConfig() {

      this.getLocalStoragePrefix = function() {
        return localStoragePrefix;
      };

      this.getUidHeaderName = function() {
        return uidHeaderName;
      };

      this.getTokenHeaderName = function() {
        return tokenHeaderName;
      };

      this.getUidKey = function() {
        return uidKey;
      };

      this.getTokenKey = function() {
        return tokenKey;
      };
    }

    this.$get = function() {
      return new AuthConfig();
    };
  }
}());

