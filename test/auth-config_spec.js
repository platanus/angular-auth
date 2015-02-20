describe('Auth Config', function() {
  beforeEach(module('PlAuth'));

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
