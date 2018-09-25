import { Component, OnInit } from '@angular/core';
import { ApiPost } from 'share/philgo-api/philgo-api.service';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-view-page',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  post: ApiPost;
  constructor(
    activatedRoute: ActivatedRoute,
    public a: AppService
  ) {

    activatedRoute.paramMap.subscribe(params => {
      const idx = params.get('idx');
      if (this.a.postInMemory && this.a.postInMemory.idx === idx) {
        this.post = this.a.postInMemory;
      } else {
        this.a.philgo.postLoad(idx).subscribe(post => this.post = post, e => this.a.error(e));
      }
    });

  }

  ngOnInit() {
  }

}
