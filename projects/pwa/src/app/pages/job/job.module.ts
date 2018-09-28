import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobComponent } from './job.component';
import { CommonModule } from '@angular/common';
import { JobListComponentModule } from 'share/philgo-api-components/forum/job/list/job-list.component.module';
import { FormsModule } from '@angular/forms';

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
        JobListComponentModule
    ],
    exports: [],
    declarations: [JobComponent],
    providers: [],
})
export class JobModule { }
