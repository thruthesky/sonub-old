import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Select } from '@ionic/angular';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {


    postId;
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
        public a: AppService
    ) { }

    ngOnInit() {


    }

    onChangeForum(event: Event) {
        this.postId = (<Select><any>event.target).value;
        console.log('selectedPostId', this.postId);
    }


}

