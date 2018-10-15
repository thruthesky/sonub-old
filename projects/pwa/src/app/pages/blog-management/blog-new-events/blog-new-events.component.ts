import { Component, OnInit } from '@angular/core';
import { AppService } from 'projects/pwa/src/services/app.service';

@Component({
  selector: 'app-blog-new-events',
  templateUrl: './blog-new-events.component.html',
  styleUrls: ['./blog-new-events.component.scss']
})
export class BlogNewEventsComponent implements OnInit {

  blog;
  events = {
    total_no_of_tokens: 0,
    tokens: []
  };
  constructor(
    public a: AppService
  ) {
    a.philgo.blogChange.subscribe(blog => {
      if (blog) {
        this.blog = blog;
        this.a.philgo.blogEvents(this.blog.idx).subscribe(res => {
          this.events = res;
          console.log('events: ', this.events);
        }, e => this.a.error(e));
      }
    });
  }

  ngOnInit() {
  }

}
