describe('Auth Config', function() {
  beforeEach(module('PlAuth'));

  describe('setLocalStoragePrefix', function () {

    describe('with default prefix', function () {

      it('should change default local storage prefix', inject(function(AuthConfig) {
        expect(AuthConfig.getLocalStoragePrefix()).to.be.equal('angularAuth');
      }));

    });

    describe('overriding prefix', function () {

      beforeEach(module(function(AuthConfigProvider) {
        AuthConfigProvider.setLocalStoragePrefix('platanus');
      }));

      it('should change default local storage prefix', inject(function(AuthConfig) {
        expect(AuthConfig.getLocalStoragePrefix()).to.be.equal('platanus');
      }));

    });

  });

  describe('setUidHeaderName', function () {

    beforeEach(module(function(AuthConfigProvider) {
      AuthConfigProvider.setUidHeaderName('X-Admin-Email');
    }));

    it('should change default uid header name', inject(function(AuthConfig) {
      expect(AuthConfig.getUidHeaderName()).to.be.equal('X-Admin-Email');
    }));

  });

  describe('setUidKey', function () {

    beforeEach(module(function(AuthConfigProvider) {
      AuthConfigProvider.setUidKey('email');
    }));

    it('should change default uid key', inject(function(AuthConfig) {
      expect(AuthConfig.getUidKey()).to.be.equal('email');
    }));

  });

  describe('setTokenKey', function () {

    beforeEach(module(function(AuthConfigProvider) {
      AuthConfigProvider.setTokenKey('differentToken');
    }));

    it('should change default token key', inject(function(AuthConfig) {
      expect(AuthConfig.getTokenKey()).to.be.equal('differentToken');
    }));

  });

});
