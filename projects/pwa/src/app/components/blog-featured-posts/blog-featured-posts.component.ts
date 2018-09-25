import { Component, OnInit, Input } from '@angular/core';
import { FrontPage } from '../../../services/app.service';

@Component({
  selector: 'app-blog-featured-posts',
  templateUrl: './blog-featured-posts.component.html',
  styleUrls: ['./blog-featured-posts.component.scss']
})
export class BlogFeaturedPostsComponent implements OnInit {

  @Input() frontPage: FrontPage;
  constructor() { }

  ngOnInit() {
  }

}
