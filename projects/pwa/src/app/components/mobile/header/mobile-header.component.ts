import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = '';
  constructor(
    public a: AppService
  ) {

    /**
     * When user changes page, update header title/icons.
     */
    a.routeChange.subscribe(route => {
      // console.log('route:', route);
      if (a.inBlog) {
        this.title = 'Blog';
      }
    });


    a.philgo.blogChange.subscribe(blog => {
      // console.log('=========> blog settings', blog);
      this.title = blog.name;
    });
  }

  ngOnInit() {
  }

}
