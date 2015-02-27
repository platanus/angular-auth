describe('Auth Config', function() {
  beforeEach(module('PlAuth'));

  describe('setTokenHeaderName', function () {

    beforeEach(module(function(AuthConfigProvider) {
      AuthConfigProvider.setTokenHeaderName('X-Admin-Token')
    }));

    it('should change default token header name', inject(function(AuthConfig) {
      expect(AuthConfig.getTokenHeaderName()).to.be.equal('X-Admin-Token');
    }));

  });

  describe('setUidHeaderName', function () {

    beforeEach(module(function(AuthConfigProvider) {
      AuthConfigProvider.setUidHeaderName('X-Admin-Email')
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
