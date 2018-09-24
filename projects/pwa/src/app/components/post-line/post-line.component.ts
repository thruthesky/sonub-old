import { Component, OnInit, Input } from '@angular/core';
import { ApiPost } from 'share/philgo-api/philgo-api.service';

@Component({
  selector: 'app-post-line',
  templateUrl: './post-line.component.html',
  styleUrls: ['./post-line.component.scss']
})
export class PostLineComponent implements OnInit {

  @Input() post: ApiPost;
  constructor() { }

  ngOnInit() {
  }

}
