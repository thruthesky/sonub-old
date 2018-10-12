import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
      // console.log('Mobile header: route check:', route);
      if (a.inRootSite) {
        if (a.inFrontPage) {
          this.title = 'Sonub';
        } else if (a.inBlogPage) {
          this.title = 'Blog';
        }

      } else if (a.inBlogSite) {

      } else {
        if (a.inBlogPage) {
          this.title = 'Blog';
        } else {
          this.title = '';
        }
      }
    });


    a.philgo.blogChange.subscribe(blog => {
      if (blog) {
        this.title = blog.name;
      }
    });
  }

  ngOnInit() {
  }

}
