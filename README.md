# Sonub

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

```` text
127.0.0.1       sonub.com
127.0.0.1       www.sonub.com
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

## Coding Guideline

### SEO URL link

* `<a href='...'>` or `routerLink` are for hueman only.
* Robots can not understand DOM rendered by Angular renderer.
* It is perfectly fine to navigate with click event like `(click)=" a.openHome() "` since it does not matter whether `<a href='....'>` exists or not.
* But put `href` on `<a>` as much as possible since hueman want to copy the link also.
* SEO will be done by backend side.

### App Object References

* `window['a']` has `AppService` reference.
  * You can use this for debugging.
  * You can do something like `a.version().subscibe(v => console.log(v))` on dev consle.

* Some components have `window['comp']=this` in their constructor. Meaning you can use them in whaever manner you want.

### Route atttribute

* See [Coding Guide](https://docs.google.com/document/d/1u2PAHLDYx0-UUbaXQtMnNJsUiAdJkSbE2pzpSPM5_I8/edit#heading=h.ojq4plytxfhn)

## Setup Sonub.com

* Admin needs to write post with acccess code
  * `create-your-blog-now`
  * `become-best-blog-writer`
  * `sonub-help`
  on `sonub_help` forum. These posts will be linked to sonub site menu.

* Set admin ids on PhilGo Admin Page.

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
  * 2nd call for sonub front apge in home component to get first page content inclding blog site's content.
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

## How to use blog

* [Sonub management - Blog settings](https://docs.google.com/document/d/1QEifBIP7PF6KS6miu4tAlVmEB3Xq3m-BTU6JFYtNXDM/edit#heading=h.r3epipx47iam)

## Case study

### User asks why he doesn't see his blog contents on his site

* Answer: It's not his blog. The user may be changed domain and he forget to visit his new domain.
