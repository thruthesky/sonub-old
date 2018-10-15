import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RedirectComponent } from './pages/redirect/redirect.component';


/**
 * 여기서 부터.... ngsw-worker.js 가 동작하지 않는다.
 * Angular 기본 @nagular/pwa 는 동작을 한다.
 * 하지만 sonub project 에서는 동작하지 않는다. 모든 모듈과 컴포넌트를 다 주석 처리하고, 최소한의 코드로 실행되도록 해 본다.
 * 정안되면, 새로운 프로젝트를 추가하고, pwa 추가하고, 전체 코드를 하나씩 복사를 해 가며 어떤 타이밍에서 안되는지 찾아낸다.
 */
const routes: Routes = [
    { path: '', pathMatch: 'full', loadChildren: './pages/home/home.module#HomeModule' },
    { path: 'help', loadChildren: './pages/help/help.module#HelpModule' },
    { path: 'menu', loadChildren: './pages/menu/menu.module#MenuModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
    { path: 'profile', loadChildren: './pages/register/register.module#RegisterModule' },
    { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsModule' },

    /**
     * Posting page
     */
    { path: 'post/:post_id', loadChildren: './pages/post/post.module#PostModule' },
    { path: 'post', loadChildren: './pages/post/post.module#PostModule' },

    { path: 'post/edit/:idx', loadChildren: './pages/post/post.module#PostModule' },
    { path: 'forum/:post_id', loadChildren: './pages/forum/forum.module#ForumModule' },
    { path: 'forum/:post_id/:idx', loadChildren: './pages/forum/forum.module#ForumModule' },

    /// This is being used in PHP for SEO. it cannot be changed.
    { path: 'forum/:post_id/:idx/:subject', loadChildren: './pages/forum/forum.module#ForumModule' },

    // blog posting. Domain is not reuqired since I am posting only on my domain.
    { path: 'blog-post/:blog_category', loadChildren: './pages/post/post.module#PostModule' },
    { path: 'blog-post', loadChildren: './pages/post/post.module#PostModule' },

    /**
     * blog list.
     * Domain is required listing from root site.
     */
    /**
     * blog/domain/category is being used in SEO(PHP) also.
     */
    { path: 'blog/:blog_domain/:blog_category', loadChildren: './pages/blog-list/blog-list.module#BlogListModule' },

    // blog post view on top and list at bottom. Domain is required for listing from root site.
    // This is being used in PHP SEO.
    { path: 'b/:blog_domain/:idx/:subject', loadChildren: './pages/blog-list/blog-list.module#BlogListModule' },

    // blog post view. Single post view only. a.getBlogViewUrl()
    { path: 'bv/:idx/:subject', loadChildren: './pages/blog-view/blog-view.module#BlogViewPageModule' },

    // blog settings. Domain is not required since user can only enter blog settings pages only under his domain.
    {
        path: 'blog-dashboard',
        loadChildren: './pages/blog-management/blog-management.module#BlogManagementModule'
    },
    {
        path: 'blog-settings/basic',
        loadChildren: './pages/blog-management/blog-settings-basic/blog-settings-basic.module#BlogSettingsBasicModule'
    },
    {
        path: 'blog-settings/sitemap',
        loadChildren: './pages/blog-management/blog-sitemap/blog-sitemap.module#BlogSitemapModule'
    },
    {
        path: 'blog-settings/category',
        loadChildren: './pages/blog-management/blog-settings-category/blog-settings-category.module#BlogSettingsCategoryModule'
    },
    {
        path: 'blog-settings/domain',
        loadChildren: './pages/blog-management/blog-settings-domain/blog-settings-domain.module#BlogSettingsDomainModule'
    },
    {
        path: 'blog-stat/visitor',
        loadChildren: './pages/blog-management/blog-stat-visitor/blog-stat-visitor.module#BlogStatVisitorModule'
    },

    {
        path: 'blog-new-comments',
        loadChildren: './pages/blog-management/blog-new-comments/blog-new-comments.module#BlogNewCommentsModule'
    },
    {
        path: 'blog-new-events',
        loadChildren: './pages/blog-management/blog-new-events/blog-new-events.module#BlogNewEventsModule'
    },
    {
        path: 'blog-settings/app-icon',
        loadChildren: './pages/blog-management/blog-app-icon/blog-app-icon.module#BlogAppIconModule'
    },

    // send push notification
    {
        path: 'blog-management/push-notifications',
        loadChildren: './pages/blog-management/blog-push-notifications/blog-push-notifications.module#BlogPushNotificationsModule'
    },
    // send push notification with a post
    {
        path: 'blog-management/push-notifications/:idx',
        loadChildren: './pages/blog-management/blog-push-notifications/blog-push-notifications.module#BlogPushNotificationsModule'
    },


    // blog main page. blog portal. all blogs content. This is for root site only.
    { path: 'blog', loadChildren: './pages/blog-main/blog-main.module#BlogMainModule' },

    { path: 'job', loadChildren: './pages/job/job.module#JobModule' },
    { path: 'job-post', loadChildren: './pages/job-post/job-post.module#JobPostModule' },
    { path: 'job-post/:idx', loadChildren: './pages/job-post/job-post.module#JobPostModule' },
    { path: 'job/:category', loadChildren: './pages/job/job.module#JobModule' },
    { path: 'job/:category/:idx', loadChildren: './pages/job/job.module#JobModule' },
    { path: 'job/:category/:idx/:subject', loadChildren: './pages/job/job.module#JobModule' },
    // { path: 'redirect', component: RedirectComponent },
    { path: 'contact', loadChildren: './pages/contact/contact.module#ContactModule' },
    { path: 'search', loadChildren: './pages/search/search.module#SearchModule' },
    { path: '**', component: PageNotFoundComponent },
];

// console.log('routes: ', routes);
@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
        enableTracing: false
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
