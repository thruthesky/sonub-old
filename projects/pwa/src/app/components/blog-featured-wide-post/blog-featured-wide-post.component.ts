import { Component, OnInit, Input } from '@angular/core';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-blog-featured-wide-post',
  templateUrl: './blog-featured-wide-post.component.html',
  styleUrls: ['./blog-featured-wide-post.component.scss']
})
export class BlogFeaturedWidePostComponent implements OnInit {


  @Input() post: ApiPost;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

}
