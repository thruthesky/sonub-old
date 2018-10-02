import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RedirectComponent } from './pages/redirect/redirect.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', loadChildren: './pages/home/home.module#HomeModule' },
    { path: 'help', loadChildren: './pages/help/help.module#HelpModule' },
    { path: 'menu', loadChildren: './pages/menu/menu.module#MenuModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
    { path: 'profile', loadChildren: './pages/register/register.module#RegisterModule' },
    { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsModule' },
    { path: 'post/:post_id', loadChildren: './pages/post/post.module#PostModule' },
    { path: 'post/edit/:idx', loadChildren: './pages/post/post.module#PostModule' },
    { path: 'forum/:post_id', loadChildren: './pages/forum/forum.module#ForumModule' },
    { path: 'forum/:post_id/:idx', loadChildren: './pages/forum/forum.module#ForumModule' },
    { path: 'forum/:post_id/:idx/:subject', loadChildren: './pages/forum/forum.module#ForumModule' },

    // blog posting. Domain is not reuqired since I am posting only on my domain.
    { path: 'blog-post/:blog_category', loadChildren: './pages/post/post.module#PostModule' },

    /**
     * blog list.
     * Domain is required listing from root site.
     */
    /**
     * blog/domain/category is being used in SEO(PHP) also.
     */
    { path: 'blog/:blog_domain/:blog_category', loadChildren: './pages/blog-list/blog-list.module#BlogListModule' },

    // blog post view on top and list at bottom. Domain is required for listing from root site.
    { path: 'b/:blog_domain/:idx/:subject', loadChildren: './pages/blog-list/blog-list.module#BlogListModule' },

    // blog post view. Single post view only. a.getUrlBlogView()
    { path: 'bv/:idx/:subject', loadChildren: './pages/blog-view/blog-view.module#BlogViewPageModule' },

    // blog settings. Domain is not required since user can only enter blog settings pages only under his domain.
    {
        path: 'blog-management',
        loadChildren: './pages/blog-management/blog-management.module#BlogManagementModule'
    },
    {
        path: 'blog-settings/basic',
        loadChildren: './pages/blog-management/blog-settings-basic/blog-settings-basic.module#BlogSettingsBasicModule'
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


    // blog main page. blog portal. all blogs content. This is for root site only.
    { path: 'blog', loadChildren: './pages/blog-main/blog-main.module#BlogMainModule' },

    { path: 'job', loadChildren: './pages/job/job.module#JobModule' },
    { path: 'job-post', loadChildren: './pages/job-post/job-post.module#JobPostModule' },
    { path: 'job-post/:idx', loadChildren: './pages/job-post/job-post.module#JobPostModule' },
    { path: 'job/:category', loadChildren: './pages/job/job.module#JobModule' },
    { path: 'job/:category/:idx', loadChildren: './pages/job/job.module#JobModule' },
    { path: 'job/:category/:idx/:subject', loadChildren: './pages/job/job.module#JobModule' },
    { path: 'redirect', component: RedirectComponent },
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
