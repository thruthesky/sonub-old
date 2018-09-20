import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule
  ],
  declarations: [
      LoginComponent
  ],
  exports: [
      LoginComponent
  ]
})
export class LoginComponentModule {}
