import { Component, OnInit, Input } from '@angular/core';
import { ApiPost } from 'share/philgo-api/philgo-api.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-post-line',
  templateUrl: './post-line.component.html',
  styleUrls: ['./post-line.component.scss']
})
export class PostLineComponent implements OnInit {

  @Input() post: ApiPost;
  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
