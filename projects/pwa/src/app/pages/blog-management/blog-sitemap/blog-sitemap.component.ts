import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-blog-sitemap',
  templateUrl: './blog-sitemap.component.html',
  styleUrls: ['./blog-sitemap.component.scss']
})
export class BlogSitemapComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
