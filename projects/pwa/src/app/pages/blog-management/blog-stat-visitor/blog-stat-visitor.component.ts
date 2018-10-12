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


  from_date = new Date((new Date()).getTime() - 31 * 24 * 60 * 60 * 1000);
  to_date = new Date();

  // from_hour = 0;
  // to_hour = 23;

  selectedStats = 'pageView';
  changeBarColor = false;

  data = {
    pageView: null,
    uniqueVisitor: null,
  };

  /**
   * SimpleLibrary
   */
  _ = _;

  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  selectedTitle = {
    pageView: 'Page View',
    uniqueVisitor: 'Visitor'
  };


  constructor(public a: AppService,
       private stat: StatService
  ) {
    this.loadStat();
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
      // from_hour: this.from_hour,
      to_year: this.to_date.getFullYear(),
      to_month: this.to_date.getMonth() + 1,
      to_day: this.to_date.getDate(),
      // to_hour: this.to_hour
    };
  }

  loadStat(func = null) {

    if ( func ) {
      this.selectedStats = func;
    }

    const req = this.request(this.selectedStats);
    this.stat.getData(req).subscribe(res => {
      console.log(`${this.selectedStats}: `, res);
      this.data[this.selectedStats] = res['data'];
    }, e => {
      this.a.error(e);
    });

    // req.function = 'pageView';
    // this.stat.getData(req).subscribe(res => {
    //   console.log('page view stat: ', res);
    //   this.data['pageView'] = res['data'];
    // }, e => {
    //   this.a.error(e);
    // });
    //
    // req.function = 'uniqueVisitor';
    // this.stat.getData(req).subscribe(res => {
    //   console.log('unique visitor stat: ', res);
    //   this.data['uniqueVisitor'] = res['data'];
    // }, e => {
    //   this.a.error(e);
    // });


    // req.function = 'everyHourPageView';
    // this.stat.getData(req).subscribe(res => {
    //   console.log('everyHourPageView: ', res);
    //   this.data['everyHourPageView'] = res['data'];
    // }, e => {
    //   this.a.error(e);
    // });
    //
    // req.function = 'everyHourUniqueVisitor';
    // this.stat.getData(req).subscribe(res => {
    //   console.log('everyHourUniqueVisitor: ', res);
    //   this.data['everyHourUniqueVisitor'] = res['data'];
    //   console.log(this.data);
    // }, e => {
    //   this.a.error(e);
    // });

  }




  barHeight( no , max = null, div = 1 ) {
    // console.log(max);
    if ( !no || no === 0 ) {
      return '1';
    }
    if ( no < 0 ) {
      no = Math.abs(no);
    }
    if ( max ) {
      return Math.floor((no / max * 100) / div);
    }

    return Math.floor(no / div);
  }

  maxCount(selectedStats ) {
      return selectedStats.max;
  }

  formatDate( Ymd ) {
    const year = Ymd.substring(2, 4);
    const month = Ymd.substring(4, 6) - 1;
    const day  = Ymd.substring(6, 8);
    return this.monthNames[month]  + ' ' +  day + ' ' + year;
  }

  shortNumber(n: any) {
    if (typeof n === 'string') {
      n = parseInt(n, 10);
    }
    if (n < 1000) {
      return Math.round(n);
    } else if (n < 1000000) {
      return (n / 1000).toPrecision(3) + 'K';
    } else if (n < 1000000000) {
      return (n / 1000000).toPrecision(3) + 'M';
    } else if (n < 1000000000000) {
      return (n / 1000000000).toPrecision(3) + 'B';
    }
  }



}
