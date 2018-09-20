import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentService } from './component.service';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { PromptComponent } from './prompt/prompt.component';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    DialogComponent,
    PromptComponent
  ],
  declarations: [],
  providers: [
    ComponentService
  ]
})
export class ComponentServiceModule { }
