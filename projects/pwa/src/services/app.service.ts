import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ERROR_WRONG_IDX_MEMBER, ERROR_WRONG_SESSION_ID } from '../../../../share/philgo-api/philgo-api.service';

import { SimpleLibrary as _ } from 'ng-simple-library';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';


import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from '../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';



interface Environment {
  production: boolean;
  philgoServerUrl: string;
  philgoFileServerUrl: string;
  newFileServerUrl: string;
}

export interface FrontPage {
  communityPosts: Array<ApiPost>;
  info: {
    version: string;
  };
  my_latest_blog_posts: Array<ApiPost>;
  no_of_my_blog_posts: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  /**
   * Screen width
   */
  isMobile = true;
  isDesktop = false;


  /**
   * Simple Library https://www.npmjs.com/package/ng-simple-library
   */
  _ = _;



  /**
   * Environment
   */
  environment: Environment = environment;

  /**
   * Firebase Messaing
   */
  messaging: firebase.messaging.Messaging = null;


  ///
  constructor(
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router,
    public philgo: PhilGoApiService
  ) {
    this.initLanguage();
    this.initFirebase();
    this.initScreen();
    this.initPushNotification();


  }

  initLanguage() {
    _.languageCode = _.getUserLanguage();
  }

  initFirebase() {

    this.messaging = firebase.messaging();

  }
  /**
   * Set the size of app based on the screen width.
   */
  initScreen() {

    if (_.md()) {
      this.isDesktop = true;
      this.isMobile = false;
    } else {
      this.isDesktop = false;
      this.isMobile = true;
    }
  }

  openHome() {
    this.router.navigateByUrl('/');
  }
  openForum(post_id: string) {
    if (post_id === 'blog') {
      this.router.navigateByUrl('/blog');
    } else {
      this.router.navigateByUrl('/forum/' + post_id);
    }
  }

  t(code, info?): string {
    return _.t(code, info);
  }


  /**
   * @logic
   *    1. Ask user to accept 'push' permission.
   *      1-a) If user click the button 'ask the permission'
   *      1-b) If user accepts, send push token to server.
   *      1-c) and Send push token to server every time user runs the app.
   *    2. If user rejects, show warning.
   */
  initPushNotification() {

    /**
     * 채팅에서 백그라운드로 메시지가 와도 별로 할 것이 없다. 왜냐하면, firebase realtiem update 로 message toast 를 상단에 보여주기 때문이다.
     */
    this.messaging.onMessage((payload) => {
      console.log('Got FCM notification! Display on windows.');
    });

  }

  safeHtml(html) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  urlPostView(post: ApiPost): string {
    if (!post) {
      return '';
    }
    if (post.post_id === 'ads') {
      if (post.link && post.link.trim()) {
        return post.link.trim();
      } else {
        return `/${post.post_id}/${post.idx}`;
      }
    } else {
      return `/forum/${post.post_id}/${post.idx}`;
    }
  }

  urlPostTarget(post: ApiPost): string {

    if (post.post_id === 'ads') {
      if (post.link && post.link.trim()) {
        return '_blank';
      }
    }
    return '_self';
  }

  onClickPost(event: Event, post: ApiPost) {
    event.preventDefault();
    event.stopPropagation();
    if (this.urlPostTarget(post) === '_blank') {
      window.open(this.urlPostView(post));
    } else {
      this.router.navigateByUrl(this.urlPostView(post));
    }
  }


  /**
   * Returns content of post.
   * Each post has differenct fields for showing on different palces.
   * @param post post
   */
  postContentOnMainPhoto(post: ApiPost) {
    // console.log(post);
    if (post.post_id === 'ads') {
      return post.varchar_3;
    } else {
      return post.content;
    }
  }


  toast(message, action?, config: MatSnackBarConfig = {}) {
    if (action === void 0) {
      action = 'Close';
    }
    if (config.duration === void 0) {
      config.duration = 5000;
    }
    this.snackBar.open(message, action, config);
  }

  // /**
  //  * Toast on app.
  //  * @param o string or object.
  //  *  if it is an object,
  //  *    {
  //  *      code: number,   // if code is not 0, it means, error.
  //  *      message: string,
  //  *      closeButtonText: string   // customize close button text.
  //  *      duration: number          // ms. default is 10000(10s). you can put it big number for test.
  //  *    }
  //  * @example
  //  e.duration = 100000;
  //  this.a.toast(e);
  //  * @description If the toast is an error toast
  //  *    <ion-toast class="error errorNO"> will be added in class.
  //  *    Normally error code is like -1234, so, the error class will be 'error error-1324'
  //  */
  // async toast(o: any) {
  //   if (typeof o === 'string') {
  //     o = {
  //       message: o
  //     };
  //   }
  //   if (o.closeButtonText === void 0) {
  //     o.closeButtonText = _.t({ ko: '닫기', en: 'Close', jp: '閉じる', ch: '关' });
  //   }
  //   if (o.duration === void 0) {
  //     o.duration = 10000;
  //   }
  //   if (typeof o.code !== void 0 && o.code) {
  //     /**
  //      * If session id is invalid, let the user log out.
  //      */
  //     if (o.code === ERROR_WRONG_SESSION_ID || o.code === ERROR_WRONG_IDX_MEMBER) {
  //       this.philgo.logout();
  //     }
  //     o.cssClass = `error error${o.code}`;
  //   }
  //   o.showCloseButton = true;
  //
  //   console.error(o.message);
  //   // const toast = await this.toastController.create(o);
  //   // toast.present();
  // }

}
