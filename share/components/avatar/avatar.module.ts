import { NgModule } from '@angular/core';

import { AvatarComponent } from './avatar.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AvatarComponent
    ],
    declarations: [AvatarComponent],
    providers: [],
})
export class AvatarModule { }
