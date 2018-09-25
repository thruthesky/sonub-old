import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

// import { ERROR_WRONG_IDX_MEMBER, ERROR_WRONG_SESSION_ID } from '../../../../share/philgo-api/philgo-api.service';

import { SimpleLibrary as _ } from 'ng-simple-library';
import { ApiPost, PhilGoApiService, USER_LOGIN_SESSION_INFO, ApiBlogSettings, ApiError } from 'share/philgo-api/philgo-api.service';


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
  latest_blog_posts: Array<ApiPost>;
  no_of_blog_posts: number;
  news: Array<ApiPost>;
  blog_featured_0: ApiPost;
  blog_featured_1: ApiPost;
  blog_featured_2: ApiPost;
  blog_featured_3: ApiPost;
  blog_featured_4: ApiPost;
}




/**
 * Site domain
 */
export const APP_PROTOCOL = 'https://';
export const APP_ROOT_DOMAIN = 'sonub.com';
export const APP_PORT = environment.port;
export const BLOG_INTRO_DOMAIN = environment.blogIntroDomain;


export const F_BLOG_DOMAIN = 'varchar_1';

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
   * Post for view/edit
   *
   * Pass post data to view or edit page.
   * So the app can use the post data immediately on next page instead of getting it from server.
   * If there is no post data in this variable, the app must get it from sever.
   *
   * You may check post.idx for sure.
   *
   * 게시판/블로그 등에서 특정 글을 보여 주어거나 수정해야하는 경우,
   * 그 글의 정보를 미리 다 가지고 있다면, 이 변수에 저장하고, 다음 페이지로 넘어가서, 원하는 글을 빠르게 보여주거나 수정할 수 있다.
   * 만약, 이 변수에 값이 없다면, 당연히 서버로 부터 로드를 해야한다.
   */
  private _$_cachePostInMemory: ApiPost;



  anonymousPhotoUrl = '/assets/img/anonymous.gif';



  // app root domain
  appRootDomain = APP_ROOT_DOMAIN;


  /**
   * 현재 접속 중인 블로그의 정보를 가지고 있다.
   */
  blog: ApiBlogSettings = null;

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
    window['a'] = this;
    this.initLanguage();
    this.initFirebase();
    this.initScreen();
    this.initPushNotification();
    this.initRouterEvent();
    this.initUserInformationChangeEvent();
    // this.initCookieLogin();
    this.initBlog();
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
      if (e instanceof NavigationStart) {
        /**
         * Reloads(Redirects) only if the current url is clicked again.
         * It does not reloads if when different url is clicked but component is the same.
         */
        if (this.router.url === e.url) {
          this.router.navigate(['/redirect'], { queryParams: { url: e.url } });
        }
      } else if (e instanceof NavigationEnd) {
        this.route = this.router.url;
        this.routeChange.next(this.route);
      }
      /**
       * Scroll the page to the top after transitioning into another page.
       * 페이지 이동 후 맨위로 가기
       */
      if (e instanceof NavigationEnd) {
        this._.scrollToTop();
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
      // if (user) {
      //   /// user is logged in
      //   const d = new Date();
      //   const cookieObjects = {
      //     domain: APP_ROOT_DOMAIN,
      //     expires: new Date(d.getFullYear() + 1, d.getMonth())
      //   };
      //   this.cookie.putObject(USER_LOGIN_INFO, user, cookieObjects);
      //   console.log('Set user login information in cookie: ', cookieObjects);
      // } else {
      //   /// user is logged out
      //   console.log('Removing cookie login information');
      //   const d = new Date();
      //   const cookieObjects = {
      //     domain: APP_ROOT_DOMAIN,
      //     expires: new Date(d.getFullYear() - 1, d.getMonth())
      //   };
      //   this.cookie.putObject(USER_LOGIN_INFO, {}, cookieObjects);
      //   this.cookie.remove(USER_LOGIN_INFO, cookieObjects);
      // }
    });
  }

  /**
   * Let the user logged in if
   *  the user is not logged in by PhilGo Api Service( in localStorage )
   *  the user has cookie login information
   */
  // initCookieLogin() {
  // console.log(' => initCookieLogin() cookie: ', this.cookie.getObject(USER_LOGIN_SESSION_INFO)
  //   ,
  //   'session storage: ',
  //   this.philgo.sessionStorage,
  //   this.philgo.cookieDomain
  // );
  // if (this.philgo.isLoggedOut()) {
  //   console.log('     => user is logged out by philgo api');
  //   const info = this.cookie.getObject(USER_LOGIN_INFO);
  //   if (info) {
  //     console.log('       => user has login information on cookie. Going to login info on Philgo Api.');
  //     info['loggedIn'] = 'cookie';
  //     this.philgo.saveUserInformation(<any>info);
  //   } else {
  //     console.log('       => user does not have cookie login information :(. Cannot loggin.');
  //   }
  // } else {
  //   console.log('       => user is logged in already. just returen');
  // }

  // }

  /**
   * When user visits a blog, load blog settings and initialize it.
   * @desc when a user visits a blog
   *    - the browser may visite from outside. Meaning there is page reload.
   *    - Or the broswer may visite from inside. Meaning there will be no page reload.
   *      In this case, this method must be re-invoked.
   */
  initBlog() {
    if (this.inBlogSite) {
      this.philgo.blogLoadSettings(this.currentBlogDomain).subscribe(blog => {
        // console.log('blog settings', blog);
      }, e => this.toast(e));
    }
    this.philgo.blogChange.subscribe(blog => {
      if (!blog) {
        return;
      }
      this.blog = blog;
      /**
       * Store categories in an array for easy use.
       * 사용하기 편하게 블로그 이름을 배열로 만들어 넣는다.
       */
      this.blog.categories = [];
      for (let i = 1; i <= 8; i++) {
        if (this.blog['category' + i]) {
          this.blog.categories.push(this.blog['category' + i]);
        }
      }
    });
  }

  get loggedIn(): boolean {
    return this.philgo.isLoggedIn();
  }

  get loggedOut(): boolean {
    return this.philgo.isLoggedOut();
  }

  /**
   * Returns true if the user is in home(main/front) page.
   */
  get inHome(): boolean {
    return !this.route || this.route === '/';
  }

  get inFrontPage(): boolean {
    return this.inHome;
  }

  /**
   * Returns true if the user is in blog pages. Not in blog site.
   *  - like blog settings, blog categories.
   * @returns
   *  true - if the user is in a blog page.
   *  false - if the user is not in a blog page.
   *    this will also return false if the user is in blog site but not in a blog page.
   * @see inBlogSite()
   */
  get inBlogPage(): boolean {
    return this.route.indexOf('/blog') === 0;
  }
  /**
   * Returns true if the user is in blog site.
   * @return
   *  true - if the user is in a blog site
   *  false - if the user is in root domain or www domain.
   *    this will also return false even if the user in blog page, but not in blog site.
   *
   */
  get inBlogSite(): boolean {
    return !this.inRootSite;
  }
  /**
   * Return blog 2nd domain only of the current site address. Not from the login user's blog domain.
   *
   * @return
   *    string of 2nd domain part. example) 'thruthesky' from 'thruthesky.sonub.com'
   *    empty string - if it is not blog site.
   */
  get currentBlogDomain(): string {
    if (this.inBlogSite) {
      return location.hostname.replace('.' + this.appRootDomain, '');
    } else {
      return '';
    }
  }
  get myBlogDomain(): string {
    return this.philgo.myBlogDomain();
  }

  /**
   * Returns true if the user is in sonub.com or www.sonub.com
   */
  get inRootSite(): boolean {
    return location.hostname === this.appRootDomain
      || location.hostname === 'www.' + this.appRootDomain
      || location.hostname === 'dev.' + this.appRootDomain;
  }


  /**
   * Returns true if the user is inside his blog site(domain).
   * @desc If the user is under his blog domain, then it returns true.
   */
  get inMyBlog(): boolean {
    // console.log(location.hostname);
    if (this.inRootSite) {
      return false;
    }
    return this.myBlogUrl.indexOf(location.hostname) !== -1;
  }
  openHome() {
    this.router.navigateByUrl('/');
  }
  openRootSiteHomeInNewWindow() {
    window.open(this.urlRootSite, '_blank');
  }
  openRootSite() {
    window.location.href = this.urlRootSite;
  }
  openMyBlog() {
    if (this.inMyBlog) {
      this.router.navigateByUrl('/');
    } else {
      window.location.href = this.myBlogUrl;
    }
  }
  openForum(post_id: string) {
    if (post_id === 'blog') {
      this.router.navigateByUrl('/blog');
    } else {
      this.router.navigateByUrl('/forum/' + post_id);
    }
  }


  getUrlPostView(post: ApiPost): string {
    if (!post) {
      return '';
    }
    if (post.post_id === 'ads') {
      if (post.link && post.link.trim()) {
        return post.link.trim();
      } else {
        return `/${post.post_id}/${post.idx}`;
      }
    } if (post.post_id === 'blog') {
      return this.getUrlBlogViewList(post);
    } else {
      return `/forum/${post.post_id}/${post.idx}`;
    }
  }

  openPostView(post: ApiPost, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.setPostInMemory(post);
    if (post.post_id === 'blog') {
      this.router.navigateByUrl(this.getUrlBlogViewList(post));
    } else {
      this.router.navigateByUrl('/forum/' + post.post_id + '/' + post.idx);
    }
    return false;
  }
  /**
   * open blog list page with a post-on-top.
   * @param post blog post
   * @param event click event (optional)
   */
  openBlogViewList(post: ApiPost, event?: Event) {
    return this.openPostView(post, event);
  }

  /**
   * Returns url of blog post with a post-on-top
   * @param post blog post
   */
  getUrlBlogViewList(post): string {
    if (!post.post_id) {
      post.post_id = 'blog';
    }
    if (post['blog'] === void 0) {
      console.error('blog is not set');
    }
    // console.log('post', post);
    return `/b/${post['blog']}/${post.idx}/${post.subject}`;
  }

  /**
   * Returns url of blog view. ( single post view )
   * @param post blog post
   */
  getUrlBlogView(post: ApiPost): string {
    this.setPostInMemory(post);
    return `/bv/${post.idx}/${post.subject}`;
  }

  /**
   * Open blog post view page ( single post ivew )
   * @param post blog post
   */
  openBlogView(post: ApiPost) {
    this.router.navigateByUrl(this.getUrlBlogView(post));
  }

  /**
   * Blog category list
   * @param name blog category name
   */
  getBlogCategoryUrl(name) {

    // return `/redirect?url=` + encodeURIComponent(`/blog/${this.currentBlogDomain}/${name}`);
    return `/blog/${this.currentBlogDomain}/${name}`;
  }

  setPostInMemory(post: ApiPost) {
    this._$_cachePostInMemory = post;
  }

  /**
   * Return the cached post in memory.
   *
   */
  get postInMemory(): ApiPost {
    const post = this._$_cachePostInMemory;
    return post;
  }



  openPostEdit(post: ApiPost) {
    this.setPostInMemory(post);
    this.router.navigateByUrl('/post/edit/' + post.idx);
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
      window.open(this.getUrlPostView(post));
    } else {
      this.router.navigateByUrl(this.getUrlPostView(post));
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

  /**
   *
   * @param e Error Object
   */
  error(e: ApiError) {
    this.toast(e, 'Close', { panelClass: `error-${e.code}`, duration: 70000 });
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
      url = APP_PROTOCOL + this.philgo.myBlogDomain() + '.' + this.appRootDomain;
    } else {
      url = APP_PROTOCOL + BLOG_INTRO_DOMAIN;
    }
    if (APP_PORT) {
      url += ':' + APP_PORT;
    }
    return url;
  }

  get urlRootSite(): string {
    let url = APP_PROTOCOL + this.appRootDomain;

    if (APP_PORT) {
      url += ':' + APP_PORT;
    }

    return url;
  }



}
