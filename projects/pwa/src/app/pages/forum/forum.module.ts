import { NgModule } from '@angular/core';

import { Routes } from '@angular/router';

import { ForumComponent } from './forum.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForumBasicListModule } from 'share/philgo-api-components/forum/basic/forum-basic-list/forum-basic-list.module';

const routes: Routes = [
    {
        path: '',
        component: ForumComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ForumBasicListModule
    ],
    exports: [],
    declarations: [ForumComponent],
    providers: [],
})
export class ForumModule { }
