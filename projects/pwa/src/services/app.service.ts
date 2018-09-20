import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERROR_WRONG_IDX_MEMBER, ERROR_WRONG_SESSION_ID } from '../../../../share/philgo-api/philgo-api.service';

import { SimpleLibrary as _ } from 'ng-simple-library';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  _ = _;

  constructor(
    private router: Router
  ) { }


  openHome() {
    this.router.navigateByUrl('/');
  }

  /**
   * Toast on app.
   * @param o string or object.
   *  if it is an object,
   *    {
   *      code: number,   // if code is not 0, it means, error.
   *      message: string,
   *      closeButtonText: string   // customize close button text.
   *      duration: number          // ms. default is 10000(10s). you can put it big number for test.
   *    }
   * @example
   e.duration = 100000;
   this.a.toast(e);
   * @description If the toast is an error toast
   *    <ion-toast class="error errorNO"> will be added in class.
   *    Normally error code is like -1234, so, the error class will be 'error error-1324'
   */
  async toast(o: any) {
    if (typeof o === 'string') {
      o = {
        message: o
      };
    }
    if (o.closeButtonText === void 0) {
      o.closeButtonText = _.t({ ko: '닫기', en: 'Close', jp: '閉じる', ch: '关' });
    }
    if (o.duration === void 0) {
      o.duration = 10000;
    }
    if (typeof o.code !== void 0 && o.code) {
      /**
       * If session id is invalid, let the user log out.
       */
      if (o.code === ERROR_WRONG_SESSION_ID || o.code === ERROR_WRONG_IDX_MEMBER) {
        this.philgo.logout();
      }
      o.cssClass = `error error${o.code}`;
    }
    o.showCloseButton = true;

    console.error(o.message);
    // const toast = await this.toastController.create(o);
    // toast.present();
  }

}
