var app = angular.module('example', ['restmod', 'PlAuth']);
app.factory('Note', function(restmod) {
  return restmod.model('http://private-19413-angularauthapi.apiary-mock.com/notes');
});
app.controller('ExampleCtrl', function(Note) {
  var vm = this;
  vm.notes = Note.$search();
});
