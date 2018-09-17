import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'profile', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'create', loadChildren: './pages/create/create.module#CreatePageModule' },
  { path: 'job', loadChildren: './pages/job/job.module#JobPageModule' },
  { path: 'forum/:post_id', loadChildren: './pages/forum/forum.module#ForumPageModule' },
  { path: 'forum/:post_id/:idx', loadChildren: './pages/forum/forum.module#ForumPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings-menu/settings-menu.module#SettingsMenuPageModule' },
  { path: 'settings/language', loadChildren: './pages/settings/settings-language/settings-language.module#SettingsLanguagePageModule' },
  { path: 'settings/dev-info', loadChildren: './pages/settings/settings-dev-info/settings-dev-info.module#SettingsDevInfoPageModule' },
  { path: 'ads', loadChildren: './pages/ads/ads.module#AdsPageModule' },
  { path: 'ads/:idx', loadChildren: './pages/ads-view/ads-view.module#AdsViewPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
