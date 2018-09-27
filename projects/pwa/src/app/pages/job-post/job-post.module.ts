import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPostComponent } from './job-post.component';
import { RouterModule, Routes } from '@angular/router';
import { JobEditComponentModule } from 'share/philgo-api-components/forum/job/edit/job-edit.component.module';

const routes: Routes = [
  {
      path: '',
      component: JobPostComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    JobEditComponentModule
  ],
  declarations: [JobPostComponent]
})
export class JobPostModule { }
