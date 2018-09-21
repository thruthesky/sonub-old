import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { PostComponent } from './post.component';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'share/components/avatar/avatar.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { DisplayFilesModule } from 'share/philgo-api-components/display-files/display-files.module';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: PostComponent
    }
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        CKEditorModule,
        AvatarModule,
        DisplayFilesModule
    ],
    exports: [],
    declarations: [PostComponent],
    providers: [],
})
export class PostModule { }

