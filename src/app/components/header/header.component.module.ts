import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        IonicModule
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [HeaderComponent]
})
export class HeaderComponentModule { }