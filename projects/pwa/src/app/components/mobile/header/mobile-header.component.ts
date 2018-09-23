import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = '';
  constructor(
    public a: AppService
  ) {
    a.routeChange.subscribe( route => {
      console.log('route:', route);
      if ( a.inBlog ) {
        this.title = 'Blog';
      }
    });
  }

  ngOnInit() {
  }

}
