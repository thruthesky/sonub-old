import { Component, OnInit } from '@angular/core';
import { StatService } from '../../../../services/stat.service';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-blog-stat-visitor',
  templateUrl: './blog-stat-visitor.component.html',
  styleUrls: ['./blog-stat-visitor.component.scss']
})
export class BlogStatVisitorComponent implements OnInit {


  from_date = new Date((new Date()).getTime() - 7 * 24 * 60 * 60 * 1000);
  to_date = new Date();

  constructor(private a: AppService,
              private stat: StatService
  ) {
    this.loadStat();
  }

  ngOnInit() {
  }

  loadStat() {

    const req = {
      function: 'pageView',
      domain: this.a.philgo.myBlogDomain(),
      from_year: this.from_date.getFullYear(),
      from_month: this.from_date.getMonth() + 1,
      from_day: this.from_date.getDate(),
      to_year: this.to_date.getFullYear(),
      to_month: this.to_date.getMonth() + 1,
      to_day: this.to_date.getDate(),
    };


    this.stat.getData(req).subscribe(res => {
      console.log('page view stat: ', res);
    }, e => {
      this.a.error(e);
    });


    req.function = 'uniqueVisitor';
    this.stat.getData(req).subscribe(res => {
      console.log('uniqu visitor stat: ', res);
    }, e => {
      this.a.error(e);
    });


  }

}
