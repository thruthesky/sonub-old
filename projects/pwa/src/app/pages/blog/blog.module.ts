import { NgModule } from '@angular/core';

import { BlogComponent } from './blog.component';
import { CommonModule } from '@angular/common';
import { MatListModule, MatButtonModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: BlogComponent
    }
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatListModule,
        MatButtonModule
    ],
    exports: [],
    declarations: [BlogComponent],
    providers: [],
})
export class BlogModule { }
