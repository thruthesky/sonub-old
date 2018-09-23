import { Component, OnInit } from '@angular/core';
import { AppService, FrontPage } from '../../../services/app.service';
import { PhilGoApiService } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  res: FrontPage;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    philgo.app('sonub.frontPage', { blog: a.currentBlogDomain }).subscribe( res => {
      console.log('sonub fron page data', res);
      this.res = res;
    }, e => {
      console.error(e);
    });
  }

  ngOnInit() {
  }

}
