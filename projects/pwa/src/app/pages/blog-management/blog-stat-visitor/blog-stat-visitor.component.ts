import { Component, OnInit } from '@angular/core';
import { StatService } from '../../../../services/stat.service';
import { AppService } from '../../../../services/app.service';
import { SimpleLibrary as _ } from 'ng-simple-library';

@Component({
  selector: 'app-blog-stat-visitor',
  templateUrl: './blog-stat-visitor.component.html',
  styleUrls: ['./blog-stat-visitor.component.scss']
})
export class BlogStatVisitorComponent implements OnInit {


  from_date = new Date((new Date()).getTime() - 7 * 24 * 60 * 60 * 1000);
  to_date = new Date();

  from_hour = null;
  to_hour = null;

  data = {
    pageView: null,
    everyHourPageView: null,
    uniqueVisitor: null,
    everyHourUniqueVisitor: null
  };

  /**
   * SimpleLibrary
   */
  _ = _;

  constructor(public a: AppService,
              private stat: StatService
  ) {
    this.loadStat();
    this.loadHourStat();
  }

  ngOnInit() {
  }

  request(method = '') {
    return {
      function: method,
      domain: this.a.philgo.myBlogDomain(),
      from_year: this.from_date.getFullYear(),
      from_month: this.from_date.getMonth() + 1,
      from_day: this.from_date.getDate(),
      to_year: this.to_date.getFullYear(),
      to_month: this.to_date.getMonth() + 1,
      to_day: this.to_date.getDate(),
    };
  }

  loadStat() {

    const req = this.request('pageView');
    this.stat.getData(req).subscribe(res => {
      console.log('page view stat: ', res);
      this.data['pageView'] = res['data'];
    }, e => {
      this.a.error(e);
    });


    req.function = 'uniqueVisitor';
    this.stat.getData(req).subscribe(res => {
      console.log('unique visitor stat: ', res);
      this.data['uniqueVisitor'] = res['data'];
    }, e => {
      this.a.error(e);
    });

    this.loadHourStat();
  }



  loadHourStat() {
    const req = this.request('everyHourPageView');
    this.stat.getData(req).subscribe(res => {
      console.log('everyHourPageView: ', res);
      this.data['everyHourPageView'] = res['data'];
    }, e => {
      this.a.error(e);
    });

    req.function = 'everyHourUniqueVisitor';
    this.stat.getData(req).subscribe(res => {
      console.log('everyHourUniqueVisitor: ', res);
      this.data['everyHourUniqueVisitor'] = res['data'];
    }, e => {
      this.a.error(e);
    });
  }

}
