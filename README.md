Angular Auth
============

Library to help integrate Token Authentication between Angularjs and json API

## Angular Auth is no longer maintained

- We will leave the Issues open as a discussion forum only.
- We do not guarantee a response from us in the Issues.
- We are no longer accepting pull requests.

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

Then if your [Restmod](https://github.com/platanus/angular-restmod) Models use the `HttpAuth` mixing, by default, the library will add an Authorization header on each request like this:

```
'X-User-Email': 'alf@melmack.com'
'X-User-Token': 'xxx'
```

## Config

You can change the default uid and token expected from server response using `AuthConfigProvider` like this:

```javascript
angular.module('yourapp', ['PlAuth']).config(function(AuthConfigProvider){
  AuthConfigProvider.setUidKey('email');
  AuthConfigProvider.setTokenKey('auth_token');
});
```

To change the default uid and token headers sent to the server you can do:

```javascript
angular.module('yourapp', ['PlAuth']).config(function(AuthConfigProvider){
  AuthConfigProvider.setUidHeaderName('X-Admin-Email');
  AuthConfigProvider.setTokenHeaderName('X-Admin-User');
});
```

You can change the default local storage prefix. If you don't, keys will be prefixed with `angularAuth`.

```javascript
angular.module('yourapp', ['PlAuth']).config(function(AuthConfigProvider){
  AuthConfigProvider.setLocalStoragePrefix('myCustomPrefix');
});
```

## Live Demo

Check out a live Demo using the library
[Live Demo](http://platanus.github.io/angular-auth)

## API

### AuthSrv

#### isLogged()

Returns if the session is logged

#### isRegistered()

Returns true or false whether we have an `uid` persisted

#### store(object)

Saves `uid` and `token` from a given `object` on LocalStorage

#### clear()

Removes `uid` and `token` from LocalStorage

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Credits

Thank you [contributors](https://github.com/platanus/angular-auth/graphs/contributors)!

<img src="http://platan.us/gravatar_with_text.png" alt="Platanus" width="250"/>

angular-auth is maintained by [platanus](http://platan.us).

## License

AngularAuth is © 2015 platanus, spa. It is free software and may be redistributed under the terms specified in the LICENSE file.
