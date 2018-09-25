import { Component, OnInit, Input } from '@angular/core';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-post-thumbnail-with-text-on-top',
  templateUrl: './post-thumbnail-with-text-on-top.component.html',
  styleUrls: ['./post-thumbnail-with-text-on-top.component.scss']
})
export class PostThumbnailWithTextOnTopComponent implements OnInit {

  @Input() post: ApiPost;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }


  ngOnInit() {
  }

}
