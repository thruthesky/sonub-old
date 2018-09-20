import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PostComponent } from './pages/post/post.component';
import { ForumComponent } from './pages/forum/forum.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { JobComponent } from './pages/job/job.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'help', component: HelpComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'post/:post_id', component: PostComponent },
    { path: 'post/edit/:idx', component: PostComponent },
    { path: 'forum/:post_id', component: ForumComponent },
    { path: 'forum/:post_id/:idx', component: ForumComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'job', component: JobComponent },
    { path: 'job/:category', component: JobComponent },
    { path: 'job/:category/:idx', component: JobComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
