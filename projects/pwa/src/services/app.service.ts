import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

// import { ERROR_WRONG_IDX_MEMBER, ERROR_WRONG_SESSION_ID } from '../../../../share/philgo-api/philgo-api.service';

import { SimpleLibrary as _ } from 'ng-simple-library';
import { ApiPost, PhilGoApiService, ApiBlogSettings, ApiError } from 'share/philgo-api/philgo-api.service';


import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from '../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Subject } from 'rxjs';

interface Environment {
  production: boolean;
  port: string;
  blogIntroDomain: string;
  philgoServerUrl: string;
  philgoFileServerUrl: string;
  newFileServerUrl: string;
  sonubLogServerUrl: string;
  sonubLogApiServerUrl: string;
}


import * as io from 'socket.io-client';
import { DialogService } from 'share/components/dialog/dialog.service';
import { AlertData, ConfirmData } from 'share/components/dialog/dialog-interfaces';
import { HttpClient } from '@angular/common/http';

const socket = io(environment.sonubLogServerUrl);





export interface FrontPage {
  communityPhotos: Array<ApiPost>;  // for root site only
  communityPosts: {                 // for root site only
    [key: string]: Array<ApiPost>
  };
  info: {
    version: string;
  };
  latest_blog_posts: Array<ApiPost>;
  latest_blog_photos: Array<ApiPost>;     // for blog site only
  no_of_blog_posts: number;
  news: Array<ApiPost>;
  stories: Array<ApiPost>;
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
  appDevRootDomain = 'dev.sonub.com';

  /**
   * app group id for philgo api.
   * All posts will be created with this group id.
   */
  groupId = 'sonub';


  /**
   * 'blog' has the settings of current blog site.
   * 현재 접속 중인 블로그의 정보를 가지고 있다.
   */
  blog: ApiBlogSettings = null;
  blogSettingChecked = false;
  /**
   * Max no of blog categories
   */
  blogMaxNoOfCategories = 8;


  /**
   * 'frontPage' has the first page data of root site or blog site.
   */
  frontPage: FrontPage;

  DISCUSSION = 'discussion';
  QNA = 'answer';
  NEWS = 'media';
  BUYANDSELL = 'market';
  HELP = 'sonub_help';


  /**
   * Show loader for slow lazy loading
   */
  showRouterLoader = false;

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
    private http: HttpClient,
    public philgo: PhilGoApiService,
    private dialog: DialogService
  ) {
    window['a'] = this;
    this.initLanguage();
    this.initFirebase();
    this.initScreen();
    this.initPushNotification();
    this.initRouterEvent();
    this.initUserEvent();
    // this.initCookieLogin();
    this.initBlog();

    this.initRootSite();

    this.initLog();

    // philgo.weatherMap().subscribe(g => console.log('geo:', g));
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
   *
   * It does many things on route changes.
   */
  initRouterEvent() {

    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationStart) {
        // console.log('NavigationStart', e);
        /**
         * Reloads(Redirects) only if the current url is clicked again.
         * It does not reloads if when different url is clicked but component is the same.
         */
        // if (this.router.url === e.url) {
        //   this.router.navigate(['/redirect'], { queryParams: { url: e.url } });
        // }
      } else if (e instanceof NavigationEnd) {
        this.route = this.router.url;
        this.routeChange.next(this.route);
        if (this.router.url.indexOf('redirect') === -1) {
          this.log({ path: this.router.url });
        }
      }
      /**
       * Scroll the page to the top after transitioning into another page.
       * 페이지 이동 후 맨위로 가기
       */
      if (e instanceof NavigationEnd) {
        this._.scrollToTop();
      }


      if (e instanceof RouteConfigLoadStart) {
        // console.log('config log start');
        this.showRouterLoader = true;
      } else if (e instanceof RouteConfigLoadEnd) {
        // console.log('config log start');
        this.showRouterLoader = false;
      }
    });


  }

  /**
   * Whenever user login(or profile) information changes, the event is fired.
   *
   * @desc it saves user login session on cookie, so when user changes 'subdomain',
   *  the user still be logged in.
   */
  initUserEvent() {
    this.philgo.userRegister.subscribe(user => {
      this.philgo.updateWebPushToken(this.pushDomain);
    });
    this.philgo.userLogin.subscribe(user => {
      this.philgo.updateWebPushToken(this.pushDomain);
    });
    this.philgo.userUpdate.subscribe(user => {
      // console.log('User update event: ', user);
    });
    this.philgo.userChange.subscribe(user => {
      // console.log(' ==> initUserInformationChangeEvent() user: ', user);
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
   * 블로그 사이트가 아닌, 소너브 루트 사이트이면 초기화를 한다.
   */
  initRootSite() {
    if (!this.inRootSite) {
      return;
    }

    // console.log('initRootSite()');
    this.philgo.updateWebPushToken(this.pushDomain);

    if (this.loggedIn) {
      this.philgo.blogLoadSettings(this.myBlogDomain).subscribe(b => { });
    }
  }

  /**
   * @since 2018-10-01 If user is logged in and the user is in root site, then it loads login user's blog settigns.
   * @desc When user visits a blog, load blog settings and initialize it.
   * @desc when a user visits a blog
   *    - the browser may visite from outside. Meaning there is page reload.
   *    - Or the broswer may visite from inside. Meaning there will be no page reload.
   *      In this case, this method must be re-invoked.
   */
  initBlog() {
    console.log('initBlog()');
    if (this.inBlogSite) {
      this.philgo.blogLoadSettings(this.currentBlogDomain).subscribe(blog => {
        /**
         * When user is in blog site and blog site inofmration have been loaded, then update push tokens.
         * User's token may be expired/changed or whatsoever, it simply re-register user's token to the blog domain.
         */
        // console.log('blog:', blog);
        this.philgo.updateWebPushToken(this.pushDomain);
      }, e => this.toast(e));
    } else {
      // 블로그 사이트가 아니면, 즉, 소너브 메인 페이지이면, 로그인한 사용자의 블로그 정보를 보여준다. 이것은 initRootSite() 를 참고한다.
    }

    /**
     * Do something when blog settings are loaded or changed.
     */
    this.philgo.blogChange.subscribe(blog => {
      if (!blog) {
        return;
      }
      /**
       * @desc call by reference
       */
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

      this.checkBlogSettings();
    });

  }
  /**
   * 사용자가 블로그 사이트에 있는 경우, 블로그 소유주의 회원 idx 가 push domain 이 된다.
   * 사용자가 루트 사이트라면, sonub-root-site 가 도메인이 된다.
   * @desc 이 값은 push_tokens_v2 에 저장된다.
   */
  get pushDomain(): any {
    if (this.inBlogSite && this.blog && this.blog.idx) {
      return this.blog.idx;
    } else {
      return 'sonub-root-site';
    }
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
   * @desc It compares domain in case-insensitive.
   */
  get inMyBlog(): boolean {
    // console.log(location.hostname);

    if (this.loggedOut) {
      return false;
    }

    if (this.inRootSite) {
      return false;
    }
    const hostname = location.hostname.toLowerCase();
    const myBlogUrl = this.myBlogUrl.toLowerCase();
    return myBlogUrl.indexOf(hostname) !== -1;
  }
  openHome() {
    this.router.navigateByUrl('/');
  }
  openProfile() {
    this.router.navigateByUrl('/profile');
  }
  openRootSiteHomeInNewWindow() {
    window.open(this.urlRootSite, '_blank');
  }
  /**
   * Open root site.
   * If you are in development, then open root.sonub.com
   */
  openRootSite() {
    window.location.href = this.urlRootSite;
  }
  openMyBlog(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    if (this.loggedOut) {
      this.toast(this.t({
        en: 'Please login to see your blog. If you regiter, you will have a blog.',
        ko: '로그인을 하셔야 블로그를 볼 수 있습니다. 회원 가입하시면 자동으로 블로그가 생깁니다.'
      }));
    } else {
      if (this.inMyBlog) {
        this.router.navigateByUrl('/');
      } else {
        window.location.href = this.myBlogUrl;
      }
    }
    return false;
  }
  openBlogSettings() {
    this.router.navigateByUrl(this.getBlogManagementUrl());
  }
  openForum(post_id: string) {
    if (post_id === 'blog') {
      this.router.navigateByUrl('/blog');
    } else {
      this.router.navigateByUrl('/forum/' + post_id);
    }
  }


  /**
   * @desc All blog managements & settings url need the user to be his blog site.
   */
  getBlogManagementUrl(): string {
    return '/blog-dashboard';
  }
  getBlogSettingsUrl(): string {
    return '/blog-settings';
  }
  getBlogSettingsAppIconUrl(): string {
    return this.getBlogSettingsUrl() + '/app-icon';
  }
  getBlogPushNotificationsUrl(idx?): string {
    let url = '/blog-management/push-notifications';
    if (idx) {
      url += '/' + idx;
    }
    return url;
  }
  getBlogSettingsCategoryUrl(): string {
    return this.getBlogSettingsUrl() + '/category';
  }
  getBlogSettingsBasicUrl(): string {
    return this.getBlogSettingsUrl() + '/basic';
  }

  /**
   * Url of sitemap settings page.
   */
  getBlogSettingsSitemapUrl(): string {
    return this.getBlogSettingsUrl() + '/sitemap';
  }

  /**
   * Url of blog sitemap
   */
  getBlogSitemapUrl() {
    return this.getBlogUrl(this.currentBlogDomain) + '/sitemap.xml';
  }

  getBlogSettingsDomainUrl(): string {
    return this.getBlogSettingsUrl() + '/domain';
  }

  getBlogStatVisitorUrl(): string {
    return '/blog-stat/visitor';
  }
  getBlogNewCommentsUrl() {
    return '/blog-new-comments';
  }
  getBlogNewEventsUrl() {
    return '/blog-new-events';
  }

  getBlogPostCreateUrl() {
    return `/post/blog`;
  }

  /**
   * Return post view url.
   * This supports all kinds of post like blog, ads, forum post etc.
   * @param post post or blog data
   */
  getPostViewUrl(post: ApiPost): string {
    if (!post) {
      return '';
    }
    if (post.post_id === 'ads') {
      if (post.link && post.link.trim()) {
        return post.link.trim();
      } else {
        return `/forum/${post.post_id}/${post.idx}/${post.subject}`;
      }
    } if (post.post_id === 'blog' && post['blog']) {
      return this.getBlogViewListUrl(post);
    } else {
      return `/forum/${post.post_id}/${post.idx}/${post.subject}`;
    }
  }
  /**
   * @deprecated use this.getPostViewUrl();
   * @param post post data
   */
  getUrlPostView(post: ApiPost): string {
    return this.getPostViewUrl(post);
  }

  /**
   * returns url of the access code
   * @param post_id post id
   * @param code access code
   */
  getUrlPostViewByAccessCode(post_id: string, code: string) {
    return `/forum/${post_id}/${code}`;
  }

  /**
   * Opens a post depending on domain, it can refresh the website.
   * @param post post
   * @param event click event
   */
  openPostView(post: ApiPost, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.setPostInMemory(post);
    if (post.post_id === 'blog') {
      if (post.blog) {
        // console.log(`if (${post.blog} === ${this.currentBlogDomain}) {`);
        if (post.blog === this.currentBlogDomain) {
          this.router.navigateByUrl(this.getBlogViewListUrl(post));
        } else {
          window.location.href = this.getBlogDomainUrl(post.blog) + this.getBlogViewListUrl(post);
        }
      } else {
        this.router.navigateByUrl(this.getBlogViewListUrl(post));
      }


      // this.router.navigateByUrl(this.getBlogViewListUrl(post));
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
   * Opens https://tips.sonub.com/
   */
  openBlogTips() {
    window.location.href = this.getBlogUrl('tips');
  }


  /**
   * Opens blog category under whatever blog domain.
   *
   * If the input blogDomain is not current blog domain, then it will reload the blog site.
   * If the input blogDomain is same as current blog domain, then it will open the category page ( NOT reloading )
   * If user is in root site, then it will reload the page to blog domain.
   *
   * @param categoryName category name
   * @param blogDomain blog domain. If this is omitted, it assumes you are trying to open the category under current blog domain.
   */
  openBlogCategory(categoryName, blogDomain?) {
    if (blogDomain) {
      if (blogDomain === this.currentBlogDomain) {
        this.router.navigateByUrl(this.getBlogCategoryUrl(categoryName));
      } else {
        window.location.href = this.getBlogCategoryUrl(categoryName, blogDomain);
      }
    } else {
      this.router.navigateByUrl(this.getBlogCategoryUrl(categoryName));
      // window.location.href = this.getBlogCategoryUrl(categoryName, blogDomain);
    }
  }

  openLogin() {
    this.router.navigateByUrl('/login');
  }

  /**
   * Returns (blog post view) url of a blog post.
   * @desc if the input post is not a blog post, then, it will return url of post view.
   * @param post blog post
   */
  getBlogViewListUrl(post): string {
    if (!post.post_id) {
      post.post_id = 'blog';
    }
    if (post['blog'] === void 0 || !post['blog']) {
      // console.error('blog is not set');
      // return '#';
      return this.getPostViewUrl(post);
    } else {
      // console.log('post', post);
      return `/b/${post['blog']}/${post.idx}/${post.subject}`;
    }
  }

  /**
   * Returns url of blog view. ( single post view )
   * @desc If you have only post.idx, then passing <any>{ idx: idx, subject: subject } will do.
   * @param post blog post
   * @param fullUrl if it is set to true, it returns full url.
   */
  getBlogViewUrl(post: ApiPost, fullUrl: boolean = false): string {
    this.setPostInMemory(post);
    let url = `/bv/${post.idx}/${post.subject}`;
    if (fullUrl) {
      url = this.getBlogDomainUrl(this.currentBlogDomain) + url;
    }
    return url;
  }

  /**
   * Open blog post view page ( single post ivew )
   * @param post blog post
   */
  openBlogView(post: ApiPost) {
    const url = this.getBlogViewUrl(post);
    console.log('blog url: ', url);
    this.router.navigateByUrl(url);
  }

  /**
   * Open push notification pge
   * @param idx post idx
   */
  openNotification(idx) {
    this.router.navigateByUrl(this.getBlogPushNotificationsUrl(idx));
  }

  /**
   * Blog category list of current domain.
   * @desc You cannot link to other domain in Angular ( You can by hacking or using Angular router scheme. )
   *      So, you cannot use this method to link other blog's category
   *        though it returns the url of the blog's domain and category
   *        it will not work because of 'base href'.
   *      Use openBlogCategory() which can open a new blog domain
   * @param catgoryName blog category name
   */
  getBlogCategoryUrl(catgoryName, blogDomain?) {
    if (blogDomain) {
      return this.getBlogDomainUrl(blogDomain) + `/blog/${blogDomain}/${catgoryName}`;
    } else {
      return `/blog/${this.currentBlogDomain}/${catgoryName}`;
    }
  }

  getForumUrl(post_id) {
    return `/forum/${post_id}`;
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
   * onMessage() is being invoked when the user is on this site(domain) and message received from FCM.
   */
  initPushNotification() {

    /**
     * 채팅에서 백그라운드로 메시지가 와도 별로 할 것이 없다. 왜냐하면, firebase realtiem update 로 message toast 를 상단에 보여주기 때문이다.
     */
    this.messaging.onMessage(async payload => {
      // console.log('Got FCM notification! Display on windows.');
      console.log('payload: ', payload);
      const notification = payload['notification'];
      // alert('Got push tokens');
      const data: ConfirmData = <any>{};
      data.title = '[' + this.t({ en: 'Notification', ko: '알림' }) + '] ' + notification['title'];
      data.content = notification['body'];
      data.content += '<div class="mt-3">' + this.t({ en: 'Do you want to read the blog post?', ko: '해당 블로그 글로 이동하시겠습니까?' }) + '</div>';
      const re = await this.confirm(data);
      if (re) {
        let url: string = notification['click_action'];

        if (url && url.indexOf('bv/')) {
          // const idx = url.split('bv/').pop().split('/').shift();
          // const post: ApiPost = <any>{ idx: idx, subject: notification['title'] };
          // console.log('url: ', this.getBlogViewUrl(post));
          // this.openBlogView(post);
          url = 'bv/' + url.split('bv/').pop();
          console.log('url: ', url);
          this.router.navigateByUrl(url);
        }
      }
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
    let url = APP_PROTOCOL;


    if (environment.production) {
      url += this.appRootDomain;
    } else {
      url += this.appDevRootDomain;
    }

    if (APP_PORT) {
      url += ':' + APP_PORT;
    }

    return url;
  }

  /**
   * Returns root url of the blog domain
   * @param domain blog domain
   * @return blog domain url
   * @example https://abc.sonub.com
   */
  getBlogDomainUrl(domain: string): string {
    let url = '';
    url = APP_PROTOCOL + domain + '.' + this.appRootDomain;
    if (APP_PORT) {
      url += ':' + APP_PORT;
    }
    return url;
  }
  /**
   * Returns blog url of the input - '2nd blog domain'
   * @param domain 2nd domain name only. Not full domain.
   *
   * @return
   *  - If input is 'abc', then 'abc.sonub.com' will be returned.
   */
  getBlogUrl(domain: string): string {
    return this.getBlogDomainUrl(domain);
  }

  getMyBlogUrl(): string {

    return this.myBlogUrl;

  }
  /**
   * Returns 'abc.sonub.com' only.
   * @param domain domain
   */
  getBlogDomain(domain: string): string {
    return domain + '.' + this.appRootDomain;
  }


  /**
   * Returns URL of post featured photo
   * @param post Post
   * @param width width
   * @param height height
   */
  getPostPhotoUrl(post: ApiPost, width: number, height: number) {
    return this.philgo.thumbnailUrl({
      width: width,
      height: height,
      path: post.path_of_featured_image
    });
  }


  /**
   * Returns array of strings of current blog categories.
   *
   * @returns Array of string of the categories
   *  or empty array if there is no category.
   *
   * @warning This can not be binded nor return reference.
   * blog.categories may not have value by the time you call it.
   * To be sure, use this.blog.categories.
   */
  blogCategories(ex?: string): Array<string> {
    if (this.blog && this.blog.categories && this.blog.categories.length) {
      if (ex) {
        return this.blog.categories.filter(cat => cat !== ex);
      } else {
        return this.blog.categories;
      }
    } else {
      return [];
    }
  }

  /**
   * Returns no of categories of current blog.
   */
  blogNoOfCategories(): number {
    if (this.blog && this.blog.no_of_categories) {
      return _.parseNumber(this.blog.no_of_categories);
    } else {
      return 0;
    }
  }


  initLog() {
    socket.on('welcome', data => {
      // console.log('Connected to log server. Welcome data:', data);
    });
  }

  log(data: { path: string }) {
    // const str = JSON.stringify( options );
    data['domain'] = this.currentBlogDomain;
    data['idx_member'] = this.philgo.myIdx();
    data['id'] = this.philgo.myId();
    data['referrer'] = document.referrer;
    data['lang'] = _.languageCode;
    // console.log('data: ', data);
    socket.emit('log', data);
  }



  dateTime(stamp) {
    const d = new Date(_.parseNumber(stamp) * 1000);
    return this.date_hia(stamp) + ', ' + d.toDateString();
  }
  /**
   * Returns hours and minute in '3:30 pm'.
   * @param stamp stamp of time
   */
  date_hia(stamp) {
    let d;
    if (stamp) {
      d = new Date(_.parseNumber(stamp) * 1000);
    } else {
      d = new Date();
    }

    // return d.getFullYear();
    let hours = d.getHours();
    let minutes: any = d.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }


  async alert(data: AlertData) {
    return await this.dialog.alert(data);
  }

  async confirm(data: ConfirmData) {
    return await this.dialog.confirm(data);
  }

  displayHtml(fileName) {
    this.http.get(`/assets/html/${fileName}.html`, { responseType: 'text' }).subscribe(re => {
      this.alert({
        content: re
      });
    }, e => this.error(e));
    return false;
  }
  /**
   * Do something here to your blog whenever blog settings are loaded and changed.
   * required check list
   *        app_* - checked
   *        author - checked
   *        category must have at least one - checked
   *        copyright - checked
   *        description - checked
   *        keywords - checked
   *        name - checked
   * optional
   *      url_favicon is optional - checked
   *      url_seo_image is optional - checked
   */
  checkBlogSettings() {
    console.log('checkBlogSettings: ', this.blog);
    if (!this.inMyBlog || this.blogSettingChecked) {
      return;
    }
    let content = '';
    const basicSettings = [];
    let settingLink = '';

    if (!this.blog['name']) {
      basicSettings.push('Blog Name');
    }
    if (!this.blog['keywords']) {
      basicSettings.push('Keywords');
    }
    if (!this.blog['author']) {
      basicSettings.push('Author Name');
    }
    if (!this.blog['description']) {
      basicSettings.push('Description');
    }
    if (!this.blog['copyright']) {
      basicSettings.push('Copyright');
    }

    if (basicSettings.length) {
      console.log('checking basic setting');
      if (!this.blog['url_favicon']) {
        basicSettings.push('Blog Favicon ( Optional )');
      }
      if (!this.blog['url_seo_image']) {
        basicSettings.push('Preview Image ( Optional )');
      }

      content += '<h4>Blog Basic Settings</h4>';
      content += '<ul>';
      basicSettings.forEach(v => {
        content += `<li>${v}</li>`;
      });
      content += `</ul>`;

      settingLink = '/blog-settings/basic';
    } else if (this.blog.categories.length === 0) {
      console.log('checking category setting');
      content += `<h4>Blog Category Settings</h4>
                      <ul>
                        <li>
                          Category is empty
                        </li>
                      </ul>
                      `;
      settingLink = '/blog-settings/category';
    } else if (!basicSettings.length && this.blog.categories.length) {
      console.log('checking app setting');
      const appSettings = [];
      if (!this.blog['app_name']) {
        appSettings.push('App Name');
      }
      if (!this.blog['app_short_name']) {
        appSettings.push('App Short Name');
      }
      if (!this.blog['app_url_icons_src_512']) {
        appSettings.push('Mobile App Icon');
      }

      if (appSettings.length) {
        content += '<h4>App Blog Home Screen Settings</h4>';
        content += '<ul>';
        appSettings.forEach(v => {
          content += `<li>${v}</li>`;
        });
        content += `</ul>`;

        settingLink = '/blog-settings/app-icon';
      }
    }

    this.blogSettingChecked = true;
    if (!content) {
      console.log('All settings are set.');
      return;
    }


    const data: ConfirmData = {
      title: this.t({ en: 'Ooh..! You have missed required blog settings', ko: '앗! 블로그 설정을 하셔야합니다.' }),
      content: `<div class="blog-requirements">${content}</div>`,
      yes: this.t({ en: 'Update', ko: '업데이트하기' }),
      no: this.t({ en: 'Close', ko: '닫기' }),
      width: '360px'
    };

    this.dialog.confirm(data)
      .then(re => {
        if (re) {
          console.log(re);
          this.router.navigateByUrl(settingLink);
        }
      })
      .catch(e => console.log(e));


  }


  validateInput(event, limit = null, regex = null) {
    // console.log(event.target);
    if (!event.target || !event.target.value) {
      return;
    }
    if (limit && event.target.value.length > limit) {
      event.target.style.color = 'red';
      return;
    }

    if (regex instanceof RegExp) {
      console.log('Invalid input::', regex);
      if (!regex.test(event.target.value)) {
        event.target.style.color = 'red';
        return;
      }
    }


    event.target.style.color = 'black';
  }


  // onSearch(q: string) {
  //   console.log('going to search: ', q);

  //   this.openSearch(q);
  //   this.http.get(`https://work.sonub.com/sonub-supporting-server/search.php?q=${q}`).subscribe(res => {
  //     console.log('search result: ', res);
  //   });
  //   return false;
  // }

  openSearch( q ) {
    this.router.navigate(['/search'], { queryParams: { q: q } });
  }

}
