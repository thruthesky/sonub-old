import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AvatarComponent } from "./avatar.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        IonicModule
    ],
    declarations: [
        AvatarComponent
    ],
    exports: [AvatarComponent]
})
export class AvatarComponentModule { }