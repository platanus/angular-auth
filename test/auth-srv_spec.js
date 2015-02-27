describe('AuthSrv', function() {
  var AuthSrv;

  beforeEach(module('PlAuth'));
  beforeEach(inject(function(_AuthSrv_) {
    AuthSrv = _AuthSrv_;
  }));

  afterEach(function() {
    localStorage.clear();
  });

  describe('#isLogged', function() {

    it('returns true with uid and token set', function() {
      var authData = {uid: 'charles@manson.com', token: 'XXX'};
      AuthSrv.store(authData);
      expect(AuthSrv.isLogged()).to.be.true;
    });

    it('returns false without token set', function() {
      var authData = {uid: 'charles@manson.com'};
      AuthSrv.store(authData);
      expect(AuthSrv.isLogged()).to.be.false;
    });

  });

  describe('#isRegistered', function() {

    it('returns true with uid set', function() {
      var authData = {uid: 'charles@manson.com'};
      AuthSrv.store(authData);
      expect(AuthSrv.isRegistered()).to.be.true;
    });

    it('returns false without uid set', function() {
      expect(AuthSrv.isLogged()).to.be.false;
    });

  });

  describe('#getAuthorizationHeaders', function() {

    it('returns valid header', function() {
      var authData = {uid: 'charles@manson.com', token: 'XXX'};
      AuthSrv.store(authData);
      var expectedHeaders = {'X-User-Token': 'XXX', 'X-User-Email': 'charles@manson.com'};
      var resultHeaders = AuthSrv.getAuthorizationHeaders();
      expect(resultHeaders['X-User-Token']).to.equal(expectedHeaders['X-User-Token']);
      expect(resultHeaders['X-User-Email']).to.equal(expectedHeaders['X-User-Email']);
    });

  });

  describe('#store', function () {

    it('stores the token', function() {
      var authData = {uid: 'charles@manson.com', token: 'XXX'};
      AuthSrv.store(authData);
      expect(localStorage.getItem('token')).to.equal('XXX');
    });

    it('throws an exception if is not an {}', function() {
      expect(function() { AuthSrv.store('XXX'); }).to.throw(Error);
    });

    it('stores the uid', function() {
      var authData = {uid: 'charles@manson.com', token: ''};
      AuthSrv.store(authData);
      expect(localStorage.getItem('uid')).to.equal('charles@manson.com');
    });

    it('throws an exception if only token was passed', function() {
      expect(function() { AuthSrv.store({token: 'XXX'}); }).to.throw(Error);
    });

  });

  describe('#clear', function () {

    it('clears uid and token', function() {
      var authData = {uid: 'charles@manson.com', token: 'XXX'};
      AuthSrv.store(authData);
      AuthSrv.clear();
      expect(localStorage.getItem('uid')).to.be.null;
      expect(localStorage.getItem('token')).to.be.null;
    });

  });
});
