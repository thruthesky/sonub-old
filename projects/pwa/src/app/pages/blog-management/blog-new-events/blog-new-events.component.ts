import { Component, OnInit } from '@angular/core';
import { AppService } from 'projects/pwa/src/services/app.service';

@Component({
  selector: 'app-blog-new-events',
  templateUrl: './blog-new-events.component.html',
  styleUrls: ['./blog-new-events.component.scss']
})
export class BlogNewEventsComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
