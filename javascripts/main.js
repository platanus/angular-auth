var app = angular.module('example', ['restmod', 'PlAuth']).config(function(AuthConfigProvider){
  AuthConfigProvider.setUidKey('email');
  AuthConfigProvider.setTokenKey('auth_token');
});

var apiUrl = 'http://private-19413-angularauthapi.apiary-mock.com';

app.factory('Note', function(restmod) {
  return restmod.model(apiUrl + '/notes').mix('HttpAuth');
});

app.factory('User', function(restmod) {
  return restmod.model(apiUrl + '/users').mix('HttpAuth');
});

app.factory('Session', function(restmod) {
  return restmod.model(apiUrl + '/sessions').mix('HttpAuth');
});

app.controller('ExampleCtrl', function(Session, User, Note, AuthSrv) {
  var vm = this;
  vm.register = register;
  vm.login = login;
  vm.logout = logout;
  vm.authSrv = AuthSrv;
  vm.getNotes = getNotes;
  vm.notes = Note.$collection();

  function register() {
    var payload = {email: 'charles@manson.com', password: '12345678', password_confirmation: '12345678'};
    User.$create(payload).$then(AuthSrv.store);
  }

  function login() {
    var payload = {email: 'charles@manson.com', password: '12345678'};
    Session.$create(payload).$then(AuthSrv.store);
  }

  function logout() {
    Session.$new('current').$destroy().$then(AuthSrv.clear);
  }

  function getNotes() {
    vm.notes.$fetch();
  }
});
