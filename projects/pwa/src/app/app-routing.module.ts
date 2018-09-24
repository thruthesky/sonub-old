import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


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
    { path: 'blog/settings', loadChildren: './pages/blog-settings/blog-settings.module#BlogSettingsModule' },
    { path: 'blog/:blog_domain', loadChildren: './pages/blog/blog.module#BlogModule' },
    { path: 'b/:idx/:subject', loadChildren: './pages/blog-view/blog-view.module#BlogViewModule' },
    { path: 'blog', loadChildren: './pages/blog-main/blog-main.module#BlogMainModule' },
    { path: 'job', loadChildren: './pages/job/job.module#JobModule' },
    { path: 'job/:category', loadChildren: './pages/job/job.module#JobModule' },
    { path: 'job/:category/:idx', loadChildren: './pages/job/job.module#JobModule' },
    { path: '**', component: PageNotFoundComponent },
];

// console.log('routes: ', routes);
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
