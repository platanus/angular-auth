describe('HTTP Auth Mixin', function() {
  beforeEach(module('PlAuth'));

  var AuthSrv, restmod, $httpBackend, isLogged;

  beforeEach(module(function ($provide) {
    AuthSrv = {
      isLogged: function() { return isLogged; },
      getAuthorizationHeaders: function() { return {"X-Auth-Email": 'charles@manson.com', "A-Auth-Token": "XXX"}; }
    };
    $provide.value('AuthSrv', AuthSrv);
  }));

  beforeEach(inject(function (_restmod_, _$httpBackend_) {
    restmod = _restmod_;
    $httpBackend = _$httpBackend_;
  }));

  describe('Constructor', function () {

    it('set restmod HTTP Header requests with Auth key', function () {
      isLogged = true;
      $httpBackend.expect('GET', 'bikes/1', undefined, function(headers) {
        return AuthSrv.getAuthorizationHeaders();
      }).respond(201, '');

      var Bike = restmod.model('bikes').mix('HttpAuth');
      Bike.$find(1);

      $httpBackend.flush();
    });

    it('does not set restmod HTTP Header requests if not logged in', function () {
      isLogged = false;
      $httpBackend.expect('GET', 'bikes/1', undefined, function(headers) {
        return headers['X-Auth-Token'] === undefined;
      }).respond(201, '');

      var Bike = restmod.model('bikes').mix('HttpAuth');
      Bike.$find(1);

      $httpBackend.flush();
    });

  });

});
