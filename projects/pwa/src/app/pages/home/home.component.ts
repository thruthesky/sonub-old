import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    router: Router,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    // router.events.subscribe((e: any) => {
    //   if (e instanceof NavigationEnd) {
    this.doInit();
    this.a.checkBlogSettings();
  }

  ngOnInit() {
  }

  doInit() {

    const options = { blog: '', in_blog: false };

    if (this.a.inBlogSite) {
      options.in_blog = true;
      options.blog = this.a.currentBlogDomain;
    } else if (this.a.loggedIn) {
      options.blog = this.a.myBlogDomain;
    }

    // this.philgo.debug = true;
    this.philgo.app('sonub.frontPage', options).subscribe(res => {
      // console.log('sonub fron page data', res);
      this.a.frontPage = res;
    }, e => {
      console.error(e);
    });

  }

}
