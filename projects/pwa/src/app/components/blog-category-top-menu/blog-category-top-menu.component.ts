import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';


@Component({
  selector: 'app-blog-category-top-menu',
  templateUrl: './blog-category-top-menu.component.html',
  styleUrls: ['./blog-category-top-menu.component.scss']
})
export class BlogCategoryTopMenuComponent implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

  moreCategories() {
    return this.a.blog.categories.slice(4);
  }

}
