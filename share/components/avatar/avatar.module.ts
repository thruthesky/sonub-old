import { NgModule } from '@angular/core';

import { AvatarComponent } from './avatar.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule
    ],
    exports: [
        AvatarComponent
    ],
    declarations: [AvatarComponent],
    providers: [],
})
export class AvatarModule { }
