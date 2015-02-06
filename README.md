Angular Auth
============

Library to help integrate Token Authentication between Angularjs and Rails

## Installation

Install the bower package.

```shell
$ bower install platanus-angular-auth
```

Include the JS file in your project and add the module as an Angular Dependency

```javascript
angular.module('yourapp', ['PlAuth']);
```

## Using

The library includes a service called `AuthSrv` and a Restmod Mixing called `HttpAuth`.
You can use `AuthSrv` to store a user's credentials and check the status of those credentials.

```javascript
// Creating a session using a Restmod Model called Session
Session.$create().$then(function(data) {
  AuthSrv.store(data);
});
```

The store function would look for an `uid` and `token` property on the response and persist if they have values.

Then if your Restmod Models use the `HttpAuth` mixing, the library will add an Authorization header on each request like this:

```
{'Authorization': token=ABC uid=userid }
```


## API

### AuthSrv

#### isLogged()

Returns if the session is logged

#### isRegistered()

Returns true or false whether we have an `uid` persisted

#### store(object)

Saves `uid` and `token` from a given `object` on LocalStorage
