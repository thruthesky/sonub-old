import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './dialog.service';
import { MatButtonModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [DialogComponent],
  entryComponents: [DialogComponent],
  providers: [DialogService]
})
export class DialogModule { }
