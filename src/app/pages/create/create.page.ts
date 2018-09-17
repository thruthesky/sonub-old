import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Select } from '@ionic/angular';
import { NgSimpleEditorComponent } from 'ng-simple-editor';
import { PhilGoApiService, ApiPost } from '../../modules/philgo-api/philgo-api.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    @ViewChild('editor') editor: NgSimpleEditorComponent;
    form: ApiPost = <ApiPost>{
        post_id: 'blog'
    };
    forums = {
        blog: 'My Blog',
        qna: 'QnA',
        buyandsell: 'Buy & Sell',
        wanted: 'Jobs',
        party: 'Gatherings',
        rentcar: 'Car Rent',
        hotel: 'Hotel/House',
        real_estate: 'Sell House'
    };
    constructor(
        public a: AppService,
        public philgo: PhilGoApiService
    ) { }

    ngOnInit() {

    }

    onChangeForum(event: Event) {
        this.form.post_id = (<Select><any>event.target).value;
    }


    onSubmit() {

        /**
         * Create
         */
        if (!this.form.post_id) {
            // this.a.toast({code: -1, message: `Please choose where to 'post on'`});
            // this.form.post_id = this.defaultPostId;
        }
        this.form.content = this.editor.content;
        this.philgo.postCreate(this.form).subscribe(res => {
            console.log('create res: ', res);
            this.a.updateFrontPage();
            this.a.openHome();
        }, e => {
            this.a.toast(e);
        });
    }


    onChangeContent(event: Event) {
        let str = this.a._.stripTags(this.editor.content);
        str = this.a._.htmlDecode(str);
        this.form.subject = str.substr(0, 30);
    }
}

