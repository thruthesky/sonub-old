import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// import { ERROR_WRONG_IDX_MEMBER, ERROR_WRONG_SESSION_ID } from '../../../../share/philgo-api/philgo-api.service';

import { SimpleLibrary as _ } from 'ng-simple-library';
import { ApiPost, PhilGoApiService, IDX_MEMBER, USER_LOGIN_INFO } from 'share/philgo-api/philgo-api.service';


import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from '../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie';


interface Environment {
  production: boolean;
  port: string;
  blogIntroDomain: string;
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




/**
 * Site domain
 */
export const APP_PROTOCOL = 'https://';
export const APP_ROOT_DOMAIN = 'sonub.com';
export const APP_PORT = environment.port;
export const BLOG_INTRO_DOMAIN = environment.blogIntroDomain;


@Injectable({
  providedIn: 'root'
})
export class AppService {


  /**
   * App Route.
   * When page changes, this.route changes and 'routeChange' event is fired.
   * This value is being added on the #layout element of DOM in App Component template.
   * So, it is available everywhere.
   * Possible usage is to design on each route.
   */
  route = '';
  /**
   * You can subscribe this event to do something on page chagnes.
   * @example
   *  a.routeChange.subscribe( route => console.log('route:', route));
   */
  routeChange = new Subject<string>();
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

  /**
   * Post to edit
   *
   * Use 'openPostEdit()' method.
   */
  private postToEdit: ApiPost;


  anonymousPhotoUrl = '/assets/img/anonymous.gif';


  /**
   * Initialize the app service.
   *
   * This App Service constructor must run only one time per app booting.
   * If the app is being refreshed or page has been change with <a> tag may cause it to run again.
   * Or when user changes 'subdomain', then the app will be reloaded and this will run again.
   * In any way, this constructor must run only one time per app boot.
   *
   * @param domSanitizer .
   * @param snackBar .
   * @param router .
   * @param cookie .
   * @param philgo .
   */
  constructor(
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router,
    private cookie: CookieService,
    public philgo: PhilGoApiService
  ) {
    this.initLanguage();
    this.initFirebase();
    this.initScreen();
    this.initPushNotification();
    this.initRouterEvent();
    this.initUserInformationChangeEvent();
    this.initCookieLogin();
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

  /**
   * Listen page changes.
   */
  initRouterEvent() {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.route = this.router.url;
        this.routeChange.next(this.route);
      }
    });

  }

  /**
   * Whenever user login(or profile) information changes, the event is fired.
   *
   * @desc it saves user login session on cookie, so when user changes 'subdomain',
   *  the user still be logged in.
   */
  initUserInformationChangeEvent() {
    this.philgo.userChange.subscribe(user => {
      console.log(' ==> initUserInformationChangeEvent() user: ', user);
      if (user) {
        /// user is logged in
        const d = new Date();
        const cookieObjects = {
          domain: APP_ROOT_DOMAIN,
          expires: new Date(d.getFullYear() + 1, d.getMonth())
        };
        this.cookie.putObject(USER_LOGIN_INFO, user, cookieObjects);
        console.log('Set user login information in cookie: ', cookieObjects);
      } else {
        /// user is logged out
        console.log('Removing cookie login information');
        const d = new Date();
        const cookieObjects = {
          domain: APP_ROOT_DOMAIN,
          expires: new Date(d.getFullYear() - 1, d.getMonth())
        };
        this.cookie.putObject(USER_LOGIN_INFO, {}, cookieObjects);
        this.cookie.remove(USER_LOGIN_INFO, cookieObjects);
      }
    });
  }

  /**
   * Let the user logged in if
   *  the user is not logged in by PhilGo Api Service( in localStorage )
   *  the user has cookie login information
   */
  initCookieLogin() {
    console.log('     => initCookieLogin() ');
    if (this.philgo.isLoggedOut()) {
      console.log('     => user is logged out by philgo api');
      const info = this.cookie.getObject(USER_LOGIN_INFO);
      if (info) {
        console.log('       => user has login information on cookie. Going to login info on Philgo Api.');
        info['loggedIn'] = 'cookie';
        this.philgo.saveUserInformation(<any>info);
      } else {
        console.log('       => user does not have cookie login information :(. Cannot loggin.');
      }
    } else {
      console.log('       => user is logged in already. just returen');
    }

  }

  /**
   * Returns true if the user is in home(main/front) page.
   */
  get inHome(): boolean {
    return !this.route || this.route === '/';
  }
  /**
   * Returns true if the user is in blog pages. like blog settings, blog categories.
   */
  get inBlog(): boolean {
    return this.route.indexOf('/blog') === 0;
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

  openPostView(post_id: string, idx: any) {
    this.router.navigateByUrl('/forum/' + post_id + '/' + idx);
  }

  openPostEdit(post: ApiPost) {
    this.postToEdit = post;
    console.log('posttoEdit:', this.postToEdit);
    this.router.navigateByUrl('/post/edit/' + this.postToEdit.idx);
  }

  /**
   * Return post to edit.
   * The post to edit is set by the 'edit button' click.
   * So, if you refresh on edit page, this variable will return undefined.
   * Then you need to load data by yourself from server.
   * This may happen on refresh page.
   */
  getPostToEdit(): ApiPost {
    return this.postToEdit;
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


  /**
   * Display a toast at the bottoms of the screen.
   * @param message message to display at the bottom the screen. It can be a string or an error object.
   * @param action action to do ( close or dismiss )
   * @param config configuration for Materai snackbar
   */
  toast(message, action?, config: MatSnackBarConfig = {}) {
    if (typeof message !== 'string') {
      if (message.message !== void 0) {
        message = message.message;
      }
    }
    if (action === void 0) {
      action = 'Close';
    }
    if (config.duration === void 0) {
      config.duration = 5000;
    }
    this.snackBar.open(message, action, config);
  }

  get myName(): string {
    if (this.philgo.isLoggedIn()) {
      return this.philgo.myName();
    } else {
      return this.t({ en: 'Anonymous', ko: '익명 사용자' });
    }
  }
  get myPhotoUrl() {
    return this.philgo.profilePhotoUrl(this.philgo.myProfilePhotoUrl().split('/').pop());
  }

  /**
   * returns login user's blog address.
   */
  get myBlogUrl(): string {
    let url = '';
    if (this.philgo.isLoggedIn()) {
      url = APP_PROTOCOL + this.philgo.myBlogDomain() + '.' + APP_ROOT_DOMAIN;
    } else {
      url = APP_PROTOCOL + BLOG_INTRO_DOMAIN;
    }
    if (APP_PORT) {
      url += ':' + APP_PORT;
    }
    return url;
  }

}
