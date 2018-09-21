import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
    {
        path: '',
        component: SettingsComponent
    }
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [SettingsComponent],
    providers: [],
})
export class SettingsModule { }

