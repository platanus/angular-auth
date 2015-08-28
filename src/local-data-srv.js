(function() {
  'use strict';

  angular.module('PlAuth')
  .factory('LocalDataSrv', LocalDataSrv);

  LocalDataSrv.$inject = ['AuthConfig'];

  function LocalDataSrv(AuthConfig) {
    function prefixedKey(_key) {
      return [AuthConfig.getLocalStoragePrefix(), _key].join('.');
    }

    var eraseKey = function(_key) {
      delete window.localStorage[prefixedKey(_key)];
    };

    var getKey = function(_key) {
      return localStorage.getItem(prefixedKey(_key));
    };

    var isKeySet = function(_key) {
      return !!localStorage.getItem(prefixedKey(_key));
    };

    var setKey = function(_key, _value) {
      localStorage.setItem(prefixedKey(_key), _value);
    };

    return {
      setKey: setKey,
      getKey: getKey,
      isKeySet: isKeySet,
      eraseKey: eraseKey
    };
  }

})();
