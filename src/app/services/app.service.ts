import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PhilGoApiService, ERROR_WRONG_SESSION_ID, ERROR_WRONG_IDX_MEMBER } from '../modules/philgo-api/philgo-api.service';
import { ToastController, Platform, AlertController } from '@ionic/angular';
import { LanguageTranslate } from '../modules/language-translate/language-translate';
import { AngularLibrary } from '../modules/angular-library/angular-library';

import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/messaging';


interface Environment {
  production: boolean;
  philgoServerUrl: string;
  philgoFileServerUrl: string;
  newFileServerUrl: string;
}


declare let FCMPlugin;


@Injectable({
  providedIn: 'root'
})
export class AppService {


  /**
   * Firebase
   */
  messaging: firebase.messaging.Messaging = null;

  /**
   * Cordova token
   */
  pushToken = null;


  environment: Environment = environment;


  /**
   * Back button count.
   */
  backButtonCounter = 0;

  //
  constructor(
    private router: Router,
    private toastController: ToastController,
    private readonly alertController: AlertController,
    private philgo: PhilGoApiService,
    public tr: LanguageTranslate,
    private platform: Platform
  ) {
    this.tr.languageCode = AngularLibrary.getUserLanguage();
    this.initFirebase();
    this.initBackButtonExit();
    this.initPushNotification();
  }

  initBackButtonExit() {
    this.platform.backButton.subscribe(async () => {
      this.router.navigateByUrl('/');
      if (this.backButtonCounter === 0) {
        this.backButtonCounter++;
        setTimeout(() => this.backButtonCounter = 0, 500);
      } else {
        const alert = await this.alertController.create({
          header: this.tr.t({ ko: '채팅앱 종료', en: 'Exit App!', ch: '退出App！', jp: '終了アプリ！' }),
          message: this.tr.t({ ko: '채팅앱을 종료하시겠습니까?', en: 'Do you want to exist App?', ch: '你想存在App吗？', jp: 'あなたはAppを存在させたいですか？' }),
          buttons: [
            {
              text: this.tr.t({ ko: '아니오', en: 'No', ch: '没有', jp: 'いいえ' }),
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: this.tr.t({ ko: '예', en: 'Yes', ch: '是', jp: 'はい' }),
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });
        await alert.present();
      }
    });
  }


  initFirebase() {

    /**
     * Web 설정.
     * 참고: Cordova 에서 firebase.messaging() 을 하면 에러 발생.
     */
    this.messaging = firebase.messaging();

  }

  initPushNotification() {
    this.platform.ready().then(() => {

      if (this.platform.is('cordova')) {
        FCMPlugin.getToken(token => {
          this.pushToken = token;
          this.philgo.updatePusTokenToServer(token);
        });
        FCMPlugin.onTokenRefresh(token => {
          this.pushToken = token;
          this.philgo.updatePusTokenToServer(token);
        });

        FCMPlugin.onNotification((data) => {
          if (data.wasTapped) {
            // Notification was received on device tray and tapped by the user.
            // alert('data was Tapped by user: ' + JSON.stringify(data));
          } else {
            // Notification was received in foreground. Maybe the user needs to be notified.
            // alert('data was received in foreground: ' + JSON.stringify(data));
          }
        });
      } else {
        /**
         * 채팅에서 백그라운드로 메시지가 와도 별로 할 것이 없다. 왜냐하면, firebase realtiem update 로 message toast 를 상단에 보여주기 때문이다.
         */
        this.messaging.onMessage((payload) => {
          console.log('Got FCM notification! Display on windows.');
        });

      }
    });

  }

  /**
   * Becareful!
   *
   * this.a.platform is a string. not ionic angular api object.
   *
   */
  getPlatform(): string {
    if (AngularLibrary.isCordova) {
      return 'cordova';
    } else {
      return 'web';
    }
  }


  correctLanguageCode(lc: string): string {
    if (lc === 'ko' || lc === 'en' || lc === 'jp' || lc === 'ch') {

    } else {
      lc = 'en';
    }
    return lc;
  }

  get user() {
    return {
      name: this.philgo.nickname()
    };
  }

  get homeUrl(): string {
    return '/';
  }
  openHome() {
    this.open(this.homeUrl);
  }
  open(path) {
    this.router.navigateByUrl(path);
  }


  t(code: any, info?) {
    return this.tr.t(code, info);
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
      o.closeButtonText = this.tr.t({ ko: '닫기', en: 'Close', jp: '閉じる', ch: '关' });
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
    const toast = await this.toastController.create(o);
    toast.present();
  }

}
