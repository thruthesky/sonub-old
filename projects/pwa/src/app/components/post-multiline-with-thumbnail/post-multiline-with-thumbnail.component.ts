import { Component, OnInit, Input } from '@angular/core';
import { ApiPost, PhilGoApiService } from 'share/philgo-api/philgo-api.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-post-multiline-with-thumbnail',
  templateUrl: './post-multiline-with-thumbnail.component.html',
  styleUrls: ['./post-multiline-with-thumbnail.component.scss']
})
export class PostMultilineWithThumbnailComponent implements OnInit {

  @Input() post: ApiPost;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

}

