import { Component, OnInit } from '@angular/core';
import { StatService } from '../../../../services/stat.service';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-blog-stat-visitor',
  templateUrl: './blog-stat-visitor.component.html',
  styleUrls: ['./blog-stat-visitor.component.scss']
})
export class BlogStatVisitorComponent implements OnInit {

  constructor(
    private a: AppService,
    private stat: StatService
  ) {
    stat.getPageView({
      domain: this.a.philgo.myBlogDomain(),
      from_year: 2018,
      from_month: 8,
      from_day: 25,
      to_year: 2018,
      to_month: 8,
      to_day: 30
    }).subscribe(res => console.log('stat: ', res));

  }

  ngOnInit() {
  }

}
