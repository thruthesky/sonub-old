import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { RegisterComponentModule } from 'share/philgo-api-components/user/register/register.module';
import { MatToolbarModule } from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        RegisterComponentModule,
        MatToolbarModule
    ],
    exports: [],
    declarations: [RegisterComponent],
    providers: [],
})
export class RegisterModule { }
