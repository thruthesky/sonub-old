# Sonub

## Documents

* [Sonub Management Doc](https://docs.google.com/document/d/1QEifBIP7PF6KS6miu4tAlVmEB3Xq3m-BTU6JFYtNXDM/edit#heading=h.m1tz4v8spj4k)

## Old codes

* [Old Ionic Components](https://github.com/thruthesky/sonub/tree/4542202059203f4d274b1f1a6ebc3958b629adfe)

* [Old PhilGoApi Components](https://github.com/thruthesky/components)

## Dependencies

* philgo-api
* philgo-api-component
* ng-simple-library

## RWD

* When window `resize` event happens, app checks if `md` width changes.
  * If the browser width becomes wider into `md`( from narrow width ), then it reload to display mobile design.
  * And if the browser width becomes narrower into `md` size ( from wide width ), then it reload to display desktop design.

## Coding Guideline

### Route atttribute

* [route]=" a.route " is added on #layout. It is available everywhere.
* Possible usage is to design on each route.
