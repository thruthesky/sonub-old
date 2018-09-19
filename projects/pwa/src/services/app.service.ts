import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleLibrary as _ } from 'ng-simple-library';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';


import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from '../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';



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


}
