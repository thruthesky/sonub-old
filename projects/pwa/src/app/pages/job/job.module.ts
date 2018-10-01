import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobComponent } from './job.component';
import { CommonModule } from '@angular/common';
import { JobListComponentModule } from 'share/philgo-api-components/forum/job/list/job-list.component.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: JobComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        JobListComponentModule,
        MatSelectModule
    ],
    exports: [],
    declarations: [JobComponent],
    providers: [],
})
export class JobModule { }
