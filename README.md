# Sonub

## Repository

* [BitBucket SEO](https://bitbucket.org/withcenter/sonub-seo/src/master/)

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
  You must use only these domains as blog domains or the webbrowser will redirect you to reall server and that will cause accessing real site. Not the dev server.

* dev.sonub.com domain is a special domain which will display exactly same as root site.

```` text
192.168.0.254   local.philgo.com
127.0.0.1       testuser.sonub.com
127.0.0.1       thruthesky.sonub.com
127.0.0.1       dev.sonub.com
127.0.0.1       xxx.sonub.com
127.0.0.1       new.sonub.com
127.0.0.1       a.sonub.com
127.0.0.1       abc.sonub.com
127.0.0.1       apple.sonub.com
127.0.0.1       b.sonub.com
127.0.0.1       banaa.sonub.com
127.0.0.1       c.sonub.com
127.0.0.1       cherry.sonub.com
````

* ssl is under `tmp/ssl` folder.

* `npm run pwa` to run pwa project. This will open `https://w.sonub.com:8443`.

## Design Guideline

* Front page and other pages will be Facebook style design
* Blog will be Blogger style design.
* Design with `component/utility classes` and `Bootstrap classes`. Do not design with custom css/scss like below.

This is wrong because it makes difficult to understand template design. In fact, I spent long time with this.

```` scss
#home {
  margin-top: -1rem;
}
````

### Page layout

```` html
<header>
  <h1>Page Title. Required.</h1>
  <p>Description. Optional.</p>
</header>
<main>
  Required.
</main>
<footer>
  extra content. Optional.
</footer>
````

## Coding Guideline

### Difference of getXxxxUrl() and urlXxxxx()

* getXxxUrl() can refresh the site based on the domain.

* `routerLink="{{ a.urlXxxxx() }}` cannot refresh the page and cannot chagne the blog domain.

### SEO URL link

* `<a href='...'>` or `routerLink` are for hueman only.
* Robots can not understand DOM rendered by Angular renderer.
* It is perfectly fine to navigate with click event like `(click)=" a.openHome() "` since it does not matter whether `<a href='....'>` exists or not.
* But put `href` on `<a>` as much as possible since hueman want to copy the link also.
* SEO will be done by backend side.

### SEO Development

This section describes how developer can develop and test SEO on local computer.

* @todo [Offline Support](https://docs.google.com/document/d/1g_iZtpHxENVPxV5e4ZshIa2LHBxLx5-U5LjOlXdjMOU/edit#heading=h.1jjjvasz3w68)

#### Hash mismatch

* When SEO is patching index.html, PWA Service Worker offline support will not work.
  @see [hash mismatch](https://docs.google.com/document/d/1I_0twDp3rDfHStel1oPS9HldnBwx3nVzT8Tz0iXqejg/edit#heading=h.ns7wiwiyvvdh)

* Nginx must listen `https://www.sonub.com` (443 port) so, you can access on `https://www.sonub.com` with port 443 which give you the real production environment while your are testing on local computer.

#### SEO local work and patching index.html

* When user access `index.html`, `index.php` will run it. ( This is set by Nginx )
* And then, `index.php` will read `index.html` file and patch SEO data
  * and echo the content of index.html to the browser.

* `index.php` will get information from database based on `blog domain` and `post idx`.
  * `root site` will have `root.sonub.com` configuration. @see see [Root Site Management](https://docs.google.com/document/d/1QEifBIP7PF6KS6miu4tAlVmEB3Xq3m-BTU6JFYtNXDM/edit#heading=h.e9795yxifzr0)

* The app must have `app shell` which has category links to its blog category for `SEO indexing` so, `Search robots` can index important links and sitemaps.
  * `app shell` will be displayed before `Angular bootstrap`.

* To do live test,
  * run `npm run pwa`,
  * run `npm run build:seo`
  * run `nginx`
    * nginx must listen `https://www.sonub.com` on `~/www/sonub-seo` folder as `127.0.0.1`.
  * open web browser for `ng serve`
  * open web browser for `nginx`. just access `https://www.sonub.com` and SEO should work.

* When you edit, you can see the changes quickly on `https://www.sonub.com`, `https://thruthesky.sonub.com`.
  * remember, you have hosted custom domain `sonub.com` as 127.0.0.1

* For `root site` SEO patch, you can edit `https://root.sonub.com` configuration, it will apply to `root site`.
  * Test it on local computer. @see see [Root Site Management](https://docs.google.com/document/d/1QEifBIP7PF6KS6miu4tAlVmEB3Xq3m-BTU6JFYtNXDM/edit#heading=h.e9795yxifzr0)

* It should very smooth working with App shell and SEO.
  * When you edit index.html on VSCode,
    * `ng serve` will update.
    * `npm run build:seo` will update the code on `~/www/sonub-seo/` folder and you can see the change on web browser.
    * And then you can edit `~www/sonub-seo/index.php` to see SEO changes.

#### App Shell Work

* you can access `https://as.sonub.com` for development, `https://appshell.sonub.com` for production to see app shell.

#### Service Worker

* Service worker seems to work on localhost and custom doamin while A2HS does not work on localhost nor custom domain.

* If you build app with `ng build`, then `ngsw-worker.js` will not be copied and will not be registered since `environment.productoin` is false.

#### A2HS

* User can upload PWA Icon and if user is using Chrome on Android, a popup messages shows to add icon to home screen.

* To see if A2HS & Service Worker are properly working, you have to publish to real production site. It's not working on local computer.

* To test Service worker and A2HS, chagne blog configuration and see if service worker updates and app icons, names are updated.

* `/pwa_app_start` is the starting url of pwa app and it opens home page.

#### Manifest for each blogs

* When `/manifest.json` is accessed, `/manifest.php` will be run. ( This is set by Nginx )
* And then, `manifest.php` will read `manifest.json` and patch blogs information and send to browser.
  * Patch information is
    * app name
    * app short anme
    * theme color
    * app icon urls

#### SEO Logic

* If `robot` access index.html, `app shell` will be displayed first.

* And `app shell` has enough links to menus and sitemap for `search engine indexing`.

  * `app shell` for root site exposes `/blogs` page which has all of user's blog list.
    This means all blogs have chance to be crawled by `robots`.

  * `root site app shell` also exposes `sitemap` for forums.

  * `user blog app shell` exposts all the blog menus and its `sitemap` which has the latest 1,000 posts.

#### SEO Tools

##### Sitemaps

* See [Sitemaps in Sonub management doc](https://docs.google.com/document/d/1QEifBIP7PF6KS6miu4tAlVmEB3Xq3m-BTU6JFYtNXDM/edit#heading=h.qsv5o2at3zi0)

#### App Shell Coding

##### App Shell Design

* To desing app shell
  * Load `index.html` using any browser.
    example) `file:///Users/jaehosong/apps/sonub/projects/pwa/src/index.html`
  * And edit, refresh. that's all.

### App Object References

* `window['a']` has `AppService` reference.
  * You can use this for debugging.
  * You can do something like `a.version().subscibe(v => console.log(v))` on dev consle.

* Some components have `window['comp']=this` in their constructor. Meaning you can use them in whaever manner you want.

### Route atttribute

* See [Coding Guide](https://docs.google.com/document/d/1u2PAHLDYx0-UUbaXQtMnNJsUiAdJkSbE2pzpSPM5_I8/edit#heading=h.ojq4plytxfhn)

## Setup Sonub.com

* @see [Default Posts](https://docs.google.com/document/d/1QEifBIP7PF6KS6miu4tAlVmEB3Xq3m-BTU6JFYtNXDM/edit#heading=h.arruynklvgwg) to prepare.

* Set admin ids on PhilGo Admin Page.

* Update GEO IP DATA every month.

### Nginx & PHP Setup

* @see [Nginx Configuration](https://docs.google.com/document/d/1g_iZtpHxENVPxV5e4ZshIa2LHBxLx5-U5LjOlXdjMOU/edit#heading=h.cppkvht88i2x)

#### PUSH NOTIFICATION

* If the app didn't request push notification permission, it requests in `app-request-push-notification` component.
* If user accepts, the component gets push token and saves into `sonub_push_tokens` table on database server.
* And whenever the ap is booting, the app get push token and updates to server.

## Testing

* Since `sonub.com` and `www.sonub.com` are used in locally
  * HTTP redirection to HTTPS may not work (Unless you set it on Nginx) and will be failed on Lighthouse.
* `npm run build:seo:prod` does watch because `ngsw-worker.js` is not being copied.

## Life Cycle of Site

### Terms

* `login user blog content` is posts and other contents posted in currently logged in user's blog.

### Don't show a post twice

* On main page or blog site page, Don't show same post more than one.

### Root site

* `Root site` means `https://sonub.com`, `https://www.sonub.com`, `https://dev.sonub.com`.
* When users access site to `https://www.sonub.com`, they are automatically redirect to `https://sonub.com` by backend.
* `https://dev.sonub.com` is considered as root site on development site in local computer.

#### Root site content

* When user is logged in, user's blog content will be shown on featured posts.
* When user is not logged in, news content will be shown on featured posts.

### Main page

* `main page` means the front page of `root site` which is on `/` route.
* In `main page`, app displays the sonub front page content plus `login user blog content` of the login user.
  If the user is not logged in, `login user blog content` will not be shown.

### Blog main

* `blog main` is on `/blog` route which is the main(index) page of all blogs.
  * It is a place to display all user's blog information and posts.

### Blog domain

* `blog domain` is a site that a visitor visits user's blog site with `blog domain`.
  * This is different from visiting a blog inside `root site`.

### Blog site

* Blog sites are
  * none `root site`
  * `/blog/xxx` route under `root site`. Meaning `root site` can be a blog site under specific routes.
  * Blog sites are different from `blog main page` which is considered to be part of `root site`.

* 3 api calls are made when visiting blog site.
  * 1st call for `sonub config` in app module. ( this may not be called when user does not load blog domain. )
  * 2nd call for sonub front apge in home component to get first page content including blog site's content.
  * 3rd call for blog settings in app service.

### Blog post view

* The route format is `/b/:idx/:subject`. With this route format, we can easily unify to access blog site from `root site` or `blog site`. And subject is for SEO.

* blog post view page displays the post with easy access menus.

## Job

### Job routes

* For creating, `/job-post`
* For editing, `/job-post/:idx`
* For listing, `/job`, `/job/:category`
* for viewing a post on top of list, `/job/:category/:idx`, `/job/category/:idx/:subject`.

### Sidebars

* Sidebars only appear on desktop.

* but Contents of sidebars will be loaded on mobile view. So, the sidebar content will be shown on mobile view in somewhere.

* content of sidebars of root site front page would have more on sonub.com itself plug if user is logged in, logged in, login user's blog content.

* sidebar of blog site will show only the blog's content.

### User blog creation

* User visits site.
* User can post without login.
  When user creates a post with email and passowrd, he will be automatically registered and blog will be created for him.
* Or user can register and a blog will be automatically created.
* Or simply when user login and gets 'user profile data' from server, the server creates user blog already.
  So, user's blog is really ready when user clicks on 'my blog' button.

## Root Site Configuration

* see [Root Site Management](https://docs.google.com/document/d/1QEifBIP7PF6KS6miu4tAlVmEB3Xq3m-BTU6JFYtNXDM/edit#heading=h.e9795yxifzr0)

## How to use blog

* [Sonub management - Blog settings](https://docs.google.com/document/d/1QEifBIP7PF6KS6miu4tAlVmEB3Xq3m-BTU6JFYtNXDM/edit#heading=h.r3epipx47iam)

## Case study

### User asks why he doesn't see his blog contents on his site

* Answer: It's not his blog. The user may be changed domain and he forget to visit his new domain.

## Jobs

* Jobs functionality is using `wanted` post_id which is the same forum of philgo job forum.
* So, if any one posts on sonub jobs forum, that will appear on philgo.
* But if one post jobs on philgo, that will appear on sonub because sonub only shows jobs with `group_id=sonub`.

### porting

* previous house maid and drivers posts are saved in philgo `jobs` forum. it is copied(converted) into `wanted` forum with `group_id=sonub`.
* previous data in `jobs` forum is being used in other site, so, it should remain as it is.

