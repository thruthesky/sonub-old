import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

// import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { SettingsComponent } from './pages/settings/settings.component';
// import { PostComponent } from './pages/post/post.component';
// import { ForumComponent } from './pages/forum/forum.component';
// import { BlogComponent } from './pages/blog/blog.component';
// import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { JobComponent } from './pages/job/job.component';


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
    { path: 'blog', loadChildren: './pages/blog/blog.module#BlogModule' },
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
