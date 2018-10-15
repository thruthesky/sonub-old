import { Component, OnInit } from '@angular/core';
import { AppService } from 'projects/pwa/src/services/app.service';

@Component({
  selector: 'app-blog-new-comments',
  templateUrl: './blog-new-comments.component.html',
  styleUrls: ['./blog-new-comments.component.scss']
})
export class BlogNewCommentsComponent implements OnInit {

  blog;
  comments;
  constructor(
    public a: AppService
  ) {
    a.philgo.blogChange.subscribe(blog => {
      if (blog) {
        this.blog = blog;
        this.a.philgo.postQuery({
          where: `group_id='blog-${this.blog.idx}'`,
          orderby: `idx desc`
        }).subscribe(comments => {
          this.comments = comments;
        });
      }
    }, e => this.a.error(e));
  }

  ngOnInit() {
  }


}
