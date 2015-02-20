(function() {
  'use strict';

  angular
    .module('PlAuth')
    .provider('AuthConfig', AuthConfigProvider);

  function AuthConfigProvider() {
    var uidKey = 'uid';
    var tokenKey = 'token';

    this.setUidKey = function(value) {
      uidKey = value;
    };

    this.setTokenKey = function(value) {
      tokenKey = value;
    };

    function AuthConfig() {

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
  };
}());

