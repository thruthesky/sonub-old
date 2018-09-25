import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-blog-mobile-category-menu',
  templateUrl: './blog-mobile-category-menu.component.html',
  styleUrls: ['./blog-mobile-category-menu.component.scss']
})
export class BlogMobileCategoryMenuComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
