import { Component, OnInit } from '@angular/core';
import { AppService, FrontPage } from '../../../services/app.service';
import { PhilGoApiService } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  frontPage: FrontPage;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    const options = { blog: '' };
    if ( a.inBlogSite ) {
      options.blog = a.currentBlogDomain;
    } else if ( a.loggedIn ) {
      options.blog = a.myBlogDomain;
    }

    this.philgo.debug = true;
    philgo.app('sonub.frontPage', options).subscribe( res => {
      console.log('sonub fron page data', res);
      this.frontPage = res;
    }, e => {
      console.error(e);
    });
  }

  ngOnInit() {
  }

}
