# Sonub

## Documents

* [Sonub Management Doc](https://docs.google.com/document/d/1QEifBIP7PF6KS6miu4tAlVmEB3Xq3m-BTU6JFYtNXDM/edit#heading=h.m1tz4v8spj4k)

* [Sonub Design Guide](https://docs.google.com/document/d/1u2PAHLDYx0-UUbaXQtMnNJsUiAdJkSbE2pzpSPM5_I8/edit#heading=h.et2euvfta6pc)

* [Sonub Development Guide] (https://docs.google.com/document/d/1u2PAHLDYx0-UUbaXQtMnNJsUiAdJkSbE2pzpSPM5_I8/edit#heading=h.eg600u9gre0o)

## Old codes

* [Old Ionic Components](https://github.com/thruthesky/sonub/tree/4542202059203f4d274b1f1a6ebc3958b629adfe)

* [Old PhilGoApi Components](https://github.com/thruthesky/components)

## Dependencies

* `ngx-cookie` must be installed to enable philgo-api cookie login.
* `ng-simple-library` is mandatory.
* philgo-api
* philgo-api-component

## RWD

* When window `resize` event happens, app checks if `md` width changes.
  * If the browser width becomes wider into `md`( from narrow width ), then it reload to display mobile design.
  * And if the browser width becomes narrower into `md` size ( from wide width ), then it reload to display desktop design.

## Work Environment

### Serving with test domains and ssl

* sample domains to test subdomains.

```` text
127.0.0.1 sonub.com
127.0.0.1 www.sonub.com
127.0.0.1 thruthesky.sonub.com
127.0.0.1 w.sonub.com
127.0.0.1 xxx.sonub.com
127.0.0.1 new.sonub.com
127.0.0.1 a.sonub.com
127.0.0.1 abc.sonub.com
127.0.0.1 apple.sonub.com
127.0.0.1 b.sonub.com
127.0.0.1 banaa.sonub.com
127.0.0.1 c.sonub.com
127.0.0.1 cherry.sonub.com
````

* ssl is under `tmp/ssl` folder.

* `npm run pwa` to run pwa project. This will open `https://w.sonub.com:8443`.

## Coding Guideline

### Route atttribute

* See [Coding Guide](https://docs.google.com/document/d/1u2PAHLDYx0-UUbaXQtMnNJsUiAdJkSbE2pzpSPM5_I8/edit#heading=h.ojq4plytxfhn)

## Life Cycle

### Blog site open

* 3 api calls are made
  * 1st call for `sonub config` in app module.
  * 2nd call for sonub front apge in home component to get first page content inclding blog site's content.
  * 3rd call for blog settings in app service.