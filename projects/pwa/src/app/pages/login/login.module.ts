import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { LoginComponentModule } from 'share/philgo-api-components/user/login/login.component.module';
import { MatToolbarModule } from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LoginComponentModule,
        MatToolbarModule
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule { }
