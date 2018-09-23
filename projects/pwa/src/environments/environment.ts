// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  port: '8443', // local serving port for ssl
  blogIntroDomain: 'xxx.sonub.com',
  // philgoServerUrl: 'http://192.168.0.254/sapcms_1_2/api.php',
  // philgoFileServerUrl: 'http://192.168.0.254/sapcms_1_2/api.php',
  // newFileServerUrl: 'http://192.168.0.254/file-server/index.php',

  philgoServerUrl: 'https://local.philgo.com/api.php',
  philgoFileServerUrl: 'https://local.philgo.com/api.php',
  newFileServerUrl: 'http://192.168.0.254/file-server/index.php',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
